import { React, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CreateExamForm from "../components/CreateExamForm";
import Swal from "sweetalert2";
import SearchBar from "../components/SearchBar";

const Exams = () => {
  const [exams, setExams] = useState("");
  const [addExamPopup, setAddExamPopup] = useState("");
  const [examId, setExamId] = useState("");
  const [showCreateExam, setShowCreateExam] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const refOne = useRef(null);
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));
  const { subClubId } = useParams();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    getExams();
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      console.log("outside");
      setAddExamPopup(false);
    } else {
      console.log("inside");
    }
  };

  const getExams = () => {
    axios
      .get(`http://${process.env.REACT_APP_API_IP}:4000/exam/getExamsOfClub`, {
        params: {
          subClubId,
        },
        headers: {
          "auth-token": user.token,
        },
      })
      .then((res) => {
        console.log(res.data.exams, "EXAMS");
        setSearchResults(res.data.exams);
        setExams(res.data.exams);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteExam = (exam) => {
    Swal.fire({
      title: `هل انت متأكد من مسح هذا الامتحان؟`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `http://${process.env.REACT_APP_API_IP}:4000/exam/deleteExam`,
            {
              params: {
                examId: exam.exam_id,
              },
              headers: {
                "auth-token": user.token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            getExams();
            console.log("deleted");
          });
      }
    });
  };
  return (
    <>
      <div dir="rtl" className="container list-container m-5">
        <div ref={refOne}>
          {showCreateExam ? (
            <CreateExamForm
              rerender={getExams}
              hidePopup={setAddExamPopup}
            ></CreateExamForm>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="col-9">
            <h1 className="mt-5">الامتحانات</h1>
          </div>
          <div className="col-3">
            {JSON.parse(localStorage.getItem("instructor-token")) && (
              <Link to={"/app/exams/createExamForm"}>
                <button
                  onClick={() => {
                    setShowCreateExam(true);
                  }}
                  className="btn btn-outline-success mt-5"
                >
                  اضافة امتحان جديد
                </button>
              </Link>
            )}
            {JSON.parse(localStorage.getItem("data-entry-token")) && (
              <Link to={"/clubs/exams/createExamForm"}>
                <button
                  onClick={() => {
                    setShowCreateExam(true);
                  }}
                  className="btn btn-outline-success mt-5"
                >
                  اضافة امتحان جديد
                </button>
              </Link>
            )}
            {JSON.parse(localStorage.getItem("admin-token")) && (
              <Link to={"/admin/exams/createExamForm"}>
                <button
                  onClick={() => {
                    setShowCreateExam(true);
                  }}
                  className="btn btn-outline-success mt-5"
                >
                  اضافة امتحان جديد
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="row m-3">
          <SearchBar content={exams} setSearchResults={setSearchResults} />
        </div>

        <table className="table mt-2 table-striped border table-responsive-lg">
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="text-center" scope="col">
                الاسم
              </th>
              <th className="text-center" scope="col">
                الوصف
              </th>
              <th className="text-center" scope="col">
                المادة
              </th>
              <th className="text-center" scope="col">
                الدرجة
              </th>
              <th className="text-center" scope="col">
                عدد الاسئلة
              </th>
              <th className="text-center" scope="col">
                تاريخ البدء
              </th>
              <th className="text-center" scope="col">
                ساعة البدء
              </th>
              <th className="text-center" scope="col">
                وقت الامتحان
              </th>
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(searchResults).map((bank) => {
              console.log(typeof bank[1].start_date_time);
              return (
                <tr scope="row" key={bank[1].exam_id}>
                  {/* <th scope="row">{bank[1].question_bank_id}</th> */}
                  <td className="text-center">
                    {bank[1].exam_name.substring(0, 30)}
                  </td>
                  <td className="text-center">
                    {bank[1].exam_description.substring(0, 25)}...
                  </td>
                  <td className="text-center">{bank[1].subject_name}</td>
                  <td className="text-center">{bank[1].exam_grade}</td>
                  <td className="text-center">{bank[1].NumberOfQuestions}</td>
                  <td className="text-center">
                    {bank[1].start_date_time.substring(
                      0,
                      bank[1].start_date_time.indexOf("T")
                    )}
                  </td>
                  <td className="text-center">
                    {new Date(bank[1].start_date_time).getHours() > 12
                      ? `${
                          new Date(bank[1].start_date_time).getHours() - 12
                        }:${new Date(
                          bank[1].start_date_time
                        ).getUTCMinutes()} م`
                      : `${new Date(
                          bank[1].start_date_time
                        ).getHours()}:${new Date(
                          bank[1].start_date_time
                        ).getUTCMinutes()} ص`}
                  </td>
                  <td className="text-center"> {bank[1].exam_time} دقيقة</td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-danger m-2"
                      onClick={() => {
                        deleteExam(bank[1]);
                      }}
                    >
                      حذف
                    </button>
                    {JSON.parse(localStorage.getItem("instructor-token")) && (
                      <Link to={`/app/exams/${bank[1].exam_id}`}>
                        <button
                          onClick={() => {
                            // setEditQuestionBankPopup(true);
                            setExamId(bank[1].exam_id);
                            // console.log(questionBankId);
                          }}
                          className="btn btn-outline-primary m-2"
                        >
                          تعديل
                        </button>
                      </Link>
                    )}
                    {JSON.parse(localStorage.getItem("data-entry-token")) && (
                      <Link to={`/clubs/exams/${bank[1].exam_id}`}>
                        <button
                          onClick={() => {
                            // setEditQuestionBankPopup(true);
                            setExamId(bank[1].exam_id);
                            // console.log(questionBankId);
                          }}
                          className="btn btn-outline-primary m-2"
                        >
                          تعديل
                        </button>
                      </Link>
                    )}
                    {JSON.parse(localStorage.getItem("admin-token")) && (
                      <Link to={`/admin/exams/${bank[1].exam_id}`}>
                        <button
                          onClick={() => {
                            // setEditQuestionBankPopup(true);
                            setExamId(bank[1].exam_id);
                            // console.log(questionBankId);
                          }}
                          className="btn btn-outline-primary m-2"
                        >
                          تعديل
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Exams;
