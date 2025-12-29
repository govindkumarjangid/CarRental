import { useAppContext } from "../context/AppContext";

const Loader = () => {
	const { iconList } = useAppContext();
	return (
		<div className="flex justify-center items-center h-[80vh]">
			<iconList.LoaderPinwheel className="w-14 h-14  md:w-20 md:h-20 text-primary animate-spin" />
		</div>
	);
};

export default Loader;
