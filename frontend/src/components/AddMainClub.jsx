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
          <h1 className="m-3">اضافة فرقة رئيسية جديدة</h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <input
            autoFocus
            className="form-control form-control-lg mt-4 "
            type="text"
            placeholder="الاسم"
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
          <input
            className="form-control form-control-lg mt-4"
            type="text"
            placeholder="الوصف"
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
          <input
            className="form-control form-control-lg mt-4"
            type="text"
            placeholder="رقم الفرقة"
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
          <button type="submit" className="btn btn-outline-primary mt-3 w-25">
            اضافة
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMainClub;
