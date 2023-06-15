import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import AddExaminee from "./AddExaminee";
import SearchBar from "../../components/SearchBar";
import StudentSearch from "./StudentsSearch";
import ExportStudent from "./ExportStudent";

const Students = () => {
  useEffect(() => {
    getStudents();
  }, []);

  const [students, setStudents] = useState("");
  const [addStudent, setAddStudent] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const refOne = useRef(null);
  const { subClubId } = useParams();
  const [tableArray, setTableArray] = useState();
  const [exportPopup, setExportPopup] = useState(false);

  const getStudents = () => {
    axios
      .get(`http://${process.env.REACT_APP_API_IP}:4000/examinee/getStudents`, {
        params: {
          subClubId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
      .then((res) => {
        console.log(res.data.students, "STUDENTS");
        setStudents(res.data.students);
        setSearchResults(res.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tableToArray = async () => {
    setTableArray([]);
    const trs = document.querySelectorAll("#students-table tr");
    console.log(trs, "TRS");

    for (let tr of trs) {
      let th_td_array = Array.from(tr.cells)
        .filter((cell) => cell.id !== "operations-buttons")
        .map((cell) => cell.innerText);
      setTableArray((tableArray) => [...tableArray, th_td_array]);
    }
    setExportPopup(true);
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={addStudent} setTrigger={setAddStudent}>
          <AddExaminee
            rerender={getStudents}
            hidePopup={setAddStudent}
          ></AddExaminee>
        </Popup>
        <Popup trigger={exportPopup} setTrigger={setExportPopup}>
          <ExportStudent
            setExportPopup={setExportPopup}
            tableArray={tableArray}
            setTableArray={setTableArray}
            searchResults={searchResults}
          />
        </Popup>
        {/* <Popup trigger={editMainClub} setTrigger={setEditMainClub}>
          <EditMainClub
            rerender={getMainClubs}
            hidePopup={setEditMainClub}
            clubId={clubId}
          ></EditMainClub>
        </Popup> */}
      </div>
      <div className="container list-container mt-5">
        <div className="row" dir="rtl">
          <div className="col-6">
            <h1 className="mt-5">الدارسين</h1>
          </div>
        </div>
        <div dir="rtl" className="row m-3">
          <div className="row">
            <div className="col-6">
              <label htmlFor="">بحث</label>
              <StudentSearch
                content={students}
                setSearchResults={setSearchResults}
              />
            </div>
            <div className="col-3 mt-5">
              <button
                id="export-button"
                onClick={() => {
                  tableToArray();
                }}
                className="btn btn-outline-primary"
              >
                استخراج الي اكسيل
              </button>
            </div>
            <div className="col-3">
              <button
                onClick={() => {
                  setAddStudent(true);
                }}
                className="btn btn-outline-success mt-5"
              >
                اضافة دارس جديد
              </button>
            </div>
          </div>
        </div>

        <table
          dir="rtl"
          className="table mt-2 table-striped border table-responsive-lg"
          id="students-table"
        >
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="text-center" scope="col">
                الكود
              </th>
              <th className="text-center" scope="col">
                الاسم
              </th>
              <th className="text-center" scope="col">
                الصفة
              </th>
              <th className="text-center" scope="col">
                الرتبة
              </th>
              <th className="text-center" scope="col">
                الرقم التعريفي
              </th>
              <th className="text-center" scope="col">
                الجهة التابع لها
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(searchResults).map((student) => {
              return (
                <tr scope="row" key={student[1].club_id}>
                  <td className="text-center">{student[1].examinee_id}</td>
                  <td className="text-center">{student[1].examinee_name}</td>
                  <td className="text-center">
                    {`${student[1].examinee_type}`}
                  </td>
                  <td className="text-center">
                    {student[1].examinee_type == "مدني"
                      ? `___`
                      : `${student[1].examinee_rank}`}
                  </td>
                  <td className="text-center">
                    {student[1].examinee_seniority_number ||
                      student[1].examinee_police_number ||
                      student[1].examinee_civilian_number}
                  </td>
                  <td className="text-center">{student[1].examinee_entity}</td>
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center" id="operations-buttons">
                      <Link to={`/clubs/students/${student[1].examinee_id}`}>
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
                    <td className="text-center" id="operations-buttons">
                      <Link to={`/app/students/${student[1].examinee_id}`}>
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
                    <td className="text-center" id="operations-buttons">
                      <Link to={`/admin/students/${student[1].examinee_id}`}>
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
      <div dir="rtl" className="row">
        <h2>عدد الدارسين: {searchResults.length}</h2>
      </div>
    </>
  );
};

export default Students;
