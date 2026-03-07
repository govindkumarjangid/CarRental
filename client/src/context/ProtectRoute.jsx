import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setShowLogin } = useAuthStore();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    if (!user) {
      navigate("/");
      setShowLogin(true);
    } else if (user.role !== "owner") {
      navigate("/");
    }
  }, [user, navigate, setShowLogin]);

  if (!user || user.role !== "owner") return null;

  return children;
};

export default ProtectRoute;
