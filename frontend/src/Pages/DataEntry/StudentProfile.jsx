import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Popup from "../../components/Popup";
import SubClubChoose from "../SubClubChoose";

const StudentProfile = () => {
  useEffect(() => {
    getStudent();
    getStudentClubs();
    getMainClubs();
  }, []);
  let { studentId } = useParams();
  const [student, setStudent] = useState("");
  const [studentClubs, setStudentClubs] = useState("");
  const [addStudentToClubs, setAddStudentToClub] = useState(false);
  const [mainClubs, setMainClubs] = useState("");
  const [mainClubId, setMainClubId] = useState("");
  const [subClubId, setSubClubId] = useState("");
  const [subClubs, setSubClubs] = useState([]);
  const refOne = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getStudent = () => {
    axios
      .get(
        "http://localhost:4000/examinee/getStudent" ||
          "http://192.168.1.10:4000/examinee/getStudent",
        {
          params: {
            examineeId: studentId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.student, "Student");
        setStudent(res.data.student);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getStudentClubs = () => {
    axios
      .get(
        "http://localhost:4000/examinee/getExamineeClubs" ||
          "http://192.168.1.10:4000/examinee/getExamineeClubs",
        {
          params: {
            examineeId: studentId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.clubs, "Student");
        setStudentClubs(res.data.clubs);
      })
      .catch((error) => {
        console.log(error);
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

  const handleChangeMainCLub = (e) => {
    e.preventDefault();
    setMainClubId(e.target.value);
    getSubClubs(e.target.value);
    console.log(e.target.value);
  };

  const addStudentToClubSubmit = () => {
    axios
      .post(
        `
      http://localhost:4000/examinee/addExamineeToClub` ||
          `http://192.168.1.10:4000/examinee/addExamineeToClub
          `,
        {
          subClubId,
          examineeId: studentId,
        }
      )
      .then((res) => {
        console.log(res);
        setAddStudentToClub(false);
        getStudentClubs();
        // if (res.data.token) {
        //   localStorage.setItem("examinee-token", JSON.stringify(res.data));
        // }
        // // window.open(`/examineeExam/${examId.examId}`, "_blank");
        // navigate(`/ExamineeHome`);
      })
      .catch((err) => {
        if (err.response.status == 409) {
          Swal.fire({
            title: "!هذا الدارس مسجل بالفرقة من قبل",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "حسناً",
          });
        }
        console.log(err);
      });
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={addStudentToClubs} setTrigger={setAddStudentToClub}>
          <form onSubmit={handleSubmit(addStudentToClubSubmit)} className="">
            <div dir="rtl" className="row mt-5">
              <div className="form-group col-md-6 p-2">
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
              <div className="form-group col-md-6 p-2">
                <SubClubChoose
                  subClubs={subClubs}
                  setSubClubId={setSubClubId}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-outline-primary w-25">
                اضافة
              </button>
            </div>
          </form>
        </Popup>
      </div>
      <div
        style={{ marginTop: 50 }}
        className="container student-card-container"
      >
        <div style={{ height: 35 }} className="row bg-primary">
          <h3 dir="rtl" className="text-white">
            بيانات الدارس
          </h3>
        </div>
        {student.length > 0 && (
          <>
            <div className="row mt-4">
              <div className="col-6 d-flex justify-content-center mt-5">
                <img
                  style={{
                    width: 250,
                    height: 250,
                    marginLeft: 100,
                    border: 5,
                  }}
                  src={require(`/Users/Nosser/Desktop/Exam-System/frontend/src/profilePictures/students/student${studentId}.png`)}
                />
              </div>
              <div dir="rtl" className="col-6 mt-4">
                <div className="row mt-3 ms-2">
                  <h4 className="">اسم الدارس: {student[0].examinee_name}</h4>
                </div>
                <div className="row mt-5">
                  <h4>رقم الكود : {student[0].examinee_id}</h4>
                </div>
                <div className="row mt-5">
                  <h4>الصفة : {student[0].examinee_type}</h4>
                </div>
              </div>
            </div>
            {student[0].examinee_type == "مدني" && (
              <div dir="rtl" className="row">
                <div className="col-6">
                  <div className="row">
                    <h4>الرقم القومي: {student[0].examinee_civilian_number}</h4>
                  </div>
                  <div className="row mt-5">
                    <h4>جهة العمل الحالية: {student[0].examinee_entity}</h4>
                  </div>
                </div>
              </div>
            )}
            {student[0].examinee_type == "ضابط" && (
              <div dir="rtl" className="row">
                <div className="col-6">
                  <div className="row ">
                    <h4>الرتبة : {student[0].examinee_rank}</h4>
                  </div>
                  <div className="row mt-5">
                    <h4>
                      رقم الاقدامية: {student[0].examinee_seniority_number}
                    </h4>
                  </div>
                </div>
                <div className="row mt-5">
                  <h4>جهة العمل الحالية: {student[0].examinee_entity}</h4>
                </div>
              </div>
            )}
            {student[0].examinee_type == "فرد" && (
              <div dir="rtl" className="row">
                <div className="col-6">
                  <div className="row">
                    <h4>رقم الشرطة: {student[0].examinee_police_number}</h4>
                  </div>
                  <div className="row mt-5">
                    <h4>جهة العمل الحالية: {student[0].examinee_entity}</h4>
                  </div>
                </div>
                <div className="row mt-5">
                  <h4>الرتبة : {student[0].examinee_rank}</h4>
                </div>
              </div>
            )}
          </>
        )}
        <div dir="rtl" className="row mt-5">
          <hr />
          <div className="row" dir="rtl">
            <div className="col-9">
              <h1 className="">الفرق الملحق بها</h1>
            </div>
            <div className="col-3">
              <button
                onClick={() => {
                  setAddStudentToClub(true);
                }}
                className="btn btn-outline-success"
              >
                اضافة الدارس الي فرقة جديدة
              </button>
            </div>
          </div>
          <table
            dir="rtl"
            className="table mt-3 table-striped border table-responsive-lg"
          >
            <thead>
              <tr>
                {/* <th scope="col">ID</th> */}
                <th className="text-center" scope="col">
                  اسم الفرقة
                </th>
                <th className="text-center" scope="col">
                  الوصف
                </th>
                <th className="text-center" scope="col">
                  رقم الفرقة
                </th>
                <th className="text-center" scope="col">
                  نوع الفرقة
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(studentClubs).map((club) => {
                return (
                  <tr scope="row" key={club[1].club_id}>
                    <td className="text-center">{club[1].sub_club_name}</td>
                    <td className="text-center">
                      {club[1].sub_club_description}
                    </td>
                    <td className="text-center">
                      {`${club[1].sub_club_number}`}
                    </td>
                    <td className="text-center">{club[1].sub_club_type}</td>
                    <td className="text-center">
                      <Link to={`/clubs/students/${club[1].examinee_id}`}>
                        <button className="btn btn-outline-primary">
                          تفاصيل
                        </button>
                      </Link>
                      {/* <button
                      onClick={() => {
                        setEditMainClub(true);
                        setClubId(student[1].club_id);
                      }}
                      className="btn btn-outline-success me-3"
                    >
                      تعديل
                    </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
