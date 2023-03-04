import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function AddQuestion(props) {
  const [questionHeader, setQuestionHeader] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [rerenderComponent, setRerenderComponent] = useState("");
  let { questionBankId } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data, "validation");
  const [arr, setArr] = useState([1, 2, 3, 4]);

  useEffect(() => {
    renderBasedOnQuestionType();
  }, []);

  const formSubmit = (data, e) => {
    let options = {
      option_1: null,
      option_2: null,
      option_3: null,
      option_4: null,
      option_5: null,
      option_6: null,
      option_7: null,
      option_8: null,
    };

    e.preventDefault();
    if (questionType == "Mcq") {
      for (let i = 0; i < 8; i++) {
        if (e.target[i].id == "questionOption") {
          options[`option_${i - 1}`] = e.target[i].value;
          console.log(options, "********");
        }
      }
    }

    axios
      .post(`http://localhost:4000/question/createQuestion${questionType}`, {
        questionHeader,
        correctAnswer,
        questionBankId,
        questionType,
        options,
      })
      .then((data) => {
        console.log(data);
        props.rerender();
        props.hidePopup(false);
      });
  };

  const handleOnChangeQuestionType = (e) => {
    e.preventDefault();
    setQuestionType(e.target.value);
    console.log(e.target.value, "value");
  };
  const handleOnChangeCorrectAnswer = (e) => {
    e.preventDefault();
    setCorrectAnswer(e.target.value);
    console.log(e.target.value, "value");
  };

  const renderAnswerOptions = () => {
    let result;

    result = (
      <select
        className="form-select m-3"
        aria-label="Default select example"
        {...register("correctAnswerRequired", { required: true })}
        onChange={handleOnChangeCorrectAnswer}
      >
        <option disabled selected value="">
          Choose Question Type
        </option>
        {arr.map((arr, i) => {
          return (
            <>
              <option key={i} value={`option_${i + 1}`}>
                Option {i + 1}
              </option>
            </>
          );
        })}
      </select>
    );
    return result;
  };

  const renderBasedOnQuestionType = () => {
    let result;

    console.log(questionType, "/////");
    questionType === "Mcq" &&
      (result = (
        <div>
          <h5 className="m-3">Question Header</h5>
          <textarea
            autoFocus
            className="form-control m-3"
            id="exampleFormControlTextarea1"
            rows="3"
            {...register("headerRequired", { required: true })}
            onChange={(e) => {
              setQuestionHeader(e.target.value);
            }}
          />
          {errors.headerRequired && (
            <span className="text-danger m-3">This field is required</span>
          )}
          {arr.map((arr, i) => {
            return (
              <>
                <h5 className="m-3">Choice # {i + 1}</h5>
                <input
                  {...register("optionRequired", { required: true })}
                  className="form-control form-control-lg m-3"
                  key={i}
                  id="questionOption"
                  type="text"
                  aria-label=".form-control-lg example"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                {errors.optionRequired && (
                  <span className="text-danger m-3">
                    This field is required
                  </span>
                )}
              </>
            );
          })}
          <div className="row justify-content-end">
            <div className="col-1">
              <button
                className="btn btn-success"
                onClick={(e) => {
                  if (arr.length <= 7) {
                    arr.push(0);
                    setArr(arr);
                    e.preventDefault();
                    setRerenderComponent(e);
                  } else {
                    console.log("no more choices");
                  }
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="col-1">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  if (arr.length > 2) {
                    arr.pop();
                    setArr(arr);
                    e.preventDefault();
                    setRerenderComponent(e);
                  } else {
                    console.log("no more choices");
                  }
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          <h5 className="m-3 ">Correct Answer</h5>
          {renderAnswerOptions()}
          {errors.correctAnswerRequired && (
            <span className="text-danger m-3">This field is required</span>
          )}
        </div>
      ));
    questionType === "Essay" &&
      (result = (
        <div>
          <h5 className="m-3 ">Question Header</h5>
          <textarea
            autoFocus
            class="form-control m-3"
            id="exampleFormControlTextarea1"
            rows="3"
            {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setQuestionHeader(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger m-3">This field is required!</span>
          )}
          <h5 className="m-3 ">Question Answer</h5>
          <input
            {...register("answerRequired", { required: true })}
            className="form-control form-control-lg m-3"
            type="text"
            aria-label=".form-control-lg example"
            onChange={(e) => {
              setCorrectAnswer(e.target.value);
            }}
          />
          {errors.answerRequired && (
            <span className="text-danger m-3">This field is required!</span>
          )}
        </div>
      ));

    return result;
  };
  return (
    <div className="container align-content-end">
      <h1 className="m-3 w-75">Add Question</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <h5 className="m-3 mt-5">Choose Question Type</h5>
        <select
          className="form-select m-3"
          aria-label="Default select example"
          {...register("questionTypeRequired", { required: true })}
          value={questionType}
          onChange={handleOnChangeQuestionType}
        >
          <option value="">Choose Question Type</option>
          <option value="Mcq">MCQ</option>
          <option value="Essay">Essay</option>
        </select>

        {errors.questionTypeRequired && (
          <span className="text-danger m-3">This field is required!</span>
        )}
        <br></br>
        {renderBasedOnQuestionType()}
        <button type="submit" className="btn btn-primary m-3 w-25">
          Add
        </button>
        {console.log(errors)}
      </form>
    </div>
  );
}

export default AddQuestion;
