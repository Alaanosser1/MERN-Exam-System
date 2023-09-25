import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import PlacementOptions from "./PlacementOptions";
import StudentSearch from "./StudentsSearch";
import UpdateExamineeFitnessMeasurement from "../../components/UpdateExamineeFitnessMeasurement";

const Placement = () => {
  useEffect(() => {
    getPlacements();
  }, []);

  const [subClubfitnessLeveMeasurement, setSubClubfitnessLeveMeasurement] =
    useState([]);
  const [placementId, setPlacementId] = useState("");
  const [addPlacement, setAddPlacement] = useState(false);
  const [placementOptions, setPlacementOptions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [editPlacementGrades, setEditPlacementGrades] = useState(false);
  const [students, setStudents] = useState("");
  const [examinee, setExaminee] = useState("");

  const [editSubject, setEditSubject] = useState(false);
  const refOne = useRef(null);
  const { subClubId, mainClubId } = useParams();

  const getPlacements = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/fitnessLevelMeasurement/getAllSubClubFitnessLevelMeasurement`,
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
        console.log(
          res.data.subClubfitnessLeveMeasurement,
          "Fitness Level Measurement"
        );
        setSubClubfitnessLeveMeasurement(
          res.data.subClubfitnessLeveMeasurement
        );
        setSearchResults(res.data.subClubfitnessLeveMeasurement);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={addPlacement} setTrigger={setAddPlacement}>
          <UpdateExamineeFitnessMeasurement
            rerender={getPlacements}
            hidePopup={setAddPlacement}
            examinee={examinee}
          ></UpdateExamineeFitnessMeasurement>
        </Popup>
        <Popup trigger={placementOptions} setTrigger={setPlacementOptions}>
          <PlacementOptions placementId={placementId} />
          {console.log(placementId, "FROM PLACEMENT")}
        </Popup>
      </div>
      <div className="">
        <div className="row" dir="rtl">
          <div className="col-5">
            <label htmlFor="" className="mt-5">
              بحث
            </label>
            <StudentSearch
              content={subClubfitnessLeveMeasurement}
              setSearchResults={setSearchResults}
            />
          </div>
        </div>
        {/* <div dir="rtl" className="row m-3">
          <label htmlFor="">بحث</label>
          <StudentSearch
            content={students}
            setSearchResults={setSearchResults}
          />
        </div> */}

        <table
          dir="rtl"
          className="table mt-2 table-striped border table-responsive-lg"
        >
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="text-center" scope="col">
                الكود
              </th>
              <th className="text-center" scope="col">
                الرتبة
              </th>
              <th className="text-center" scope="col">
                الاسم
              </th>
              <th className="text-center" scope="col">
                اللياقة بداية الفرقة
              </th>
              <th className="text-center" scope="col">
                اللياقة اثناء الفرقة
              </th>
              <th className="text-center" scope="col">
                اللياقة نهاية الفرقة
              </th>
              <th className="text-center" scope="col">
                القوام بداية الفرقة
              </th>
              <th className="text-center" scope="col">
                القوام نهاية الفرقة
              </th>
              <th className="text-center" scope="col">
                الرماية بداية الفرقة
              </th>
              <th className="text-center" scope="col">
                اختبار الرماية
              </th>
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(searchResults).map((placement) => {
              return (
                <>
                  <tr scope="row" key={placement[1].examinee_id}>
                    <td className="text_center">{placement[1].examinee_id}</td>
                    <td className="">{`${placement[1].examinee_rank}`}</td>
                    <td className="">{placement[1].examinee_name}</td>
                    <td className="text-center">
                      {placement[1].fitness_level_before || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].fitness_level_during || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].fitness_level_after || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].texture_before || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].texture_after || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].shooting_level_before || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].shooting_level_test || "_"}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setAddPlacement(true);
                          setExaminee(placement[1]);
                        }}
                        className="btn btn-outline-primary m-2"
                      >
                        تعديل
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Placement;
