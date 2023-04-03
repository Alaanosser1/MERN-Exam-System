import { React, useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const ExamineeHome = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getExams();
  }, []);

  const getExams = () => {
    axios
      .get(
        "http://localhost:4000/exam/getExams" ||
          "http://192.168.1.10:4000/exam/getExams"
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
      navigate(`/examineePreExam`);
    }
  };

  return (
    <>
      <div className="container w-100 h-100 p-5">
        <div className="row me-3 text-end">
          <h1 className="">الامتحانات</h1>
        </div>
        <br />
        <br />
        <div className="row">
          {Object.entries(exams).map((exam) => {
            console.log(exam[1].NumberOfQuestions);
            return (
              <div
                className="col-4 d-flex justify-content-center mb-5"
                key={exam[1].exam_id}
              >
                <div className="card exam-card text-end">
                  <div className="card-body">
                    <h4 className="card-title">
                      {exam[1].exam_name.substring(0, 30)}
                    </h4>
                    <p className="card-text">
                      {exam[1].exam_description.substring(0, 30)}...
                    </p>
                    <p className="card-text">
                      عدد الاسئلة {exam[1].NumberOfQuestions}
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
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ExamineeHome;
