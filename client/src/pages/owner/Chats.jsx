import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import socket from "../../socket.js";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import { iconList } from "../../assets/assets.jsx";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import ChatSkeletonList from "../../components/chat/ChatSkeletonList.jsx";
import OwnerChatMessageSkeleton from "../../components/chat/OwnerChatMessageSkeleton.jsx";
import { useParams, useNavigate } from "react-router-dom";

const Chats = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    chats,
    messages,
    getChats,
    getMessages,
    sendMessage,
    setMessages,
    chatLoading,
    messageLoading
  } = useChatStore();

  const [activeChat, setActiveChat] = useState(null);

  // Sync activeChat with userId from URL
  useEffect(() => {
    if (userId && chats.length > 0) {
      const chat = chats.find(c => {
        const other = c.user?._id === user?._id ? c.owner : c.user;
        return other?._id === userId;
      });
      if (chat) {
        setActiveChat(chat);
      }
    } else if (!userId) {
      setActiveChat(null);
    }
  }, [userId, chats]);

  const [input, setInput] = useState("");
  const [typingChatId, setTypingChatId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const typingTimeoutRef = useRef(null);
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
  }, [activeChat?._id]);


  const getOtherUser = (chat) => {
    return chat?.user?._id === user?._id ? chat?.owner : chat?.user;
  }

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

  const formatShortTime = (date) => {
    if (!date) return "";
    const msgDate = new Date(date);
    const now = new Date();
    if (msgDate.toDateString() === now.toDateString()) {
      return msgDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    }
    return msgDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };


  const handleSend = async () => {
    const text = input;
    setInput("");
    await sendMessage(activeChat, user.role, text, socket);
  };


  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    if (!activeChat?._id) return;
    getMessages(activeChat._id);
  }, [activeChat?._id]);



  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("FRONTEND SOCKET CONNECTED:", socket.id);
    });
    return () => socket.off("connect");
  }, []);

  useEffect(() => {
    if (!activeChat?._id) return;
    socket.emit("joinChat", activeChat._id);
    console.log("JOINING CHAT : ", activeChat._id);
    return () => {
      socket.emit("leaveChat", activeChat._id);
    };
  }, [activeChat?._id]);

  useEffect(() => {
    const handleTyping = (incomingChatId) => {
      if (incomingChatId === activeChat?._id) {
        setTypingChatId(incomingChatId);
      }
    };
    const handleStopTyping = (incomingChatId) => {
      if (incomingChatId === activeChat?._id) {
        setTypingChatId(null);
      }
    };
    socket.on("userTyping", handleTyping);
    socket.on("userStopTyping", handleStopTyping);
    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStopTyping", handleStopTyping);
    };
  }, [activeChat?._id]);

  useEffect(() => {
    const handleReceive = ({ message, chatId }) => {
      if (chatId === activeChat?._id)
        setMessages((prev) => [...prev, message]);
      getChats();
    };
    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [activeChat?._id]);

  useEffect(() => {
    if (!activeChat?._id) return;
    setMessages([]);
    getMessages(activeChat._id);
  }, [activeChat?._id]);

  useEffect(() => {
    if (user?._id) socket.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    if (activeChat?._id && messages.length > 0) {
      const hasUnread = messages.some(m => m.senderRole !== user.role && !m.seenByReceiver);
      if (hasUnread)
        socket.emit("markAsRead", { chatId: activeChat._id, role: user.role });
    }
  }, [activeChat?._id, messages]);

  useEffect(() => {
    const handleMessagesRead = ({ chatId }) => {
      if (chatId === activeChat?._id)
        setMessages(prev => prev.map(m => m.senderRole === user.role ? { ...m, seenByReceiver: true } : m));
    };
    socket.on("messagesRead", handleMessagesRead);
    return () => socket.off("messagesRead", handleMessagesRead);
  }, [activeChat?._id]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
    return () => socket.off("onlineUsers");
  }, []);


  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredChats = chats.filter(chat => {
    const other = getOtherUser(chat);
    return other?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-gray-50/30 dark:bg-main-bg text-gray-800 dark:text-dark-text">

      {/* title  */}
      <div className={`px-4 pt-4 md:px-8 md:pt-6 mb-2 md:mb-4 shrink-0 transition-all ${activeChat ? "hidden md:block" : "block"}`}>
        <OwnerTitle
          title="Messages"
          subTitle="Manage and respond to all customer conversations from one place."
        />
      </div>

      <div className={`flex flex-1 w-full overflow-hidden shadow-sm bg-white dark:bg-second-bg border-t border-gray-200 dark:border-dark-border`}>

        {/* CHAT LIST */}
        <div className={`w-full md:w-80 lg:w-[360px] shrink-0 border-r border-gray-200 dark:border-dark-border flex flex-col bg-white dark:bg-second-bg ${activeChat ? "hidden md:flex" : "flex"}`}>
          {/* chat list header  */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 dark:border-dark-border shrink-0 bg-gray-50/50 dark:bg-second-bg relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!showSearch ? (
                <motion.h2
                  key="title"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-lg font-bold text-gray-800 dark:text-dark-text"
                >
                  Recent Chats
                </motion.h2>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 flex items-center bg-gray-100 dark:bg-card-bg rounded-full px-3 py-1.5"
                >
                  <iconList.Search size={16} className="text-gray-400 mr-2" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm dark:text-dark-text"
                  />
                  <button onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
                    <iconList.X size={16} className="text-gray-400 cursor-pointer" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface text-gray-500 transition-colors cursor-pointer"
              >
                <iconList.Search size={20} />
              </button>
            )}
          </div>

          {/* chats list  */}
          <div className="flex-1 overflow-y-auto">
            {chatLoading ?
              [1, 2, 3, 4, 5].map((chat, index) => (
                <ChatSkeletonList key={index} />
              ))
              :
              filteredChats.map((chat) => {
                const other = getOtherUser(chat);
                const isOnline = onlineUsers.includes(chat.user._id);
                const isActive = activeChat?._id === chat._id;

                return (
                  <div
                    key={chat._id}
                    onClick={() => navigate(`/owner/chats/${other._id}`)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 dark:border-dark-border/50 transition-colors hover:bg-gray-100 rounded-md relative ${isActive ? "bg-primary/10 text-primary" : ""}`}
                  >

                    {isActive && (
                      <motion.div className="absolute left-0 top-2 h-13 w-1.5 bg-primary rounded-r dark:bg-accent" />
                    )}
                    <div className="relative shrink-0">
                      <iconList.CircleUser size={46} strokeWidth={1.5} className={isActive ? "text-primary" : "text-gray-400 dark:text-gray-500"} />
                      <span
                        className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-second-bg ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <div className="font-semibold truncate text-[15px] text-gray-900 dark:text-dark-text">
                          {other.name}
                        </div>
                        {chat.lastMessage && (
                          <span className="text-[11px] font-medium text-gray-400 dark:text-dark-muted shrink-0 ml-2">
                            {formatShortTime(chat.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] text-gray-500 dark:text-dark-muted overflow-hidden line-clamp-1 pr-2">
                        {chat.lastMessage?.message || "No messages yet"}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* CHAT AREA */}
        {messageLoading ? (
          <div className="flex-1 hidden md:block">
            <OwnerChatMessageSkeleton />
          </div>
        ) : (
          <div className={`flex flex-col flex-1 bg-[#efe7de] dark:bg-[#0b141a] ${activeChat ? "flex" : "hidden md:flex"}`}>

            {/* HEADER */}
            {activeChat ? (
              <div className="h-16 flex items-center gap-3 px-4 bg-white/80 backdrop-blur-md dark:bg-second-bg/90 border-b border-gray-200 dark:border-dark-border shadow-sm z-10 shrink-0">
                <button
                  onClick={() => navigate("/owner/chats")}
                  className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface text-gray-600 dark:text-dark-muted transition-colors active:scale-95 cursor-pointer"
                >
                  <iconList.ArrowLeft size={18} />
                </button>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <iconList.CircleUser size={40} strokeWidth={1.5} className="text-gray-500 dark:text-gray-400" />
                    {onlineUsers.includes(getOtherUser(activeChat)._id) && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-second-bg bg-green-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] text-gray-900 dark:text-dark-text leading-tight">
                      {getOtherUser(activeChat).name}
                    </span>
                    {typingChatId ? (
                      <span className="text-green-500 text-[12px] italic font-medium mt-0.5">
                        typing...
                      </span>
                    ) : (
                      <span className="text-[12px] text-gray-500 dark:text-dark-muted mt-0.5">
                        {onlineUsers.includes(getOtherUser(activeChat)._id) ? "Online" : "Offline"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-16 flex items-center px-6 bg-white dark:bg-second-bg border-b border-gray-200 dark:border-dark-border shrink-0">
                <h2 className="text-lg font-bold text-gray-800 dark:text-dark-text">Chat Preview</h2>
              </div>
            )}

            {/* MESSAGES */}
            <div className="flex-1 min-h-0 relative">
              {activeChat ? (
                <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto custom-scrollbar bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-repeat bg-bg-size-[400px] dark:opacity-90 dark:bg-blend-overlay dark:bg-black/20">
                  {/* Spacer to push messages to bottom when there are few of them */}
                  <div className="flex flex-col min-h-full">
                    <div className="flex-1" /> 
                    <div className="p-4 md:p-6 space-y-4 flex flex-col">
                      <AnimatePresence initial={false}>
                        {messages.map((m) => (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            key={m._id}
                            className={`relative max-w-[85%] md:max-w-[70%] w-fit px-3 py-1.5 text-[14px] rounded-xl leading-snug wrap-break-words shadow-sm ${m.senderRole === user.role
                              ? "ml-auto bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-br-sm"
                              : "bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-bl-sm border border-transparent dark:border-none shadow-sm"
                              }`}
                          >
                            <p>{m.message}</p>
                            <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] font-medium ${m.senderRole === user.role ? "text-[#667781] dark:text-[#8696a0]" : "text-[#667781] dark:text-[#8696a0]"}`}>
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
              ) : (
                <div className="h-full flex items-center justify-center bg-white">
                  <div className="flex flex-col items-center gap-4 max-w-xs text-center">
                    <div className="h-24 w-24 bg-blue-50 dark:bg-surface rounded-full flex items-center justify-center mb-2">
                      <iconList.MessageCircleMore size={48} className="text-primary/60 dark:text-accent/60" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-dark-text">Your Messages</h3>
                    <p className="text-gray-500 dark:text-dark-muted text-[15px]">
                      Select a conversation from the list to start chatting with your customers.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* INPUT */}
            {activeChat && (
              <div className="p-3 md:p-4 bg-[#f0f2f5] dark:bg-[#202c33] border-t border-gray-200 dark:border-dark-border shrink-0">
                <div className="flex items-end gap-2 max-w-4xl mx-auto">
                  <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-3xl flex items-center px-5 py-0.5 border-2 border-transparent focus-within:border-transparent transition-colors shadow-sm">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        if (!activeChat?._id) return;
                        socket.emit("typing", activeChat._id);
                        if (typingTimeoutRef.current)
                          clearTimeout(typingTimeoutRef.current);
                        typingTimeoutRef.current = setTimeout(() => {
                          socket.emit("stopTyping", activeChat._id);
                        }, 1000);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim()) handleSend();
                      }}
                      placeholder="Type your message..."
                      className="w-full bg-transparent border-none outline-none py-3 text-[15px] text-gray-800 dark:text-[#d1d7db] placeholder-gray-500 dark:placeholder-gray-400 "
                    />
                  </div>
                  <button
                    onClick={() => { if (input.trim()) handleSend() }}
                    disabled={!input.trim()}
                    className={`h-[48px] w-[48px] md:h-[50px] md:w-[50px] shrink-0 rounded-full flex items-center justify-center transition-all duration-200 ${input.trim()
                      ? "bg-primary dark:bg-accent text-white dark:text-main-bg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer"
                      : "bg-gray-200 dark:bg-[#2a3942] text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <iconList.Send size={20} className="ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
