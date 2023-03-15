import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuildingColumns,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <>
      <div className="wrapper ">
        <div className="sidebar bg-light">
          <h2>Sidebar</h2>
          <ul>
            <li>
              <a href="#">
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
                  <FontAwesomeIcon icon={faBuildingColumns} /> &nbsp;
                  QuestionBank
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
          </ul>
        </div>
      </div>
    </>
  );
}
