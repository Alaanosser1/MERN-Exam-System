import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import Footer from "../components/Footer";
const Login = () => {
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
      .post(
        `http://localhost:4000/instructor/instructorLogin` ||
          `http://192.168.1.10:4000/instructor/instructorLogin`,
        {
          policeNumber,
          password,
        }
      )
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("instructor-token", JSON.stringify(res.data));
        }
        setLoadingSpinner(false);
        navigate("/app/home");
      })
      .catch((err) => {
        if (err.response.status == 401) {
          setWrongCredentials(true);
          setLoadingSpinner(false);
        }
      });
  };
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="container login-container " id="container">
          {loadingSpinner && (
            <div class="spinner-border spinner" role="status"></div>
          )}

          <div className="form-container sign-in-container">
            <form onSubmit={formSubmit}>
              <h1 className="mb-4">تسجيل الدخول</h1>
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
              <Link to={"/register"} className=" text-primary mt-0">
                <h6>انشاء حساب جديد</h6>
              </Link>
              <button type="submit">تسجيل الدخول </button>
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
export default Login;
