import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "../components/Popup";
import AddExam from "../components/AddExam";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Exams = () => {
  const [exams, setExams] = useState("");
  const [addExamPopup, setAddExamPopup] = useState("");
  const [examId, setExamId] = useState("");
  const refOne = useRef(null);
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
      .get("http://localhost:4000/exam/getExams")
      .then((res) => {
        console.log(res.data.exams, "EXAMS");
        setExams(res.data.exams);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteExam = (exam) => {
    Swal.fire({
      title: `Are You Sure You Want to Delete ${exam.exam_name}?`,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`http://localhost:4000/exam/deleteExam`, {
            params: {
              examId: exam.exam_id,
            },
          })
          .then((res) => {
            console.log(res.data);
            getExams();
          });
      }
    });
  };
  return (
    <>
      <div className="container m-5">
        <div ref={refOne}>
          <Popup trigger={addExamPopup} setTrigger={setAddExamPopup}>
            <AddExam rerender={getExams} hidePopup={setAddExamPopup}></AddExam>
          </Popup>
        </div>
        <div className="row">
          <div className="col-9">
            <h1 className="mt-5">Exams</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                setAddExamPopup(true);
              }}
              className="btn btn-success mt-5"
            >
              Add New Exam
            </button>
          </div>
        </div>

        <table className="table mt-5 table-striped border table-responsive-lg">
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="text-center" scope="col">
                Name
              </th>
              <th className="text-center" scope="col">
                Description
              </th>
              <th className="text-center" scope="col">
                Grade
              </th>
              <th className="text-center" scope="col">
                Number of Questions
              </th>
              <th className="text-center" scope="col">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(exams).map((bank) => {
              return (
                <tr scope="row" key={bank[1].exam_id}>
                  {/* <th scope="row">{bank[1].question_bank_id}</th> */}
                  <td className="text-center">{bank[1].exam_name}</td>
                  <td className="text-center">{bank[1].exam_description}</td>
                  <td className="text-center">{bank[1].exam_grade}</td>
                  <td className="text-center">{bank[1].NumberOfQuestions}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => {
                        deleteExam(bank[1]);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/exams/${bank[1].exam_id}`}>
                      <button
                        onClick={() => {
                          // setEditQuestionBankPopup(true);
                          setExamId(bank[1].exam_id);
                          // console.log(questionBankId);
                        }}
                        className="btn btn-primary m-2"
                      >
                        Edit and Preview
                      </button>
                    </Link>
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
