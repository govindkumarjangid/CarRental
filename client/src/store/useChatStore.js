import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useChatStore = create((set, get) => ({
    chats: [],
    messages: [],
    chatLoading: false,

    getChats: async (endpoint = "/api/owner/owner-chats") => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = token;
            }
            const { data } = await axiosInstance.get(endpoint);
            if (data.success) {
                set({ chats: data.chats });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch chats");
        }
    },

    getMessages: async (chatId) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = token;
            }
            const { data } = await axiosInstance.get("/api/chat/get-messages", {
                params: { chatId },
            });
            if (data.success) {
                set({ messages: data.messages });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch messages");
        }
    },

    setMessages: (updater) => {
        set((state) => ({
            messages: typeof updater === "function" ? updater(state.messages) : updater,
        }));
    },

    sendMessage: async (activeChat, userRole, text, socket) => {
        if (!text) return toast.error("Please Enter the message!");
        if (!text.trim() || !activeChat) return;

        const temp = {
            _id: Date.now(),
            senderRole: userRole,
            message: text,
            createdAt: new Date().toISOString(),
        };

        set((state) => ({ messages: [...state.messages, temp] }));

        try {
            const token = localStorage.getItem("token");
            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] = token;
            }
            const { data } = await axiosInstance.post("/api/chat/send-message", {
                chatId: activeChat._id,
                from: userRole,
                text: temp.message,
            });

            if (data.success) {
                socket.emit("sendMessage", {
                    chatId: activeChat._id,
                    message: data.data.message,
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to send message");
        }
    },
}));
