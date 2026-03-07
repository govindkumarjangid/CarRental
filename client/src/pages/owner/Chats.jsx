import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import socket from "../../socket.js";
import {
  iconList,
  ScrollToBottom,
  Check,
  CheckCheck,
  OwnerTitle,
  useEffect, useRef, useState
} from "../../index.js";

const Chats = () => {

  const { user } = useAuthStore();
  const {
    chats,
    messages,
    getChats,
    getMessages,
    sendMessage,
    setMessages,
  } = useChatStore();

  const [activeChat, setActiveChat] = useState(null);
  const [input, setInput] = useState("");
  const [typingChatId, setTypingChatId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const typingTimeoutRef = useRef(null);


  const getOtherUser = (chat) => {
    return chat.user._id === user._id ? chat.owner : chat.user;
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
    const handleReceive = (message) => {
      if (message.chatId === activeChat?._id) {
        setMessages((prev) => [
          ...prev,
          message,
        ]);
        if (message.chatId) getMessages(activeChat?._id);
      };
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


  return (
    <div className="pt-9 md:pt-10 flex-1 flex flex-col overflow-hidden dark:bg-main-bg dark:text-dark-text">

      {/* title  */}
      <div className="pl-4 md:pl-10 mb-8">
        <OwnerTitle
          title="All Chats"
          subTitle="Manage all chats with customers. View and respond to all customer conversations from one place. Stay connected with customers"
        />
      </div>

      <div className="flex flex-1 border-t border-b border-gray-400 dark:border-dark-border  overflow-hidden min-h-[64dvh] max-h-[64dvh]">

        <div className={`w-full md:w-[28%] border-r border-gray-400 dark:border-dark-border bg-white dark:bg-second-bg overflow-y-auto overflow-x-hidden ${activeChat ? "hidden md:block" : "block"}`}
        >
          {/* chat title  */}
          <h2 className="pl-4 md:pl-6 py-4 font-bold border-b border-gray-400 dark:border-dark-border text-gray-600 dark:text-dark-text">Chats</h2>

          {/* chats list  */}
          {chats.map((chat) => {
            const other = getOtherUser(chat);
            const isOnline = onlineUsers.includes(chat.user._id);
            return (
              <div
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`flex gap-3 pl-4 md:px-6 py-3 cursor-pointer border-b border-gray-400 dark:border-dark-border active:scale-101 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-surface ${activeChat?._id === chat._id ? "bg-gray-100 dark:bg-surface" : ""}`}
              >
                <div className="relative">
                  <iconList.CircleUser size={36} className="text-gray-500" />
                  <span
                    className={`absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white dark:border-second-bg ${isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold truncate dark:text-dark-text">{other.name}</div>
                  <div className="text-xs text-gray-500 dark:text-dark-muted overflow-hidden line-clamp-1">
                    {chat.lastMessage?.message || "No messages yet"}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* CHAT AREA */}
        <div
          className={`flex flex-col flex-1 ${activeChat ? "block" : "hidden md:flex"}`}
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-400 dark:border-dark-border text-gray-600 dark:text-dark-text">
            {!activeChat && <div>
              <h2 className="text-md font-semibold py-2">Select Chat</h2>
            </div>
            }
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden text-xl text-gray-500 cursor-pointer active:scale-90"
            >
              <iconList.ArrowLeft size={20} />
            </button>
            <span className="font-semibold flex items-center gap-2">
              {activeChat ? <>
                <iconList.CircleUser size={40} className="text-gray-500" />
                <div className="flex flex-col">
                  <span>{getOtherUser(activeChat).name}</span>
                  {
                    typingChatId && (
                      <span className=" text-green-500 text-xs italic font-light">
                        Typing...
                      </span>
                    )
                  }
                </div>
              </> : ""}
            </span>
          </div>

          {/* MESSAGES */}

          <div className="flex flex-col h-full pl-4">
            {activeChat ? (
              <ScrollToBottom className="h-[calc(100vh-430px)] sm:h-[calc(100vh-390px)] md:h-[calc(100vh-380px)] space-y-3">
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className={`relative max-w-[75%] w-fit px-3 py-1.5 text-xs md:text-base rounded-2xl leading-snug wrap-break-words ${m.senderRole === user.role
                      ? "ml-auto bg-primary text-gray-100 rounded-br-sm mr-2 my-1" : "bg-white dark:bg-card-bg text-gray-900 dark:text-dark-text rounded-bl-sm border border-gray-200 dark:border-dark-border my-1"
                      }`}
                  >
                    <p>{m.message}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70">
                      <span>{formatMessageTime(m.createdAt)}</span>

                      {m.senderRole === user.role && (
                        <>
                          {m.seenByReceiver ? (
                            <CheckCheck size={14} className="text-blue-400" />
                          ) : m.delivered ? (
                            <CheckCheck size={14} className="text-gray-300" />
                          ) : (
                            <Check size={14} className="text-gray-300" />
                          )}
                        </>
                      )}
                    </div>
                  </div>

                ))}
              </ScrollToBottom>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <iconList.MessageCircleMore size={100} className="text-gray-400" />
                  <p className="text-gray-500 dark:text-dark-muted text-sm text-center">
                    Select a chat to start messaging with your customers
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          {activeChat && (
            <div className="p-3 border-t border-gray-400 dark:border-dark-border flex gap-2 bg-white dark:bg-second-bg">
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
                  e.key == "Enter" && handleSend();
                }}
                placeholder="Type a message..."
                className="px-3 flex py-2.5 mt-1 w-full	border border-gray-400 dark:border-dark-border rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50 dark:bg-card-bg dark:text-dark-text dark:focus:border-accent"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 dark:bg-accent text-white px-5 rounded-md active:scale-90 cursor-pointer transition-transform duration-300"
              >
                <iconList.MousePointer2 className="rotate-135" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Chats;
