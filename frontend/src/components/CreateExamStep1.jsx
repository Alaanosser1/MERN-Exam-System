import { React, useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../components/Popup";
import AddQuestionBank from "../components/AddQuestionBank";
import ChooseQuestionsFromQuestionBank from "./ChooseQuestionsFromQuestionBank";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const CreateExamStep1 = (props) => {
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
  const user = JSON.parse(localStorage.getItem("instructor-token"));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getQuestionBanks();
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
        "http://localhost:4000/mainQuestionBank/getMainQuestionBanks" ||
          "http://192.168.1.10:4000/mainQuestionBank/getMainQuestionBanks",

        {
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
        <div className="row">
          <div className="col-9">
            <h1 className="mt-5">اختر بنك االاسئلة</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                navigate("/app/exams");
              }}
              className="mt-5 w-75 btn btn-outline-success"
            >
              {" "}
              انتهاء
            </button>
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
                <tr scope="row" key={bank[1].main_question_bank_id}>
                  {/* <th scope="row">{bank[1].question_bank_id}</th> */}
                  <td className="text-center">
                    {bank[1].main_question_bank_name}
                  </td>
                  <td className="text-center">
                    {bank[1].main_question_bank_description}
                  </td>
                  <td className="text-center">
                    {bank[1].NumberOfQuestionBanks}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/App/exams/${examId}/mainQuestionBank/${bank[1].main_question_bank_id}/addQuestions`}
                    >
                      <button
                        onClick={() => {}}
                        className="btn btn-outline-primary m-2"
                      >
                        المواد
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
export default CreateExamStep1;
