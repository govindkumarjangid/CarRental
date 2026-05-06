import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/useAuthStore.js";
import { motion, iconList } from "../../index.js";
import InputBox from '../owner/InputBox.jsx';
import { useAuthStore } from "../../store/useAuthStore.js";
import InputBox from '../owner/InputBox.jsx';


const Login = () => {
	const { signup, login, isLoading, setShowLogin } = useAuthStore();

	const [state, setState] = useState("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user");

	const navigate = useNavigate();
	const ref = useRef(null);

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
			className="fixed top-0 left-0 right-0 bottom-0 z-100 text-sm text-gray-600 flex items-center backdrop-blur-md h-full w-full justify-center"
		>
			<motion.form
				ref={ref}
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.4 }}
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white z-200"
			>
				<p className="text-3xl font-medium m-auto">
					<span className="text-primary ">
						User
					</span>
					{state === "login" ? " Login" : " Sign Up"}
				</p>

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
								<iconList.User size={16} />
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
								<iconList.CarFront size={16} />
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
							<iconList.Loader
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

