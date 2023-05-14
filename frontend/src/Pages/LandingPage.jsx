import React from "react";
import Clock from "react-live-clock";
import moment from "moment";
import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import ExamineeHome from "../Pages/ExamineeHome";
import "../styles/LandingPage2.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString("ar", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div className="h-100 w-100 main-container  align-items-center justify-content-center">
        <div className="container landing-container w-75 bg-white">
          <div className="row">
            <div className="col-6 bg-light p-5">
              <div className="img-container d-flex justify-content-center">
                <img width={300} src={logo} alt="" />
                
              </div>
              <div className="row">
              <h2 className="text-center" dir="rtl">
                {date}
              </h2>
              <h2 className="text-center" dir="rtl">
                <Clock
                  className=""
                  format={`h:mm:ss`}
                  ticking={true}
                  locale="ar"
                />
              </h2>
              </div>
            </div>
            <div className="col-6 btn-col p-5">
            <h3 className="text-center text">
                  الادارة العامة للحماية المدنية 
              </h3>
              <h3 className="text-center text-">
                     معهد تدريب الادارة 
              </h3>
              <div className="row mb-4">
                
              </div>
              <Link style={{ textDecoration: "none" }} to={"/studentLogin"}>
                <div className="row w-75 ms-3">
                  <button className="btn landing-btn btn-outline-success">
                    دارسين
                  </button>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                <div className="row w-75 ms-3">
                  <button className="btn landing-btn btn-outline-success">
                    محاضرين
                  </button>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/dataEntryLogin"}>
                <div className="row w-75 ms-3">
                  <button className="btn landing-btn btn-outline-success">
                    ادخال بيانات الفرق
                  </button>
                </div>
              </Link>
              <Link style={{ textDecoration: "none" }} to={"/adminLogin"}>
                <div className="row w-75 ms-3">
                  <button className="btn landing-btn btn-outline-success">
                    الصلاحيات
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
