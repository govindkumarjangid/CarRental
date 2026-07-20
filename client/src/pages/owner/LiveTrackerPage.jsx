import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import LiveTracker from "../../components/LiveTracker";

const LiveTrackerPage = () => {
    const { carId } = useParams();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 h-full overflow-hidden flex flex-col p-4 md:p-8">
                <div className="flex-1 h-full overflow-hidden">
                    <LiveTracker carId={carId} onClose={() => navigate(-1)} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LiveTrackerPage;
