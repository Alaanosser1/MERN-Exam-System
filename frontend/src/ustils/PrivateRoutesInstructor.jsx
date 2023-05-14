import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesInstructor = () => {
  const user = JSON.parse(localStorage.getItem("instructor-token"));
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutesInstructor;
