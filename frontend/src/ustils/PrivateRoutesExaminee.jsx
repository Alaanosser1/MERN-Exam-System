import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesExaminee = () => {
  const user = JSON.parse(localStorage.getItem("examinee-token"));
  return user ? <Outlet /> : <Navigate to="/studentLogin" />;
};

export default PrivateRoutesExaminee;
