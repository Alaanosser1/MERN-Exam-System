import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import AddExaminee from "./AddExaminee";
import StudentSearch from "./StudentsSearch";
import ExportStudent from "./ExportStudent";

const Students = () => {
  useEffect(() => {
    getStudents();
    setCurrentPage(1);
  }, []);

  const [students, setStudents] = useState("");
  const [addStudent, setAddStudent] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [tableArray, setTableArray] = useState();
  const [exportPopup, setExportPopup] = useState(false);
  const [page, setPage] = useState(2);
  const refOne = useRef(null);
  const { subClubId } = useParams();
  const pageSize = 50; // Number of records per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(searchResults.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
      {console.log(currentPage)}
      <div className="container list-container">
        <div className="row" dir="rtl">
          <h1 className="text-center text-primary">الدارسين</h1>
        </div>
        <div className="container">
          <div className="row pagination-row g-0">
            <div className="col-2 m-1">
              <button
                onClick={() => setPage(0)}
                className={`w-100 btn ${
                  page == 0 ? "btn-primary" : "btn-outline-primary"
                } `}
              >
                مدنين
              </button>
            </div>
            <div className="col-2 m-1">
              <button
                onClick={() => setPage(1)}
                className={`w-100 btn ${
                  page == 1 ? "btn-primary" : "btn-outline-primary"
                } `}
              >
                افراد
              </button>
            </div>
            <div className="col-2 m-1">
              <button
                onClick={() => setPage(2)}
                className={`w-100 btn ${
                  page == 2 ? "btn-primary" : "btn-outline-primary"
                } `}
              >
                ضباط
              </button>
            </div>
            {/* <div className="col-2">
            <button className="w-100 btn-outline-primary">test</button>
          </div> */}
          </div>
        </div>
        <hr />
        <div dir="rtl" className="row mt-1">
          <div className="col-3 mb-2">
            <label htmlFor="">بحث</label>
            <StudentSearch
              content={students}
              setSearchResults={setSearchResults}
              resetPagination={setCurrentPage}
            />
          </div>
          <div className="col-4 ">
            <h2 className="mt-4 text-end">
              عدد الدارسين: {searchResults.length}
            </h2>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <button
              id="export-button"
              onClick={() => {
                tableToArray();
              }}
              className="btn btn-outline-primary h-50 mt-4"
            >
              استخراج الي اكسيل
            </button>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button
              onClick={() => {
                setAddStudent(true);
              }}
              className="btn btn-outline-success h-50 mt-4"
            >
              اضافة دارس جديد
            </button>
          </div>
        </div>

        <table
          dir="rtl"
          className="table  table-striped border table-responsive-lg"
          id="students-table"
        >
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="" scope="col">
                الكود
              </th>
              <th className="" scope="col">
                الاسم
              </th>
              <th className="" scope="col">
                الصفة
              </th>
              <th className="" scope="col">
                الرتبة
              </th>
              <th className="" scope="col">
                الرقم التعريفي
              </th>
              <th className="" scope="col">
                الجهة التابع لها
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchResults.slice(startIndex, endIndex).map((student) => {
              console.log(student);
              if (student.examinee_type === "ضابط" && page === 2) {
                return (
                  <tr scope="row" key={student.club_id}>
                    <td className="">{student.examinee_id}</td>
                    <td className="">{student.examinee_name}</td>
                    <td className="">{`${student.examinee_type}`}</td>
                    <td className="">
                      {student.examinee_type == "مدني"
                        ? `___`
                        : `${student.examinee_rank}`}
                    </td>
                    <td className="">
                      {student.examinee_seniority_number ||
                        student.examinee_police_number ||
                        student.examinee_civilian_number}
                    </td>
                    <td className="">{student.examinee_entity}</td>
                    {JSON.parse(localStorage.getItem("data-entry-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/clubs/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                    {JSON.parse(localStorage.getItem("instructor-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/app/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                    {JSON.parse(localStorage.getItem("admin-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/admin/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                  </tr>
                );
              }
              if (student.examinee_type === "فرد" && page === 1) {
                return (
                  <tr scope="row" key={student.club_id}>
                    <td className="text-center">{student.examinee_id}</td>
                    <td className="text-center">{student.examinee_name}</td>
                    <td className="text-center">
                      {`${student.examinee_type}`}
                    </td>
                    <td className="text-center">
                      {student.examinee_type == "مدني"
                        ? `___`
                        : `${student.examinee_rank}`}
                    </td>
                    <td className="text-center">
                      {student.examinee_seniority_number ||
                        student.examinee_police_number ||
                        student.examinee_civilian_number}
                    </td>
                    <td className="text-center">{student.examinee_entity}</td>
                    {JSON.parse(localStorage.getItem("data-entry-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/clubs/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                    {JSON.parse(localStorage.getItem("instructor-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/app/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                    {JSON.parse(localStorage.getItem("admin-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/admin/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                  </tr>
                );
              }
              if (student.examinee_type === "مدني" && page === 0) {
                return (
                  <tr scope="row" key={student.club_id}>
                    <td className="text-center">{student.examinee_id}</td>
                    <td className="text-center">{student.examinee_name}</td>
                    <td className="text-center">
                      {`${student.examinee_type}`}
                    </td>
                    <td className="text-center">
                      {student.examinee_type == "مدني"
                        ? `___`
                        : `${student.examinee_rank}`}
                    </td>
                    <td className="text-center">
                      {student.examinee_seniority_number ||
                        student.examinee_police_number ||
                        student.examinee_civilian_number}
                    </td>
                    <td className="text-center">{student.examinee_entity}</td>
                    {JSON.parse(localStorage.getItem("data-entry-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/clubs/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                    {JSON.parse(localStorage.getItem("instructor-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/app/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                    {JSON.parse(localStorage.getItem("admin-token")) && (
                      <td className="text-center" id="operations-buttons">
                        <Link to={`/admin/students/${student.examinee_id}`}>
                          <button className="btn btn-outline-primary">
                            تفاصيل
                          </button>
                        </Link>
                        {/* <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(student.club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button> */}
                      </td>
                    )}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div dir="rtl" className="row pagination-div-students-list">
          <ul className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Students;
