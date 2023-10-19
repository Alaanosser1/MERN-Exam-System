import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import PlacementOptions from "./PlacementOptions";
import StudentSearch from "./StudentsSearch";
import UpdateExamineeFitnessMeasurement from "../../components/UpdateExamineeFitnessMeasurement";
import ExportStudent from "./ExportStudent";

const Placement = () => {
  useEffect(() => {
    getPlacements();
  }, []);

  const [subClubfitnessLevelMeasurement, setSubClubfitnessLevelMeasurement] =
    useState([]);
  const [placementId, setPlacementId] = useState("");
  const [addPlacement, setAddPlacement] = useState(false);
  const [placementOptions, setPlacementOptions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [examinee, setExaminee] = useState("");
  const [exportPopup, setExportPopup] = useState(false);
  const [tableArray, setTableArray] = useState();
  const refOne = useRef(null);
  const { subClubId } = useParams();

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
          res.data.subClubfitnessLevelMeasurement,
          "Fitness Level Measurement"
        );
        setSubClubfitnessLevelMeasurement(
          res.data.subClubfitnessLevelMeasurement
        );
        setSearchResults(res.data.subClubfitnessLevelMeasurement);
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
        <Popup trigger={exportPopup} setTrigger={setExportPopup}>
          <ExportStudent
            setExportPopup={setExportPopup}
            tableArray={tableArray}
            setTableArray={setTableArray}
            searchResults={searchResults}
          />
        </Popup>
      </div>
      <div className="">
        <div dir="rtl" className="row">
          <label htmlFor="">بحث</label>
          <div className="col-5">
            <StudentSearch
              content={subClubfitnessLevelMeasurement}
              setSearchResults={setSearchResults}
            />
          </div>
          <div dir="ltr" className="col-7">
            <button
              id="export-button"
              onClick={() => {
                tableToArray();
              }}
              className="btn btn-outline-success"
            >
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
        {console.log(subClubfitnessLevelMeasurement, "HAHAHALOLOLO")}
        <table
          dir="rtl"
          className="table mt-2 table-striped border table-responsive-lg"
          id="students-table"
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
              <th className="text-center" scope="col">
                السلوك
              </th>
              <th className="text-center" scope="col">
                المواظبة
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
                    <td className="text-center">
                      {placement[1].behavior || "_"}
                    </td>
                    <td className="text-center">
                      {placement[1].perseverance || "_"}
                    </td>
                    <td id="operations-buttons">
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
