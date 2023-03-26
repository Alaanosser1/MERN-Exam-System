import { React, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Popup from "../components/Popup";

let questionNumber = 1;

const ExamineeExam = () => {
  let { examId } = useParams();
  const [examQuestions, setExamQuestions] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [onLeavePopUp, setOnLeavePopUp] = useState(true);
  const user = JSON.parse(localStorage.getItem("examinee-token"));
  const decodedToken = jwt_decode(user.token);
  const navigate = useNavigate();

  console.log(decodedToken.examineeId);
  const storeExamineeAnswer = (questionId) => {
    console.log(inputValue, "INPUTVALUE");
    axios
      .post("http://localhost:4000/examinee/storeExamineeAnswer", {
        examId,
        questionId,
        examineeId: decodedToken.examineeId,
        examineeAnswer: inputValue,
      })
      .then((res) => {
        // setExamQuestions(res.data.questions);
        console.log(res.data);
        setInputValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    questionNumber = 1;
    getExamQuestions();
    const onLeaveAlert = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", onLeaveAlert);
    return () => window.removeEventListener("beforeunload", onLeaveAlert);
  }, []);

  const getExamQuestions = () => {
    axios
      .get("http://localhost:4000/exam/getExamQuestions", {
        params: {
          examId,
        },
      })
      .then((res) => {
        setExamQuestions(res.data.questions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const onFinishExam = () => {
    Swal.fire({
      title: "هل انت متأكد من الانتهاء و حفظ الاجابات؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تم حفظ الاجابات", "", "success");
        localStorage.removeItem("examinee-token");
        navigate("/ExamineeHome");
      }
    });
  };

  const question = () => {
    if (examQuestions[questionNumber - 1].question_type === "Essay") {
      return (
        <>
          <div className="row justify-content-center w-100">
            <div className="card m-5 w-75 p-0 ">
              <p className="card-header bg-primary text-white">
                السؤال رقم {questionNumber}
              </p>
              <div className="card-body">
                <p className="card-title ">
                  {examQuestions[questionNumber - 1].question_header}
                </p>
                <hr></hr>
                <textarea
                  autoFocus
                  value={inputValue}
                  className="form-control mt-4"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="row justify-content-center w-100">
            <div className="card m-5 w-75 p-0 ">
              <p className="card-header bg-primary text-white">
                السؤال رقم {questionNumber}
              </p>
              <div className="card-body">
                <p className="card-title ">
                  {examQuestions[questionNumber - 1].question_header}
                </p>
                <hr></hr>
                <div className="row">
                  <div className="col-6">
                    {examQuestions[questionNumber - 1].answer_option_1 !==
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_1 !==
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              checked={
                                inputValue ===
                                examQuestions[questionNumber - 1]
                                  .answer_option_1
                                  ? true
                                  : false
                              }
                              value={
                                examQuestions[questionNumber - 1]
                                  .answer_option_1
                              }
                              onClick={(e) => {
                                setInputValue(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                            <label className="form-check-label">
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_1
                              }
                            </label>
                          </div>
                        </div>
                      )}
                    {examQuestions[questionNumber - 1].answer_option_2 !==
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_2 !==
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios2"
                              checked={
                                inputValue ===
                                examQuestions[questionNumber - 1]
                                  .answer_option_2
                                  ? true
                                  : false
                              }
                              value={
                                examQuestions[questionNumber - 1]
                                  .answer_option_2
                              }
                              onClick={(e) => {
                                setInputValue(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                            <label className="form-check-label">
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_2
                              }
                            </label>
                          </div>
                        </div>
                      )}
                    {examQuestions[questionNumber - 1].answer_option_3 !==
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_3 !==
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios3"
                              checked={
                                inputValue ===
                                examQuestions[questionNumber - 1]
                                  .answer_option_3
                                  ? true
                                  : false
                              }
                              value={
                                examQuestions[questionNumber - 1]
                                  .answer_option_3
                              }
                              onClick={(e) => {
                                setInputValue(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                            <label className="form-check-label">
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_3
                              }
                            </label>
                          </div>
                        </div>
                      )}
                    {examQuestions[questionNumber - 1].answer_option_4 !==
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_4 !==
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios4"
                              checked={
                                inputValue ===
                                examQuestions[questionNumber - 1]
                                  .answer_option_4
                                  ? true
                                  : false
                              }
                              value={
                                examQuestions[questionNumber - 1]
                                  .answer_option_4
                              }
                              onClick={(e) => {
                                setInputValue(e.target.value);
                                console.log(e.target.value);
                              }}
                            />
                            <label className="form-check-label">
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_4
                              }
                            </label>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="col-6">
                    <div className="col-6">
                      {examQuestions[questionNumber - 1].answer_option_5 !==
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_5 !==
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                checked={
                                  inputValue ===
                                  examQuestions[questionNumber - 1]
                                    .answer_option_5
                                    ? true
                                    : false
                                }
                                value={
                                  examQuestions[questionNumber - 1]
                                    .answer_option_5
                                }
                                onClick={(e) => {
                                  // setIsChecked5(true);
                                  setInputValue(e.target.value);
                                  console.log(e.target.value);
                                }}
                              />
                              <label className="form-check-label">
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_5
                                }
                              </label>
                            </div>
                          </div>
                        )}
                      {examQuestions[questionNumber - 1].answer_option_6 !==
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_6 !==
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                checked={
                                  inputValue ===
                                  examQuestions[questionNumber - 1]
                                    .answer_option_6
                                    ? true
                                    : false
                                }
                                value={
                                  examQuestions[questionNumber - 1]
                                    .answer_option_6
                                }
                                onClick={(e) => {
                                  // setIsChecked6(true);
                                  setInputValue(e.target.value);
                                  console.log(e.target.value);
                                }}
                              />
                              <label className="form-check-label">
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_6
                                }
                              </label>
                            </div>
                          </div>
                        )}
                      {examQuestions[questionNumber - 1].answer_option_7 !==
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_7 !==
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                checked={
                                  inputValue ===
                                  examQuestions[questionNumber - 1]
                                    .answer_option_7
                                    ? true
                                    : false
                                }
                                value={
                                  examQuestions[questionNumber - 1]
                                    .answer_option_7
                                }
                                onClick={(e) => {
                                  // setIsChecked7(true);
                                  setInputValue(e.target.value);
                                  console.log(e.target.value);
                                }}
                              />
                              <label className="form-check-label">
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_7
                                }
                              </label>
                            </div>
                          </div>
                        )}
                      {examQuestions[questionNumber - 1].answer_option_8 !==
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_8 !==
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                checked={
                                  inputValue ===
                                  examQuestions[questionNumber - 1]
                                    .answer_option_8
                                    ? true
                                    : false
                                }
                                value={
                                  examQuestions[questionNumber - 1]
                                    .answer_option_8
                                }
                                onClick={(e) => {
                                  // setIsChecked8(true);
                                  setInputValue(e.target.value);
                                  console.log(e.target.value);
                                }}
                              />
                              <label className="form-check-label">
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_8
                                }
                              </label>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div
        style={{ margin: 170, fontSize: 20 }}
        className="h-100 d-flex align-items-center justify-content-center"
      >
        <div
          dir="rtl"
          className="container question-card-container   border m-2 p-5"
        >
          <nav dir="ltr" className="d-flex">
            {Object.entries(examQuestions).map((question, i) => {
              return (
                <ul class="pagination pagination-sm">
                  <li
                    className={`page-item m-1 ${
                      i === questionNumber - 1 ? "active" : ""
                    }`}
                    aria-current="page"
                  >
                    <button
                      onClick={() => {
                        storeExamineeAnswer(
                          examQuestions[questionNumber - 1].question_id
                        );
                        questionNumber = i + 1;
                        getExamQuestions();
                      }}
                      className="page-link"
                    >
                      Q {i + 1}
                    </button>
                  </li>
                </ul>
              );
            })}
          </nav>
          {examQuestions.length > 0 && question()}
          <div dir="ltr" className="row">
            <div className="col-2"></div>
            <div className="col-3">
              <button
                onClick={() => {
                  if (questionNumber > 1) {
                    questionNumber--;
                    getExamQuestions();
                    console.log(questionNumber, "Question Number");
                  }
                }}
                className="btn btn-outline-primary w-100"
              >
                Previous
              </button>
            </div>
            <div className="col-2"></div>
            <div className="col-3">
              {questionNumber !== examQuestions.length ? (
                <button
                  onClick={() => {
                    console.log(examQuestions.length, "LENGTH");
                    if (questionNumber < examQuestions.length) {
                      storeExamineeAnswer(
                        examQuestions[questionNumber - 1].question_id
                      );
                      questionNumber++;
                      getExamQuestions();
                      console.log(questionNumber, "Question Number");
                      console.log(examQuestions.length, "LENGTH");
                    }
                  }}
                  className="btn btn-outline-primary w-100"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (questionNumber <= examQuestions.length) {
                      storeExamineeAnswer(
                        examQuestions[questionNumber - 1].question_id
                      );
                    }
                    onFinishExam();
                  }}
                  className="btn btn-success w-100"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamineeExam;
