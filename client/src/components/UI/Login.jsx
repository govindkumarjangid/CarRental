import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { GoogleLogin } from "@react-oauth/google";
import { User, CarFront, Loader, X, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import InputBox from '../owner/InputBox.jsx';
import { useAuthStore } from "../../store/useAuthStore.js";

const Login = () => {
    const { signup, login, googleLogin, isLoading, setShowLogin } = useAuthStore();

    const [state, setState] = useState("register");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let ok;
        if (state === "register") {
            ok = await signup({ name, email, password, role });
        } else {
            ok = await login({ email, password });
        }
        if (ok || useAuthStore.getState().isAuthenticated) {
            setShowLogin(false);
            if (useAuthStore.getState().isOwner) {
                navigate("/owner");
            } else {
                navigate("/");
            }
        }
    };

    return (
        <motion.div
            onClick={() => setShowLogin(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100000 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md bg-slate-950/40 overflow-y-auto">

            <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 sm:p-6 flex flex-col gap-2.5 text-slate-700 select-none max-h-[95vh] overflow-y-auto no-scrollbar my-auto">

                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 p-1.5 rounded-xl transition-all cursor-pointer z-10">
                    <X size={16} />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-0.5 text-center w-full pt-1">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                        <span className="text-primary">
                            {state === "register" && role === "owner" ? "Owner" : "User"}
                        </span>{" "}
                        {state === "login" ? "Login" : "Sign Up"}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                        {state === "login"
                            ? "Welcome back! Please enter your details"
                            : "Create an account to start your journey"}
                    </p>
                </div>

                {/* Role Selector Tabs (Only on Register) */}
                {state === "register" && (
                    <div className="w-full mt-0.5">
                        <p className="text-[10px] text-slate-400 mb-1 font-bold uppercase tracking-wider">Account Type</p>
                        <div className="grid grid-cols-2 gap-1.5 w-full bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${role === "user"
                                    ? "bg-white text-primary shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}>
                                <User size={14} />
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole("owner")}
                                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${role === "owner"
                                    ? "bg-white text-primary shadow-xs"
                                    : "text-slate-500 hover:text-slate-800"
                                    }`}>
                                <CarFront size={14} />
                                Car Owner
                            </button>
                        </div>
                    </div>
                )}

                {/* Input Fields */}
                <div className="flex flex-col gap-2.5 w-full mt-0.5">
                    {/* Name */}
                    {state === "register" && (
                        <InputBox
                            label="name"
                            title="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            leftIcon={User}
                        />
                    )}

                    {/* Email */}
                    <InputBox
                        label="email"
                        title="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        leftIcon={Mail}
                    />

                    {/* Password  */}
                    <InputBox
                        label="password"
                        title="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        leftIcon={Lock}
                        isPassword={true}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center mt-1 ${
                        isLoading
                            ? "bg-primary/80 cursor-not-allowed opacity-90"
                            : "bg-linear-to-r from-primary to-indigo-600 hover:from-primary-dull hover:to-indigo-700"
                    }`}>
                    {isLoading ? (
                        <div className="flex items-center gap-2 justify-center">
                            <Loader size={16} className="animate-spin text-white" />
                            <span>Processing...</span>
                        </div>
                    ) : state === "register" ? (
                        "Create Account"
                    ) : (
                        "Sign In"
                    )}
                </button>

                {/* Toggle */}
                <div className="flex items-center justify-center w-full text-xs text-slate-500 font-medium my-0.5">
                    {state === "register" ? (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setState("login")}
                                className="text-primary font-bold hover:underline cursor-pointer ml-1">
                                Log In
                            </button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setState("register")}
                                className="text-primary font-bold hover:underline cursor-pointer ml-1">
                                Sign Up
                            </button>
                        </p>
                    )}
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center w-full my-0.5">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-2.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider absolute">
                        Or continue with
                    </span>
                </div>

                {/* Google OAuth Button */}
                <div className="w-full flex justify-center pb-1">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                            const ok = await googleLogin(credentialResponse, role, state);
                            if (ok || useAuthStore.getState().isAuthenticated) {
                                setShowLogin(false);
                                if (useAuthStore.getState().isOwner) {
                                    navigate("/owner");
                                } else {
                                    navigate("/");
                                }
                            }
                        }}
                        onError={() => {
                            toast.error("Google Authentication Failed");
                        }}
                    />
                </div>

            </motion.form>
        </motion.div>
    );
};

export default Login;
