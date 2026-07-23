import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);

  // Monitor scroll
  useEffect(() => {
    const main = document.querySelector("main");

    const handleScroll = () => {
      const scrollPosition = main ? main.scrollTop : window.scrollY;
      if (scrollPosition > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    if (main) {
      main.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (main) {
        main.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2 bg-primary text-white rounded-full shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] hover:bg-primary-dull hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all border border-white/30 cursor-pointer flex items-center justify-center group"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
