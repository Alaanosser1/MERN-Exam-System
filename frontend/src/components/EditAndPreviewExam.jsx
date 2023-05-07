import { React, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import noQuestionsInExam from "../assets/noQuestionsInExam.png";

const EditAndPreviewExam = () => {
  let { examId } = useParams();
  const [examQuestions, setExamQuestions] = useState([]);
  const [exam, setExam] = useState("");
  const [showCreateExamStep2, setShowCreateExamStep2] = useState(false);
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token"));
  const navigate = useNavigate();
  useEffect(() => {
    // document.addEventListener("click", handleClickOutside, true);
    getExamQuestions();
    getExam();

    return () => {
      //   document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const getExam = () => {
    axios
      .get(
        "http://localhost:4000/exam/getExam" ||
          "http://192.168.1.10:4000/exam/getExam",
        {
          // headers: {
          //   "auth-token": user.token,
          // },
          params: {
            examId,
          },
        }
      )
      .then((res) => {
        console.log(res.data.exam[0], "EXAM");
        setExam(res.data.exam[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeQuestionHandler = (question) => {
    console.log(examId, "??????????????????");
    Swal.fire({
      title: `Are You Sure You Want to Delete this Question?`,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            "http://localhost:4000/exam/removeQuestionFromExam" ||
              "http://192.168.1.10:4000/exam/removeQuestionFromExam",
            {
              params: {
                examId,
                questionId: question.question_id,
              },
              headers: {
                "auth-token": user.token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            getExamQuestions();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const getExamQuestions = () => {
    axios
      .get(
        "http://localhost:4000/exam/getExamQuestions" ||
          "http://192.168.1.10:4000/exam/getExamQuestions",
        {
          params: {
            examId,
          },
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data, "Exams");
        setExamQuestions(res.data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div dir="rtl" className="container list-container m-5">
        <div className="row">
          <div className="col-9 mt-5">
            <h1>{`مراجعة و تعديل امتحان ${exam.exam_name}`}</h1>
          </div>
          <div className="col-3">
            {JSON.parse(localStorage.getItem("instructor-token")) && (
              <Link to={`/app/exams/${examId}/mainQuestionBanks`}>
                <button
                  onClick={() => {
                    setShowCreateExamStep2(true);
                  }}
                  className="btn btn-outline-success mt-5"
                >
                  اضافة الأسئلة
                </button>
              </Link>
            )}
            {JSON.parse(localStorage.getItem("data-entry-token")) && (
              <Link to={`/clubs/exams/${examId}/mainQuestionBanks`}>
                <button
                  onClick={() => {
                    setShowCreateExamStep2(true);
                  }}
                  className="btn btn-outline-success mt-5"
                >
                  اضافة الأسئلة
                </button>
              </Link>
            )}
          </div>
        </div>
        {examQuestions.length < 1 ? (
          <>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                {
                  <img
                    style={{ marginTop: 140, width: 400 }}
                    src={noQuestionsInExam}
                    alt=""
                  />
                }
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                {/* <Link to={`/app/exams/${examId}/mainQuestionBanks`}> */}
                <button
                  onClick={() =>
                    navigate(`/app/exams/${examId}/mainQuestionBanks`)
                  }
                  className="btn btn-success mt-3 w-25"
                >
                  اضافة الأسئلة
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="row justify-content-center g-0">
            {Object.entries(examQuestions).map((question, i) => {
              console.log(question[1]);
              if (question[1].question_type == "Essay") {
                return (
                  <div key={i} className="card m-5">
                    <p className="card-header bg-primary text-white">
                      سؤال {i + 1}
                    </p>
                    <div className="card-body  m-2">
                      <p className="card-title mb-4">
                        {question[1].question_header}
                      </p>
                      <hr></hr>
                      <p className="card-text mb-4">
                        الاجابة: {question[1].correct_answer}
                      </p>
                      <div className="row justify-content-center m-3">
                        <div className="col-4">
                          <button
                            onClick={() => {
                              removeQuestionHandler(question[1]);
                            }}
                            className="btn btn-outline-danger m-2 w-100"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={i} className="card m-5">
                    <p className="card-header text-white bg-primary ">
                      سؤال {i + 1}
                    </p>
                    <div className="card-body m-2">
                      <p className="card-title mb-4">
                        {question[1].question_header}
                      </p>
                      <hr></hr>
                      <div className="row">
                        <div className="col-6">
                          {question[1].answer_option_1 != "null" &&
                            question[1].answer_option_1 != null && (
                              <div className="container">
                                <div className="row">
                                  <p>1- {question[1].answer_option_1}</p>
                                </div>
                              </div>
                            )}
                          {question[1].answer_option_2 != "null" &&
                            question[1].answer_option_2 != null && (
                              <div className="container">
                                <div className="row">
                                  <p>2- {question[1].answer_option_2}</p>
                                </div>
                              </div>
                            )}
                          {question[1].answer_option_3 != "null" &&
                            question[1].answer_option_3 != null && (
                              <div className="container">
                                <div className="row">
                                  <p>3- {question[1].answer_option_3}</p>
                                </div>
                              </div>
                            )}
                          {question[1].answer_option_4 != "null" &&
                            question[1].answer_option_4 != null && (
                              <div className="container">
                                <div className="row">
                                  <p>4- {question[1].answer_option_4}</p>
                                </div>
                              </div>
                            )}
                        </div>
                        <div className="col-6">
                          <div className="col-6">
                            {question[1].answer_option_5 != "null" &&
                              question[1].answer_option_5 != null && (
                                <div className="container">
                                  <div className="row">
                                    <p>5- {question[1].answer_option_5}</p>
                                  </div>
                                </div>
                              )}
                            {question[1].answer_option_6 != "null" &&
                              question[1].answer_option_6 != null && (
                                <div className="container">
                                  <div className="row">
                                    <p>6- {question[1].answer_option_6}</p>
                                  </div>
                                </div>
                              )}
                            {question[1].answer_option_7 != "null" &&
                              question[1].answer_option_7 != null && (
                                <div className="container">
                                  <div className="row">
                                    <p>7- {question[1].answer_option_7}</p>
                                  </div>
                                </div>
                              )}
                            {question[1].answer_option_8 != "null" &&
                              question[1].answer_option_8 != null && (
                                <div className="container">
                                  <div className="row">
                                    <p>8- {question[1].answer_option_8}</p>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <p className="card-text m-3">
                        الاجابة: {question[1].correct_answer}
                      </p>
                      <div className="row justify-content-center m-3">
                        <div className="col-4">
                          <button
                            onClick={() => {
                              removeQuestionHandler(question[1]);
                            }}
                            className="btn btn-outline-danger m-2 w-100"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default EditAndPreviewExam;
