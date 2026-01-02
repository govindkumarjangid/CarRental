import { useAppContext } from "../context/AppContext";

const Loader = () => {
	const { iconList } = useAppContext();
	return (
		<div className="flex justify-center items-center h-[80vh]">
			<iconList.Loader className="w-14 h-14  md:w-24 md:h-24 text-primary animate-spin" />
		</div>
	);
};

export default Loader;
