import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/Auth"; // Ensure the correct path to your Auth context

const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
    // window.location.reload();
  }, [LogoutUser]);

  return (
  <>

  <Navigate to="/login" />;
  </>
  )
};

export default Logout;