import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
  useEffect(() => {
    getStudent();
  }, []);
  let { studentId } = useParams();
  const [student, setStudent] = useState("");
  const ext = "jpg" || "jpeg" || "png";

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
  return (
    <>
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
                  <div className="row mt-5">
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
                  <div className="row mt-4">
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
                  <div className="row mt-5">
                    <h4>رقم الاقدامية: {student[0].examinee_police_number}</h4>
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
      </div>
    </>
  );
};

export default StudentProfile;
