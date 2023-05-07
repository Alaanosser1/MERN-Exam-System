import { React, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useForm } from "react-hook-form";
import ar from "date-fns/locale/ar";
import { useParams } from "react-router-dom";

const AddSubClub = (props) => {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubNumber, setClubNumber] = useState("");
  const [datePickerStartDate, setDatePickerStartDate] = useState(new Date());
  const [datePickerEndDate, setDatePickerEndDate] = useState(
    new Date().getTime() + 86400000
  );
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 19).split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 86400000)
      .toISOString()
      .slice(0, 19)
      .split("T")[0]
  );
  const [studentsType, setStudentsType] = useState("");
  const [subClubType, setSubClubType] = useState("");
  const [theoriticalGrades, setTheoriticalGrades] = useState("");
  const [practicalGrades, SetPracticalGrades] = useState("");
  const [attendenceGrades, setAttendenceGrades] = useState("");
  const [behaviourGrades, setBehaviourGrades] = useState("");
  const [placement, setPlacement] = useState(0);
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));
  let { mainClubId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    axios
      .post(
        "http://localhost:4000/subClub/createSubClub" ||
          "http://192.168.1.10:4000/subClub/createSubClub",
        {
          clubName,
          clubDescription,
          clubNumber,
          startDate,
          endDate,
          mainClubId,
          studentsType,
          subClubType,
          theoriticalGrades,
          practicalGrades,
          attendenceGrades,
          behaviourGrades,
          placement,
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

  const handleStartDate = (startDate, date) => {
    setStartDate(startDate);
    setDatePickerStartDate(date);
    console.log(startDate);
  };
  const handleEndDate = (endDate, date) => {
    setEndDate(endDate);
    setDatePickerEndDate(date);
    console.log(endDate);
  };

  return (
    <>
      <div dir="rtl" className="container">
        <div className="row">
          <h1 className="m-3">اضافة فرقة جديدة</h1>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="col-6">
              <h5 className=""> اسم الفرقة </h5>
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
            </div>
            <div className="col-6">
              <h5 className="">رقم الفرقة </h5>

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
            </div>
          </div>

          <h5 className=" mt-4"> الوصف </h5>
          <textarea
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

          <div className="row">
            <div className="col-6">
              <h5 className="mt-4">مجموع الدرجات النظرية </h5>
              <input
                className="form-control form-control-lg "
                type="number"
                min="0"
                aria-label=".form-control-lg example"
                {...register("totalTheoriticalGradesRequired", {
                  required: true,
                })}
                onChange={(e) => {
                  setTheoriticalGrades(e.target.value);
                  console.log(e.target.value);
                }}
              />
              {errors.totalTheoriticalGradesRequired && (
                <span className="text-danger">
                  من فضلك ادخل مجموع الدرجات النظرية*
                </span>
              )}
            </div>
            <div className="col-6">
              <h5 className="mt-4">مجموع الدرجات العملية</h5>
              <input
                className="form-control form-control-lg "
                type="number"
                min="0"
                aria-label=".form-control-lg example"
                {...register("totalPracticalGradesRequired", {
                  required: true,
                })}
                onChange={(e) => {
                  SetPracticalGrades(e.target.value);
                  console.log(e.target.value);
                }}
              />
              {errors.totalPracticalGradesRequired && (
                <span className="text-danger">
                  من فضلك ادخل مجموع الدرجات النظرية*
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h5 className="mt-4">مجموع درجات المواظبة</h5>
              <input
                className="form-control form-control-lg "
                type="number"
                min="0"
                aria-label=".form-control-lg example"
                {...register("totalAttendenceGradesRequired", {
                  required: true,
                })}
                onChange={(e) => {
                  setAttendenceGrades(e.target.value);
                  console.log(e.target.value);
                }}
              />
              {errors.totalAttendenceGradesRequired && (
                <span className="text-danger">
                  من فضلك ادخل مجموع الدرجات النظرية*
                </span>
              )}
            </div>
            <div className="col-6">
              <h5 className="mt-4">مجموع درجات السلوك </h5>
              <input
                className="form-control form-control-lg "
                type="number"
                min="0"
                aria-label=".form-control-lg example"
                {...register("totalBehaviourGradesRequired", {
                  required: true,
                })}
                onChange={(e) => {
                  setBehaviourGrades(e.target.value);
                  console.log(e.target.value);
                }}
              />
              {errors.totalBehaviourGradesRequired && (
                <span className="text-danger">
                  من فضلك ادخل مجموع درجات السلوك*
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h5 className="mt-4">فئة الدارسين </h5>
              <select
                {...register("studentsTypeRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setStudentsType(e.target.value);
                }}
                id="inputState"
                className="form-control"
              >
                <option selected disabled value={""}>
                  اختر الفئة
                </option>
                <option value={"ضباط"}>ضباط</option>
                <option value={"افراد"}> افراد</option>
                <option value={"مجندنين"}>مجندنين</option>
                <option value={"مدنيين"}>مدنيين</option>
                <option value={"مشترك"}>مشترك</option>
              </select>
              {errors.studentsTypeRequired && (
                <span className="text-danger">من فضلك اختر فئة الدارسين*</span>
              )}
            </div>
            <div className="col-6">
              <h5 className="mt-4">نوع الفرقة</h5>
              <select
                {...register("subClubTypeRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setSubClubType(e.target.value);
                }}
                id="inputState"
                className="form-control"
              >
                <option selected disabled value={""}>
                  اختر النوع
                </option>
                <option value={"اساسية"}>اساسية</option>
                <option value={"تخصصية"}> تخصصية</option>
              </select>
              {errors.subClubTypeRequired && (
                <span className="text-danger">من فضلك اختر نوع الفرقة*</span>
              )}
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6 ">
              <h5 className="mt-4">تاريخ البدء</h5>
              <DatePicker
                className="form-control"
                locale={ar}
                selected={datePickerStartDate}
                onChange={(date) =>
                  handleStartDate(
                    new Date(date).toISOString().split("T")[0],
                    date
                  )
                }
                minDate={new Date()}
              />
            </div>
            <div className="col-6 ">
              <h5 className="mt-4">تاريخ الانتهاء</h5>
              <DatePicker
                className="form-control"
                locale={ar}
                selected={datePickerEndDate}
                onChange={(date) =>
                  handleEndDate(
                    new Date(date).toISOString().split("T")[0],
                    date
                  )
                }
                minDate={new Date().getTime() + 86400000}
              />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-6 mt-3">
              <div class="form-check form-check-inline mt-5">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  checked={placement === 1}
                  value={1}
                  onClick={() => setPlacement(1)}
                />
                <label class="form-check-label" for="inlineRadio1">
                  يوجد قياس مستوي قبل و بعد
                </label>
              </div>
              <div class="form-check form-check-inline mt-5">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  checked={placement === 0}
                  value={0}
                  onClick={() => setPlacement(0)}
                />
                <label class="form-check-label" for="inlineRadio2">
                  لا يوجد قياس مستوي قبل و بعد
                </label>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row mt-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-outline-primary mt-3 w-25 "
            >
              اضافة
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSubClub;
