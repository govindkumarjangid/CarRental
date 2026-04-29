import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
