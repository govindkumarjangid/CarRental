import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useAuthStore } from "../store/useAuthStore.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CarDetailsSkeleton from "../components/car/CarDetailsSkeleton.jsx";
import ChatMessagesSkeleton from "../components/chat/ChatMessagesSkeleton.jsx";
import socket from '../socket.js';
import ScrollToBottom from "react-scroll-to-bottom";
import { Check, CheckCheck } from "lucide-react";

const ChatPage = () => {

  const {
    axios,
    toast,
    iconList,
  } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [owner, setOwner] = useState("");
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const token = localStorage.getItem('token');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [carDetails, setCarDetails] = useState({});
  const [ownerDetails, setOwnerDetails] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

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

  const fetchUserCarDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user/user-cardetails/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (data.success) {
        setCarDetails(data.car);
        setOwner(data.owner);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnerDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/owner/owner-details/${owner}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (data.success) {
        setOwnerDetails(data.owner);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async () => {
    try {
      const { data } = await axios.post("/api/chat/create-chat",
        {
          userId: user._id,
          ownerId: owner,
          carId: id
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        setChatId(data.chatId);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async () => {
    if (!input) return toast.error("Please enter a message!");
    if (!input.trim()) return;
    if (!chatId) return toast.error("Chat not ready");
    const tempMessage = {
      _id: Date.now(),
      senderRole: user.role,
      message: input,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInput("");
    try {
      const { data } = await axios.post(
        "/api/chat/send-message",
        {
          chatId,
          from: user.role,
          text: input,
        },
        {
          headers: { Authorization: token },
        }
      );

      if (data.success) {
        socket.emit("sendMessage", {
          chatId: chatId,
          message: data.data.message,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await axios.get(`/api/chat/get-messages`, {
        params: { chatId },
        headers: {
          Authorization: token,
        },
      })
      if (data.success) {
        setMessages(data.messages)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

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
    socket.on("receiveMessage", ({ message }) => {
      setMessages((prev) => [...prev, message]);
      if (message && chatId) getMessages();
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  useEffect(() => {
    if (id) fetchUserCarDetails();
  }, [id]);

  useEffect(() => {
    if (owner) fetchOwnerDetails();
  }, [owner]);

  useEffect(() => {
    if (user?._id && owner) createChat();
  }, [user, owner]);

  useEffect(() => {
    if (chatId) getMessages();
  }, [chatId]);


  const isOnline = onlineUsers.includes(ownerDetails._id);
  // console.log(ownerDetails._id)


  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 lg:px-16 xl:px-24
    bg-white h-full overflow-hidden">

      <div className="w-full h-full bg-white flex flex-col md:flex-row overflow-hidden">

        {/* LEFT SIDE */}
        {
          loading ? (<CarDetailsSkeleton />) : (
            <div className="w-full md:w-[30%] border-b md:border-b-0 md:border-r border-gray-300 p-4 md:p-5">
              <h2 className="text-lg font-semibold mb-3">Chat</h2>

              <img
                className="rounded-xl mb-3 w-full h-48 md:h-auto object-cover"
                src={carDetails?.image}
                alt="car"
              />

              <h3 className="flex font-bold text-lg gap-2 flex-wrap">
                <span>{carDetails?.brand} {carDetails?.model}</span>
                <span className="font-semibold">{carDetails?.year}</span>
              </h3>

              <div className="text-sm text-gray-500 mt-1 flex gap-2 items-center flex-wrap">
                <span>{carDetails?.transmission}</span>•
                <span>{carDetails?.fuel_type}</span>•
                <span>{currency}{carDetails?.pricePerDay}/day</span>
              </div>
            </div>
          )
        }

        {/* RIGHT SIDE */}
        {
          loading ? (<ChatMessagesSkeleton />) : (
            <div className="w-full h-[80vh] flex flex-col overflow-hidden">

              {/* HEADER */}
              <div className="shrink-0 border-b border-gray-300 p-3 md:p-4 flex flex-col sm:flex-row gap-3 sm:justify-between">

                {/* USER DETAILS */}
                <div className="flex gap-3 items-center">
                  {user?.image ? (
                    <img
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
                      src={user.image}
                      alt={user?.name}
                    />
                  ) : (
                    <iconList.CircleUser className="w-9 h-9 md:w-10 md:h-10 text-gray-400" />
                  )}
                  <div className="font-semibold text-sm md:text-base">
                    {user?.name}
                  </div>
                </div>

                {/* OWNER DETAILS */}
                <div className="flex gap-3 items-center border-t sm:border-t-0 border-gray-300 pt-4">
                  <div className="relative">
                    <img
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
                      src={ownerDetails?.image}
                      alt="owner"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">
                      {ownerDetails?.name} (Owner)
                    </div>

                    <div className="text-green-500 text-xs md:text-sm">
                      {isTyping ? (
                        <span className="italic">Typing...</span>
                      ) : (
                        <h3 className="flex gap-2 text-gray-500 flex-wrap">
                          <span>{carDetails?.brand} {carDetails?.model}</span>
                          <span className="font-semibold">{carDetails?.year}</span>
                        </h3>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* CHAT BODY */}
              <div className="w-full h-[80vh] flex flex-col overflow-auto">
                <ScrollToBottom
                  className="flex-1 overflow-y-auto overflow-x-hidden pl-4"
                  followButtonClassName="hidden"
                >
                  {messages.map((m) => (
                    // console.log(m),
                    <div
                      key={m._id}
                      className={`relative max-w-[75%] w-fit px-3 py-1.5 text-xs md:text-base rounded-2xl leading-snug wrap-break-words ${m.senderRole === user.role
                        ? "ml-auto bg-primary text-gray-100 rounded-br-sm mr-2 my-1" : "bg-white text-gray-900 rounded-bl-sm border border-gray-200 my-1"
                        }`}
                    >
                      <p>{m.message}</p>

                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] opacity-70">
                        <span>{formatMessageTime(m.createdAt)}</span>

                        {/* TICKS: only for sender */}
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
              </div>


              {/* INPUT BOX */}
              <div className="shrink-0 p-3 md:p-4 border-t border-gray-300 flex gap-2">
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
                    e.key === "Enter" && sendMessage();
                  }}
                  placeholder="Type a message..."
                  className="px-3 py-2.5 w-full border border-gray-300 rounded-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 text-sm md:text-base"
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 md:px-5 rounded-md
                    active:scale-90 transition-transform duration-300 cursor-pointer">
                  <iconList.MousePointer2 className="rotate-135" />
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