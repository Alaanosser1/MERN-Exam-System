import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import ExamineeHome from "../Pages/ExamineeHome";
import "../styles/LandingPage2.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div className="container">
        <Link to={"/examineeHome"}>
          <button className="btn btn-light">دارس</button>
        </Link>
      </div> */}
      <div className="h-100 w-100 main-container d-flex align-items-center justify-content-center bg-light">
        <div className="container landing-container w-75 h-75 bg-white">
          <div className="row">
            <div className="col-6">
              <div class="img-container">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="col-6 btn-col">
              <Link style={{ textDecoration: "none" }} to={"/examineeHome"}>
                <div className="row w-75">
                  <button className="btn landing-btn btn-outline-success">
                    ابدأ الامتحان
                  </button>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                <div className="row w-75">
                  <button className="btn landing-btn btn-outline-success">
                    تسجيل الدخول
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
