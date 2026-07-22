export const Title = ({ title, subTitle, align }) => {
	return (
		<div
			className={`flex flex-col justify-center items-center text-center ${
				align === "left" && "md:items-start md:text-left"
			}`}>
			<h2 className="font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
				{title}
			</h2>

			<p className="text-sm md:text-base text-gray-600 font-semibold mt-3 max-w-xl">
				{subTitle}
			</p>
		</div>
	);
};
