import { useAuthStore } from "../store/useAuthStore.js";
import { useCarStore } from "../store/useCarStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { useBookingStore } from "../store/useBookingStore.js";
import CarDetailsSkeleton from "../components/car/CarDetailsSkeleton.jsx";
import ChatMessagesSkeleton from "../components/chat/ChatMessagesSkeleton.jsx";
import socket from '../socket.js';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import { iconList } from "../assets/assets.jsx";


const ChatPage = () => {


  const currency = import.meta.env.VITE_CURRENCY;
  const { user, ownerDetails, ownerDetailsLoading, fetchOwnerDetails } = useAuthStore();
  const { carDetails, carDetailsLoading, carOwner, fetchUserCarDetails } = useCarStore();
  const { messages, setMessages, getMessages, createChat, sendUserMessage } = useChatStore();
  const { bookings, fetchUserBookings, bookingLoading } = useBookingStore();
  const { id: routeCarId } = useParams();
  const [owner, setOwner] = useState("");
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const [chatId, setChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [resolvedCarId, setResolvedCarId] = useState(routeCarId || null);

  const scrollContainerRef = useRef(null);
  const prevMessagesLength = useRef(0);

  // Instant scroll on load, smooth scroll for new messages if near bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isInitialLoad = prevMessagesLength.current === 0 && messages.length > 0;

      // Check if user is near bottom (within 200px)
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;

      if (isInitialLoad || isNearBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: isInitialLoad ? "auto" : "smooth"
        });
      }

      prevMessagesLength.current = messages.length;
    }
  }, [messages]);

  useEffect(() => {
    prevMessagesLength.current = 0;
  }, [chatId]);

  const formatMessageTime = (date) => {
    const msgDate = new Date(date);
    const now = new Date();

    const isToday =
      msgDate.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      msgDate.toDateString() === yesterday.toDateString();

    const time = msgDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return time;
    if (isYesterday) return `Yesterday • ${time}`;

    const dateStr = msgDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return `${dateStr} • ${time}`;
  };



  const handleCreateChat = async () => {
    if (!resolvedCarId || user?._id === owner) return;
    const newChatId = await createChat(user._id, owner, resolvedCarId);
    if (newChatId) setChatId(newChatId);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'pdf'
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = null; // Reset input
  };

  const removeAttachment = (index) => {
    setAttachments(prev => {
      const newArr = [...prev];
      if (newArr[index].preview) URL.revokeObjectURL(newArr[index].preview);
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() && attachments.length === 0) return;
    const text = input;
    const currentAttachments = [...attachments];
    setInput("");
    setAttachments([]);
    await sendUserMessage(chatId, user.role, text, socket, currentAttachments);
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("FRONTEND SOCKET CONNECTED:", socket.id);
    });
    return () => socket.off("connect");
  }, []);

  useEffect(() => {
    if (!chatId) return;
    console.log("JOINING CHAT:", chatId);
    socket.emit("joinChat", chatId);
    return () => {
      socket.emit("leaveChat", chatId);
    };
  }, [chatId]);

  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, [user]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
    return () => socket.off("onlineUsers");
  }, []);

  useEffect(() => {
    if (!chatId) return;
    const handleTyping = (incomingChatId) => {
      if (incomingChatId === chatId) {
        setIsTyping(true);
      }
    };
    const handleStopTyping = (incomingChatId) => {
      if (incomingChatId === chatId) {
        setIsTyping(false);
      }
    };
    socket.on("userTyping", handleTyping);
    socket.on("userStopTyping", handleStopTyping);
    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStopTyping", handleStopTyping);
    };
  }, [chatId, socket]);

  useEffect(() => {
    const handleReceive = ({ message, chatId: incomingChatId }) => {
      if (incomingChatId === chatId) {
        setMessages((prev) => [...prev, message]);
      }
    };
    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [chatId]);

  useEffect(() => {
    if (chatId && messages.length > 0) {
      const hasUnread = messages.some(m => m.senderRole !== user.role && !m.seenByReceiver);
      if (hasUnread) {
        socket.emit("markAsRead", { chatId, role: user.role });
      }
    }
  }, [chatId, messages]);

  useEffect(() => {
    const handleMessagesRead = ({ chatId: readChatId }) => {
      if (readChatId === chatId) {
        setMessages(prev => prev.map(m => m.senderRole === user.role ? { ...m, seenByReceiver: true } : m));
      }
    };
    socket.on("messagesRead", handleMessagesRead);
    return () => socket.off("messagesRead", handleMessagesRead);
  }, [chatId]);

  useEffect(() => {
    if (!routeCarId) {
      fetchUserBookings();
    } else {
      setResolvedCarId(routeCarId);
    }
  }, [routeCarId]);

  useEffect(() => {
    if (routeCarId) return;
    if (bookings.length === 0) return;
    const latest = bookings[0];
    const bookingCar = latest?.car;
    const carId = typeof bookingCar === "string" ? bookingCar : bookingCar?._id;
    if (carId) setResolvedCarId(carId);
  }, [routeCarId, bookings]);

  useEffect(() => {
    if (resolvedCarId) fetchUserCarDetails(resolvedCarId);
  }, [resolvedCarId]);

  useEffect(() => {
    if (carOwner) setOwner(carOwner);
  }, [carOwner]);

  useEffect(() => {
    if (owner) fetchOwnerDetails(owner);
  }, [owner]);

  useEffect(() => {
    if (user?._id && owner) handleCreateChat();
  }, [user, owner]);

  useEffect(() => {
    if (chatId) getMessages(chatId);
  }, [chatId]);


  const isOnline = ownerDetails?._id ? onlineUsers.includes(ownerDetails._id) : false;
  const isDetailsLoading = carDetailsLoading || ownerDetailsLoading || (!resolvedCarId && bookingLoading);
  const showNoBooking = !routeCarId && !bookingLoading && !resolvedCarId;
  // console.log(ownerDetails._id)


  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(url, '_blank'); // Fallback to opening in new tab
    }
  };

  return (
    <div className="max-w-8xl mx-auto md:px-8 lg:px-16 xl:px-24
    bg-gray-50/50 dark:bg-[#0f1014] dark:text-dark-text h-full overflow-hidden flex flex-col">

      <div className="w-full h-full bg-white dark:bg-second-bg flex flex-col md:flex-row overflow-hidden">

        {/* LEFT SIDE */}
        {
          showNoBooking ? (
            <div className="w-full md:w-[30%] shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-border p-6 flex items-center justify-center">
              <p className="text-sm text-gray-500">No bookings yet. Book a car to start a chat.</p>
            </div>
          ) : isDetailsLoading ? (
            <div className="w-full md:w-[30%] shrink-0">
              <CarDetailsSkeleton />
            </div>
          ) : (
            <div className="w-full md:w-[30%] shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-border p-3 md:p-6 flex flex-row md:flex-col items-center md:items-start gap-4 md:bg-gray-50/30 dark:md:bg-main-bg/20">
              <h2 className="hidden md:block text-lg font-bold mb-2 dark:text-dark-text tracking-tight">Booking Details</h2>

              <img
                className="rounded-lg md:rounded-xl w-20 h-16 md:w-full md:h-48 object-cover shadow-sm border border-gray-100 dark:border-dark-border"
                src={carDetails?.image}
                alt="car"
              />

              <div className="flex flex-col min-w-0">
                <h3 className="flex font-bold text-base md:text-xl gap-1.5 flex-wrap text-gray-800 dark:text-dark-text leading-tight truncate">
                  <span>{carDetails?.brand} {carDetails?.model}</span>
                  <span className="text-primary dark:text-accent font-semibold">{carDetails?.year}</span>
                </h3>

                <div className="text-xs md:text-sm text-gray-500 dark:text-dark-muted mt-1.5 flex gap-1.5 items-center flex-wrap font-medium">
                  <span className="bg-gray-100 dark:bg-surface px-2 py-0.5 rounded-md">{carDetails?.transmission}</span>
                  <span className="bg-gray-100 dark:bg-surface px-2 py-0.5 rounded-md">{carDetails?.fuel_type}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">{currency}{carDetails?.pricePerHour}/hour</span>
                </div>
              </div>
            </div>
          )
        }

        {/* RIGHT SIDE */}
        {
          showNoBooking ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-500">No bookings found for chat.</p>
            </div>
          ) : isDetailsLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <ChatMessagesSkeleton />
            </div>
          ) : user?._id === owner ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <iconList.CircleUser size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800 dark:text-dark-text">Self-Chat Not Available</h3>
                <p className="text-gray-500 dark:text-dark-muted max-w-xs mx-auto">
                  You are the owner of this car. You cannot start a chat with yourself.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex-1 flex flex-col min-w-0 overflow-hidden bg-[#efe7de] dark:bg-[#0b141a]">
              {/* HEADER */}
              <div className="shrink-0 bg-white/95 dark:bg-second-bg/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-border p-2 md:p-3 flex flex-row items-center justify-between shadow-sm z-10">

                {/* OWNER DETAILS */}
                <div className="flex gap-3.5 items-center">
                  <div className="relative">
                    <img
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shadow-sm border border-gray-200 dark:border-dark-border"
                      src={ownerDetails?.image}
                      alt="owner"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-second-bg ${isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-[15px] md:text-base text-gray-800 dark:text-dark-text leading-tight">
                      {ownerDetails?.name} <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-surface px-1.5 py-0.5 rounded ml-1">Owner</span>
                    </div>

                    <div className="text-xs md:text-[13px] mt-0.5">
                      {isTyping ? (
                        <span className="text-primary dark:text-accent font-medium animate-pulse">typing...</span>
                      ) : (
                        <span className="text-gray-500 dark:text-dark-muted font-medium">
                          {isOnline ? "Online now" : "Offline"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* USER PROFILE INFO */}
                <div className="flex items-center gap-2 pr-2">
                  <div className="hidden sm:flex flex-col items-end mr-2">
                    <span className="text-xs text-gray-500 dark:text-dark-muted">Logged in as</span>
                    <span className="font-semibold text-sm text-gray-800 dark:text-dark-text">{user?.name}</span>
                  </div>
                  {user?.image ? (
                    <img
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-dark-border"
                      src={user.image}
                      alt={user?.name}
                    />
                  ) : (
                    <iconList.CircleUser className="w-8 h-8 text-gray-400" />
                  )}
                </div>

              </div>

              {/* CHAT BODY AREA */}
              <div className="flex-1 min-h-0 relative">
                <div ref={scrollContainerRef} className="absolute inset-0 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px] dark:opacity-90 dark:bg-blend-overlay dark:bg-black/20">
                  <div className="flex flex-col min-h-full">
                    <div className="flex-1" />
                    <div className="space-y-3 flex flex-col p-1">
                      <AnimatePresence initial={false}>
                        {messages.map((m) => (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            key={m._id}
                            className={`relative max-w-[85%] md:max-w-[65%] w-fit px-3.5 py-2 text-[14.5px] rounded-2xl shadow-sm wrap-break-words ${m.senderRole === user.role
                              ? "ml-auto bg-[#d9fdd3]  text-[#111b21] rounded-br-sm"
                              : "bg-white  text-[#111b21] rounded-bl-sm border border-transparent shadow-sm"
                              }`}
                          >
                            {m.attachments && m.attachments.length > 0 && (
                              <div className={`flex flex-col gap-2 mb-2 ${m.attachments.length > 1 ? "grid grid-cols-2" : ""}`}>
                                {m.attachments.map((att, idx) => (
                                  <div key={idx} className="group relative rounded-lg overflow-hidden border border-black/5 dark:border-white/10 shadow-sm bg-black/5 dark:bg-black/20">
                                    {att.type === 'image' ? (
                                      <>
                                        <img
                                          src={att.url}
                                          alt="attachment"
                                          className="md:max-w-55 max-w-45 h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                          onClick={() => window.open(att.url, '_blank')}
                                        />
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(att.url, att.name || `image_${idx}.jpg`);
                                          }}
                                          className="absolute top-0 right-0 h-7 w-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 shadow-lg backdrop-blur-sm cursor-pointer"
                                        >
                                          <iconList.Download size={16} />
                                        </button>
                                      </>
                                    ) : (
                                      <div className="flex items-center justify-between p-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        <a
                                          href={att.url}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center gap-2 text-[13px] text-inherit no-underline min-w-0"
                                        >
                                          <div className="h-9 w-9 shrink-0 flex items-center justify-center bg-white dark:bg-card-bg rounded-lg shadow-sm">
                                            <iconList.FileText className="text-red-500" size={20} />
                                          </div>
                                          <div className="flex flex-col min-w-0">
                                            <span className="font-semibold truncate text-[11px]">{att.name || "Document.pdf"}</span>
                                            <span className="text-[9px] opacity-60 uppercase">{att.type}</span>
                                          </div>
                                        </a>
                                        <button
                                          onClick={() => handleDownload(att.url, att.name || "document.pdf")}
                                          className="h-7 w-7 flex items-center justify-center text-gray-500 hover:text-primary dark:text-dark-muted dark:hover:text-accent transition-colors cursor-pointer"
                                          title="Download"
                                        >
                                          <iconList.Download size={16} />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                            {m.message && <p className="whitespace-pre-wrap">{m.message}</p>}
                            <div className={`flex items-center justify-end gap-1.5 mt-1 text-[10px] font-medium ${m.senderRole === user.role ? "text-[#667781] dark:text-[#8696a0]" : "text-[#667781] dark:text-[#8696a0]"}`}>
                              <span>{formatMessageTime(m.createdAt).split('•').pop().trim()}</span>
                              {m.senderRole === user.role && (
                                <span className="ml-0.5">
                                  {m.status === 'sending' ? (
                                    <iconList.Clock size={11} className="text-[#667781] dark:text-[#8696a0]" />
                                  ) : m.seenByReceiver ? (
                                    <CheckCheck size={15} className="text-[#53bdeb]" />
                                  ) : m.delivered ? (
                                    <CheckCheck size={15} className="text-[#8696a0]" />
                                  ) : (
                                    <Check size={15} className="text-[#8696a0]" />
                                  )}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>


              {/* INPUT BOX */}
              <div className="shrink-0 p-3 md:p-4 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-dark-border flex flex-col gap-2 z-10">
                {/* ATTACHMENT PREVIEW */}
                {attachments.length > 0 && (
                  <div className="flex gap-3 mb-3 max-w-4xl overflow-x-auto pb-2 scrollbar-hide">
                    <AnimatePresence>
                      {attachments.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-xl overflow-hidden border-2 border-white dark:border-dark-border shadow-md bg-white dark:bg-card-bg group"
                        >
                          {file.type === 'image' ? (
                            <img src={file.preview} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center p-2 bg-red-50 dark:bg-red-900/10">
                              <iconList.FileText className="text-red-500 mb-1" size={24} />
                              <span className="text-[10px] font-medium truncate w-full text-center px-1 dark:text-dark-text">{file.name}</span>
                            </div>
                          )}
                          <button
                            onClick={() => removeAttachment(index)}
                            className="absolute top-1 right-1 h-6 w-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100 cursor-pointer scale-90 hover:scale-100"
                          >
                            <iconList.X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                <div className="flex gap-2 items-end">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept="image/*,application/pdf"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="h-12 w-12 shrink-0 rounded-full flex items-center justify-center text-gray-500 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-[#2a3942] transition-colors cursor-pointer"
                  >
                    <iconList.Paperclip size={22} />
                  </button>

                  <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-3xl flex items-center px-5 py-0.5 border-2 border-transparent focus-within:border-primary/20 transition-all shadow-sm">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        if (chatId) {
                          socket.emit("typing", chatId);
                          if (window.typingTimeout) clearTimeout(window.typingTimeout);
                          window.typingTimeout = setTimeout(() => {
                            socket.emit("stopTyping", chatId);
                          }, 1000);
                        }
                      }}
                      onKeyDown={(e) => {
                        e.key === "Enter" && handleSendMessage();
                      }}
                      placeholder="Type a message..."
                      className="w-full bg-transparent border-none outline-none py-3 text-[15px] text-gray-800 dark:text-[#d1d7db] placeholder-gray-500 dark:placeholder-gray-400 "
                    />
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() && attachments.length === 0}
                    className={`h-12 w-12 md:h-12.5 md:w-12.5 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 ${input.trim() || attachments.length > 0
                      ? "bg-primary dark:bg-accent text-white dark:text-main-bg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer"
                      : "bg-gray-200 dark:bg-[#2a3942] text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <iconList.Send size={20} className="ml-1" />
                  </button>
                </div>
              </div>

            </div>
          )
        }

      </div>
    </div>
  );
};


export default ChatPage;