import { React, useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "../styles/ExamineeHome.css";

const ExamineeHome = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("examinee-token"));
  const user = jwt_decode(token.token);
  const currentDate = new Date();

  console.log(user, "USER");

  useEffect(() => {
    getExams();
  }, []);

  const getExams = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/examinee/getExamineeExams`,
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
      <div dir="rtl" className="container">
        <div
          dir=""
          style={{ overflow: "scroll", maxHeight: "1000px" }}
          className="container examinee-home-container w-100 h-100 p-5"
        >
          <div dir="" className="flex">
            <div className=" mb-2 p-5 align-items-center flex-column w-100">
              <div className="w-100">
                <h4>
                  {user.rank} {user.firstName}
                </h4>
              </div>
              <br />
              <div dir="" className=" mt-4">
                <button className="button" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOut} /> &nbsp; تسجيل الخروج
                </button>
              </div>
            </div>
            <div className="text-wrapper">
              <div className="primary-text">
                <p>رأيك يهمنا</p>
              </div>
              <div dir="" className="secondary-text">
                <p>استطلاع رآي للفرق </p>
              </div>
              <div dir="ltr" className="">
                <Link to={"questionare"}>
                  <button className="button" type="button">
                    اذهب لاستطلاع الرآي
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-9">
              <h1 className="mb-4">الامتحانات</h1>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          {Object.entries(exams).map((exam) => {
            const startDateTime = new Date(exam[1].start_date_time);
            const endDateTime = new Date(exam[1].end_date_time);

            // Check if the current date is after the start date and before the end date.
            if (currentDate >= startDateTime && currentDate <= endDateTime) {
              return (
                <div className="col-4 mb-3" key={exam[1].exam_id}>
                  <div className="card custom-card text-end">
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
                        عدد الأسئلة: {exam[1].NumberOfQuestions}
                      </p>
                      <p className="card-text">
                        الوقت: {exam[1].exam_time} دقيقة
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          startExamHandler(exam[1].exam_id);
                        }}
                        className={`btn btn-primary
              ${exam[1].NumberOfQuestions <= 0 && "disabled"}`}
                        style={{ width: "100%" }}
                      >
                        ابدأ الامتحان
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              // This exam is not within the date range.
              return null;
            }
          })}
        </div>

        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ExamineeHome;
