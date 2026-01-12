import { useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CarDetailsSkeleton from "../components/car/CarDetailsSkeleton";
import ChatMessagesSkeleton from "../components/chat/ChatMessagesSkeleton";
import socket from '../socket.js';
import ScrollToBottom from "react-scroll-to-bottom";

const ChatPage = () => {

  const {
    currency,
    axios,
    toast,
    user,
    iconList,
    loading,
    setLoading
  } = useAppContext();
  const { id } = useParams();
  const messagesEndRef = useRef(null);
  const [owner, setOwner] = useState("");
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const token = localStorage.getItem('token');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [carDetails, setCarDetails] = useState({});
  const [ownerDetails, setOwnerDetails] = useState({});
  const [scrollOne, setScrollOne] = useState("");

  const formattedMessages = messages.map((m) => ({
    id: m._id,
    from: m.senderRole,
    text: m.message,
  }));

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
  }, [chatId]);


  useEffect(() => {
    socket.on("receiveMessage", ({ message }) => {
      console.log(message)
      console.log("RECEIVED MESSAGE:", message);
      setMessages((prev) => [...prev, message]);
      if (message && chatId) getMessages();
      if (message) setScrollOne(message);
    });
    return () => {
      socket.off("receiveMessage");
      setScrollOne(" ")
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


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [scrollOne]);




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
                  <img
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
                    src={ownerDetails?.image}
                    alt="owner"
                  />
                  <div>
                    <div className="font-semibold text-sm md:text-base">
                      {ownerDetails?.name} (Owner)
                    </div>

                    <div className="text-green-500 text-xs md:text-sm">
                      {isTyping ? (
                        <span>Typing...</span>
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
                  className="flex-1 overflow-y-auto overflow-x-hidden p-3"
                  followButtonClassName="hidden"
                >
                  {formattedMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`relative w-fit max-w-[75%] px-3 py-2 text-sm md:text-base rounded-2xl leading-snug blue-thumb-scrollbar wrap-break-words shadow-sm ${m.from === "user" ? "ml-auto bg-primary text-gray-100 rounded-br-sm my-1.5" : "bg-white text-gray-900 rounded-bl-sm border border-gray-200 my-1.5"
                        }`}>
                      {m.text}
                    </div>
                  ))}
                </ScrollToBottom>
              </div>


              {/* INPUT BOX */}
              <div className="shrink-0 p-3 md:p-4 border-t border-gray-300 flex gap-2">
                <input
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