import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const ExamineePreExam = () => {
  const [instructorName, setInstructorName] = useState("");
  const [instructorPoliceNumber, setInstructorPoliceNumber] = useState("");
  const [instructorPassword, setInstructorPassword] = useState("");
  const [instructorPasswordConfirmed, setInstructorPasswordConfirmed] =
    useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [instructorRank, setInstructorRank] = useState("");
  const [policeNumberAlreadyRegistered, setPoliceNumberAlreadyRegistered] =
    useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    setPoliceNumberAlreadyRegistered(false);
    if (passwordMatch) {
      axios
        .post(`http://localhost:4000/instructor/addInstructor`, {
          instructorName,
          instructorPoliceNumber,
          instructorPassword,
          instructorRank,
        })
        .then((data) => {
          console.log(data);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.status == 409) {
            setPoliceNumberAlreadyRegistered(true);
          }
        });
    }
  };
  return (
    <>
      <div
        style={{ marginTop: 100 }}
        dir={"rtl"}
        className="container w-75 landing-container p-2"
      >
        <div className="row text-center m-5">
          <div>
            <h2 className="text-primary">انشاء حساب جديد</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(formSubmit)} className="m-4 p-3">
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputEmail4">
                الاسم
              </h5>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                placeholder="الاسم"
                {...register("nameRequired", { required: true })}
                onChange={(e) => {
                  setInstructorName(e.target.value);
                }}
              />
              {errors.nameRequired && (
                <h6 className="m-2 text-danger">من فضلك ادخل الاسم*</h6>
              )}
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                رقم الشرطة
              </h5>
              <input
                {...register("policeNumberRequired", { required: true })}
                type="number"
                class="form-control"
                id="inputPassword4"
                placeholder="رقم الشرطة"
                onChange={(e) => {
                  setInstructorPoliceNumber(e.target.value);
                }}
              />
              {errors.policeNumberRequired && (
                <h6 className="m-2 text-danger">من فضلك ادخل رقم الشرطة*</h6>
              )}
              {policeNumberAlreadyRegistered && (
                <h6 className="m-2 text-danger">رقم الشرطة مسجل من قبل*</h6>
              )}
            </div>
          </div>
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                كلمة المرور
              </h5>
              <input
                {...register("passwordRequired", { required: true })}
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="كلمة المرور"
                onChange={(e) => {
                  setInstructorPassword(e.target.value);
                  if (e.target.value == instructorPasswordConfirmed) {
                    setPasswordMatch(true);
                  } else {
                    setPasswordMatch(false);
                  }
                }}
              />
              {errors.passwordRequired && (
                <h6 className="m-2 text-danger">من فضلك ادخل كلمة المرور*</h6>
              )}
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                اعادة ادخال كلمة المرور
              </h5>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="اعادة ادخال كلمة المرور "
                onChange={(e) => {
                  setInstructorPasswordConfirmed(e.target.value);
                  if (e.target.value == instructorPassword) {
                    setPasswordMatch(true);
                  } else {
                    setPasswordMatch(false);
                  }
                }}
              />
              {!passwordMatch && (
                <h6 className="m-2 text-danger">تأكد من مطابقة كلمة المرور*</h6>
              )}
            </div>
          </div>
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputState">
                الرتبة
              </h5>
              <select
                {...register("rankRequired", { required: true })}
                id="inputState"
                class="form-control"
                onChange={(e) => {
                  setInstructorRank(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option disabled selected value="">
                  اختر الرتبة
                </option>
                <option value="عسكري">عسكري</option>
              </select>
              {errors.rankRequired && (
                <h6 className="m-2 text-danger">من فضلك اختر الرتبة*</h6>
              )}
            </div>
          </div>
          <div className="row m-4  d-flex justify-content-center align-items-center">
            <button type="submit" class="btn btn-primary mt-3 w-25">
              تسجيل
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExamineePreExam;
