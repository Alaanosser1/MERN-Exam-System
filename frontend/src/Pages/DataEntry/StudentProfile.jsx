import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Popup from "../../components/Popup";
import SubClubChoose from "../SubClubChoose";
import ExamineePlacementBefore from "./ExamineePlacementBefore";
import ListExamineePlacement from "./ListExamineePlacement";
import EditPoliceOfficer from "../../components/editStudentData/EditPoliceOfficer";
import html2pdf from "html2pdf.js";
import {
  PDFDownloadLink,
  Font,
  Page,
  Text,
  Document,
} from "@react-pdf/renderer";

import "jspdf-autotable";

// import "jspdf-arabic";

const StudentProfile = () => {
  useEffect(() => {
    getStudent();
    getStudentClubs();
    getMainClubs();
    getPlacements();
  }, []);

  let { studentId, currentSubClubId } = useParams();
  const [student, setStudent] = useState("");
  const [studentClubs, setStudentClubs] = useState("");
  const [addStudentToClubs, setAddStudentToClub] = useState(false);
  const [mainClubs, setMainClubs] = useState("");
  const [placements, setPlacements] = useState("");
  const [mainClubId, setMainClubId] = useState("");
  const [subClubId, setSubClubId] = useState("");
  const [subClubs, setSubClubs] = useState([]);
  const [placementId, setPlacementId] = useState("");
  const [placementOptions, setPlacementOptions] = useState(false);
  const [editStudentData, setEditStudentData] = useState(false);
  const [listPlacementOptions, setListPlacementOptions] = useState(false);
  const refOne = useRef(null);
  let pdfContent;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));

  console.log(process.env.REACT_APP_STUDENT_IMAGE_PATH, "PAATH");

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudentClubs = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/examinee/getExamineeClubs`,
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
        `http://${process.env.REACT_APP_API_IP}:4000/mainClub/getMainClubs`,
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
      .get(`http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubs`, {
        params: {
          mainClubId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
      .then((res) => {
        console.log(res.data.clubs, "SUBCLUBS");
        setSubClubs(res.data.clubs);
        console.log(subClubs, "TYPEs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPlacements = () => {
    console.log(currentSubClubId);
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubPlacements`,
        {
          params: {
            subClubId: currentSubClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.placements, "Placements");
        setPlacements(res.data.placements);
        // setSearchResults(res.data.subjects);
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
        `http://${process.env.REACT_APP_API_IP}:4000/examinee/addExamineeToClub
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

  // Font.register({
  //   family: "NotoNaskhArabic",
  //   src: `${process.env.REACT_APP_ARABIC_FONT}`,
  // });

  const downloadStudentInfoPDF = (student) => {
    if (student.examinee_type === "ضابط") {
      pdfContent = `
      <div style=" text-align: right; font-size: 20px;">
      <h2 style = "text-align: center;">بيانات الدارس</h2>
      <hr></hr>
        <div style="font-family: Arial;  text-align: right; width: 50%; float: right;">
            <br>
            <p style = "margin = 2px">  اسم الدارس: ${student.examinee_name}</p>
            <br>
            <p style = "margin = 2px">   رقم الكود: ${student.examinee_id}</p>
            <br>
            <p style = "margin = 2px">  الصفة: ${student.examinee_type}</p>
            <br>
            <p style = "margin = 2px">   رقم الاقدامية: ${
              student.examinee_seniority_number
            }</p>
            <br>
            <p style = "margin = 2px">   جهة العمل الحالية: ${
              student.examinee_entity
            }</p>
            <br>
            <p style = "margin = 2px">   الديانة: ${
              student.examinee_religion
            }</p>
            <br>
            <p style = "margin = 2px">  تاريخ الميلاد: ${student.examinee_birth_date.substring(
              0,
              student.examinee_birth_date.indexOf("T")
            )}</p>
            <br>
            <p style = "margin = 2px">  تاريخ الميلاد: ${student.examinee_graduation_date.substring(
              0,
              student.examinee_graduation_date.indexOf("T")
            )}</p>
            <br>
            <br>
        </div>
        <br>
        <div style="font-family: Arial; text-align: right; width: 50%; float: left;">
          <p style = "margin = 2px">   نوع السيارة: ${
            student.examinee_car_type
          }</p>
          <br> 
          <p style = "margin = 2px">  رقم السيارة: ${
            student.examinee_car_number
          }</p>
          <br>
          <p style = "margin = 2px">  الحالة الاجتماعية: ${
            student.relationship_status
          }</p>
          <br>
          <p style = "margin = 2px">  العنوان داخل القاهرة: ${
            student.examinee_address_inside_cairo
          }</p>
          <br>
          <p style = "margin = 2px">   العنوان خارج القاهرة: ${
            student.examinee_address_outside_cairo
          }</p>
          <br>
          <p style = "margin = 2px">  الفرق الحاصل عليها: ${
            student.examinee_previous_clubs
          }</p>
          <br>
          <p style = "margin = 2px">  العمل الذي مارس منذ التخرج: ${
            student.examinee_previous_work_places
          }</p>
          <br>
          <p style = "margin = 2px"> رقم التليفون: ${
            student.examinee_mobile_number
          }</p>
        </div>
      </div>`;
    }
    const opt = {
      margin: [20, 20, 20, 20],
      filename: "arabic_document.pdf",
      image: { type: "pdf", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(pdfContent).save();
  };

  return (
    <>
      <Popup trigger={placementOptions} setTrigger={setPlacementOptions}>
        <ExamineePlacementBefore
          placementId={placementId}
          setClosePlacementOptions={setPlacementOptions}
        />
        {console.log(placementId, "FROM PLACEMENT")}
      </Popup>
      <Popup trigger={editStudentData} setTrigger={setEditStudentData}>
        <EditPoliceOfficer
          setCloseEditStudent={setEditStudentData}
          getStudent={getStudent}
        />
      </Popup>
      <Popup
        trigger={listPlacementOptions}
        setTrigger={setListPlacementOptions}
      >
        <ListExamineePlacement
          placementId={placementId}
          setClosePlacementOptions={setListPlacementOptions}
        />
        {console.log(placementId, "FROM PLACEMENT")}
      </Popup>
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
        style={{ marginTop: "1%" }}
        className="container student-card-container"
        id="student-profile-card"
      >
        <div style={{ height: 35 }} className="row bg-primary text-center">
          <h3 dir="rtl" className="text-white" id="test">
            بيانات الدارس
          </h3>
        </div>
        {student.length > 0 && (
          <>
            <div dir="rtl" className="row">
              <div className="col-6  mt-5 mb-3">
                <img
                  style={{
                    width: 100,
                    height: 100,
                    border: 5,
                  }}
                  src={(() => {
                    console.log(
                      `${process.env.REACT_APP_STUDENT_IMAGE_PATH}/student${studentId}.png`
                    );
                    try {
                      return require(`${process.env.REACT_APP_STUDENT_IMAGE_PATH}/student${studentId}.png`);
                    } catch (error) {
                      return require(`${process.env.REACT_APP_DEFAULT_PP}`);
                    }
                  })()}
                  alt={"لا يوجد صورة شخصية"}
                />
              </div>
              {JSON.parse(localStorage.getItem("admin-token")) &&
                student[0].examinee_type == "ضابط" && (
                  <div className="col-6 mt-5 mb-3 h-25 d-flex justify-content-center">
                    <button
                      onClick={() => setEditStudentData(true)}
                      className="btn btn-outline-primary m-2 mt-5"
                    >
                      تعديل بيانات الدارس
                    </button>

                    <button
                      onClick={() => {
                        downloadStudentInfoPDF(student[0]);
                      }}
                      className="btn btn-outline-primary m-2 mt-5"
                    >
                      طباعة بيانات الدارس
                    </button>
                  </div>
                )}
            </div>
            <hr />
            <div dir="rtl" className="row ms-5" id="student-information">
              <div dir="rtl" className="col-6 mt-4">
                <div className="row mt-3 ms-2">
                  <h4 className="">اسم الدارس: {student[0].examinee_name}</h4>
                </div>

                <div className="row mt-5 mb-5">
                  <h4>الصفة : {student[0].examinee_type}</h4>
                </div>
                {student[0].examinee_type == "مدني" && (
                  <div dir="rtl" className="row">
                    <div className="row test">
                      <h4>
                        الرقم القومي: {student[0].examinee_civilian_number}
                      </h4>
                    </div>
                    <div className="row mt-5">
                      <h4>جهة العمل الحالية: {student[0].examinee_entity}</h4>
                    </div>
                    <div className="row mt-5">
                      {student[0].examinee_birth_date && (
                        <h4>
                          تاريخ الميلاد:{" "}
                          {student[0].examinee_birth_date.substring(
                            0,
                            student[0].examinee_birth_date.indexOf("T")
                          )}
                        </h4>
                      )}
                    </div>
                    <div className="row mt-5">
                      <h4>
                        {" "}
                        العنوان خارج القاهرة :{" "}
                        {student[0].examinee_address_outside_cairo}
                      </h4>
                    </div>
                  </div>
                )}
                {student[0].examinee_type == "ضابط" && (
                  <div dir="rtl" className="row">
                    <div className="row ">
                      <h4>الرتبة : {student[0].examinee_rank}</h4>
                    </div>
                    <div className="row mt-5">
                      <h4>
                        رقم الاقدامية: {student[0].examinee_seniority_number}
                      </h4>
                    </div>

                    <div className="row mt-5">
                      <h4>جهة العمل الحالية: {student[0].examinee_entity}</h4>
                    </div>
                    <div className="row mt-5">
                      {student[0].examinee_birth_date && (
                        <h4>
                          تاريخ الميلاد:{" "}
                          {student[0].examinee_birth_date.substring(
                            0,
                            student[0].examinee_birth_date.indexOf("T")
                          )}
                        </h4>
                      )}
                    </div>
                    <div className="row mt-5">
                      <h4>
                        {" "}
                        العنوان خارج القاهرة :{" "}
                        {student[0].examinee_address_outside_cairo}
                      </h4>
                    </div>
                    <div className="row mt-5">
                      <h4>
                        العمل الذي مارس منذ التخرج :{" "}
                        {student[0].examinee_previous_work_places}
                      </h4>
                    </div>
                    <div className="row mt-5">
                      <h4>
                        رقم التليفون : {student[0].examinee_mobile_number}
                      </h4>
                    </div>
                  </div>
                )}
                {student[0].examinee_type == "فرد" && (
                  <div dir="rtl" className="row">
                    <div className="row">
                      <h4>رقم الشرطة: {student[0].examinee_police_number}</h4>
                    </div>
                    <div className="row mt-5">
                      <h4>الرتبة : {student[0].examinee_rank}</h4>
                    </div>
                    <div className="row mt-5">
                      <h4>جهة العمل الحالية: {student[0].examinee_entity}</h4>
                    </div>
                    <div className="row mt-5">
                      {student[0].examinee_birth_date && (
                        <h4>
                          تاريخ الميلاد:{" "}
                          {student[0].examinee_birth_date.substring(
                            0,
                            student[0].examinee_birth_date.indexOf("T")
                          )}
                        </h4>
                      )}
                    </div>
                    <div className="row mt-5">
                      <h4>
                        {" "}
                        العنوان خارج القاهرة :{" "}
                        {student[0].examinee_address_outside_cairo}
                      </h4>
                    </div>
                    <div className="row mt-5">
                      <h4>
                        العمل الذي مارس منذ التخرج :{" "}
                        {student[0].examinee_previous_work_places}
                      </h4>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-6 mt-5">
                <div className="row">
                  <div className="row ">
                    <h4>رقم الكود : {student[0].examinee_id}</h4>
                  </div>
                  <div className="row mt-5">
                    <h4>
                      {student[0].examinee_birth_date && (
                        <h4>
                          {" "}
                          تاريخ التخرج :
                          {student[0].examinee_graduation_date.substring(
                            0,
                            student[0].examinee_graduation_date.indexOf("T")
                          )}
                        </h4>
                      )}
                    </h4>
                  </div>
                </div>
                <div className="row mt-5">
                  <h4> نوع السيارة : سيارة {student[0].examinee_car_type}</h4>
                </div>
                <div className="row mt-5">
                  <h4> رقم السيارة: {student[0].examinee_car_number}</h4>
                </div>
                <div className="row mt-5">
                  <h4> الديانة : {student[0].examinee_religion}</h4>
                </div>
                <div className="row mt-5">
                  <h4> الحالة الاجتماعية : {student[0].relationship_status}</h4>
                </div>
                <div className="row mt-5">
                  <h4>
                    {" "}
                    العنوان داخل القاهرة :{" "}
                    {student[0].examinee_address_inside_cairo}
                  </h4>
                </div>
                <div className="row mt-5">
                  <h4>
                    الفرق الحاصل عليها :{student[0].examinee_previous_clubs}
                  </h4>
                </div>
              </div>
            </div>
            <div dir="rtl" className="row">
              <div className="col-6"></div>
            </div>
            {placements.length > 0 && (
              <div dir="rtl" className="row mt-5">
                <hr />
                <div className="row">
                  <div className="col-9">
                    <h1 className=""> قياس المستوي</h1>
                  </div>
                </div>
                <table
                  dir="rtl"
                  className="table mt-2 table-striped border table-responsive-lg p-0"
                >
                  <thead>
                    <tr>
                      {/* <th scope="col">ID</th> */}
                      <th className="text-center" scope="col">
                        الاسم
                      </th>
                      <th className="text-center" scope="col">
                        الوصف
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(placements).map((placement) => {
                      return (
                        <tr scope="row" key={placement[1].placement_id}>
                          <td className="text-center">
                            {placement[1].placement_name}
                          </td>
                          <td className="text-center">
                            {`${placement[1].placement_description}`}
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => {
                                setPlacementOptions(true);
                                setPlacementId(placement[1].placement_id);
                              }}
                              className="btn btn-outline-primary ms-2"
                            >
                              ادخال قياس المستوي قبل و بعد
                            </button>
                            <button
                              onClick={() => {
                                setListPlacementOptions(true);
                                setPlacementId(placement[1].placement_id);
                              }}
                              className="btn btn-outline-primary"
                            >
                              عرض
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
                <th></th>
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
                    {JSON.parse(localStorage.getItem("data-entry-token")) && (
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
                    )}
                    {JSON.parse(localStorage.getItem("instructor-token")) && (
                      <td className="text-center">
                        <Link to={`/app/students/${club[1].examinee_id}`}>
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
                    )}
                    {JSON.parse(localStorage.getItem("admin-token")) && (
                      <td className="text-center">
                        <Link to={`/admin/students/${club[1].examinee_id}`}>
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
                    )}
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
