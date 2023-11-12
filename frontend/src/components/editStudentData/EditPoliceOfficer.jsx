import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import ar from "date-fns/locale/ar";
import EntityDropdown from "../../components/EntityDropdown.jsx";

const EditPoliceOfficer = (props) => {
  let { studentId } = useParams();
  const [student, setStudent] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [rank, setRank] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumber2, setMobileNumber2] = useState("");
  const [seniorityNumber, setSeniorityNmuber] = useState("");
  const [entity, setEntity] = useState("");
  const [entityType, setEntityType] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [carType, setCarType] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [birthDateDisplay, setBirthDateDisplay] = useState();
  let newBirthDate;
  const [graduationDate, setGraduationDate] = useState();
  const [graduationDateDisplay, setGraduationDateDisplay] = useState();
  let newGraduationDate;
  const [addressInside, setAddressInside] = useState("");
  const [addressOutside, setAddressOutside] = useState("");
  const [religion, setReligion] = useState("");
  const [financeCode, setFinanceCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [previousClubs, setPreviousClubs] = useState("");
  const [previousWorkPlaces, setPreviousWorkPlaces] = useState("");
  const {
    register,
    setFocus,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = () => {
    axios
      .get(`http://${process.env.REACT_APP_API_IP}:4000/examinee/getStudent`, {
        params: {
          examineeId: studentId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
      .then((res) => {
        console.log(res.data.student, "Student");
        setStudent(res.data.student);
        setName(res.data.student[0].examinee_name);
        setType(res.data.student[0].examinee_type);
        setRank(res.data.student[0].examinee_rank);
        setMobileNumber(res.data.student[0].examinee_mobile_number);
        setMobileNumber2(res.data.student[0].examinee_mobile_number2);
        setSeniorityNmuber(res.data.student[0].examinee_seniority_number);
        setEntity(res.data.student[0].examinee_entity);
        setEntityType(res.data.student[0].examinee_entity_type);
        setCarType(res.data.student[0].examinee_car_type);
        setCarNumber(res.data.student[0].examinee_car_number);
        newBirthDate = new Date(res.data.student[0].examinee_birth_date);
        console.log(res.data.student[0].examinee_birth_date, "DATEFROMDB");
        setBirthDateDisplay(newBirthDate);
        setBirthDate(
          new Date(res.data.student[0].examinee_birth_date)
            .toISOString()
            .split("T")[0]
        );
        console.log(newBirthDate);
        newGraduationDate = new Date(
          res.data.student[0].examinee_graduation_date
        );
        setGraduationDateDisplay(newGraduationDate);
        setGraduationDate(
          new Date(res.data.student[0].examinee_graduation_date)
            .toISOString()
            .split("T")[0]
        );
        console.log(newGraduationDate);

        setAddressInside(res.data.student[0].examinee_address_inside_cairo);
        setAddressOutside(res.data.student[0].examinee_address_outside_cairo);
        setBankName(res.data.student[0].examinee_bank_name);
        setFinanceCode(res.data.student[0].examinee_finance_code);
        setRelationshipStatus(res.data.student[0].relationship_status);
        setReligion(res.data.student[0].examinee_religion);
        setPreviousClubs(res.data.student[0].examinee_previous_clubs);
        setPreviousWorkPlaces(
          res.data.student[0].examinee_previous_work_places
        );
        console.log(student);
        console.log(res.data.student[0].examinee_name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formSubmit = () => {
    console.log(entity);
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/examinee/editPoliceOfficer`,
        {
          examineeId: studentId,
          name,
          type,
          rank,
          mobileNumber,
          mobileNumber2,
          seniorityNumber,
          entity,
          entityType,
          carType,
          carNumber,
          birthDate,
          graduationDate,
          addressInside,
          addressOutside,
          religion,
          financeCode,
          bankName,
          relationshipStatus,
          previousClubs,
          previousWorkPlaces,
        }
      )
      .then((res) => {
        console.log(res, "?????");
        Swal.fire({
          title: "تم تعديل بيانات الدارس بنجاح",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "حسناً",
        }).then(() => {
          props.setCloseEditStudent(false);
          props.getStudent();
        });
      })
      .catch((err) => {
        if (err.response.status == 400) {
          Swal.fire({
            title: "!رقم الشرطة مسجل من قبل",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "حسناً",
          });
        }
        if (err.response.status == 304) {
          Swal.fire({
            title: "تم تعديل بانات الدارس بنجاح",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "حسناً",
          }).then(() => {
            props.setCloseEditStudent(false);
            props.getStudent();
          });
        }
        console.log(err);
      });
  };

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
  };

  const seniorityNumberHandler = (e) => {
    e.preventDefault();
    setSeniorityNmuber(e.target.value);
    console.log(e.target.value);
  };

  const rankHandler = (e) => {
    e.preventDefault();
    setRank(e.target.value);
    console.log(e.target.value);
  };

  const entityHandler = (e) => {
    e.preventDefault();
    setEntity(e.target.value);
    console.log(e.target.value);
  };
  const entityTypeHandler = (e) => {
    e.preventDefault();
    setEntityType(e.target.value);
    console.log(e.target.value);
  };

  const mobileNumberHandler = (e) => {
    e.preventDefault();
    setMobileNumber(e.target.value);
    console.log(e.target.value);
  };

  const mobileNumberHandler2 = (e) => {
    e.preventDefault();
    setMobileNumber2(e.target.value);
    console.log(e.target.value);
  };

  const religionHandler = (e) => {
    e.preventDefault();
    setReligion(e.target.value);
    console.log(e.target.value);
  };

  const financeCodeHandler = (e) => {
    e.preventDefault();
    setFinanceCode(e.target.value);
    console.log(e.target.value);
  };

  const bankNameHandler = (e) => {
    e.preventDefault();
    setBankName(e.target.value);
    console.log(e.target.value);
  };

  const realtionShipStatusHandler = (e) => {
    e.preventDefault();
    setRelationshipStatus(e.target.value);
    console.log(e.target.value);
  };

  const carTypeHandler = (e) => {
    e.preventDefault();
    setCarType(e.target.value);
    console.log(e.target.value);
  };

  const carNumberHandler = (e) => {
    e.preventDefault();
    setCarNumber(e.target.value);
    console.log(e.target.value);
  };

  const handleBirthDate = (birthDate, date) => {
    setBirthDate(birthDate);
    setBirthDateDisplay(date);
    console.log(birthDate);
  };

  const handleGraduationDate = (graduationDate, date) => {
    setGraduationDate(graduationDate);
    setGraduationDateDisplay(date);
    console.log(graduationDate);
  };

  return (
    <>
      <div dir="rtl" className="container mt-4">
        <div className="row text-center">
          <h3 className="text-primary">تعديل بيانات الدارس</h3>
        </div>
        <form onSubmit={handleSubmit(formSubmit)} className="">
          <div className="row p-2">
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">الاسم</h5>
              <input
                // {...register("nameRequired", {
                //   required: true,
                // })}
                required
                onChange={nameHandler}
                value={name}
                type="text"
                className="form-control"
                id="inputEmail4"
              />
              {/* {errors.nameRequired && (
                <span className="text-danger">من فضلك ادخل الاسم*</span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">رقم الاقدامية</h5>
              <input
                // {...register("seniorityNumberRequired", {
                //   required: true,
                // })}
                required
                onChange={seniorityNumberHandler}
                type="text"
                value={seniorityNumber}
                className="form-control"
                id="inputPassword4"
              />
              {/* {errors.seniorityNumberRequired && (
                <span className="text-danger">من فضلك ادخل رقم الاقدمية*</span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">الرتبة</h5>
              <select
                // {...register("rankRequired", { required: true })}
                onChange={rankHandler}
                id="inputState"
                required
                className="form-control"
                value={rank}
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
              {/* {errors.rankRequired && (
                <span className="text-danger">من فضلك اختر الرتبة*</span>
              )} */}
            </div>
          </div>
          <div className="row p-2">
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">جهة العمل الحالية</h5>
              <EntityDropdown value={entity} onChange={setEntity} />
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">نوع جهة العمل </h5>
              <input
                // {...register("entityRequired", { required: true })}
                onChange={entityTypeHandler}
                value={entityType}
                type="text"
                className="form-control"
              />
              {/* {errors.entityRequired && (
                <span className="text-danger">
                  من فضلك ادخل جهة العمل الحالية*
                </span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3"> رقم المحمول ١</h5>
              <input
                // {...register("mobileNumberRequired", {
                //   required: true,
                // })}
                onChange={mobileNumberHandler}
                type="text"
                value={mobileNumber}
                pattern="^(011|012|010|015)\d{8}$"
                className="form-control"
                id="inputPassword4"
              />
              {/* {errors.mobileNumberRequired && (
        <span className="text-danger">
          من فضلك ادخل رقم المحمول*
        </span>
      )} */}
            </div>
          </div>
          <div className="row p-2">
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">رقم المحمول ٢</h5>
              <input
                // {...register("mobileNumberRequired", {
                //   required: true,
                // })}
                onChange={mobileNumberHandler2}
                type="text"
                value={mobileNumber2}
                pattern="^(011|012|010|015)\d{8}$"
                className="form-control"
                id="inputPassword4"
              />
              {/* {errors.mobileNumberRequired && (
        <span className="text-danger">
          من فضلك ادخل رقم المحمول*
        </span>
      )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">تاريخ الميلاد</h5>
              <DatePicker
                // {...register("graduationDateRequired", { required: true })}
                className="form-control"
                locale={ar}
                selected={birthDateDisplay}
                onChange={(date) =>
                  handleBirthDate(
                    new Date(
                      date.getTime() +
                        Math.abs(date.getTimezoneOffset() * 60000)
                    )
                      .toISOString()
                      .split("T")[0],
                    date
                  )
                }
              />
              {/* {errors.graduationDateRequired && (
        <span className="text-danger">
          من فضلك ادخل تاريخ التخرج*
        </span>
      )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">تاريخ التخرج</h5>
              <DatePicker
                // {...register("graduationDateRequired", { required: true })}
                className="form-control"
                locale={ar}
                selected={graduationDateDisplay}
                onChange={(date) =>
                  handleGraduationDate(
                    new Date(
                      date.getTime() +
                        Math.abs(date.getTimezoneOffset() * 60000)
                    )
                      .toISOString()
                      .split("T")[0],
                    date
                  )
                }
              />
              {/* {errors.graduationDateRequired && (
        <span className="text-danger">
          من فضلك ادخل تاريخ التخرج*
        </span>
      )} */}
            </div>
          </div>
          <div className="row p-2">
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3"> رقم الكود المالي</h5>
              <input
                // {...register("financeCodeRequired", { required: true })}
                onChange={financeCodeHandler}
                value={financeCode}
                type="text"
                className="form-control"
              />
              {/* {errors.financeCodeRequired && (
                <span className="text-danger">من فضلك ادخل الكود المالي*</span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3"> اسم البنك</h5>
              <input
                // {...register("bankNameRequired", { required: true })}
                onChange={bankNameHandler}
                value={bankName}
                type="text"
                className="form-control"
              />
              {/* {errors.bankNameRequired && (
                <span className="text-danger">من فضلك ادخل اسم البنك*</span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">الديانة</h5>
              <select
                // {...register("religionRequired", { required: true })}
                onChange={religionHandler}
                id="inputState"
                className="form-control"
                required
                value={religion}
              >
                <option selected disabled value={""}>
                  الديانة
                </option>
                <option value={"مسلم"}> مسلم</option>
                <option value={"مسيحي"}> مسيحي</option>
              </select>
              {/* {errors.religionRequired && (
                <span className="text-danger">من فضلك اختر الديانة*</span>
              )} */}
            </div>
          </div>
          <div className="row p-2">
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">نوع السيارة</h5>
              <select
                // {...register("carTypeRequired", { required: true })}
                onChange={carTypeHandler}
                id="inputState"
                className="form-control"
                value={carType}
              >
                <option selected disabled value={""}>
                  نوع السيارة
                </option>
                <option value={"خاصة"}>سيارة خاصة</option>
                <option value={" شرطة"}>سيارة شرطة</option>
              </select>
              {/* {errors.carTypeRequired && (
                <span className="text-danger">من فضلك اختر نوع السيارة*</span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">رقم السيارة</h5>
              <input
                // {...register("carNumberRequired", { required: true })}
                onChange={carNumberHandler}
                value={carNumber}
                type="text"
                className="form-control"
              />
              {/* {errors.carNumberRequired && (
                <span className="text-danger">من فضلك ادخل رقم السيارة *</span>
              )} */}
            </div>
            <div className="form-group col-md-4 p-2">
              <h5 className="mb-3">الحالة الاجتماعية</h5>
              <select
                // {...register("relationshipStatusRequired", {
                //   required: true,
                // })}
                onChange={realtionShipStatusHandler}
                id="inputState"
                className="form-control"
                value={relationshipStatus}
              >
                <option selected disabled value={""}>
                  الحالة الاجتماعية
                </option>
                <option value={"اعزب"}> اعزب</option>
                <option value={"متزوج"}> متزوج</option>
              </select>
              {/* {errors.relationshipStatusRequired && (
                <span className="text-danger">من فضلك ادخل العنوان*</span>
              )} */}
            </div>
          </div>
          <div className="row p-2">
            <div className="form-group col-md-6 p-2">
              <h5 className="mb-3">الفرق الحاصل عليها</h5>
              <textarea
                // {...register("financeCodeRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setPreviousClubs(e.target.value);
                }}
                value={previousClubs}
                type="text"
                className="form-control"
              />
              {/* {errors.financeCodeRequired && (
        <span className="text-danger">
          من فضلك ادخل   الحالية*
        </span>
      )} */}
            </div>
            <div className="form-group col-md-6 p-2">
              <h5 className="mb-3">العمل الذي مارس منذ التخرج</h5>
              <textarea
                // {...register("financeCodeRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setPreviousWorkPlaces(e.target.value);
                }}
                value={previousWorkPlaces}
                type="text"
                className="form-control"
              />
              {/* {errors.financeCodeRequired && (
        <span className="text-danger">
          من فضلك ادخل جهة العمل الحالية*
        </span>
      )} */}
            </div>
          </div>
          <div className="row p-2">
            <div className="row">
              <h4 className="">العنوان</h4>
            </div>
            <div className="form-group col-md-6 p-2">
              <h5 className="mb-3">العنوان داخل القاهرة</h5>
              <textarea
                // {...register("financeCodeRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setAddressInside(e.target.value);
                }}
                value={addressInside}
                type="text"
                className="form-control"
              />
              {/* {errors.financeCodeRequired && (
        <span className="text-danger">
          من فضلك ادخل   الحالية*
        </span>
      )} */}
            </div>
            <div className="form-group col-md-6 p-2">
              <h5 className="mb-3">العنوان خارج القاهرة</h5>
              <textarea
                // {...register("financeCodeRequired", { required: true })}
                onChange={(e) => {
                  e.preventDefault();
                  setAddressOutside(e.target.value);
                }}
                value={addressOutside}
                type="text"
                className="form-control"
              />
              {/* {errors.financeCodeRequired && (
        <span className="text-danger">
          من فضلك ادخل جهة العمل الحالية*
        </span>
      )} */}
            </div>
          </div>

          <div className="row w-100 mt-4 d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-primary mt-3 w-25">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPoliceOfficer;
