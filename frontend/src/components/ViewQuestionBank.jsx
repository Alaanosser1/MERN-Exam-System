import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddQuestion from "./AddQuestion";
import Popup from "./Popup";
import Swal from "sweetalert2";

function ViewQuestionBank() {
  let { questionBankId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    getQuestions();
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      console.log("outside");
      setButtonPopup(false);
    } else {
      console.log("inside");
    }
  };

  const deleteQuestionHandler = (question) => {
    Swal.fire({
      title: `Are You Sure You Want to Delete This Question?`,
      showCancelButton: true,
    }).then((res) => {
      console.log(question);
      if (res.isConfirmed) {
        axios
          .delete(`http://localhost:4000/question/deleteQuestion`, {
            params: {
              questionId: question.question_id,
            },
          })
          .then((res) => {
            console.log(res.data);
            getQuestions();
          });
      }
    });
  };

  const getQuestions = () => {
    axios
      .get(
        `http://localhost:4000/questionBank/getQuestions?questionBank=${questionBankId}`
      )
      .then((res) => {
        console.log(res.data[0].question_header, "/////////");
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="container list-container m-5"
        onClick={() => {
          console.log("clicked");
        }}
      >
        <div ref={refOne}>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <AddQuestion
              rerender={getQuestions}
              hidePopup={setButtonPopup}
            ></AddQuestion>
          </Popup>
          <div className="row m-5">
            <div className="col-9">
              <h1 className="">
                Questions of Question Bank # {questionBankId}
              </h1>
            </div>

            <div className="col-3">
              <button
                onClick={() => setButtonPopup(true)}
                className="btn btn-success m-2"
              >
                Add New Question
              </button>
            </div>
          </div>
          {Object.entries(questions).map((question, i) => {
            console.log(question[1]);
            if (question[1].question_type == "Essay") {
              return (
                <div className="card m-5 w-75">
                  <p5 className="card-header bg-primary text-white">
                    Question {i + 1}
                  </p5>
                  <div className="card-body  m-2">
                    <p4 className="card-title mb-4">
                      {question[1].question_header}
                    </p4>
                    <hr></hr>
                    <p className="card-text mb-4">
                      Answer: {question[1].correct_answer}
                    </p>
                    <div className="row">
                      <div className="col-2">
                        <Link href="#" className="btn btn-success m-2 w-100">
                          Edit
                        </Link>
                      </div>
                      <div className="col-2">
                        <button
                          onClick={() => {
                            deleteQuestionHandler(question[1]);
                          }}
                          className="btn btn-danger m-2 w-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="card m-5 w-75">
                  <p className="card-header text-white bg-primary ">
                    Question {i + 1}
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
                      Answer: {question[1].correct_answer}
                    </p>
                    <div className="row">
                      <div className="col-2">
                        <Link href="#" className="btn btn-success m-2 w-100">
                          Edit
                        </Link>
                      </div>
                      <div className="col-2">
                        <button
                          onClick={() => {
                            deleteQuestionHandler(question[1]);
                          }}
                          className="btn btn-danger m-2 w-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default ViewQuestionBank;
