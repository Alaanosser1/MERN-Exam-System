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
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminSideBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("admin-token");
    navigate("/");
  };

  return (
    <>
      <nav dir="rtl" className="wrapper g-0">
        <div className="sidebar bg-light">
          <div className="row d-flex justifty-content-center align-items-center">
            {<img src={logo} alt="" />}
          </div>
          {/* <li>
            <a className="w-100 h-100" href="#">
              <i className="fas fa-home"></i>
              <Link to={"/admin/home"}>
                <FontAwesomeIcon icon={faHome} /> &nbsp; الرئيسية
              </Link>
            </a>
          </li> */}
          <li>
            <a href="#">
              <i className="fas fa-user"></i>
              <Link to={"/admin/mainQuestionBanks"}>
                <FontAwesomeIcon icon={faBuildingColumns} /> &nbsp; بنوك الاسئلة
              </Link>
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/admin/mainClubExams"}>
                <FontAwesomeIcon icon={faPen} /> &nbsp; الامتحانات
              </Link>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-user"></i>
              <Link to={"/admin/mainClubs"}>
                <FontAwesomeIcon icon={faBuildingColumns} /> &nbsp; الفرق
              </Link>
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/admin/Allstudents"}>
                <FontAwesomeIcon icon={faPen} /> &nbsp; الدارسين
              </Link>
            </a>
          </li>
          {/* <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/admin/AllInstructors"}>
                <FontAwesomeIcon icon={faPen} /> &nbsp; المحاضرين
              </Link>
            </a>
          </li> */}
          <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/admin/mainClubReports"}>
                <FontAwesomeIcon icon={faNoteSticky} /> &nbsp; التقارير
              </Link>
            </a>
          </li>
          {/* <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/admin/register"}>
                <FontAwesomeIcon icon={faNoteSticky} /> &nbsp; تسجيل معلم
              </Link>
            </a>
          </li> */}
          <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/admin/dataEntrySignUp"}>
                <FontAwesomeIcon icon={faNoteSticky} /> &nbsp; تسجيل مدخل بيانات
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
