import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddQuestionBank(props) {
  const [questionBankName, setName] = useState("");
  const [questionBankDescription, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("instructor-token"));

  const formSubmit = () => {
    axios
      .post(
        "http://localhost:4000/questionBank/createQuestionBank",
        {
          questionBankName,
          questionBankDescription,
        },
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((data) => {
        props.rerender();
        props.hidePopup(false);
      });
  };

  return (
    <>
      <div className="container">
        <h1>Add Question Bank</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <input
            autoFocus
            className="form-control form-control-lg mt-2"
            type="text"
            placeholder="Name"
            aria-label=".form-control-lg example"
            {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger">This field is required</span>
          )}
          <input
            className="form-control form-control-lg mt-2"
            type="text"
            placeholder="Description"
            aria-label=".form-control-lg example"
            {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.descriptionRequired && (
            <span className="text-danger">This field is required</span>
          )}
          <br></br>
          <button type="submit" className="btn btn-primary mt-3 w-25">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
