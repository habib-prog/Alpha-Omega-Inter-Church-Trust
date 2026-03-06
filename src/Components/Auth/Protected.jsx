import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../Zustand/authStore";
import PageLoader from "../UI/Skeleton/PageLoader";

const Protected = () => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.authLoading);

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default Protected;
