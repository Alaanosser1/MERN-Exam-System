import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Home() {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [exams, setExams] = useState("");
  const user = JSON.parse(localStorage.getItem("data-entry-token"));
  const decoded = jwt_decode(user.token);
  console.log(decoded);

  useEffect(() => {
    getQuestionBanks();
    getExams();
  }, []);

  const getQuestionBanks = () => {
    axios
      .get(
        "http://localhost:4000/mainQuestionBank/getMainQuestionBanks" ||
          "http://192.168.1.10:4000/mainQuestionBank/getMainQuestionBanks",
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.questionBanks, "MAINQUESTIONBANKS");
        setQuestionBanks(res.data.questionBanks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getExams = () => {
    axios
      .get(
        "http://localhost:4000/exam/getExams" ||
          "http://192.168.1.10:4000/exam/getExams",
        {
          headers: {
            "auth-token": user.token,
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

  return (
    <>
      <div dir="rtl" className="container list-container-home-page ">
        <div className="row">
          <h1 dir="rtl">
            {decoded.rank} {decoded.firstName}
          </h1>
        </div>
        <hr />
        <div className="row ">
          <div className="col-9">
            <h2>بنوك الاسئلة</h2>
          </div>
          <div dir="ltr" className="col-3">
            <button className="btn btn-outline-primary ms-5 w-50">
              المزيد
            </button>
          </div>
        </div>
        <div className="row home-page-row mt-2">
          {Object.entries(questionBanks).map((bank, i) => {
            return (
              i < 4 && (
                <div
                  className="col-3 mt-5 d-flex justify-content-center mb-5"
                  key={bank[1].main_question_bank_id}
                >
                  <div className="card home-page-card text-end">
                    <div className="card-body">
                      <h4 className="card-title">
                        {bank[1].main_question_bank_name.substring(0, 19)}
                      </h4>
                      <p className="card-text">
                        {bank[1].main_question_bank_description.substring(
                          0,
                          30
                        )}
                        ...
                      </p>
                      <p className="card-text">
                        عدد المواد {bank[1].NumberOfQuestionBanks}
                      </p>
                      <div className="row m-5">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className={`btn btn-primary `}
                        >
                          تفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="row mt-5">
          <div className="col-9">
            <h2>الامتحانات</h2>
          </div>
          <div dir="ltr" className="col-3">
            <button className="btn btn-outline-primary ms-5 w-50">
              المزيد
            </button>
          </div>
        </div>
        <div className="row home-page-row mt-3">
          {Object.entries(exams).map((exam, i) => {
            return (
              i < 4 && (
                <div
                  className="col-3 mt-5 d-flex justify-content-center mb-5"
                  key={exam[1].exam_id}
                >
                  <div className="card home-page-card text-end">
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
                      <div className="row m-5">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className={`btn btn-primary`}
                        >
                          تفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        {/* <div className="row mt-5">
          <div className="col-9">
            <h2>التقارير</h2>
          </div>
          <div dir="ltr" className="col-3">
            <button className="btn btn-outline-primary ms-5 w-50">
              المزيد
            </button>
          </div>
        </div>
        <div className="row home-page-row mt-3">
          {Object.entries(exams).map((exam, i) => {
            return (
              i < 4 && (
                <div
                  className="col-3 mt-5 d-flex justify-content-center mb-5"
                  key={exam[1].exam_id}
                >
                  <div className="card home-page-card text-end">
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
                      <div className="row m-5">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className={`btn btn-primary `}
                        >
                          تفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div> */}
      </div>
    </>
  );
}
