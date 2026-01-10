import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import socket from "../../socket.js";

const Chats = () => {
  const { OwnerTitle, axios, toast, user, iconList } = useAppContext();

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingChatId, setTypingChatId] = useState(null);


  const token = localStorage.getItem("token");

  const getChats = async () => {
    try {
      const { data } = await axios.get("/api/owner/owner-chats", {
        headers: { Authorization: token },
      });

      if (data.success) {
        setChats(data.chats);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const getOtherUser = (chat) => {
    return chat.user._id === user._id ? chat.owner : chat.user;
  };

  const getMessages = async (chatId) => {
    try {
      const { data } = await axios.get("/api/chat/get-messages", {
        params: { chatId },
        headers: { Authorization: token },
      });

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("FRONTEND SOCKET CONNECTED:", socket.id);
    });
    return () => socket.off("connect");
  }, []);

  useEffect(() => {
    if (!activeChat?._id) return;
    console.log("JOINING CHAT: ", activeChat._id);
    getMessages(activeChat._id);
    socket.emit("joinChat", activeChat._id);
  }, [activeChat]);

  useEffect(() => {
    socket.on("userTyping", (chatId) => {
      if (chatId === activeChat?._id) setTypingChatId(chatId);
    });
    socket.on("userStopTyping", (chatId) => {
      if (chatId === activeChat?._id) setTypingChatId(null);
    });
    return () => {
      socket.off("userTyping");
      socket.off("userStopTyping");
    };
  }, [activeChat]);


  useEffect(() => {
    socket.on("receiveMessage", ({ message }) => {
      console.log("RECEIVED MESSAGE:", message);
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("receiveMessage");
  }, []);


  const sendMessage = async () => {
    if (!input.trim() || !activeChat) return;
    const tempMessage = {
      _id: Date.now(),
      senderRole: user.role,
      message: input,
    };
    setMessages((prev) => [...prev, tempMessage]);
    setInput("");
    try {
      const { data } = await axios.post(
        "/api/chat/send-message",
        {
          chatId: activeChat._id,
          from: user.role,
          text: tempMessage.message,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (data.success) {
        socket.emit("sendMessage", {
          chatId: activeChat._id,
          message: data.message,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 pt-10 flex-1">
      <OwnerTitle
        title="All Chats"
        subTitle="Manage all chats with customers in one place."
      />

      <div className="h-[80vh] flex bg-gray-100 rounded-xl overflow-hidden">

        {/* LEFT CHAT LIST */}
        <div className="w-[30%] bg-white border-r overflow-y-auto">
          <h2 className="p-4 font-bold border-b">Chats</h2>

          {chats.map((chat) => {
            const otherUser = getOtherUser(chat);

            return (
              <div
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`flex gap-3 p-4 cursor-pointer border-b
                hover:bg-gray-100
                ${activeChat?._id === chat._id ? "bg-gray-200" : ""}`}
              >
                <div>
                  <iconList.CircleUser size={40} />
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{otherUser.name}</div>
                  {typingChatId === activeChat?._id && (
                    <div className="text-sm text-gray-500 italic px-4 pb-1">
                      typing...
                    </div>
                  )}
                  <div className="text-sm text-gray-500 truncate">
                    {chat.lastMessage?.message || "No messages yet"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT CHAT AREA */}
        <div className="w-[70%] flex flex-col bg-white">

          {/* HEADER */}
          <div className="p-4 border-b font-semibold">
            {activeChat
              ? getOtherUser(activeChat).name
              : "Select a chat"}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`max-w-fit px-4 py-2 rounded-xl
                ${m.senderRole === user.role
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                  }`}
              >
                {m.message}
              </div>
            ))}
          </div>

          {/* INPUT */}
          {activeChat && (
            <div className="p-4 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (!activeChat?._id) return;
                  socket.emit("typing", activeChat._id);
                  if (window.typingTimeout) {
                    clearTimeout(window.typingTimeout);
                  }
                  window.typingTimeout = setTimeout(() => {
                    socket.emit("stopTyping", activeChat._id);
                  }, 800);
                }
                }
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-5 rounded-full"
              >
                ➤
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
