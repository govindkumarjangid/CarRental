import { useAuthStore } from "../../store/useAuthStore.js";
import { useState, useNavigate, useRef, motion, iconList } from "../../index.js";

const Login = () => {
	const { signup, login, isLoading, setShowLogin } = useAuthStore();

	const [state, setState] = useState("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const ref = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (state === "register") {
			await signup({ name, email, password });
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
				initial={{ scale: 0.8, opacity: 0, scale: 0 }}
				animate={{ scale: 1, opacity: 1, scale: 1 }}
				transition={{ duration: 0.4 }}
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-88 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white z-200  dark:bg-second-bg dark:text-dark-text dark:border-dark-border"
			>
				<p className="text-3xl font-medium m-auto">
					<span className="text-primary dark:brightness-500">
						User
					</span>
					{state === "login" ? " Login" : " Sign Up"}
				</p>

				{/* name field  */}
				{state === "register" && (
					<div className="w-full relative">
						<input
							type="text"
							name="name"
							placeholder=" "
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full peer border border-gray-200 rounded-lg py-3 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-dark-border dark:bg-card-bg dark:text-dark-text dark:focus:border-accent dark:focus:ring-accent/50 transition-colors duration-200"
						/>

						<label
							htmlFor="name"
							className="absolute left-4 text-gray-500 pointer-events-none bg-white dark:bg-second-bg px-1
							transition-all duration-200
							top-1/2 -translate-y-1/2
							peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs
							peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
							peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs"
						>
							Name
						</label>
					</div>
				)}

				{/* email field  */}
				<div className="relative w-full">
					<input
						type="email"
						placeholder=" "
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="peer w-full border border-gray-200 rounded-lg py-3 px-4 outline-none  focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-dark-border dark:bg-card-bg dark:text-dark-text dark:focus:border-accent dark:focus:ring-accent/50"
					/>

					<label
						htmlFor="email"
						className="absolute left-4 text-gray-500 pointer-events-none bg-white dark:bg-second-bg px-1
						transition-all duration-200
						top-1/2 -translate-y-1/2
						peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs
						peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
						peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs"
					>
						Email
					</label>
				</div>

				{/* password field  */}
				<div className="relative w-full">
					<input
						type="password"
						value={password}
						placeholder=" "
						onChange={(e) => setPassword(e.target.value)}
						className="peer w-full border border-gray-200 rounded-lg py-3 px-4 outline-none  focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-dark-border dark:bg-card-bg dark:text-dark-text dark:focus:border-accent dark:focus:ring-accent/50"
					/>

					<label
						htmlFor="password"
						className="absolute left-4 text-gray-500 pointer-events-none bg-white dark:bg-second-bg px-1
						transition-all duration-200
						top-1/2 -translate-y-1/2
						peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs
						peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base
						peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs"
					>
						Password
					</label>
				</div>

				{/* toggle login/register  */}
				<div className="flex items-center justify-center w-full text-sm ">
					{state === "register" ? (
						<p>
							Already have account ?{" "}
							<span
								onClick={() => setState("login")}
								className="text-primary cursor-pointer dark:text-accent "
							>
								click here
							</span>
						</p>
					) : (
						<p>
							Create an account ?{" "}
							<span
								onClick={() => setState("register")}
								className="text-primary cursor-pointer dark:text-accent "
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
          dark:bg-accent dark:text-main-bg dark:hover:bg-accent-dull`}
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
