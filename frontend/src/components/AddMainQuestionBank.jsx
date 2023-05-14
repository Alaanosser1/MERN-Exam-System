import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddMainQuestionBank(props) {
  const [questionBankName, setName] = useState("");
  const [questionBankDescription, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));

  const formSubmit = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/mainQuestionBank/createMainQuestionBank`,
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
        <h1>اضافة بنك اسئلة جديد</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <input
            autoFocus
            className="form-control form-control-lg mt-4 "
            type="text"
            placeholder="الاسم"
            aria-label=".form-control-lg example"
            {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger">من فضلك ادخل الاسم</span>
          )}
          <input
            className="form-control form-control-lg mt-4"
            type="text"
            placeholder="الوصف"
            aria-label=".form-control-lg example"
            {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setDescription(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.descriptionRequired && (
            <span className="text-danger">من فضلك ادخل الوصف*</span>
          )}
          <br></br>
          <button type="submit" className="btn btn-primary mt-3 w-25">
            اضافة
          </button>
        </form>
      </div>
    </>
  );
}
