import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import SubClubChoose from "../SubClubChoose";
import Swal from "sweetalert2";

const AddExaminee = (props) => {
  const [mainClubs, setMainClubs] = useState("");
  const [mainClubId, setMainClubId] = useState("");
  const [subClubId, setSubClubId] = useState("");
  const [subClubs, setSubClubs] = useState([]);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [seniorityNumber, setSeniorityNmuber] = useState("");
  const [policeNumber, setPoliceNumber] = useState("");
  const [codeNumber, setCodeNumber] = useState("");
  const [clubName, setClubName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [rank, setRank] = useState("");
  const [entity, setEntity] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();
  const examId = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMainClubs();
  }, []);

  const formSubmit = () => {
    const formData = new FormData();
    formData.append("img", profilePicture);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("seniorityNumber", seniorityNumber);
    formData.append("policeNumber", policeNumber);
    formData.append("codeNumber", codeNumber);
    formData.append("mainClubId", mainClubId);
    formData.append("subClubId", subClubId);
    formData.append("rank", rank);
    formData.append("entity", entity);
    formData.append("mobileNumber", mobileNumber);

    axios
      .post(
        `
        http://localhost:4000/examinee/addExaminee` ||
          `http://192.168.1.10:4000/examinee/addExaminee
            `,
        formData
      )
      .then((res) => {
        console.log(res, "?????");
        props.hidePopup(false);
        props.rerender();

        // if (res.data.token) {
        //   localStorage.setItem("examinee-token", JSON.stringify(res.data));
        // }
        // // window.open(`/examineeExam/${examId.examId}`, "_blank");
        // navigate(`/ExamineeHome`);
      })
      .catch((err) => {
        if (err.response.status == 400 && type == "فرد") {
          Swal.fire({
            title: "!رقم الشرطة مسجل من قبل",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "حسناً",
          });
        } else if (err.response.status == 400 && type == "ضابط") {
          Swal.fire({
            title: "!رقم الاقدامية مسجل من قبل",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "حسناً",
          });
        } else if (err.response.status == 400 && type == "مدني") {
          Swal.fire({
            title: "!الرقم القومي مسجل من قبل",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "حسناً",
          });
        }
        console.log(err);
      });
  };

  const getMainClubs = () => {
    axios
      .get(
        "http://localhost:4000/mainClub/getMainClubs" ||
          "http://192.168.1.10:4000/mainClub/getMainClubs",
        {
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.clubs, "CLUBS");
        setMainClubs(res.data.clubs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubClubs = (mainClubId) => {
    axios
      .get(
        "http://localhost:4000/subClub/getSubClubs" ||
          "http://192.168.1.10:4000/subClub/getSubClubs",
        {
          params: {
            mainClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.clubs, "SUBCLUBS");
        setSubClubs(res.data.clubs);
        console.log(subClubs, "TYPEs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeType = (e) => {
    e.preventDefault();
    setType(e.target.value);
    setName("");
    setPoliceNumber("");
    setSeniorityNmuber("");
    setCodeNumber("");
    setRank("");
    setEntity("");
    setMobileNumber("");
  };

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
  };
  const imageHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleChangeMainCLub = (e) => {
    e.preventDefault();
    setMainClubId(e.target.value);
    getSubClubs(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div style={{ marginTop: 40 }} dir={"rtl"} className="container ">
        <h2>اضافة دارس جديد</h2>
        <form onSubmit={handleSubmit(formSubmit)} className="">
          <div className="form-row">
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
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">الاسم</h5>
                  <input
                    {...register("nameRequired", { required: true })}
                    onChange={nameHandler}
                    value={name}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.nameRequired && (
                    <span className="text-danger">من فضلك ادخل الاسم*</span>
                  )}
                </div>

                <div className="form-group col-md-4 p-2">
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
                    value={seniorityNumber}
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.seniorityNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم الاقدمية*
                    </span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">الصورة الشخصية</h5>
                  <input
                    {...register("imageRequired", { required: true })}
                    onChange={imageHandler}
                    type="file"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.imageRequired && (
                    <span className="text-danger">
                      من فضلك ادخل الصورة الشخصية*
                    </span>
                  )}
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">رقم المحمول</h5>
                  <input
                    {...register("mobileNumberRequired", {
                      required: true,
                    })}
                    onChange={(e) => {
                      e.preventDefault();
                      setMobileNumber(e.target.value);
                    }}
                    type="tel"
                    value={mobileNumber}
                    pattern="^01[0-2]\d{1,8}$"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.mobileNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم المحمول*
                    </span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3"> الفرقة التخصصية</h5>
                  <select
                    {...register("mainClubRequired", { required: true })}
                    onChange={handleChangeMainCLub}
                    id="inputState"
                    className="form-control"
                  >
                    <option selected disabled value={""}>
                      اختر نوع الفرقة
                    </option>
                    {mainClubs.map((club) => (
                      <option key={club.club_id} value={club.club_id}>
                        {club.club_name}
                      </option>
                    ))}
                  </select>
                  {errors.mainClubRequired && (
                    <span className="text-danger">من فضلك اختر الفرقة *</span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <SubClubChoose
                    subClubs={subClubs}
                    setSubClubId={setSubClubId}
                  />
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
                  <h5 className="mb-3">جهة العمل الحالية</h5>
                  <input
                    {...register("entityRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setEntity(e.target.value);
                    }}
                    value={entity}
                    type="text"
                    className="form-control"
                  />
                  {errors.entityRequired && (
                    <span className="text-danger">
                      من فضلك ادخل جهة العمل الحالية*
                    </span>
                  )}
                </div>
              </div>
              <div className="row w-100 mt-4 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary mt-3 w-25"
                >
                  تسجيل
                </button>
              </div>
            </>
          ) : type == "فرد" ? (
            <>
              <div className="row p-2">
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">الاسم</h5>
                  <input
                    {...register("officerNameRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                    type="text"
                    value={name}
                    className="form-control"
                    id="inputEmail4"
                  />
                  {errors.officerNameRequired && (
                    <span className="text-danger">من فضلك ادخل الاسم*</span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">رقم الشرطة</h5>
                  <input
                    {...register("policeNumberRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setPoliceNumber(e.target.value);
                    }}
                    type="text"
                    value={policeNumber}
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.policeNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم الشرطة*
                    </span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">الصورة الشخصية</h5>
                  <input
                    // {...register("imageRequired", { required: true })}
                    onChange={imageHandler}
                    type="file"
                    className="form-control"
                    id="inputEmail4"
                  />
                  {/* {errors.nameRequired && (
                    <span className="text-danger">
                      من فضلك ادخل الصورة الشخصية*
                    </span>
                  )} */}
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3">رقم المحمول</h5>
                  <input
                    {...register("mobileNumberRequired", {
                      required: true,
                    })}
                    onChange={(e) => {
                      e.preventDefault();
                      setMobileNumber(e.target.value);
                    }}
                    type="tel"
                    value={mobileNumber}
                    pattern="^01[0-2]\d{1,8}$"
                    className="form-control"
                    id="inputPassword4"
                  />
                  {errors.mobileNumberRequired && (
                    <span className="text-danger">
                      من فضلك ادخل رقم المحمول*
                    </span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <h5 className="mb-3"> الفرقة التخصصية</h5>
                  <select
                    {...register("mainClubRequired", { required: true })}
                    onChange={handleChangeMainCLub}
                    id="inputState"
                    className="form-control"
                  >
                    <option selected disabled value={""}>
                      اختر نوع الفرقة
                    </option>
                    {mainClubs.map((club) => (
                      <option key={club.club_id} value={club.club_id}>
                        {club.club_name}
                      </option>
                    ))}
                  </select>
                  {errors.mainClubRequired && (
                    <span className="text-danger">من فضلك اختر الفرقة *</span>
                  )}
                </div>
                <div className="form-group col-md-4 p-2">
                  <SubClubChoose
                    subClubs={subClubs}
                    setSubClubId={setSubClubId}
                  />
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
                  <h5 className="mb-3">جهة العمل الحالية</h5>
                  <input
                    {...register("officerEntityRequired", { required: true })}
                    onChange={(e) => {
                      e.preventDefault();
                      setEntity(e.target.value);
                    }}
                    type="text"
                    value={entity}
                    className="form-control"
                  />
                  {errors.officerEntityRequired && (
                    <span className="text-danger">
                      من فضلك ادخل جهة العمل الحالية*
                    </span>
                  )}
                </div>
              </div>
              <div className="row w-75 mt-4 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary mt-3 w-25"
                >
                  تسجيل
                </button>
              </div>
            </>
          ) : (
            type == "مدني" && (
              <>
                <div className="row p-2">
                  <div className="form-group col-md-4 p-2">
                    <h5 className="mb-3">الاسم</h5>
                    <input
                      {...register("civilianNameRequired", { required: true })}
                      onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                      }}
                      type="text"
                      value={name}
                      className="form-control"
                      id="inputEmail4"
                    />
                    {errors.civilianNameRequired && (
                      <span className="text-danger">من فضلك ادخل الاسم*</span>
                    )}
                  </div>
                  <div className="form-group col-md-4 p-2">
                    <h5 className="mb-3"> الرقم القومي</h5>
                    <input
                      {...register("codeNumberRequired", { required: true })}
                      onChange={(e) => {
                        e.preventDefault();
                        setCodeNumber(e.target.value);
                      }}
                      type="text"
                      value={codeNumber}
                      className="form-control"
                      id="inputPassword4"
                    />
                    {errors.codeNumberRequired && (
                      <span className="text-danger">
                        من فضلك ادخل الرقم القومي *
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-4 p-2">
                    <h5 className="mb-3">الصورة الشخصية</h5>
                    <input
                      // {...register("imageRequired", { required: true })}
                      onChange={imageHandler}
                      type="file"
                      className="form-control"
                      id="inputEmail4"
                    />
                    {/* {errors.nameRequired && (
                    <span className="text-danger">
                      من فضلك ادخل الصورة الشخصية*
                    </span>
                  )} */}
                  </div>
                </div>
                <div className="row p-2">
                  <div className="form-group col-md-4 p-2">
                    <h5 className="mb-3">رقم المحمول</h5>
                    <input
                      {...register("mobileNumberRequired", {
                        required: true,
                      })}
                      onChange={(e) => {
                        e.preventDefault();
                        setMobileNumber(e.target.value);
                      }}
                      type="tel"
                      value={mobileNumber}
                      pattern="^01[0-2]\d{1,8}$"
                      className="form-control"
                      id="inputPassword4"
                    />
                    {errors.mobileNumberRequired && (
                      <span className="text-danger">
                        من فضلك ادخل رقم المحمول*
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-4 p-2">
                    <h5 className="mb-3"> الفرقة التخصصية</h5>
                    <select
                      {...register("mainClubRequired", { required: true })}
                      onChange={handleChangeMainCLub}
                      id="inputState"
                      className="form-control"
                    >
                      <option selected disabled value={""}>
                        اختر نوع الفرقة
                      </option>
                      {mainClubs.map((club) => (
                        <option key={club.club_id} value={club.club_id}>
                          {club.club_name}
                        </option>
                      ))}
                    </select>
                    {errors.mainClubRequired && (
                      <span className="text-danger">من فضلك اختر الفرقة *</span>
                    )}
                  </div>
                  <div className="form-group col-md-4 p-2">
                    <SubClubChoose
                      subClubs={subClubs}
                      setSubClubId={setSubClubId}
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">جهة العمل الحالية</h5>
                    <input
                      {...register("civilianEntityRequired", {
                        required: true,
                      })}
                      onChange={(e) => {
                        e.preventDefault();
                        setEntity(e.target.value);
                      }}
                      type="text"
                      value={entity}
                      className="form-control"
                    />
                    {errors.civilianEntityRequired && (
                      <span className="text-danger">
                        من فضلك ادخل جهة العمل الحالية*
                      </span>
                    )}
                  </div>
                </div>
                <div className="row w-75 mt-4 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-3 w-25"
                  >
                    تسجيل
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

export default AddExaminee;
