import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LiveTracker from "../../components/LiveTracker";

const LiveTrackerPage = () => {
    const { carId } = useParams();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1 h-full overflow-hidden flex flex-col p-4 md:p-8"
            >
                <div className="flex-1 h-full overflow-hidden">
                    <LiveTracker carId={carId} onClose={() => navigate(-1)} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LiveTrackerPage;
