import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const EnterPlacementGrades = () => {
  useEffect(() => {
    getClubStudents();
    getPlacement();
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  const [placement, setPlacements] = useState([]);
  const { subClubId, placementId } = useParams();

  const getPlacement = () => {
    axios
      .get(`http://${process.env.REACT_APP_API_IP}:4000/subClub/getPlacement`, {
        params: {
          placementId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
      .then((res) => {
        console.log(placementId);
        console.log(res.data.placement, "Placement");
        setPlacements(res.data.placement);
        // setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClubStudents = () => {
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
        setSearchResults(res.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container list-container">
        {placement.length > 0 && (
          <div dir="rtl" className="row">
            <h2 className="text-center">{placement[0].placement_name}</h2>
          </div>
        )}
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
                الرتبة
              </th>
              <th className="text-center" scope="col">
                الرقم التعريفي
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
                    {student[1].examinee_type == "مدني"
                      ? `___`
                      : `${student[1].examinee_rank}`}
                  </td>
                  <td className="text-center">
                    {student[1].examinee_seniority_number ||
                      student[1].examinee_police_number ||
                      student[1].examinee_civilian_number}
                  </td>
                  <td className="text-center">
                    <label>قبل</label>
                    <input className="ms-2 me-2" type="number" min={0}></input>
                    <label>بعد</label>
                    <input className="ms-2 me-2" type="number" min={0}></input>
                    <button className="btn btn-outline-primary me-4">
                      تعديل
                    </button>
                    <button className="btn btn-outline-success me-2">
                      حفظ
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

export default EnterPlacementGrades;
