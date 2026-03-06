import { Navigate, Outlet, Link } from "react-router";
import useAuthStore from "../../Zustand/authStore";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import SocialSidebar from "../../Pages/SocialSidebar";

const Protected = () => {
  const User = useAuthStore((state) => state.user);
  const { user } = useAuthStore();

  if (!User) {
    return <Navigate to="login" />;
  }

  if (!user.emailVerified) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl">Please Verify your email first</h2>
        <div className="mt-12">
          <Link className="bg-red-600 p-4 rounded-md text-white" to="/">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <SocialSidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Protected;
