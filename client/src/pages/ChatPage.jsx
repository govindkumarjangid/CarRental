import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CarDetailsSkeleton from "../components/car/CarDetailsSkeleton";
import ChatMessagesSkeleton from "../components/chat/ChatMessagesSkeleton";

const ChatPage = () => {

  const {
    currency,
    axios,
    toast,
    user,
    ownerDetails,
    iconList,
    loading,
    setLoading
  } = useAppContext();
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

  const [messages, setMessages] = useState([
    { from: "owner", text: "Hello! How can I help you?" },
    { from: "user", text: "Hi, I’m interested in renting your car." },
    { from: "owner", text: "Sure! When do you need the car?" },
    { from: "user", text: "From this Friday to Sunday." },
    { from: "owner", text: "Got it. The car is available. Let me know if you have any questions." },
    { from: "user", text: "Great! I’ll confirm the dates soon." }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCarDetails();
  }, [id]);


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
                  <div>
                    <div className="font-semibold">{user?.name}</div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={ownerDetails[0]?.image}
                    alt="owner"
                  />
                  <div>
                    <div className="font-semibold">{ownerDetails[0]?.name} (Owner)</div>
                    <h3 className="flex text-md gap-2 text-gray-500">
                      <span>{carDetails?.brand}{" "}{carDetails?.model}</span>
                      <span className="font-semibold">{carDetails?.year}</span>
                    </h3>
                  </div>
                </div>
              </div>
              {/* CHAT BODY */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[70%] px-4 py-2 rounded-xl ${m.from === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {m.text}
                  </div>
                ))}

              </div>
              {/* INPUT BOX */}
              <div className="p-4 border-t border-gray-400 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full border border-gray-400 rounded-full px-4 py-2 outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full"
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