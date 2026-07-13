import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import socket from "../../socket.js";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck, X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import Lenis from "lenis";
import { iconList } from "../../assets/assets.jsx";
import { Title as OwnerTitle } from "../../components/owner/Title.jsx";
import { ChatSkeletonList, OwnerChatMessageSkeleton } from "../../components/skeletons";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const SecureResource = ({ src, type, className, onClick, alt, title }) => {
  const [blobUrl, setBlobUrl] = useState('');
  useEffect(() => {
    if (!src) return;
    let active = true;
    let url = '';
    fetch(src)
      .then(r => r.blob())
      .then(blob => {
        if (active) {
          url = URL.createObjectURL(blob);
          setBlobUrl(url);
        }
      })
      .catch(e => {
        console.error("Secure fetch failed:", e);
        if (active) setBlobUrl(src);
      });
    return () => {
      active = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [src]);

  if (type === 'iframe') {
    return blobUrl ? <iframe src={blobUrl} title={title} className={className} /> : <div className={`${className} bg-slate-100 animate-pulse`} />;
  }
  return blobUrl ? <img src={blobUrl} alt={alt} className={className} onClick={onClick} /> : <div className={`${className} bg-slate-100 animate-pulse`} />;
};

const Chats = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const navPrefix = pathname.startsWith("/owner") ? "/owner/chats" : "/chats";

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
    if (userId && chats.length> 0) {
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
  const [attachments, setAttachments] = useState([]);
  const [typingChatId, setTypingChatId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const fileInputRef = useRef(null);

  const typingTimeoutRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const prevMessagesLength = useRef(0);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [pdfLightboxIndex, setPdfLightboxIndex] = useState(null);

  // Collect all image attachments from current chat messages
  const chatImages = messages
    .flatMap(m => m.attachments || [])
    .filter(att => att.type === 'image');

  const handleImageClick = (url) => {
    const index = chatImages.findIndex(img => img.url === url);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  // Collect all PDF attachments from current chat messages
  const chatPDFs = messages
    .flatMap(m => m.attachments || [])
    .filter(att => att.type !== 'image');

  const handlePdfClick = (url) => {
    const index = chatPDFs.findIndex(pdf => pdf.url === url);
    if (index !== -1) {
      setPdfLightboxIndex(index);
    }
  };

  // Keyboard navigation for image lightbox in owner panel
  useEffect(() => {
    if (lightboxIndex === null || chatImages.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft" && chatImages.length > 1) {
        setLightboxIndex((prev) => (prev === 0 ? chatImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && chatImages.length > 1) {
        setLightboxIndex((prev) => (prev === chatImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, chatImages.length]);

  // Keyboard navigation for PDF lightbox in owner panel
  useEffect(() => {
    if (pdfLightboxIndex === null || chatPDFs.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setPdfLightboxIndex(null);
      } else if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && chatPDFs.length > 1) {
        setPdfLightboxIndex((prev) => (prev === 0 ? chatPDFs.length - 1 : prev - 1));
      } else if ((e.key === "ArrowRight" || e.key === "ArrowDown") && chatPDFs.length > 1) {
        setPdfLightboxIndex((prev) => (prev === chatPDFs.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pdfLightboxIndex, chatPDFs.length]);

  // Local Lenis instance for smooth chat list scrolling in owner panel
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const content = container.firstElementChild;
    if (!content) return;

    const lenisInstance = new Lenis({
      wrapper: container,
      content: content,
      smoothWheel: true,
      lerp: 0.08,
      duration: 1.2,
    });

    let rafId;
    function raf(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    container.__lenis = lenisInstance;

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      container.__lenis = null;
    };
  }, [activeChat?._id]); // Re-initialize when active chat changes to hook onto the new DOM wrapper

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isInitialLoad = prevMessagesLength.current === 0 && messages.length > 0;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
      if (isInitialLoad || isNearBottom) {
        if (container.__lenis) {
          container.__lenis.scrollTo("bottom", {
            immediate: isInitialLoad,
            force: true
          });
        } else {
          container.scrollTo({ top: container.scrollHeight, behavior: isInitialLoad ? "auto" : "smooth" });
        }
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

  const formatDateDivider = (date) => {
    const msgDate = new Date(date);
    const now = new Date();
    const isToday = msgDate.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = msgDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return msgDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const groupMessagesByDay = (list) => {
    const groups = [];
    (list || []).forEach((m, idx) => {
      const dateStr = new Date(m.createdAt).toDateString();
      let group = groups.find(g => g.dateStr === dateStr);
      if (!group) {
        group = {
          dateStr,
          createdAt: m.createdAt,
          messages: []
        };
        groups.push(group);
      }
      group.messages.push({ ...m, globalIndex: idx });
    });
    return groups;
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


  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'pdf'
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = null;
  };

  const removeAttachment = (index) => {
    setAttachments(prev => {
      const newArr = [...prev];
      if (newArr[index].preview) URL.revokeObjectURL(newArr[index].preview);
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return;
    const text = input;
    const currentAttachments = [...attachments];
    setInput("");
    setAttachments([]);
    await sendMessage(activeChat, user.role, text, socket, currentAttachments);
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
    if (activeChat?._id && messages.length> 0) {
      const hasUnread = messages.some(m => m.senderRole !== user.role && !m.seenByReceiver);
      if (hasUnread)
        socket.emit("markAsRead", { chatId: activeChat._id, role: user.role });
    }
  }, [activeChat?._id, messages]);

  useEffect(() => {
    const handleMessagesRead = ({ chatId }) => {
      if (chatId === activeChat?._id)
        setMessages(prev => (prev || []).map(m => m.senderRole === user.role ? { ...m, seenByReceiver: true } : m));
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



  const filteredChats = chats.filter(chat => {
    const other = getOtherUser(chat);
    return other?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleInputFocus = () => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 150);
  };

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleViewportResize = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
          }
        }, 100);
      }
    };

    window.visualViewport.addEventListener("resize", handleViewportResize);
    window.visualViewport.addEventListener("scroll", handleViewportResize);

    return () => {
      window.visualViewport.removeEventListener("resize", handleViewportResize);
      window.visualViewport.removeEventListener("scroll", handleViewportResize);
    };
  }, []);

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
      window.open(url, '_blank');
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-gray-50/30 text-gray-800">

      {/* title  */}
      <div className={`px-4 pt-4 md:px-8 md:pt-6 mb-2 md:mb-4 shrink-0 transition-all ${activeChat ? "hidden md:block" : "block"}`}>
        <OwnerTitle
          title="Messages"
          subTitle="Manage and respond to all customer conversations from one place."
        />
      </div>

      <div className={`flex flex-1 w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white border-t border-gray-200`}>

        {/* CHAT LIST */}
        <div className={`w-full md:w-80 lg:w-90 shrink-0 border-r border-gray-200 flex flex-col bg-white ${activeChat ? "hidden md:flex" : "flex"}`}>
          {/* chat list header  */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 shrink-0 bg-gray-50/50 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!showSearch ? (
                <motion.h2
                  key="title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-bold text-gray-800">
                  Recent Chats
                </motion.h2>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                  <iconList.Search size={16} className="text-gray-400 mr-2" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm"
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
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer">
                <iconList.Search size={20} />
              </button>
            )}
          </div>

          {/* chats list  */}
          <div className="flex-1 overflow-y-auto">
            {chatLoading ?
              [1, 2, 3, 4].map((chat, index) => (
                <ChatSkeletonList key={index} />
              ))
              :
              filteredChats.map((chat) => {
                const other = getOtherUser(chat);
                const isOnline = other?._id ? onlineUsers.includes(other._id) : false;
                const isActive = activeChat?._id === chat._id;

                return (
                  <div
                    key={chat._id}
                    onClick={() => navigate(`${navPrefix}/${other?._id || ""}`)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 transition-colors rounded-xl relative ${isActive ? "bg-primary/20 text-primary" : "hover:bg-gray-100 "}`}>

                    {isActive && (
                      <motion.div className="absolute left-0 top-2 h-13 w-1.5 bg-primary rounded-r" />
                    )}
                    <div className="relative shrink-0">
                      {
                        other?.image ?
                          <img src={other?.image} alt={other?.name} className="h-11 w-11 border-2 border-gray-300 rounded-full aspect-square" />
                          : <>
                            <iconList.CircleUser size={46} strokeWidth={1.5} className={isActive ? "text-primary" : "text-gray-400"} />
                          </>
                      }
                      <span
                        className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <div className={`font-semibold truncate text-[15px] text-gray-900 isolate ${chat.lastMessage && !chat.lastMessage.seenByReceiver && chat.lastMessage.senderRole !== user.role ? "text-primary" : ""}`}>
                          {other?.name || "Unknown"}
                        </div>
                        {chat.lastMessage && (
                          <span className="text-[11px] font-medium text-gray-400 shrink-0 ml-2">
                            {formatShortTime(chat.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <div className="text-[13px] text-gray-500 overflow-hidden line-clamp-1 pr-2">
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
          <div className={`flex-1 ${activeChat ? "flex" : "hidden md:block"}`}>
            <OwnerChatMessageSkeleton />
          </div>
        ) : (
          <div className={`flex flex-col flex-1 bg-slate-50 ${activeChat ? "flex" : "hidden md:flex"}`}>

            {/* HEADER */}
            {activeChat ? (
              <div className="h-16 flex items-center gap-3 px-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm z-10 shrink-0">
                <button
                  onClick={() => navigate(navPrefix)}
                  className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors active:scale-95 cursor-pointer">
                  <iconList.ArrowLeft size={18} />
                </button>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    {
                      getOtherUser(activeChat)?.image ?
                        <img src={getOtherUser(activeChat)?.image} alt={getOtherUser(activeChat)?.name} className="h-11 w-11 border-2 border-gray-300 rounded-full aspect-square" />
                        : <>
                          <iconList.CircleUser size={46} strokeWidth={1.5} className={activeChat ? "text-primary" : "text-gray-400"} />
                        </>
                    }
                    {activeChat && onlineUsers.includes(getOtherUser(activeChat)?._id) && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] text-gray-900 leading-tight">
                      {getOtherUser(activeChat)?.name || "Unknown User"}
                    </span>
                    {typingChatId ? (
                      <span className="text-green-500 text-[12px] italic font-medium mt-0.5">
                        typing...
                      </span>
                    ) : (
                      <span className="text-[12px] text-gray-500 mt-0.5">
                        {onlineUsers.includes(getOtherUser(activeChat)?._id) ? "Online" : "Offline"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-16 flex items-center px-6 bg-white border-b border-gray-200 shrink-0">
                <h2 className="text-lg font-bold text-gray-800">Chat Preview</h2>
              </div>
            )}

            {/* MESSAGES */}
            <div className="flex-1 min-h-0 relative">
              {activeChat ? (
                <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto custom-scrollbar chat-pattern-bg">
                  {/* Spacer to push messages to bottom when there are few of them */}
                  <div className="flex flex-col min-h-full">
                    <div className="flex-1" />
                    <div className="p-3 md:p-4 flex flex-col">
                      <AnimatePresence initial={false}>
                        {groupMessagesByDay(messages).map((group) => (
                          <div key={group.dateStr} className="flex flex-col relative w-full pt-2 pb-1">
                            {/* Sticky Date Divider */}
                            <div className="sticky top-2 z-20 mx-auto w-fit px-3 py-1 bg-white text-slate-600 text-[11.5px] font-medium rounded-lg border border-slate-200 shadow-xs select-none">
                              {formatDateDivider(group.createdAt)}
                            </div>

                            {/* Messages of the day */}
                            {group.messages.map((m) => {
                              const isMe = m.senderRole === user.role;
                              const showTail = m.globalIndex === 0 || messages[m.globalIndex - 1]?.senderRole !== m.senderRole;
                              return (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  key={m._id}
                                  className={`relative max-w-[85%] md:max-w-[70%] w-fit px-3 py-1.5 text-[13px] font-normal leading-snug wrap-break-words transition-all hover:shadow-md ${isMe
                                    ? `ml-auto bg-[#dbeafe] text-slate-900 ${showTail ? "rounded-lg rounded-tr-none mt-2.5" : "rounded-lg mt-[3px]"}`
                                    : `bg-white text-slate-900 border border-slate-100/60 ${showTail ? "rounded-lg rounded-tl-none mt-2.5" : "rounded-lg mt-[3px]"}`
                                    }`}
                                  style={{ minWidth: isMe ? "75px" : "60px" }}>
                                  {showTail && isMe && (
                                    <div className="absolute top-0 -right-1.5 w-[8px] h-[10px] text-[#dbeafe] fill-current">
                                      <svg viewBox="0 0 19 15" className="w-full h-full">
                                        <path d="M19 0H0v12.2c0 2.2 2.6 3.3 4.2 1.8L19 0z" />
                                      </svg>
                                    </div>
                                  )}
                                  {showTail && !isMe && (
                                    <div className="absolute top-0 -left-1.5 w-[8px] h-[10px] text-white fill-current drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                                      <svg viewBox="0 0 19 15" className="w-full h-full">
                                        <path d="M0 0h19L4.2 14C2.6 15.5 0 14.4 0 12.2V0z" />
                                      </svg>
                                    </div>
                                  )}
                                  {m.attachments && m.attachments.length > 0 && (
                                    <div className={`flex flex-col gap-2 mb-2 ${m.attachments.length > 1 ? "grid grid-cols-2" : ""}`}>
                                      {m.attachments.map((att, idx) => (
                                        <div key={idx} className={`group relative overflow-hidden ${att.type === 'image' ? 'rounded-lg border border-black/5 shadow-sm bg-black/5' : 'rounded-xl mt-1'}`}>
                                          {att.type === 'image' ? (
                                            <>
                                              <SecureResource
                                                src={att.url}
                                                alt="attachment"
                                                className="md:max-h-48 max-w-45 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                                onClick={() => handleImageClick(att.url)}
                                              />
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDownload(att.url, att.name || `image_${idx}.jpg`);
                                                }}
                                                className="absolute top-0 right-0 h-8 w-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 shadow-lg backdrop-blur-sm cursor-pointer">
                                                <iconList.Download size={16} />
                                              </button>
                                            </>
                                          ) : (
                                            <div 
                                              onClick={() => handlePdfClick(att.url)}
                                              className="w-[200px] md:w-[260px] flex items-center justify-between p-2 bg-black/5 hover:bg-black/10 transition-colors cursor-pointer border border-white/20 rounded-xl"
                                            >
                                              <div className="flex items-center gap-2.5 text-[13px] text-inherit no-underline min-w-0">
                                                <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-white/80 rounded-xl">
                                                  <iconList.FileText className="text-red-500 drop-shadow-sm" size={22} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                  <span className="font-bold truncate text-[12px] text-slate-800">{att.name || "Document.pdf"}</span>
                                                  <span className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">{att.type}</span>
                                                </div>
                                              </div>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDownload(att.url, att.name || "document.pdf");
                                                }}
                                                className="h-8 w-8 shrink-0 flex items-center justify-center text-slate-500 hover:text-slate-800 bg-white/50 hover:bg-white/80 rounded-full transition-all cursor-pointer z-10"
                                                title="Download">
                                                <iconList.Download size={16} />
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {m.message && <p className={`whitespace-pre-wrap leading-tight ${isMe ? "pr-[46px]" : "pr-[32px]"}`}>{m.message}</p>}
                                  <div className={`absolute bottom-0.5 right-1.5 flex items-center gap-0.5 text-[9px] font-medium ${isMe ? "text-blue-900/50" : "text-gray-400"}`}>
                                    <span>{formatMessageTime(m.createdAt).split('•').pop().trim()}</span>
                                    {isMe && (
                                      <span className="opacity-80">
                                        {m.status === 'sending' ? (
                                          <iconList.Clock size={9} className="text-blue-400 animate-pulse" />
                                        ) : m.seenByReceiver ? (
                                          <CheckCheck size={11} className="text-blue-600" />
                                        ) : m.delivered ? (
                                          <CheckCheck size={11} className="text-gray-400" />
                                        ) : (
                                          <Check size={11} className="text-gray-400" />
                                        )}
                                      </span>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-white">
                  <div className="flex flex-col items-center gap-4 max-w-xs text-center">
                    <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                      <iconList.MessageCircleMore size={48} className="text-primary/60" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Your Messages</h3>
                    <p className="text-gray-500 text-[15px]">
                      Select a conversation from the list to start chatting with your customers.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* INPUT */}
            {activeChat && (
              <div className="p-3 md:p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 shrink-0 shadow-lg">
                {/* ATTACHMENT PREVIEW */}
                {attachments.length> 0 && (
                  <div className="flex gap-3 mb-3 max-w-4xl mx-auto overflow-x-auto pb-2 scrollbar-hide">
                    <AnimatePresence>
                      {attachments.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white group">
                          {file.type === 'image' ? (
                            <img src={file.preview} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center p-2 bg-red-50">
                              <iconList.FileText className="text-red-500 mb-1" size={24} />
                              <span className="text-[10px] font-medium truncate w-full text-center px-1">{file.name}</span>
                            </div>
                          )}
                          <button
                            onClick={() => removeAttachment(index)}
                            className="absolute top-1 right-1 h-6 w-6 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100 cursor-pointer scale-90 hover:scale-100">
                            <iconList.X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
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
                    className="h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-all active:scale-95 cursor-pointer border border-slate-200/50 shadow-sm">
                    <iconList.Paperclip size={20} />
                  </button>

                  <div className="flex-1 h-12 bg-slate-50 hover:bg-slate-100/60 focus-within:bg-white rounded-2xl flex items-center px-4 border-2 border-slate-200 focus-within:border-primary/70 focus-within:ring-3 focus-within:ring-primary/50 transition-all duration-200 shadow-inner">
                    <input
                      type="text"
                      value={input}
                      onFocus={handleInputFocus}
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
                        if (e.key === "Enter") handleSend();
                      }}
                      placeholder="Type your message..."
                      className="w-full bg-transparent border-none outline-none h-full text-[15px] text-gray-800 placeholder-gray-500"
                    />
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!input.trim() && attachments.length === 0}
                    className={`h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-200 ${input.trim() || attachments.length> 0
                      ? "bg-linear-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50"
                      }`}>
                    <iconList.Send size={18} className="ml-0.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
      {/* Image-only Lightbox Modal with Slider controls */}
      {lightboxIndex !== null && chatImages.length > 0 && (
        <div 
          className="fixed inset-0 z-[999] bg-slate-50/98 backdrop-blur-lg flex flex-col items-center justify-center select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 p-2.5 rounded-full border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer z-[1000] flex items-center justify-center active:scale-95"
          >
            <X size={20} />
          </button>

          {/* Left Arrow */}
          {chatImages.length > 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === 0 ? chatImages.length - 1 : prev - 1));
              }}
              className="absolute left-2 md:left-8 text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white p-2 md:p-3 rounded-full border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer z-[1000] flex items-center justify-center active:scale-95 scale-90 md:scale-100"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Main Image Container */}
          <div 
            className="relative max-w-full px-4 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <SecureResource 
              src={chatImages[lightboxIndex].url} 
              alt={chatImages[lightboxIndex].name || "Chat image"} 
              className="max-w-[85vw] max-h-[48vh] md:max-h-[60vh] object-contain rounded-xl shadow-xl border-4 border-white transition-all duration-300"
            />
            
            {/* Caption / Details */}
            <div className="mt-4 text-center flex flex-col items-center gap-1.5">
              <span className="text-slate-500 text-[10px] font-semibold bg-slate-200/60 px-2.5 py-0.5 rounded-full w-fit">
                {lightboxIndex + 1} / {chatImages.length}
              </span>
              {chatImages[lightboxIndex].name && (
                <p className="text-slate-800 text-[11px] md:text-sm font-semibold truncate max-w-[70vw] md:max-w-md">
                  {chatImages[lightboxIndex].name}
                </p>
              )}
            </div>

            {/* Thumbnail Strip */}
            {chatImages.length > 1 && (
              <div className="mt-5 flex flex-row gap-2 overflow-x-auto max-w-[80vw] md:max-w-[50vw] px-2.5 py-1.5 bg-white/40 border border-slate-200/40 rounded-2xl shadow-inner scrollbar-none items-center justify-start md:justify-center">
                {chatImages.map((img, idx) => {
                  const isActive = idx === lightboxIndex;
                  return (
                    <SecureResource
                      key={idx}
                      src={img.url}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(idx);
                      }}
                      className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl object-cover cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "border-2 border-primary scale-105 opacity-100 shadow-md ring-2 ring-primary/20"
                          : "border border-slate-200/60 opacity-40 blur-[1px] hover:blur-none hover:opacity-90"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {chatImages.length > 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev === chatImages.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 md:right-8 text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white p-2 md:p-3 rounded-full border border-slate-200 shadow-sm transition-all duration-200 cursor-pointer z-[1000] flex items-center justify-center active:scale-95 scale-90 md:scale-100"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>
      )}

      {/* PDF-only Full-screen Lightbox Modal with Left Sidebar list */}
      {pdfLightboxIndex !== null && chatPDFs.length > 0 && (
        <div className="fixed inset-0 z-[999] bg-slate-100 flex flex-col md:flex-row select-none">
          {/* Desktop Left Sidebar: full height, left side */}
          <div className="hidden md:flex w-72 h-full bg-white border-r border-slate-200 flex-col shrink-0">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">All PDFs in Chat</h3>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {chatPDFs.length} files
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 custom-scrollbar">
              {chatPDFs.map((pdf, idx) => {
                const isActive = idx === pdfLightboxIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setPdfLightboxIndex(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-red-50 border-red-200 text-red-700 shadow-xs"
                        : "bg-slate-50/50 hover:bg-slate-100 border-slate-100 text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <FileText className={`w-5 h-5 shrink-0 ${isActive ? "text-red-600" : "text-red-400"}`} />
                    <span className="text-[11px] font-semibold truncate flex-1 leading-tight">
                      {pdf.name || `Document_${idx + 1}.pdf`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Top Strip: horizontally scrollable, full width */}
          <div className="flex md:hidden w-full bg-white border-b border-slate-200 flex-col shrink-0 p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800 text-xs">PDF Documents</h3>
              <span className="text-[9px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {pdfLightboxIndex + 1} / {chatPDFs.length}
              </span>
            </div>
            
            <div className="flex flex-row gap-2 overflow-x-auto scrollbar-none py-1">
              {chatPDFs.map((pdf, idx) => {
                const isActive = idx === pdfLightboxIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setPdfLightboxIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer shrink-0 max-w-[160px] ${
                      isActive
                        ? "bg-red-50 border-red-200 text-red-700 shadow-xs"
                        : "bg-slate-50/50 border-slate-100 text-slate-600"
                    }`}
                  >
                    <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-red-600" : "text-red-400"}`} />
                    <span className="text-[9px] font-semibold truncate max-w-[100px]">
                      {pdf.name || `Doc ${idx + 1}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Preview Panel (main viewport) */}
          <div className="flex-1 h-full flex flex-col min-w-0 bg-slate-100">
            {/* Header bar */}
            <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <FileText className="w-5 h-5 text-red-500 shrink-0" />
                <h4 className="font-semibold text-slate-800 text-xs md:text-sm truncate">
                  {chatPDFs[pdfLightboxIndex].name || "Document.pdf"}
                </h4>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(chatPDFs[pdfLightboxIndex].url, chatPDFs[pdfLightboxIndex].name || "document.pdf")}
                  className="text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center"
                  title="Download PDF"
                >
                  <iconList.Download className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                
                {/* Close Button */}
                <button
                  onClick={() => setPdfLightboxIndex(null)}
                  className="text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center"
                  title="Close Viewer"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
            
            {/* PDF Viewport */}
            <div className="flex-1 p-2 md:p-4 min-h-0">
              <SecureResource
                type="iframe"
                src={chatPDFs[pdfLightboxIndex].url}
                title={chatPDFs[pdfLightboxIndex].name || "PDF Preview"}
                className="w-full h-full rounded-xl shadow-md border border-slate-200 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;

