import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const QuestionsReportDetails = () => {
  let { examId, examineeId } = useParams();
  useEffect(() => {
    getEachQuestionEvaluationStats();
  }, []);

  const [eachQuestionEvaluationStats, setEachQuestionEvaluationStats] =
    useState("");
  const getEachQuestionEvaluationStats = () => {
    axios
      .get("http://localhost:4000/evaluate/getEachQuestionEvaluationStats", {
        // headers: {
        //   "auth-token": user.token,
        // },
        params: {
          examId,
          examineeId,
        },
      })
      .then((res) => {
        console.log(res.data.examineeAnswersEvaluation, "reportDetails");
        setEachQuestionEvaluationStats(res.data.examineeAnswersEvaluation);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div dir="rtl" className="container list-container m-5">
        {Object.entries(eachQuestionEvaluationStats).map((question, i) => {
          console.log(question[1]);
          if (question[1].question_type == "Essay") {
            return (
              <div className="card m-5 w-75">
                <p5 className="card-header bg-primary text-white">
                  السؤال {i + 1}
                </p5>
                <div className="card-body  m-2">
                  <p4 className="card-title mb-4">
                    {question[1].question_header}
                  </p4>
                  <hr></hr>
                  <div className="row">
                    <p className="card-text m-3">
                      الاجابة الصحيحة: {question[1].correct_answer}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text m-3">
                      اجابة الممتحن: {question[1].examinee_answer}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text m-3">
                      الدرجة : {question[1].grade}
                    </p>
                  </div>
                  <div className="row">
                    {question[1].result == "correct" ? (
                      <p className="card-text m-3 text-success">
                        النتيجة: صحيح
                      </p>
                    ) : (
                      <p className="card-text m-3 text-danger">النتيجة: خطأ</p>
                    )}
                  </div>{" "}
                </div>
              </div>
            );
          } else {
            return (
              <div className="card m-5 w-75">
                <p className="card-header text-white bg-primary ">
                  السؤال {i + 1}
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
                  <div className="row">
                    <p className="card-text m-3">
                      الاجابة الصحيحة: {question[1].correct_answer}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text m-3">
                      اجابة الممتحن: {question[1].examinee_answer}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text m-3">
                      الدرجة : {question[1].grade}
                    </p>
                  </div>
                  <div className="row">
                    {question[1].result == "correct" ? (
                      <p className="card-text m-3 text-success">
                        النتيجة: صحيح
                      </p>
                    ) : (
                      <p className="card-text m-3 text-danger">النتيجة: خطأ</p>
                    )}
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

export default QuestionsReportDetails;
