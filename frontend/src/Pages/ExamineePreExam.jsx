import { React, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ExamineePreExam = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [seniorityNumber, setSeniorityNmuber] = useState("");
  const [policeNumber, setPoliceNumber] = useState("");
  const [codeNumber, setCodeNumber] = useState("");
  const [clubName, setClubName] = useState("");
  const [clubNumber, setClubNumber] = useState("");
  const [rank, setRank] = useState("");
  const [entity, setEntity] = useState("");
  const navigate = useNavigate();
  const examId = useParams();

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/examinee/addExaminee`, {
        name,
        type,
        seniorityNumber,
        policeNumber,
        codeNumber,
        clubNumber,
        clubName,
        rank,
        entity,
      })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          localStorage.setItem("examinee-token", JSON.stringify(res.data));
        }
        navigate(`/ExamineeExam/${examId.examId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeType = (e) => {
    e.preventDefault();
    setType(e.target.value);
  };

  return (
    <>
      <div
        style={{ marginTop: 100 }}
        dir={"rtl"}
        className="container w-75 landing-container p-2"
      >
        <form onSubmit={formSubmit} className="m-4 p-3">
          <div className="form-row p-2">
            <div className="form-group col-md-4">
              <h5 className="mb-3">النوع</h5>
              <select
                onChange={handleChangeType}
                id="inputState"
                className="form-control"
              >
                <option selected value="">
                  اختر النوع
                </option>
                <option value="ضابط">ضابط</option>
                <option value="فرد">فرد</option>
                <option value="مدني">مدني</option>
              </select>
            </div>
          </div>
          {type == "ضابط" ? (
            <>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الاسم</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="الاسم"
                  />
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الاقدامية</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setSeniorityNmuber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="رقم الاقدامية"
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">اسم الفرقة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setClubName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="اسم الفرقة"
                  />
                </div>
                <div class="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الفرقة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setClubNumber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="رقم الفرقة"
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الرتبة</h5>
                  <select
                    onChange={(e) => {
                      e.preventDefault();
                      setRank(e.target.value);
                    }}
                    id="inputState"
                    class="form-control"
                  >
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الجهة المسؤولة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setEntity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="الجهة المسؤولة"
                  />
                </div>
              </div>
              <div className="row w-50 mt-4">
                <button type="submit" class="btn btn-primary mt-3 w-25">
                  ابدأ
                </button>
              </div>
            </>
          ) : type == "فرد" ? (
            <>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الاسم</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="الاسم"
                  />
                </div>
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الشرطة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setPoliceNumber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="رقم الشرطة"
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">اسم الفرقة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setClubName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="اسم الفرقة"
                  />
                </div>
                <div class="form-group col-md-6 p-2">
                  <h5 className="mb-3">رقم الفرقة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setClubNumber(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="رقم الفرقة"
                  />
                </div>
              </div>
              <div className="row p-2">
                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الرتبة</h5>
                  <select
                    onChange={(e) => {
                      e.preventDefault();
                      setRank(e.target.value);
                    }}
                    id="inputState"
                    class="form-control"
                  >
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="form-group col-md-6 p-2">
                  <h5 className="mb-3">الجهة المسؤولة</h5>
                  <input
                    onChange={(e) => {
                      e.preventDefault();
                      setEntity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="الجهة المسؤولة"
                  />
                </div>
              </div>
              <div className="row w-50 mt-4">
                <button type="submit" class="btn btn-primary mt-3 w-25">
                  ابدأ
                </button>
              </div>
            </>
          ) : (
            type == "مدني" && (
              <>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">الاسم</h5>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="الاسم"
                    />
                  </div>
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">رقم الكود</h5>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setCodeNumber(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="رقم الكود"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">اسم الفرقة</h5>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setClubName(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="اسم الفرقة"
                    />
                  </div>
                  <div class="form-group col-md-6 p-2">
                    <h5 className="mb-3">رقم الفرقة</h5>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setClubNumber(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="رقم الفرقة"
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="form-group col-md-6 p-2">
                    <h5 className="mb-3">الجهة المسؤولة</h5>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setEntity(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="الجهة المسؤولة"
                    />
                  </div>
                </div>
                <div className="row w-50 mt-4">
                  <button type="submit" class="btn btn-primary mt-3 w-25">
                    ابدأ
                  </button>
                </div>
              </>
            )
          )}
        </form>
      </div>
    </>
  );
};

export default ExamineePreExam;
