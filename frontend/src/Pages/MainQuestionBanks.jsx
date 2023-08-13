import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "../components/Popup";
import AddQuestionBank from "../components/AddQuestionBank";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import AddMainQuestionBank from "../components/AddMainQuestionBank";
// import * as dotenv from "dotenv";
// dotenv.config({ path: "/Users/Nosser/Desktop/Exam-System/frontend/.env" });

export default function MainQuestionBanks() {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [addQuestionBankPopup, setAddQuestionBankPopup] = useState(false);
  const [editQuestionBankPopup, setEditQuestionBankPopup] = useState(false);
  const [questionBankName, setName] = useState("");
  const [questionBankId, setQuestionBankId] = useState("");
  const [questionBankDescription, setDescription] = useState("");
  const refOne = useRef(null);
  const refTwo = useRef(null);
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    getQuestionBanks();

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      setEditQuestionBankPopup(false);
    } else {
    }
    if (!refTwo.current.contains(e.target)) {
      setAddQuestionBankPopup(false);
    } else {
    }
  };

  const getQuestionBanks = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/mainQuestionBank/getMainQuestionBanks`,
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.questionBanks, "MAINQUESTIONBANKS");
        setQuestionBanks(res.data.questionBanks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteQuestionBank = (questionBank) => {
    Swal.fire({
      title: `هل انت متأكد من مسح هذا البنك`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `http://${process.env.API_IP}:4000/mainQuestionBank/deleteMainQuestionBank`,
            {
              params: {
                questionBankId: questionBank.main_question_bank_id,
              },
              headers: {
                "auth-token": user.token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            getQuestionBanks();
          });
      }
    });
  };

  const editQuestionBankHandler = () => {
    console.log(questionBankId);
    axios
      .put(
        `http://${process.env.REACT_APP_API_IP}:4000/mainQuestionBank/editMainQuestionBank`,
        {
          questionBankId,
          questionBankName,
          questionBankDescription,
        },
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        getQuestionBanks();
        setEditQuestionBankPopup(false);
      });
  };
  return (
    <>
      <div dir="rtl" className="container list-container mt-2">
        <div ref={refTwo}>
          <Popup
            trigger={addQuestionBankPopup}
            setTrigger={setAddQuestionBankPopup}
          >
            <AddMainQuestionBank
              rerender={getQuestionBanks}
              hidePopup={setAddQuestionBankPopup}
            ></AddMainQuestionBank>
          </Popup>
        </div>
        <div ref={refOne}>
          <Popup
            trigger={editQuestionBankPopup}
            setTrigger={setEditQuestionBankPopup}
          >
            <div className="container">
              <h1>تعديل بنك الاسئلة</h1>
              <form onSubmit={handleSubmit(editQuestionBankHandler)}>
                <input
                  autoFocus
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="الاسم"
                  aria-label=".form-control-lg example"
                  {...register("nameRequired", { required: true })}
                  onChange={(e) => {
                    setName(e.target.value);
                    console.log(e.target.value);
                  }}
                />

                {errors.nameRequired && (
                  <span className="text-danger">من فضلك ادخل الاسم*</span>
                )}

                <input
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="الوصف"
                  aria-label=".form-control-lg example"
                  {...register("descriptionRequired", { required: true })}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    console.log(e.target.value);
                  }}
                />

                {errors.descriptionRequired && (
                  <span className="text-danger">من فضلك ادخل الوصف*</span>
                )}

                <br></br>
                <button type="submit" className="btn btn-primary mt-3 w-25">
                  اضافة
                </button>
              </form>
            </div>
          </Popup>
        </div>
        <div className="row">
          <h1 className="text-center text-primary">بنوك الاسئلة</h1>
        </div>
        <div className="row">
          <div dir="" className="col-3">
            <button
              onClick={() => {
                setAddQuestionBankPopup(true);
              }}
              className="btn btn-success mt-5"
            >
              اضافة بنك اسئلة جديد
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
                عدد بنوك الاسئلة
              </th>
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
                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/app/mainQuestionBanks/${bank[1].main_question_bank_id}`}
                      >
                        <button className="btn btn-outline-primary m-2">
                          عرض
                        </button>
                      </Link>
                      <button
                        className="btn btn-outline-danger m-2"
                        onClick={() => {
                          deleteQuestionBank(bank[1]);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => {
                          setEditQuestionBankPopup(true);
                          setQuestionBankId(bank[1].main_question_bank_id);
                          console.log(questionBankId);
                        }}
                        className="btn btn-outline-info m-2"
                      >
                        تعديل
                      </button>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/clubs/mainQuestionBanks/${bank[1].main_question_bank_id}`}
                      >
                        <button className="btn btn-outline-primary m-2">
                          عرض
                        </button>
                      </Link>
                      <button
                        className="btn btn-outline-danger m-2"
                        onClick={() => {
                          deleteQuestionBank(bank[1]);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => {
                          setEditQuestionBankPopup(true);
                          setQuestionBankId(bank[1].main_question_bank_id);
                          console.log(questionBankId);
                        }}
                        className="btn btn-outline-info m-2"
                      >
                        تعديل
                      </button>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/admin/mainQuestionBanks/${bank[1].main_question_bank_id}`}
                      >
                        <button className="btn btn-outline-primary m-2">
                          عرض
                        </button>
                      </Link>
                      <button
                        className="btn btn-outline-danger m-2"
                        onClick={() => {
                          deleteQuestionBank(bank[1]);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => {
                          setEditQuestionBankPopup(true);
                          setQuestionBankId(bank[1].main_question_bank_id);
                          console.log(questionBankId);
                        }}
                        className="btn btn-outline-info m-2"
                      >
                        تعديل
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
