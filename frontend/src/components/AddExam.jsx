import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import Swal from "sweetalert2";
import SubClubChoose from "../Pages/SubClubChoose";
import SubjectChoose from "../Pages/SubjectChoose";

const AddExam = (props) => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [mainClubs, setMainClubs] = useState("");
  const [mainClubId, setMainClubId] = useState("");
  const [subClubId, setSubClubId] = useState("");
  const [subClubs, setSubClubs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [showTimeOption, setShowTimeOption] = useState("");
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token"));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMainClubs();
  }, []);

  const apiUrl =
    "http://localhost:4000/exam/createExam" ||
    "http://192.168.1.10:4000/exam/createExam";

  const formSubmit = () => {
    if (startDate >= endDate) {
      Swal.fire({
        icon: "warning",
        title:
          " تأكد ان تاريخ بداية الامتحان يأتي قبل تاريخ نهاية الامتحان وحاول مرة اخري",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "حسناً",
      });
    } else {
      console.log(startDate, endDate);
      axios
        .post(
          apiUrl,
          {
            examName,
            examDescription,
            mainClubId,
            subClubId,
            subjectId,
            showTimeOption,
            startDate: startDate,
            endDate: endDate,
            examTime: endDate - startDate,
          },
          {
            headers: {
              "auth-token": user.token,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data[0].insertId, "SUBMITTED");
          props.setExamId(res.data.data[0].insertId);
          // props.rerender();
          props.setPage(2);
          // props.hidePopup(false);
          setPage(1);
        });
    }
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

  const getSubjects = () => {
    axios
      .get(
        "http://localhost:4000/subClub/getClubSubjects" ||
          "http://192.168.1.10:4000/subClub/getClubSubjects",
        {
          params: {
            subClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        setSubjects(res.data.subjects);
        console.log(subClubId, "SUBCLUBIDIDIDIDID");
        console.log(res.data, "######subjects######");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStartDate = (e) => {
    console.log(e.target);
    // setValue(e.target.value);
  };

  const handleChangeMainCLub = (e) => {
    e.preventDefault();
    setMainClubId(e.target.value);
    getSubClubs(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeShowTimeOption = (e) => {
    e.preventDefault();
    setShowTimeOption(e.target.value);
  };

  return (
    <>
      <div dir="rtl" className="row list-container-add-exam ms-5 mb-5 mt-2 p-5">
        <div className="col-3"></div>
        <div className="col-6 mt-2">
          <h1 className="m-3 text-primary text-center">انشاء امتحان جديد</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <h5 className="m-3 mt-5">الاسم</h5>
            <input
              autoFocus
              className="form-control form-control-lg mt-2"
              type="text"
              aria-label=".form-control-lg example"
              {...register("nameRequired", { required: true })}
              onChange={(e) => {
                setExamName(e.target.value);
                console.log(e.target.value);
              }}
            />
            {errors.nameRequired && (
              <span className="text-danger">من فضلك ادخل الاسم*</span>
            )}
            <h5 className="m-3">الوصف</h5>
            <textarea
              className="form-control form-control-lg mt-2"
              type="text"
              aria-label=".form-control-lg example"
              {...register("descriptionRequired", { required: true })}
              onChange={(e) => {
                setExamDescription(e.target.value);
                console.log(e.target.value);
              }}
            />
            {errors.descriptionRequired && (
              <span className="text-danger">من فضلك ادخل الوصف*</span>
            )}

            <div dir="rtl" className="row mt-5">
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
                  {mainClubs.length > 0 &&
                    mainClubs.map((club) => (
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
                  setSubjects={setSubjects}
                />
              </div>
              <div className="form-group col-md-4 p-2">
                <SubjectChoose
                  subjects={subjects}
                  setSubjectId={setSubjectId}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-md-6 p-2">
                <h5 className="mb-3"> اظهار الوقت المتبقي للدارس</h5>
                <select
                  {...register("showTimeOptionRequired", { required: true })}
                  onChange={handleChangeShowTimeOption}
                  id="inputState"
                  className="form-control w-50"
                >
                  <option selected disabled value={""}></option>
                  <option value={"1"}>نعم</option>
                  <option value={"0"}>لا</option>
                </select>
                {errors.showTimeOptionRequired && (
                  <span className="text-danger">
                    من فضلك اختر امكانية اظهار الوقت *
                  </span>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <h5 className="mb-3"> تاريخ بداية الامتحان </h5>
              <DateTimePicker
                className="form-control"
                locale="ar"
                minDate={new Date()}
                onChange={setStartDate}
                value={startDate}
              />
            </div>
            <div className="row mt-4">
              <h5 className="mb-3"> تاريخ نهاية الامتحان </h5>
              <DateTimePicker
                className="form-control"
                minDate={new Date()}
                locale="ar"
                onChange={setEndDate}
                value={endDate}
              />
            </div>

            <br></br>
            <div className="row d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-primary mt-3 w-25"
              >
                التالي
              </button>
            </div>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
};
export default AddExam;
