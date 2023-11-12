import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../components/Popup";
import UpdateExamineeSubjectsGrades from "../components/UpdateExamineeSubjectsGrades";
import ExportStudent from "./DataEntry/ExportStudent";

const ClubReport = () => {
  useEffect(() => {
    getSubjects();
  }, []);

  const [subjects, setSubjects] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);
  const [grades, setGrades] = useState([]);
  const [clubFitnessLevelMeasurement, setClubFitnessLevelMeasurement] =
    useState([]);
  const [editGrades, setEditGrades] = useState(false);
  const [examinee, setExaminee] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tableArray, setTableArray] = useState();
  const [exportPopup, setExportPopup] = useState(false);
  const refOne = useRef(null);
  const { subClubId } = useParams();

  let totalTheoriticalSubjectsGrades = 0;
  let totalPracticalSubjectsGrades = 0;
  let totalSubjectsGrades = 0;
  let theoreticalTotal = 0;
  let practicalTotal = 0;

  const getSubjects = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubStudentsSubjects`,
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
        console.log(res.data.grades, "GRADES");
        setSubjects(res.data.subjects);
        setSubjectNames(res.data.subClubSubjects);
        // Now you can access subjectNames with updated data
        setSearchResults(res.data.subjects);
        setGrades(res.data.grades);
        setClubFitnessLevelMeasurement(res.data.clubFitnessLevelMeasurement);
        console.log(res.data.clubFitnessLevelMeasurement);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tableToArray = async () => {
    setTableArray([]);
    const trs = document.querySelectorAll("#report-table tr");
    console.log(trs, "TRS");

    for (let tr of trs) {
      let th_td = Array.from(
        tr.querySelectorAll(
          "td:not(#operations-buttons), th:not(#operations-buttons)"
        )
      );
      let th_td_array = th_td.map((tag) => tag.innerText);
      console.log(th_td_array, "HAHAHAHHA");

      // Use await to ensure the state update is complete
      setTableArray((tableArray) => [...tableArray, th_td_array]);
      console.log(tableArray, "TABLETOARRAY");
    }

    setExportPopup(true);
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={exportPopup} setTrigger={setExportPopup}>
          <ExportStudent
            setExportPopup={setExportPopup}
            tableArray={tableArray}
            setTableArray={setTableArray}
            searchResults={searchResults}
          />
        </Popup>
        <Popup trigger={editGrades} setTrigger={setEditGrades}>
          <UpdateExamineeSubjectsGrades
            rerender={getSubjects}
            hidePopup={setEditGrades}
            examinee={examinee}
          ></UpdateExamineeSubjectsGrades>
        </Popup>
        {/* <Popup trigger={editMainClub} setTrigger={setEditMainClub}>
          <EditMainClub
            rerender={getMainClubs}
            hidePopup={setEditMainClub}
            clubId={clubId}
          ></EditMainClub>
        </Popup> */}
      </div>
      <div>
        <div className="row mt-5" dir="rtl">
          <div className="col-10"></div>
          <div className="col-2 mb-2">
            <button onClick={tableToArray} className="btn btn-outline-success">
              استخراج الي اكسيل
            </button>
          </div>
        </div>
        {/* <div dir="rtl" className="row m-3">
          <label htmlFor="">بحث</label>
          <StudentSearch
            content={students}
            setSearchResults={setSearchResults}
          />
        </div> */}
        <div
          className="table-container"
          style={{ width: "100%", overflowX: "auto" }}
        >
          <table
            dir="rtl"
            className="table table-striped border table-responsive-lg reports-table"
            id="report-table"
          >
            <thead>
              <tr className="sticky-row">
                {/* <th scope="col">ID</th> */}
                <th className="text-center" scope="col">
                  الكود
                </th>
                <th className="text-center" scope="col">
                  الرتبة
                </th>
                <th className="text-center " scope="col">
                  الاسم
                </th>
                {Object.values(subjectNames).map((subject) => {
                  if (subject.subject_type === "نظري") {
                    totalTheoriticalSubjectsGrades += subject.subject_grade;
                  } else if (subject.subject_type === "عملي") {
                    totalPracticalSubjectsGrades += subject.subject_grade;
                  }
                  totalSubjectsGrades += subject.subject_grade;
                  return (
                    <th
                      className="text-center vertical-text"
                      scope="col"
                      key={subject.subject_id}
                    >
                      {subject.subject_name} &#40;{subject.subject_type}&#41;
                      &#40;
                      {subject.subject_grade}&#41;
                    </th>
                  );
                })}
                <th className="text-center vertical-text" scope="col">
                  بيان القوام
                </th>
                <th className="text-center vertical-text" scope="col">
                  مجموع الدرجات النظري &#40;
                  {totalTheoriticalSubjectsGrades}&#41;
                </th>
                <th className="text-center vertical-text" scope="col">
                  مجموع الدرجات العملي &#40;
                  {totalPracticalSubjectsGrades}&#41;
                </th>
                <th className="text-center vertical-text" scope="col">
                  المجموع الكلي &#40;
                  {totalSubjectsGrades}&#41;
                </th>
                <th className="text-center vertical-text" scope="col">
                  النسبة
                </th>

                <th className="col" id="operations-buttons" scope="col"></th>
              </tr>
            </thead>
            <tbody>
  {subjects && subjects.length > 0 ? (
    Object.entries(subjects[0]).map((subject) => {
      // Check if the key starts with "مادة " (indicating it's a subject)
      // ...

      // Move the declarations inside the loop to reset for each student
      let theoreticalTotal = 0;
      let practicalTotal = 0;

      return (
        <tr scope="row" key={subject[1].subject_id}>
          <td className="p-2">{subject[1].examinee_id}</td>
          <td className="">{subject[1].examinee_rank}</td>
          <td className="">{subject[1].examinee_name}</td>
          {Object.entries(grades).map(([key, value]) => {
            {
              // console.log(value, "TYPEEEEEEE");
            }
            if (
              subject[1].examinee_id === value.examinee_id &&
              value.examinee_grade
            ) {
              if (value.subject_type === "نظري") {
                theoreticalTotal += value.examinee_grade;
              } else if (value.subject_type === "عملي") {
                practicalTotal += value.examinee_grade;
              }
              return (
                <td className="text-center" key={key}>
                  {value.examinee_grade}
                </td>
              );
            } else if (
              !value.examinee_grade &&
              subject[1].examinee_id === value.examinee_id
            ) {
              return (
                <td className="text-center" key={key}>
                  _
                </td>
              );
            }
          })}
          {Object.entries(clubFitnessLevelMeasurement).map(
            ([key, value]) => {
              {
                // console.log(value, "TYPEEEEEEE");
              }
              if (subject[1].examinee_id === value.examinee_id) {
                // if (value.subject_type === "نظري") {
                //   theoreticalTotal += value.examinee_grade;
                // } else if (value.subject_type === "عملي") {
                //   practicalTotal += value.examinee_grade;
                // }
                return (
                  <>
                    <td className="text-center" key={key}>
                      {value.texture_after || "_"}
                    </td>
                  </>
                );
              } else if (
                !value.examinee_grade &&
                subject[1].examinee_id === value.examinee_id
              ) {
                return (
                  <td className="text-center" key={key}>
                    _
                  </td>
                );
              }
            }
          )}
        
          <td className="text-center">{theoreticalTotal}</td>
          <td className="text-center">{practicalTotal}</td>
         
          <td className="text-center">
            {theoreticalTotal + practicalTotal}
          </td>
          <td className="text-center">
            {(
              ((theoreticalTotal + practicalTotal) /
                totalSubjectsGrades) *
              100
            ).toFixed(1)}
            %
          </td>

          <td id="operations-buttons" className="">
            <button
              onClick={() => {
                setEditGrades(true);
                setExaminee(subject[1]);
              }}
              className="btn btn-outline-primary m-2"
            >
              تعديل
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="4">No subjects available</td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </>
  );
};

export default ClubReport;
