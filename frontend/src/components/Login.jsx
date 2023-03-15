import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
const Login = () => {
  return (
    <>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div class="container login-container " id="container">
          <div class="form-container sign-in-container">
            <form action="#">
              <h1 className="mb-4">تسجيل الدخول</h1>
              <input
                dir="rtl"
                className="form-control text-end"
                type="email"
                placeholder="رقم الشرطة"
              />
              <input
                dir="rtl"
                className="form-control text-end"
                type="password"
                placeholder="كلمة السر"
              />
              <a href="#">هل نسيت كلمة المرور؟</a>
              <Link to={"/app/home"}>
                <button>تسجيل الدخول</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
