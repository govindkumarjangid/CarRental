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

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendUserMessage(chatId, user.role, text, socket);
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
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">{currency}{carDetails?.pricePerDay}/day</span>
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
                            <p className="whitespace-pre-wrap">{m.message}</p>
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
              <div className="shrink-0 p-3 md:p-4 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-dark-border flex gap-2 z-10">
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
                  className="px-4 py-3 w-full border-none rounded-full outline-none text-sm md:text-base bg-white dark:bg-[#2a3942] dark:text-[#d1d7db] transition-all shadow-sm"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="bg-primary dark:bg-accent text-white dark:text-main-bg h-12 w-12 md:h-12.5 md:w-12.5 rounded-full active:scale-95 transition-all duration-300 cursor-pointer hover:bg-primary-dull dark:hover:bg-accent-dull disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md shrink-0">
                  <iconList.Send size={20} className="ml-1" />
                </button>
              </div>

            </div>
          )
        }

      </div>
    </div>
  );
};


export default ChatPage;