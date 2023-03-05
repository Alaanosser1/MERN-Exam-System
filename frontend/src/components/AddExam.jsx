import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import QuestionBanks from "../Pages/QuestionBanks";

const AddExam = (props) => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [page, setPage] = useState(0);
  const [examGrade, setExamGrade] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    axios
      .post("http://localhost:4000/exam/createExam", {
        examName,
        examDescription,
        examGrade,
      })
      .then((res) => {
        console.log(res.data.data[0].insertId, "SUBMITTED");
        props.setExamId(res.data.data[0].insertId)
        // props.rerender();
        props.setPage(2);
        // props.hidePopup(false);
        setPage(1);
      });
  };

  return (
    <>
      <div className="container m-5 p-5 border">
        <div className="row w-75 justify-content-center">
          <h1 className="m-3">Add Exam</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <h5 className="m-3">Name</h5>
            <input
              autoFocus
              className="form-control form-control-lg mt-2"
              type="text"
              aria-label=".form-control-lg example"
              {...register("nameRequired", { required: true })}
              onChange={(e) => {
                setExamName(e.target.value);
                console.log(e.target.value);
              }}
            />
            {errors.nameRequired && (
              <span className="text-danger">This field is required</span>
            )}
            <h5 className="m-3">Description</h5>
            <input
              className="form-control form-control-lg mt-2"
              type="text"
              aria-label=".form-control-lg example"
              {...register("descriptionRequired", { required: true })}
              onChange={(e) => {
                setExamDescription(e.target.value);
                console.log(e.target.value);
              }}
            />
            {errors.descriptionRequired && (
              <span className="text-danger">This field is required</span>
            )}
            <h5 className="m-3">Grade</h5>
            <input
              className="form-control form-control-lg mt-2"
              type="text"
              aria-label=".form-control-lg example"
              {...register("gradeRequired", { required: true })}
              onChange={(e) => {
                setExamGrade(e.target.value);
                console.log(e.target.value);
              }}
            />
            {errors.gradeRequired && (
              <span className="text-danger">This field is required</span>
            )}
            <br></br>
            <button type="submit" className="btn btn-primary mt-3 w-25">
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddExam;
