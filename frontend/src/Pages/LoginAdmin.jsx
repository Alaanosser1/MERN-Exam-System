import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import Footer from "../components/Footer";

const LoginAdmin = () => {
  const [policeNumber, setPoliceNumber] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    setLoadingSpinner(true);
    setTimeout(() => {}, 3000);

    axios
      .post(`http://${process.env.REACT_APP_API_IP}:4000/admin/adminLogin`, {
        policeNumber,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          if (localStorage.getItem("instructor-token")) {
            localStorage.removeItem("instructor-token");
          }
          if (localStorage.getItem("examinee-token")) {
            localStorage.removeItem("examinee-token");
          }
          if (localStorage.getItem("data-entry-token")) {
            localStorage.removeItem("data-entry-token");
          }
          localStorage.setItem("admin-token", JSON.stringify(res.data));
        }
        setLoadingSpinner(false);
        navigate("/admin/mainClubs");
        console.log(res);
      })
      .catch((err) => {
        // if (err.response.status == 401) {
        //   setWrongCredentials(true);
        //   setLoadingSpinner(false);
        // }
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="container login-container " id="container">
          {loadingSpinner && (
            <div className="spinner-border spinner" role="status"></div>
          )}
          <div className="form-container sign-in-container">
            <form onSubmit={formSubmit}>
              <h1 className="mb-5 text-primary">تسجيل دخول ادمن</h1>
              <input
                dir="rtl"
                className="form-control text-end"
                type="text"
                placeholder="رقم الشرطة"
                onChange={(e) => {
                  setPoliceNumber(e.target.value);
                }}
              />
              <input
                dir="rtl"
                className="form-control text-end"
                type="password"
                placeholder="كلمة المرور"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {wrongCredentials && (
                <h5 className="text-danger">
                  !رقم الشرطة او كلمة المرور خاطئة
                </h5>
              )}
              {/* <Link className="h1 text-primary mb-0" href="#">
                <h6>هل نسيت كلمة المرور؟</h6>
              </Link> */}
              {/* <Link to={"/register"} className=" text-primary mt-0">
                <h6>انشاء حساب جديد</h6>
              </Link> */}
              <button className="mt-5" type="submit">
                تسجيل الدخول{" "}
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default LoginAdmin;
