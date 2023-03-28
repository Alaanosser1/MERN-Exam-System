import { React, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const ExamineePreExam = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [seniorityNumber, setSeniorityNmuber] = useState("");
  const [policeNumber, setPoliceNumber] = useState("");
  const [codeNumber, setCodeNumber] = useState("");
  const [clubName, setClubName] = useState("");
  const [clubNumber, setClubNumber] = useState("");
  const [rank, setRank] = useState("");
  const [entity, setEntity] = useState("");
  const navigate = useNavigate();
  const examId = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = () => {
    console.log("submitted");
    axios
      .post(`http://localhost:4000/examinee/addExaminee`, {
        name,
        type,
        seniorityNumber,
        policeNumber,
        codeNumber,
        clubNumber,
        clubName,
        rank,
        entity,
      })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          localStorage.setItem("examinee-token", JSON.stringify(res.data));
        }
        window.open(`/examineeExam/${examId.examId}`, "_blank");
        navigate(`/ExamineeHome`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeType = (e) => {
    e.preventDefault();
    setType(e.target.value);
  };

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div
        style={{ marginTop: 100 }}
        dir={"rtl"}
        className="container w-75 landing-container p-2"
      >
        <form onSubmit={handleSubmit(formSubmit)} className="m-4 p-3">
          <div className="form-row p-2">
            <div className="form-group col-md-4">
              <h5 className="mb-3">النوع</h5>
              <select
                onChange={handleChangeType}
                id="inputState"
                className="form-control"
              >
                <option selected value="">
                  اختر النوع
                </option>
                <option value="ضابط">ضابط</option>
                <option value="فرد">فرد</option>
                <option value="مدني">مدني</option>
              </select>
            </div>
          </div>
          {type == "ضابط" ? (
            <>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الاسم</h5>
                  <input
                    {...register("nameRequired", { required: true })}
                    onChange={nameHandler}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.nameRequired && (
                    <span className="text-danger">من فضلك ادخل الاسم*</span>
                  )}
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الاقدامية</h5>
                  <input
                    {...register("seniorityNumberRequired", {
                      required: true,
                    })}
                    onChange={(e) => {
                      e.preventDefault();
                      setSeniorityNmuber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.seniorityNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم الاقدمية*
                    </span>
                  )}
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">اسم الفرقة</h5>
                  <input
                    {...register("clubNameRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setClubName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.clubNameRequired && (
                    <span className="text-danger">
                      من فضلك ادخل اسم الفرقة *
                    </span>
                  )}
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الفرقة</h5>
                  <input
                    {...register("clubNumberRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setClubNumber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.clubNumberRequired && (
                    <span className="text-danger">
                      {" "}
                      من فضلك ادخل رقم الفرقة*
                    </span>
                  )}
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الرتبة</h5>
                  <select
                    {...register("rankRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setRank(e.target.value);
                    }}
                    id="inputState"
                    className="form-control"
                  >
                    <option selected disabled value={""}>
                      اختر الرتبة
                    </option>
                    <option value={"ملازم"}>ملازم</option>
                    <option value={"ملازم اول"}>ملازم اول</option>
                    <option value={"نقيب"}>نقيب</option>
                    <option value={"رائد"}>رائد</option>
                    <option value={"مقدم"}>مقدم</option>
                    <option value={"عقيد"}>عقيد</option>
                    <option value={"عميد"}>عميد</option>
                    <option value={"لواء"}>لواء</option>
                  </select>
                  {errors.rankRequired && (
                    <span className="text-danger">من فضلك اختر الرتبة*</span>
                  )}
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الجهة المسؤولة</h5>
                  <input
                    {...register("entityRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setEntity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.entityRequired && (
                    <span className="text-danger">
                      من فضلك ادخل الجهة المسؤولة*
                    </span>
                  )}
                </div>
              </div>
              <div className="row w-50 mt-4">
                <button type="submit" className="btn btn-primary mt-3 w-25">
                  ابدأ
                </button>
              </div>
            </>
          ) : type == "فرد" ? (
            <>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الاسم</h5>
                  <input
                    {...register("officerNameRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.officerNameRequired && (
                    <span className="text-danger">من فضلك ادخل الاسم*</span>
                  )}
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الشرطة</h5>
                  <input
                    {...register("policeNumberRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setPoliceNumber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.policeNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم الشرطة*
                    </span>
                  )}
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">اسم الفرقة</h5>
                  <input
                    {...register("officerClubNameRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setClubName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.officerClubNameRequired && (
                    <span className="text-danger">
                      من فضلك ادخل اسم الفرقة*
                    </span>
                  )}
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الفرقة</h5>
                  <input
                    {...register("officerClubNumberRequired", {
                      required: true,
                    })}
                    onChange={(e) => {
                      e.preventDefault();
                      setClubNumber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.officerClubNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم الفرقة*
                    </span>
                  )}
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الرتبة</h5>
                  <select
                    {...register("officerRankRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setRank(e.target.value);
                    }}
                    id="inputState"
                    className="form-control"
                  >
                    <option selected disabled value="">
                      اختر الرتبة
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
                    <span className="text-danger">من فضلك اختر الرتبة*</span>
                  )}
                </div>

                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الجهة المسؤولة</h5>
                  <input
                    {...register("officerEntityRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setEntity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.officerEntityRequired && (
                    <span className="text-danger">
                      من فضلك ادخل الجهة المسؤولة*
                    </span>
                  )}
                </div>
              </div>
              <div className="row w-50 mt-4">
                <button type="submit" className="btn btn-primary mt-3 w-25">
                  ابدأ
                </button>
              </div>
            </>
          ) : (
            type == "مدني" && (
              <>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">الاسم</h5>
                    <input
                      {...register("civilianNameRequired", { required: true })}
                      onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="الاسم"
                    />
                    {errors.civilianNameRequired && (
                      <span className="text-danger">من فضلك ادخل الاسم*</span>
                    )}
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">رقم الكود</h5>
                    <input
                      {...register("codeNumberRequired", { required: true })}
                      onChange={(e) => {
                        e.preventDefault();
                        setCodeNumber(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="رقم الكود"
                    />
                    {errors.codeNumberRequired && (
                      <span className="text-danger">
                        من فضلك ادخل رقم الكود*
                      </span>
                    )}
                  </div>
                </div>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">اسم الفرقة</h5>
                    <input
                      {...register("civilianClubNameRequired", {
                        required: true,
                      })}
                      onChange={(e) => {
                        e.preventDefault();
                        setClubName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="اسم الفرقة"
                    />
                    {errors.civilianClubNameRequired && (
                      <span className="text-danger">
                        من فضلك ادخل الجهة المسؤولة*
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">رقم الفرقة</h5>
                    <input
                      {...register("civilianClubNumberRequired", {
                        required: true,
                      })}
                      onChange={(e) => {
                        e.preventDefault();
                        setClubNumber(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="رقم الفرقة"
                    />
                    {errors.civilianClubNumberRequired && (
                      <span className="text-danger">
                        من فضلك ادخل رقم الفرقة*
                      </span>
                    )}
                  </div>
                </div>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">الجهة المسؤولة</h5>
                    <input
                      {...register("civilianEntityRequired", {
                        required: true,
                      })}
                      onChange={(e) => {
                        e.preventDefault();
                        setEntity(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="الجهة المسؤولة"
                    />
                    {errors.civilianEntityRequired && (
                      <span className="text-danger">
                        من فضلك ادخل الجهة المسؤولة*
                      </span>
                    )}
                  </div>
                </div>
                <div className="row w-50 mt-4">
                  <button type="submit" className="btn btn-primary mt-3 w-25">
                    ابدأ
                  </button>
                </div>
              </>
            )
          )}
        </form>
      </div>
    </>
  );
};

export default ExamineePreExam;
