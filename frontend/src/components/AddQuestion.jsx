import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../styles/Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faLongArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddQuestion(props) {
  const [questionHeader, setQuestionHeader] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [optionList, setOptionList] = useState([
    { option: "" },
    { option: "" },
    { option: "" },
    { option: "" },
  ]);

  let { questionBankId } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [arr, setArr] = useState([1, 2, 3, 4]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    renderBasedOnQuestionType();
  }, []);

  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...optionList];
    list[index][name] = value;
    setOptionList(list);
  };

  const handleOptionRemove = (index) => {
    const list = [...optionList];
    list.splice(index, 1);
    setOptionList(list);
  };

  const handleOptionAdd = () => {
    setOptionList([...optionList, { option: "" }]);
  };

  const formSubmit = (data, e) => {
    e.preventDefault();
    // if (questionType == "Mcq") {
    //   for (let i = 0; i < 8; i++) {
    //     options[`option_${i + 1}`] = e.target[i + 1].value;
    //     console.log(options, "********", i);
    //   }
    // }

    axios
      .post(`http://localhost:4000/question/createQuestion${questionType}`, {
        questionHeader,
        correctAnswer,
        questionBankId,
        questionType,
        options: optionList,
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
    console.log(e.target.value, "CorrectANswer");
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
        {optionList.map((option, i) => {
          return (
            <>
              {option.option && (
                <option key={i} value={option.option}>
                  Option{i + 1}: {option.option}
                </option>
              )}
            </>
          );
        })}
      </select>
    );
    return result;
  };

  const renderBasedOnQuestionType = () => {
    let result;
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
          <div className="row p-3">
            <div className="col-11"></div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => {
                  if (optionList.length <= 7) {
                    handleOptionAdd();
                  } else {
                    console.log("no more choices");
                  }
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          {optionList.map((singleOption, index) => (
            <div key={index} className="options">
              <div className="row">
                <h5 className="ms-3">Option {index + 1}</h5>
              </div>
              <div className="row p-3">
                <div className="col-11">
                  <input
                    className="form-control"
                    name="option"
                    type="text"
                    id="option"
                    value={singleOption.option}
                    onChange={(e) => handleOptionChange(e, index)}
                    required
                  />
                </div>
                <div className="col-1">
                  {optionList.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleOptionRemove(index)}
                      className="btn btn-outline-danger"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
      </form>
    </div>
  );
}

export default AddQuestion;
