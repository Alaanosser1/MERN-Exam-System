import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuildingColumns,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <>
      <nav className="wrapper g-0">
        <div className="sidebar bg-light">
          <div className="row d-flex justifty-content-center align-items-center">
            <img src={logo} alt="" />
          </div>
          <li>
            <a className="w-100 h-100" href="#">
              <i className="fas fa-home"></i>
              <Link to={"/app/home"}>
                {" "}
                <FontAwesomeIcon icon={faHome} /> &nbsp; Home
              </Link>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-user"></i>
              <Link to={"/app/questionBanks"}>
                <FontAwesomeIcon icon={faBuildingColumns} /> &nbsp; QuestionBank
              </Link>
            </a>
          </li>
          <li>
            <a>
              <i className="fas fa-user"></i>
              <Link to={"/app/exams"}>
                <FontAwesomeIcon icon={faPen} /> &nbsp; Exam
              </Link>
            </a>
          </li>
        </div>
      </nav>
    </>
  );
}
