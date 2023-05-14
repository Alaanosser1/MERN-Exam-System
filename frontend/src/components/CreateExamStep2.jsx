import { React, useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../components/Popup";
import AddQuestionBank from "../components/AddQuestionBank";
import ChooseQuestionsFromQuestionBank from "./ChooseQuestionsFromQuestionBank";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const CreateExamStep2 = (props) => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [addQuestionBankPopup, setAddQuestionBankPopup] = useState(false);
  const [
    chooseQuestionsFromQuestionBankPopup,
    setChooseQuestionsFromQuestionBankPopup,
  ] = useState(false);
  let { examId, mainQuestionBankId } = useParams();
  const [questionBankName, setName] = useState("");
  const [questionBankId, setQuestionBankId] = useState("");
  const [questionBankDescription, setDescription] = useState("");
  const refOne = useRef(null);
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    getQuestionBanks();

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      console.log("outside");
      // setEditQuestionBankPopup(false);
      setAddQuestionBankPopup(false);
    } else {
      console.log("inside");
    }
  };

  const getQuestionBanks = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/questionBank/getQuestionBanks`,
        {
          params: {
            mainQuestionBankId,
          },
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.questionBanks, "QUESTIONBANKS");
        setQuestionBanks(res.data.questionBanks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div dir="rtl" className="container list-container m-5">
        <Popup
          trigger={chooseQuestionsFromQuestionBankPopup}
          setTrigger={setChooseQuestionsFromQuestionBankPopup}
        >
          <ChooseQuestionsFromQuestionBank
            questionBankId={questionBankId}
            examId={props.examId || examId}
          ></ChooseQuestionsFromQuestionBank>
        </Popup>
        <div className="row">
          <div className="col-9">
            <h1 className="mt-5">اختر المادة</h1>
          </div>
          <div className="col-3">
            {JSON.parse(localStorage.getItem("instructor-token")) && (
              <button
                onClick={() => {
                  navigate("/app/mainClubExams");
                }}
                className="mt-5 w-75 btn btn-outline-success"
              >
                {" "}
                انتهاء
              </button>
            )}
            {JSON.parse(localStorage.getItem("data-entry-token")) && (
              <button
                onClick={() => {
                  navigate("/clubs/mainClubExams");
                }}
                className="mt-5 w-75 btn btn-outline-success"
              >
                {" "}
                انتهاء
              </button>
            )}
            {JSON.parse(localStorage.getItem("admin-token")) && (
              <button
                onClick={() => {
                  navigate("/admin/mainClubExams");
                }}
                className="mt-5 w-75 btn btn-outline-success"
              >
                {" "}
                انتهاء
              </button>
            )}
          </div>
        </div>

        <table className="table mt-5 table-striped border table-responsive-lg">
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
                عدد الاسئلة
              </th>
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(questionBanks).map((bank) => {
              return (
                <tr scope="row" key={bank[1].question_bank_id}>
                  {/* <th scope="row">{bank[1].question_bank_id}</th> */}
                  <td className="text-center">{bank[1].question_bank_name}</td>
                  <td className="text-center">
                    {bank[1].question_bank_description}
                  </td>
                  <td className="text-center">{bank[1].NumberOfQuestions}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setChooseQuestionsFromQuestionBankPopup(true);
                        setQuestionBankId(bank[1].question_bank_id);
                      }}
                      className="btn btn-outline-primary m-2"
                    >
                      الاسئلة
                    </button>
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
export default CreateExamStep2;
