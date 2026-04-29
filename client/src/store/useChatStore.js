import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useChatStore = create((set, get) => ({
    chats: [],
    messages: [],
    chatLoading: false,
    messageLoading: false,

    getChats: async (endpoint = "/api/owner/owner-chats") => {
        try {
            set({chatLoading : true})
            const { data } = await axiosInstance.get(endpoint);
            if (data.success) {
                set({ chats: data.chats });
                set({chatLoading: false})
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch chats");
        }
    },

    getMessages: async (chatId) => {
        try {
            set({messageLoading:true});
            const { data } = await axiosInstance.get("/api/chat/get-messages", {
                params: { chatId },
            });
            if (data.success) {
                set({ messages: data.messages });
                set({messageLoading :false})
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

    createChat: async (userId, ownerId, carId) => {
        try {
            const { data } = await axiosInstance.post("/api/chat/create-chat", {
                userId,
                ownerId,
                carId,
            });
            if (data.success) {
                return data.chatId;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to create chat");
            return null;
        }
    },

    sendUserMessage: async (chatId, userRole, text, socketInstance) => {
        if (!text) return toast.error("Please enter a message!");
        if (!text.trim()) return;
        if (!chatId) return toast.error("Chat not ready");

        const temp = {
            _id: Date.now(),
            senderRole: userRole,
            message: text,
            createdAt: new Date().toISOString(),
        };

        set((state) => ({ messages: [...state.messages, temp] }));

        try {
            const { data } = await axiosInstance.post("/api/chat/send-message", {
                chatId,
                from: userRole,
                text,
            });
            if (data.success) {
                socketInstance.emit("sendMessage", {
                    chatId,
                    message: data.data.message,
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to send message");
        }
    },
}));
