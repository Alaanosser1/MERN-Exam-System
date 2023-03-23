import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
let questionNumber = 1;

const ExamineeExam = () => {
  let { examId } = useParams();
  const [examQuestions, setExamQuestions] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  let isActive = false;

  useEffect(() => {
    questionNumber = 1;
    getExamQuestions();
    console.log("lol");
  }, []);

  const getExamQuestions = () => {
    axios
      .get("http://localhost:4000/exam/getExamQuestions", {
        params: {
          examId,
        },
      })
      .then((res) => {
        console.log(res.data.questions, "Questions");
        setExamQuestions(res.data.questions);
        console.log(examQuestions);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const resetInputValue = () => {
    setInputValue("");
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const question = () => {
    if (examQuestions) {
      console.log(examQuestions, "TEST LOLOLOLOL");
    }
    if (examQuestions[questionNumber - 1].question_type == "Essay") {
      return (
        <>
          <div className="row justify-content-center w-100">
            <div className="card m-5 w-75 p-0 ">
              <p5 className="card-header bg-primary text-white">
                السؤال رقم {questionNumber}
              </p5>
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
              <p5 className="card-header bg-primary text-white">
                السؤال رقم {questionNumber}
              </p5>
              <div className="card-body">
                <p className="card-title ">
                  {examQuestions[questionNumber - 1].question_header}
                </p>
                <hr></hr>
                <div className="row">
                  <div className="col-6">
                    {examQuestions[questionNumber - 1].answer_option_1 !=
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_1 !=
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_1
                              }
                            </label>
                          </div>
                        </div>
                      )}
                    {examQuestions[questionNumber - 1].answer_option_2 !=
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_2 !=
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_2
                              }
                            </label>
                          </div>
                        </div>
                      )}
                    {examQuestions[questionNumber - 1].answer_option_3 !=
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_3 !=
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
                              {
                                examQuestions[questionNumber - 1]
                                  .answer_option_3
                              }
                            </label>
                          </div>
                        </div>
                      )}
                    {examQuestions[questionNumber - 1].answer_option_4 !=
                      "null" &&
                      examQuestions[questionNumber - 1].answer_option_4 !=
                        null && (
                        <div className="container">
                          <div className="form-check">
                            <input
                              style={{ float: "right", margin: 5 }}
                              class="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value=""
                            />
                            <label
                              class="form-check-label"
                              for="exampleRadios1"
                            >
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
                      {examQuestions[questionNumber - 1].answer_option_5 !=
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_5 !=
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value=""
                              />
                              <label
                                class="form-check-label"
                                for="exampleRadios1"
                              >
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_5
                                }
                              </label>
                            </div>
                          </div>
                        )}
                      {examQuestions[questionNumber - 1].answer_option_6 !=
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_6 !=
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value=""
                              />
                              <label
                                class="form-check-label"
                                for="exampleRadios1"
                              >
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_6
                                }
                              </label>
                            </div>
                          </div>
                        )}
                      {examQuestions[questionNumber - 1].answer_option_7 !=
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_7 !=
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value=""
                              />
                              <label
                                class="form-check-label"
                                for="exampleRadios1"
                              >
                                {
                                  examQuestions[questionNumber - 1]
                                    .answer_option_7
                                }
                              </label>
                            </div>
                          </div>
                        )}
                      {examQuestions[questionNumber - 1].answer_option_8 !=
                        "null" &&
                        examQuestions[questionNumber - 1].answer_option_8 !=
                          null && (
                          <div className="container">
                            <div className="form-check">
                              <input
                                style={{ float: "right", margin: 5 }}
                                class="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value=""
                              />
                              <label
                                class="form-check-label"
                                for="exampleRadios1"
                              >
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
                      i == questionNumber - 1 ? "active" : ""
                    }`}
                    aria-current="page"
                  >
                    <button
                      onClick={() => {
                        // resetInputValue();
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
                    setInputValue("");
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
              {questionNumber != examQuestions.length ? (
                <button
                  onClick={() => {
                    console.log(examQuestions.length, "LENGTH");
                    if (questionNumber < examQuestions.length) {
                      setInputValue("");
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
                    console.log(examQuestions.length, "LENGTH");
                    if (questionNumber > examQuestions.length) {
                      setInputValue("");
                      questionNumber++;
                      getExamQuestions();
                      console.log(questionNumber, "Question Number");
                      console.log(examQuestions.length, "LENGTH");
                    }
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
