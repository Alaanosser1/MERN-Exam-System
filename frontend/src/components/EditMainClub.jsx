import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditMainClub = (props) => {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubNumber, setClubNumber] = useState("");
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMainClub();
  }, []);

  const getMainClub = () => {
    axios
      .get(
        "http://localhost:4000/mainClub/getSingleMainClub" ||
          "http://192.168.1.10:4000/mainClub/getSingleMainClub",
        {
          params: {
            clubId: props.clubId,
          },
        }
      )
      .then((data) => {
        setClubName(data.data.club[0].club_name);
        setClubDescription(data.data.club[0].club_description);
      });
  };
  const formSubmit = () => {
    axios
      .post(
        "http://localhost:4000/mainClub/editMainClub" ||
          "http://192.168.1.10:4000/mainClub/editMainClub",
        {
          clubName,
          clubDescription,
          clubId: props.clubId,
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
          <h1 className="m-3">تعديل </h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h5 className="mt-4">اسم الفرقة</h5>
          <input
            autoFocus
            className="form-control form-control-lg "
            type="text"
            placeholder="الاسم"
            aria-label=".form-control-lg example"
            defaultValue={clubName}
            // {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setClubName(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger">من فضلك ادخل اسم الفرقة</span>
          )}
          <h5 className="mt-4">الوصف </h5>
          <input
            className="form-control form-control-lg "
            type="text"
            placeholder="الوصف"
            aria-label=".form-control-lg example"
            defaultValue={clubDescription}
            // {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setClubDescription(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.descriptionRequired && (
            <span className="text-danger">من فضلك ادخل الوصف*</span>
          )}
          <br></br>
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-outline-primary mt-3 w-25">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMainClub;
