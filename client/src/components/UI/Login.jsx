import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAuthStore } from "../../store/useAuthStore.js";
import { User, CarFront, Loader, X } from "lucide-react";
import InputBox from '../owner/InputBox.jsx';


const Login = () => {
	const { signup, login, isLoading, setShowLogin } = useAuthStore();

	const [state, setState] = useState("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (state === "register") {
			await signup({ name, email, password, role });
		} else {
			await login({ email, password });
		}
		if (useAuthStore.getState().isAuthenticated) {
			setShowLogin(false);
			navigate("/");
		}
	};

	return (
		<motion.div
			onClick={() => setShowLogin(false)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 z-100 text-gray-600 flex items-center backdrop-blur-xs justify-center bg-blue-700/5"
		>
			<motion.form
				initial={{ opacity: 0, filter: "blur(5px)", scale: 0.95 }}
				animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
				exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white z-200"
			>
				<div className="flex justify-between items-center w-full">
					<p className="text-3xl font-medium mx-auto pl-8">
						<span className="text-primary ">
							User
						</span>
						{state === "login" ? " Login" : " Sign Up"}
					</p>
				</div>

				{/* name field  */}
				{state === "register" && (
					<InputBox
						label="name"
						title="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Full Name"
					/>
				)}

				{/* role selector */}
				{state === "register" && (
					<div className="w-full">
						<p className="text-xs text-gray-400 mb-2 font-medium">Register as</p>
						<div className="flex gap-3 w-full">
							<button
								type="button"
								onClick={() => setRole("user")}
								className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-sm font-semibold cursor-pointer transition-all duration-200 ${role === "user"
									? "border-primary bg-primary/10 text-primary"
									: "border-gray-200 text-gray-400 hover:border-gray-300"
									}`}
							>
								<User size={16} />
								User
							</button>
							<button
								type="button"
								onClick={() => setRole("owner")}
								className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-sm font-semibold cursor-pointer transition-all duration-200 ${role === "owner"
									? "border-primary bg-primary/10 text-primary"
									: "border-gray-200 text-gray-400 hover:border-gray-300"
									}`}
							>
								<CarFront size={16} />
								Owner
							</button>
						</div>
					</div>
				)}

				{/* email field  */}
				<InputBox
					label="email"
					title="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email Address"
				/>

				{/* password field  */}
				<InputBox
					label="password"
					title="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>

				{/* toggle login/register  */}
				<div className="flex items-center justify-center w-full text-sm ">
					{state === "register" ? (
						<p>
							Already have account ?{" "}
							<span
								onClick={() => setState("login")}
								className="text-primary cursor-pointer  "
							>
								click here
							</span>
						</p>
					) : (
						<p>
							Create an account ?{" "}
							<span
								onClick={() => setState("register")}
								className="text-primary cursor-pointer  "
							>
								click here
							</span>
						</p>
					)}
				</div>

				{/* submit button  */}

				<button
					type="submit"
					disabled={isLoading}
					className={`${isLoading
						? "opacity-90 cursor-not-allowed bg-primary"
						: "bg-primary hover:bg-primary-dull"
						} transition-all text-white w-full py-2 rounded-lg mt-2
            cursor-pointer active:scale-95
            `}
				>
					{isLoading ? (
						<div className="flex items-center gap-2 justify-center">
							<Loader
								size={16}
								className="h-5 w-5 animate-spin text-white"
							/>
							<span>Please wait...</span>
						</div>
					) : state === "register" ? (
						"Create Account"
					) : (
						"Login"
					)}
				</button>

			</motion.form>
		</motion.div>
	);
};

export default Login;

