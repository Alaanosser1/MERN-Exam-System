import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const DataEntrySignUp = () => {
  const [dataEntryName, setDataEntryName] = useState("");
  const [dataEntryPoliceNumber, setDataEntryPoliceNumber] = useState("");
  const [dataEntryPassword, setDataEntryPassword] = useState("");
  const [dataEntryPasswordConfirmed, setDataEntryPasswordConfirmed] =
    useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [dataEntryRank, setDataEntryRank] = useState("");
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
        .post(
          `http://localhost:4000/dataEntry/addDataEntry` ||
            `http://192.168.1.10:4000/dataEntry/addDataEntry`,
          {
            dataEntryName,
            dataEntryPoliceNumber,
            dataEntryPassword,
            dataEntryRank,
          }
        )
        .then((data) => {
          console.log(data);
          navigate("/dataEntryLogin");
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
            <h2 className="text-primary">انشاء حساب مدخل بيانات</h2>
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
                  setDataEntryName(e.target.value);
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
                type="text"
                class="form-control"
                id="inputPassword4"
                placeholder="رقم الشرطة"
                onChange={(e) => {
                  setDataEntryPoliceNumber(e.target.value);
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
                id="inputPassword5"
                placeholder="كلمة المرور"
                onChange={(e) => {
                  setDataEntryPassword(e.target.value);
                  if (e.target.value == dataEntryPasswordConfirmed) {
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
                  setDataEntryPasswordConfirmed(e.target.value);
                  if (e.target.value == dataEntryPassword) {
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
          <div className="row p-2">
            <div className="form-group col-md-6 p-2">
              <h5 className="mb-3">الدرجة</h5>
              <select
                {...register("officerRankRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setDataEntryRank(e.target.value);
                }}
                id="inputState"
                className="form-control"
              >
                <option selected disabled value="">
                  اختر الدرجة
                </option>
                <option value={"رقيب"}>رقيب</option>
                <option value={"رقيب اول"}>رقيب اول</option>
                <option value={"عريف"}>عريف</option>
                <option value={"عريف اول"}>عريف اول</option>
                <option value={"مساعد شرطة"}>مساعد شرطة</option>
                <option value={"مندوب شرطة"}>مندوب شرطة</option>
                <option value={"امين شرطة"}>امين شرطة</option>
                <option value={"امين شرطة اول"}>امين شرطة اول</option>
                <option value={"امين شرطة ممتاز"}>امين شرطة ممتاز</option>
              </select>
              {errors.officerRankRequired && (
                <span className="text-danger">من فضلك اختر الدرجة*</span>
              )}
            </div>
          </div>
          <div class="row p-2">
            {/* <div class="form-group col-md-6 p-2">
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
            </div> */}
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

export default DataEntrySignUp;
