import { useAppContext } from "./AppContext";

const ProtectRoute = ({ children }) => {
  const { navigate, setShowLogin, useEffect } = useAppContext();

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
