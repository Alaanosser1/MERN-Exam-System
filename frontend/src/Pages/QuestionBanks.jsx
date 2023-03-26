import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "../components/Popup";
import AddQuestionBank from "../components/AddQuestionBank";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function QuestionBanks() {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [addQuestionBankPopup, setAddQuestionBankPopup] = useState(false);
  const [editQuestionBankPopup, setEditQuestionBankPopup] = useState(false);
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
      setEditQuestionBankPopup(false);
      setAddQuestionBankPopup(false);
    } else {
      console.log("inside");
    }
  };

  const getQuestionBanks = () => {
    axios
      .get("http://localhost:4000/questionBank/getQuestionBanks", {
        headers: {
          "auth-token": user.token,
        },
      })
      .then((res) => {
        console.log(res.data.questionBanks, "QUESTIONBANKS");
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
          .delete(`http://localhost:4000/questionBank/deleteQuestionBank`, {
            params: {
              questionBankId: questionBank.question_bank_id,
            },
            headers: {
              "auth-token": user.token,
            },
          })
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
        `http://localhost:4000/questionBank/editQuestionBank`,
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
      <div className="container list-container m-5">
        <div ref={refOne}>
          <Popup
            trigger={addQuestionBankPopup}
            setTrigger={setAddQuestionBankPopup}
          >
            <AddQuestionBank
              rerender={getQuestionBanks}
              hidePopup={setAddQuestionBankPopup}
            ></AddQuestionBank>
          </Popup>
        </div>
        <div ref={refOne}>
          <Popup
            trigger={editQuestionBankPopup}
            setTrigger={setEditQuestionBankPopup}
          >
            <div className="container">
              <h1>Edit Question Bank</h1>
              <form onSubmit={handleSubmit(editQuestionBankHandler)}>
                <input
                  autoFocus
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="Name"
                  aria-label=".form-control-lg example"
                  {...register("nameRequired", { required: true })}
                  onChange={(e) => {
                    setName(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                {errors.nameRequired && (
                  <span className="text-danger">This field is required</span>
                )}
                <input
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="Description"
                  aria-label=".form-control-lg example"
                  {...register("descriptionRequired", { required: true })}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    console.log(e.target.value);
                  }}
                />
                {errors.descriptionRequired && (
                  <span className="text-danger">This field is required</span>
                )}
                <br></br>
                <button type="submit" className="btn btn-primary mt-3 w-25">
                  Add
                </button>
              </form>
            </div>
          </Popup>
        </div>
        <div className="row">
          <div className="col-9">
            <h1 className="mt-5">Question Banks</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                setAddQuestionBankPopup(true);
              }}
              className="btn btn-success mt-5"
            >
              Add New Question Bank
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
                description
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
                    <Link to={`/app/questionBanks/${bank[1].question_bank_id}`}>
                      <button className="btn btn-primary m-2"> View</button>
                    </Link>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => {
                        deleteQuestionBank(bank[1]);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditQuestionBankPopup(true);
                        setQuestionBankId(bank[1].question_bank_id);
                        console.log(questionBankId);
                      }}
                      className="btn btn-info m-2"
                    >
                      Edit
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
}
