import { useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CarDetailsSkeleton from "../components/car/CarDetailsSkeleton";
import ChatMessagesSkeleton from "../components/chat/ChatMessagesSkeleton";
import socket from '../socket.js';

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
    });
    return () => socket.off("receiveMessage");
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
  }, [formattedMessages]);




  return (
    <div className="h-auto max-w-7xl m-auto px-6 md:px-16 lg:px-24 xl:px-32 bg-white">

      <div className="w-full h-full max-h-screen m-auto bg-white flex">

        {/* LEFT SIDE */}
        {
          loading ? (<CarDetailsSkeleton />) : (
            <div className="w-[30%] border-r border-gray-400 p-4">
              <h2 className="text-lg font-semibold mb-3">Chat</h2>
              <img
                className="rounded-xl mb-3"
                src={carDetails?.image}
                alt="car"
              />
              <h3 className="flex font-bold text-lg gap-2">
                <span>{carDetails?.brand}{" "}{carDetails?.model}</span>
                <span className="font-semibold">{carDetails?.year}</span>
              </h3>
              <div className="text-sm text-gray-500 mt-1 flex gap-2 items-center">
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
            <div className="w-[70%] flex flex-col">
              {/* HEADER */}
              <div className="border-b border-gray-400 p-4 flex justify-between">

                {/* user details  */}
                <div className="flex gap-3">
                  {user?.image ? (
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user.image}
                      alt={user?.name}
                    />
                  ) : (
                    <iconList.CircleUser className="w-10 h-10 text-gray-400" />
                  )}
                  <div className="font-semibold">{user?.name}</div>
                </div>

                {/* owner details  */}
                <div className="flex gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={ownerDetails?.image}
                    alt="owner"
                  />

                  {/* car details  */}
                  <div>
                    <div className="font-semibold">{ownerDetails?.name} (Owner)</div>
                    <div className="text-green-500 text-sm">
                      {
                        isTyping ? <span>Typing...</span> : <h3 className="flex text-md gap-2 text-gray-500">
                          <span>{carDetails?.brand}{" "}{carDetails?.model}</span>
                          <span className="font-semibold">{carDetails?.year}</span>
                        </h3>
                      }
                    </div>
                  </div>
                </div>

              </div>

              {/* CHAT BODY */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-96 min-h-96">
                {formattedMessages.map((m) => (
                  <div
                    key={m._id}
                    className={`max-w-fit px-4 py-1.5 rounded-md ${m.from === "user"
                      ? "bg-primary text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {m.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>


              {/* INPUT BOX */}
              <div className="p-4 border-t border-gray-400 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (chatId) {
                      socket.emit("typing", chatId);
                      if (window.typingTimeout) {
                        clearTimeout(window.typingTimeout);
                      }
                      window.typingTimeout = setTimeout(() => {
                        socket.emit("stopTyping", chatId);
                      }, 1000);
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full border border-gray-400 rounded-md px-4 py-2 outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 active:scale-95 hover:bg-blue-700 text-white px-4 rounded-md"
                >
                  ➤
                </button>
              </div>
            </div>)
        }
      </div >
    </div >
  );
};

export default ChatPage;