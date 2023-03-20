import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
const Login = () => {
  const [policeNumber, setPoliceNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/instructor/instructorLogin`, {
        policeNumber,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        console.log(res);
        navigate("/app/home");
      });
  };
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="container login-container " id="container">
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
                placeholder="كلمة السر"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <a href="#">هل نسيت كلمة المرور؟</a>
              {/* <Link to={"/app/home"}> */}
              <button type="submit">تسجيل الدخول </button>
              <button className="mt-3 btn btn-success" type="submit">
                انشاء حساب جديد
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
