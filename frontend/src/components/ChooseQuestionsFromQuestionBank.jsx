import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddQuestion from "./AddQuestion";
import Popup from "./Popup";
import Swal from "sweetalert2";
import "../styles/Checkbox.less";

const ChooseQuestionsFromQuestionBank = (props) => {
  let questionBankId = props.questionBankId;
  const [questionBankQuestions, setQuestionBankQuestions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [addToExamButton, setAddToExamButton] = useState(false);
  const [questionBank, setQuestionBank] = useState("");
  const [grade, setGrade] = useState(1);
  const refOne = useRef(null);
  const user = JSON.parse(localStorage.getItem("instructor-token"));

  let examQuestionsId = [];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    getExamQuestions();
    getQuestionBankQuestions();
    getQuestionBank();
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      console.log("outside");
      setButtonPopup(false);
    } else {
      console.log("inside");
    }
  };
  const getQuestionBank = () => {
    axios
      .get(
        "http://localhost:4000/questionBank/getQuestionBank" ||
          "http://192.168.1.10:4000/questionBank/getQuestionBank",
        {
          // headers: {
          //   "auth-token": user.token,
          // },
          params: {
            questionBankId,
          },
        }
      )
      .then((res) => {
        console.log(res.data.questionBank[0], "QB");
        setQuestionBank(res.data.questionBank[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQuestionBankQuestions = () => {
    axios
      .get(
        `http://localhost:4000/exam/getQuestionBankQuestionsToAddQuestionsToExam` ||
          `http://192.168.1.10:4000/exam/getQuestionBankQuestionsToAddQuestionsToExam`,
        {
          params: {
            examId: props.examId,
            questionBankId,
          },
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        setQuestionBankQuestions(res.data.questionBankQuestions);
        console.log(questionBankQuestions, "NEWARRAYAYAYAYAYAYAYYA");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getExamQuestions = () => {
    axios
      .get(
        "http://localhost:4000/exam/getExamQuestions" ||
          "http://192.168.1.10:4000/exam/getExamQuestions",
        {
          params: {
            examId: props.examId,
          },
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.questions, "Exam Questions");
        for (let i = 0; i < res.data.questions.length; i++) {
          examQuestionsId.push(res.data.questions[i].question_id);
        }
        console.log(examQuestionsId);
        setExamQuestions(examQuestionsId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const assignQuestionToExam = (questionId) => {
    axios
      .post(
        "http://localhost:4000/exam/assignQuestionToExam" ||
          "http://192.168.1.10:4000/exam/assignQuestionToExam",
        {
          examId: props.examId,
          questionId,
          grade,
        },
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then(async (res) => {
        getQuestionBankQuestions();
        getExamQuestions();
        calculateExamTotalGrade();
        console.log(res, "Assigned");
        setAddToExamButton(!addToExamButton);
      });
  };
  const removeQuestionFromExam = (questionId) => {
    axios
      .delete(
        "http://localhost:4000/exam/removeQuestionFromExam" ||
          "http://192.168.1.10:4000/exam/removeQuestionFromExam",
        {
          params: {
            examId: props.examId,
            questionId,
          },
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        getQuestionBankQuestions();
        getExamQuestions();
        calculateExamTotalGrade();
        console.log(res, "Removed");
        setAddToExamButton(!addToExamButton);
      });
  };

  const calculateExamTotalGrade = () => {
    axios
      .get(
        "http://localhost:4000/exam/calculateExamTotalGrade" ||
          "http://192.168.1.10:4000/exam/calculateExamTotalGrade",
        {
          params: {
            examId: props.examId,
          },
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="container m-5"
        onClick={() => {
          console.log("clicked");
        }}
      >
        {/* <h1>{props.examId}</h1> */}

        <div className="row m-5">
          <div className="col-9">
            <h1 className="">اسئلة بنك {questionBank.question_bank_name}</h1>
          </div>
        </div>
        {Object.entries(questionBankQuestions).map((question, i) => {
          if (question[1].question_type == "Essay") {
            return (
              <div className="card m-5 w-75">
                <p5 className="card-header bg-primary text-white">
                  سؤال {i + 1}
                </p5>
                <div className="card-body  m-2">
                  <p4 className="card-title mb-4">
                    {question[1].question_header}
                  </p4>
                  <hr></hr>
                  <p className="card-text mb-4">
                    الاجابة: {question[1].correct_answer}
                  </p>
                  <div className="row justify-content-center">
                    <div className="col-4">
                      {!question[1].isQuestionInExam ? (
                        <button
                          onClick={() => {
                            assignQuestionToExam(question[1].question_id);
                          }}
                          className="btn btn-outline-success w-100"
                        >
                          إضافة
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            removeQuestionFromExam(question[1].question_id);
                          }}
                          className="btn btn-outline-danger w-100"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                    <div dir="rtl" className="row mt-3">
                      <div className="col-2 h5 mt-1">
                        <label className="text-primary">درجة السؤال</label>
                      </div>
                      <div className="col-2">
                        <input
                          defaultValue={1}
                          type="number"
                          className="form-control  quantity-field text-center"
                          onChange={(e) => {
                            setGrade(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="card m-5 w-75">
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
                  <div className="row justify-content-center">
                    <div className="col-4 ">
                      {!question[1].isQuestionInExam ? (
                        <button
                          onClick={() => {
                            assignQuestionToExam(question[1].question_id);
                          }}
                          className="btn btn-outline-success w-100"
                        >
                          اضافة
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            removeQuestionFromExam(question[1].question_id);
                          }}
                          className="btn btn-outline-danger w-100"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                    <div dir="rtl" className="row mt-3">
                      <div className="col-2 h5 mt-1">
                        <label className="text-primary">درجة السؤال</label>
                      </div>
                      <div className="col-2">
                        <input
                          step="1"
                          defaultValue={1}
                          type="number"
                          className="form-control  quantity-field text-center"
                          onChange={(e) => {
                            setGrade(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ChooseQuestionsFromQuestionBank;
