import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditSubject = (props) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectGrade, setSubjectGrade] = useState("");
  const [subjectType, setSubjectType] = useState("");

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
      .get(`http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubject`, {
        params: {
          subjectId: props.subjectId,
        },
      })
      .then((data) => {
        setSubjectName(data.data.subject[0].subject_name);
        setSubjectDescription(data.data.subject[0].subject_description);
        setSubjectGrade(data.data.subject[0].subject_grade);
        setSubjectType(data.data.subject[0].subject_type);
      });
  };
  const formSubmit = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/editSubject`,
        {
          subjectName,
          subjectDescription,
          subjectGrade,
          subjectType,
          subjectId: props.subjectId,
        },
        {
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((data) => {
        props.rerender();
        props.hidePopup(false);
      });
  };

  return (
    <>
      <div style={{ maxWidth: "60%" }} dir="rtl" className="container">
        <div className="row ">
          <h1 className="m-5 text-center"> تعديل المادة </h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h5 className="mt-4">اسم الفرقة</h5>
          <input
            autoFocus
            className="form-control form-control-lg "
            type="text"
            placeholder="الاسم"
            aria-label=".form-control-lg example"
            defaultValue={subjectName}
            // {...register("nameRequired", { required: true })}
            onChange={(e) => {
              setSubjectName(e.target.value);
              console.log(e.target.value);
            }}
          />
          {errors.nameRequired && (
            <span className="text-danger">من فضلك ادخل اسم الفرقة</span>
          )}
          {/* <h5 className="mt-4">الوصف </h5>
          <input
            className="form-control form-control-lg "
            type="text"
            placeholder="الوصف"
            aria-label=".form-control-lg example"
            defaultValue={subjectDescription}
            // {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setSubjectDescription(e.target.value);
              console.log(e.target.value);
            }}
          /> */}
          {errors.descriptionRequired && (
            <span className="text-danger">من فضلك ادخل الوصف*</span>
          )}
          <h5 className="mt-4">الدرجة </h5>
          <input
            className="form-control form-control-lg "
            type="number"
            aria-label=".form-control-lg example"
            value={subjectGrade}
            // {...register("descriptionRequired", { required: true })}
            onChange={(e) => {
              setSubjectGrade(e.target.value);
              console.log(e.target.value);
            }}
          />
          {/* {errors.descriptionRequired && (
            <span className="text-danger">من فضلك ادخل الوصف*</span>
          )} */}
          <h5 className="mt-4">نوع المادة </h5>
          <select
            {...register("subjectTypeRequired", {
              required: true,
            })}
            onChange={(e) => {
              e.preventDefault();
              setSubjectType(e.target.value);
            }}
            value={subjectType}
            id="inputState"
            className="form-control"
          >
            <option selected disabled value={""}>
              نوع المادة
            </option>
            <option value={"نظري"}> نظري</option>
            <option value={"عملي"}> عملي</option>
          </select>
          {/* {errors.subjectTypeRequired && (
            <span className="text-danger">من فضلك اختر نوع المادة*</span>
          )} */}
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

export default EditSubject;
