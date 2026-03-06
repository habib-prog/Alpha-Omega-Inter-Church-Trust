import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../Zustand/authStore";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Protected = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Protected;
