import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const AddPlacement = (props) => {
  const [placementName, setPlacementName] = useState("");
  const [placementDescription, setPlacementDescription] = useState("");

  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));
  const { subClubId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    axios
      .post(
        "http://localhost:4000/subClub/createPlacement" ||
          "http://192.168.1.10:4000/subClub/createPlacement",
        {
          placementName,
          placementDescription,
          subClubId,
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
          <h1 className="m-4">اضافة قياس مستوي</h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h5 className="mt-4"> الاسم </h5>
          <input
            autoFocus
            className="form-control form-control-lg"
            type="text"
            aria-label=".form-control-lg example"
            {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setPlacementName(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger">من فضلك ادخل اسم قياس المستوي</span>
          )}
          <h5 className="mt-4">الوصف</h5>
          <input
            className="form-control form-control-lg"
            type="text"
            aria-label=".form-control-lg example"
            {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setPlacementDescription(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.descriptionRequired && (
            <span className="text-danger">من فضلك ادخل الوصف*</span>
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

export default AddPlacement;
