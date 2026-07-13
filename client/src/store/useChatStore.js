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
            set({ chatLoading: true })
            const { data } = await axiosInstance.get(endpoint);
            if (data.success) {
                set({ chats: data.chats });
                set({ chatLoading: false })
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch chats");
        }
    },

    getMessages: async (chatId) => {
        try {
            set({ messageLoading: true });
            const { data } = await axiosInstance.get("/api/chat/get-messages", {
                params: { chatId },
            });
            if (data.success) {
                set({ messages: data.messages });
                set({ messageLoading: false })
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch messages");
        }
    },

    setMessages: (updater) => {
        set((state) => ({
            messages: typeof updater === "function" ? updater(state.messages || []) : updater,
        }));
    },

    sendMessage: async (activeChat, userRole, text, socket, attachments = []) => {
        if (!text && attachments.length === 0) return toast.error("Please enter a message or select a file!");

        const tempId = Date.now();
        const temp = {
            _id: tempId,
            senderRole: userRole,
            message: text,
            attachments: (attachments || []).map(a => ({
                type: a.type,
                url: a.preview || "",
                name: a.name
            })),
            createdAt: new Date().toISOString(),
            status: 'sending'
        };

        set((state) => ({ messages: [...(state.messages || []), temp] }));

        try {
            let response;
            if (attachments.length > 0) {
                const formData = new FormData();
                formData.append("chatId", activeChat._id);
                formData.append("from", userRole);
                formData.append("text", text);
                attachments.forEach((att) => {
                    formData.append("files", att.file);
                });

                response = await axiosInstance.post("/api/chat/send-message", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await axiosInstance.post("/api/chat/send-message", {
                    chatId: activeChat._id,
                    from: userRole,
                    text: text,
                });
            }

            const { data } = response;

            if (data.success) {
                set((state) => ({
                    messages: (state.messages || []).map(m => m._id === tempId ? data.data : m)
                }));

                socket.emit("sendMessage", {
                    chatId: activeChat._id,
                    message: data.data,
                });
            }
        } catch (err) {
            set((state) => ({
                messages: (state.messages || []).filter(m => m._id !== tempId)
            }));
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

    sendUserMessage: async (chatId, userRole, text, socketInstance, attachments = []) => {
        if (!text && attachments.length === 0) return toast.error("Please enter a message or select a file!");
        if (!chatId) return toast.error("Chat not ready");

        const tempId = Date.now();
        const temp = {
            _id: tempId,
            senderRole: userRole,
            message: text,
            attachments: (attachments || []).map(a => ({
                type: a.type,
                url: a.preview || "",
                name: a.name
            })),
            createdAt: new Date().toISOString(),
            status: 'sending'
        };

        set((state) => ({ messages: [...(state.messages || []), temp] }));

        try {
            let response;
            if (attachments.length > 0) {
                const formData = new FormData();
                formData.append("chatId", chatId);
                formData.append("from", userRole);
                formData.append("text", text);
                attachments.forEach((att) => {
                    formData.append("files", att.file);
                });

                response = await axiosInstance.post("/api/chat/send-message", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await axiosInstance.post("/api/chat/send-message", {
                    chatId,
                    from: userRole,
                    text,
                });
            }

            const { data } = response;
            if (data.success) {
                set((state) => ({ messages: (state.messages || []).map(m => m._id === tempId ? data.data : m) }));
                socketInstance.emit("sendMessage", {
                    chatId,
                    message: data.data,
                });
            }
        } catch (error) {
            set((state) => ({
                messages: (state.messages || []).filter(m => m._id !== tempId)
            }));
            toast.error(error.response?.data?.message || error.message || "Failed to send message");
        }
    },
}));

