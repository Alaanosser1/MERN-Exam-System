import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesDataEntry = () => {
  const user = JSON.parse(localStorage.getItem("admin-token"));
  return user ? <Outlet /> : <Navigate to="/adminLogin" />;
};

export default PrivateRoutesDataEntry;
