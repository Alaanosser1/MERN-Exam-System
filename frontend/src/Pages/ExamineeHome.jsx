import { React, useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const ExamineeHome = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("examinee-token"));
  const user = jwt_decode(token.token);

  console.log(user, "USER");

  useEffect(() => {
    getExams();
  }, []);

  const getExams = () => {
    axios
      .get(
        "http://localhost:4000/examinee/getExamineeExams" ||
          "http://192.168.1.10:4000/examinee/getExamineeExams",
        {
          params: {
            examineeId: user.id,
          },
        }
      )
      .then((res) => {
        console.log(res.data.exams, "EXAMS");
        setExams(res.data.exams);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startExamHandler = (examId) => {
    if (localStorage.getItem("examinee-token")) {
      // navigate(`/examineeExam/${examId}`);
      window.open(`/examineeExam/${examId}`, "_blank");
    } else {
      navigate(`/studentLogin`);
    }
  };

  const logout = () => {
    localStorage.removeItem("examinee-token");
    navigate("/");
  };

  return (
    <>
      <div dir="rtl" className="container w-100 h-100 p-5">
        <div className="row mb-2 bg-light p-5">
          <div className="col-9">
            <h2>
              {user.rank} {user.firstName}
            </h2>
          </div>
          <div className="col-3">
            <button className="btn btn-outline-primary" onClick={logout}>
              <FontAwesomeIcon icon={faSignOut} /> &nbsp; تسجيل الخروج
            </button>
          </div>
        </div>
        <div className="row me-3">
          <div className="col-9">
            <h1 className="">الامتحانات</h1>
          </div>
        </div>

        <div className="row">
          <hr />
          {Object.entries(exams).map((exam) => {
            console.log(exam[1].NumberOfQuestions);
            return (
              <div
                className="col-4 d-flex justify-content-center mb-2 mt-2"
                key={exam[1].exam_id}
              >
                <div className="card exam-card text-end">
                  <div className="card-body">
                    <h4 className="card-title">
                      الفرقة: {exam[1].sub_club_name.substring(0, 30)}
                    </h4>
                    <h4 className="card-title">
                      امتحان: {exam[1].exam_name.substring(0, 30)}
                    </h4>
                    <p className="card-text">
                      {exam[1].exam_description.substring(0, 30)}...
                    </p>
                    <p className="card-text">
                      عدد الاسئلة {exam[1].NumberOfQuestions}
                    </p>
                    <p className="card-text">
                      الوقت: {exam[1].exam_time} دقيقة
                    </p>
                    <div className="row">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          startExamHandler(exam[1].exam_id);
                        }}
                        className={`btn btn-outline-primary ${
                          exam[1].NumberOfQuestions < 1 && "disabled"
                        }`}
                      >
                        ابدأ الامتحان
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <hr />
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ExamineeHome;
