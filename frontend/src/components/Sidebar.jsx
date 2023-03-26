import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";
import jwt_decode from "jwt-decode";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuildingColumns,
  faPen,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("instructor-token");
    navigate("/");
  };
  return (
    <>
      <nav dir="rtl" className="wrapper g-0">
        <div className="sidebar bg-light">
          <div className="row d-flex justifty-content-center align-items-center">
            {<img src={logo} alt="" />}
          </div>
          <li>
            <a className="w-100 h-100" href="#">
              <i className="fas fa-home"></i>
              <Link to={"/app/home"}>
                <FontAwesomeIcon icon={faHome} /> &nbsp; الرئيسية
              </Link>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-user"></i>
              <Link to={"/app/questionBanks"}>
                <FontAwesomeIcon icon={faBuildingColumns} /> &nbsp; بنوك الاسئلة
              </Link>
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/app/exams"}>
                <FontAwesomeIcon icon={faPen} /> &nbsp; الامتحانات
              </Link>
            </a>
          </li>
          <li>
            <a href="/" onClick={logout}>
              <FontAwesomeIcon icon={faSignOut} /> &nbsp; تسجيل الخروج
            </a>
          </li>
        </div>
      </nav>
    </>
  );
}
