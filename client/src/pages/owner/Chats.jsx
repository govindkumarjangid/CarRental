import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import socket from "../../socket.js";

const Chats = () => {
  const { OwnerTitle, axios, toast, user, iconList } = useAppContext();

  const messagesEndRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingChatId, setTypingChatId] = useState(null);
  const [scrollOne, setScrollOne] = useState(false);

  const typingTimeoutRef = useRef(null);
  const token = localStorage.getItem("token");


  const getChats = async () => {
    try {
      const { data } = await axios.get("/api/owner/owner-chats", {
        headers: { Authorization: token },
      });
      if (data.success) setChats(data.chats);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getMessages = async (chatId) => {
    try {
      const { data } = await axios.get("/api/chat/get-messages", {
        params: { chatId },
        headers: { Authorization: token },
      });
      if (data.success) setMessages(data.messages);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendMessage = async () => {
    if (!input) return toast.error("Please Enter the message!");
    // console.log(input)
    if (!input.trim() || !activeChat) return;
    const temp = {
      _id: Date.now(),
      senderRole: user.role,
      message: input,
    };
    // console.log(temp)
    setMessages((prev) => [...prev, temp]);
    setInput("");
    try {
      const { data } = await axios.post(
        "/api/chat/send-message",
        {
          chatId: activeChat._id,
          from: user.role,
          text: temp.message,
        },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        // console.log(data.data.message)
        socket.emit("sendMessage", {
          chatId: activeChat._id,
          message: data.data.message,
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getOtherUser = (chat) =>
    chat.user._id === user._id ? chat.owner : chat.user;


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
    if (!chats?.length) return;
    chats.forEach((chat) => {
      socket.emit("joinChat", chat._id);
      console.log("OWNER JOINING CHAT:", chat._id);
    });
    return () => {
      chats.forEach((chat) => {
        socket.emit("leaveChat", chat._id);
      });
    };
  }, [chats]);

  useEffect(() => {
    const handleTyping = (incomingChatId) => {
      setTypingChatId(incomingChatId);
    };
    const handleStopTyping = (incomingChatId) => {
      setTypingChatId((prev) =>
        prev === incomingChatId ? null : prev
      );
    };
    socket.on("userTyping", handleTyping);
    socket.on("userStopTyping", handleStopTyping);
    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStopTyping", handleStopTyping);
    };
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log(message)
      if (message.chatId === activeChat?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });
  }, [activeChat?._id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages.length]);




  return (
    <div className="pt-10 flex-1 flex flex-col overflow-hidden">

      {/* title  */}
      <div className="px-6 md:px-10">
        <OwnerTitle
          title="All Chats"
          subTitle="Manage all chats with customers"
        />
      </div>

      <div className="flex flex-1 border-t border-b border-gray-400  overflow-hidden">

        <div className={`w-full md:w-[28%] border-r border-gray-400 bg-white overflow-y-auto overflow-x-hidden ${activeChat ? "hidden md:block" : "block"}`}
        >
          {/* chat title  */}
          <h2 className="px-10 py-4 font-bold border-b border-gray-400 text-gray-600">Chats</h2>

          {/* chats list  */}
          {chats.map((chat) => {
            const other = getOtherUser(chat);
            return (
              <div
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`flex gap-3 px-6 py-3 cursor-pointer border-b border-gray-400
                ${activeChat?._id === chat._id ? "bg-gray-100" : ""}`}
              >
                <iconList.CircleUser size={36} />
                <div className="flex-1">
                  <div className="font-semibold truncate">{other.name}</div>
                  {typingChatId === chat._id && (
                    <div className="text-xs text-green-600">
                      Typing...
                    </div>
                  )}
                  <div className="text-xs text-gray-500 truncate">
                    {chat.lastMessage?.message || "No messages yet"}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* CHAT AREA */}
        <div
          className={`flex flex-col flex-1 bg-white overflow-hidden
          ${activeChat ? "block" : "hidden md:flex"}`}
        >
          {/* HEADER */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-400">
            {!activeChat && <div>
              <h2>Select Chat</h2>
            </div>
            }
            <button
              onClick={() => setActiveChat(null)}
              className="md:hidden text-xl text-gray-500"
            >
              <iconList.ArrowLeft size={20} />
            </button>
            <span className="font-semibold flex items-center gap-2">
              {activeChat ? <>
                <iconList.CircleUser size={24} />
                <span>{getOtherUser(activeChat).name}</span>
              </> : ""}
            </span>
          </div>

          {/* MESSAGES */}

          <div className="">
            {activeChat ? (
              <div className="flex-1 overflow-y-auto max-h-87 min-h-87 p-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className={`max-w-fit px-4 py-2 rounded-md text-sm
                    ${m.senderRole === user.role ? "ml-auto bg-primary text-white" : "bg-gray-200 text-gray-800"
                      }`}>
                    {m.message}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                  <iconList.MessageCircleMore
                    size={100}
                    className="font-light text-gray-400"
                  />
                  <p className="text-gray-500 text-sm text-center">
                    Select a chat to start messaging with your customers
                  </p>
                </div>
              </div>
            )}
          </div>




          {/* INPUT */}
          {activeChat && (
            <div className="p-3 border-t border-gray-400 flex gap-2">
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
                placeholder="Type a message..."
                className="px-3 flex py-2.5 mt-1 w-full	border border-gray-400 rounded-md outline-none	focus:border-primary focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-5 rounded-md active:scale-90 cursor-pointer transition-transform duration-300"
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
