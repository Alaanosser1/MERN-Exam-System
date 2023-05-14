import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutesDataEntry = () => {
  const user = JSON.parse(localStorage.getItem("data-entry-token"));
  return user ? <Outlet /> : <Navigate to="/dataEntryLogin" />;
};

export default PrivateRoutesDataEntry;
