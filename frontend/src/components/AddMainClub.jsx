import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddMainClub = (props) => {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubNumber, setClubNumber] = useState("");
  const user = JSON.parse(localStorage.getItem("instructor-token"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    axios
      .post(
        "http://localhost:4000/mainClub/createMainClub" ||
          "http://192.168.1.10:4000/mainClub/createMainClub",
        {
          clubName,
          clubDescription,
          clubNumber,
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
      <div dir="rtl" className="container">
        <div className="row">
          <h1 className="m-4">اضافة فرقة تخصصية</h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h5 className="mt-4"> اسم الفرقة </h5>
          <input
            autoFocus
            className="form-control form-control-lg "
            type="text"
            aria-label=".form-control-lg example"
            {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setClubName(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger">من فضلك ادخل اسم الفرقة</span>
          )}
          <h5 className="mt-4">الوصف</h5>
          <input
            className="form-control form-control-lg"
            type="text"
            aria-label=".form-control-lg example"
            {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setClubDescription(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.descriptionRequired && (
            <span className="text-danger">من فضلك ادخل الوصف*</span>
          )}
          <h5 className="mt-4">رقم الفرقة</h5>
          <input
            className="form-control form-control-lg "
            type="text"
            aria-label=".form-control-lg example"
            {...register("clubNumberRequired", { required: true })}
            onChange={(e) => {
              setClubNumber(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.clubNumberRequired && (
            <span className="text-danger">من فضلك ادخل رقم الفرقة*</span>
          )}
          <br></br>
          <div className="row d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-outline-primary mt-3 w-25">
              اضافة
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMainClub;
