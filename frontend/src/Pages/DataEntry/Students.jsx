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
    console.log(tableArray, "TEST");
  }, []);

  const [students, setStudents] = useState("");
  const [addStudent, setAddStudent] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [exportPopup, setExportPopup] = useState(false);
  const refOne = useRef(null);
  const { subClubId, mainClubId } = useParams();
  const [tableArray, setTableArray] = useState();

  const getStudents = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubStudents`,
        {
          params: {
            subClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
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
      let th_td = tr.querySelectorAll("td:not(#operations-buttons)");
      if (th_td.length == 0) {
        th_td = tr.getElementsByTagName("th");
      }
      let th_td_array = Array.from(th_td);
      th_td_array = th_td_array.map((tag) => tag.innerText);
      // console.log(th_td_array, "HAHAHAHHA");
      setTableArray((tableArray) => [...tableArray, th_td_array]);
      // console.log(tableArray, "TABLETOARRAY");
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
      </div>
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
      <div className="container">
        <div dir="rtl" className="row">
          <label htmlFor="">بحث</label>
          <div className="col-6">
            <StudentSearch
              content={students}
              setSearchResults={setSearchResults}
            />
          </div>
          <div dir="rtl" className="col-3">
            <h2>عدد الدارسين: {searchResults.length}</h2>
          </div>
          <div dir="ltr" className="col-3">
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
              <th></th>
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
                  <td id="operations-buttons" className="text-center">
                    {JSON.parse(localStorage.getItem("data-entry-token")) && (
                      <Link
                        to={`/clubs/${mainClubId}/${subClubId}/${student[1].examinee_id}`}
                      >
                        <button className="btn btn-outline-primary">
                          تفاصيل
                        </button>
                      </Link>
                    )}
                    {JSON.parse(localStorage.getItem("instructor-token")) && (
                      <Link
                        to={`/app/${mainClubId}/${subClubId}/${student[1].examinee_id}`}
                      >
                        <button className="btn btn-outline-primary">
                          تفاصيل
                        </button>
                      </Link>
                    )}
                    {JSON.parse(localStorage.getItem("admin-token")) && (
                      <Link
                        to={`/admin/${mainClubId}/${subClubId}/${student[1].examinee_id}`}
                      >
                        <button className="btn btn-outline-primary">
                          تفاصيل
                        </button>
                      </Link>
                    )}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Students;
