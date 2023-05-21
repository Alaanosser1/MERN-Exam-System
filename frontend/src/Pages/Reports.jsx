import { useState, React, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ExportStudent from "../Pages/DataEntry/ExportStudent";
import Popup from "../components/Popup";

const Reports = () => {
  const [reports, setReports] = useState("");
  const [tableArray, setTableArray] = useState();
  const [exportPopup, setExportPopup] = useState(false);

  useEffect(() => {
    getReports();
  }, []);
  const getReports = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/evaluate/getExamsReport`,
        {
          // headers: {
          //   "auth-token": user.token,
          // },
        }
      )
      .then((res) => {
        console.log(res.data.reports, "reports");
        setReports(res.data.reports);
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
      <Popup trigger={exportPopup} setTrigger={setExportPopup}>
        <ExportStudent
          setExportPopup={setExportPopup}
          tableArray={tableArray}
          setTableArray={setTableArray}
        />
      </Popup>
      <div className="container list-container m-5">
        <div className="row" dir="rtl">
          <div className="col-9">
            <h1 className="mt-5">التقارير</h1>
          </div>
          <div className="col-3">
            <button
              id="export-button"
              onClick={() => {
                tableToArray();
              }}
              className="btn btn-outline-primary mt-5"
            >
              استخراج الي اكسيل
            </button>
          </div>
        </div>

        <table
          dir="rtl"
          className="table mt-5 table-striped border table-responsive-lg"
          id="students-table"
        >
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
                الدرجة
              </th>
              <th className="text-center" scope="col">
                عدد الاسئلة
              </th>
              <th className="text-center" scope="col">
                عدد الممتحنين
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(reports).map((report) => {
              return (
                <tr scope="row" key={report[1].exam_id}>
                  {/* <th scope="row">{bank[1].question_bank_id}</th> */}
                  <td className="text-center">{report[1].exam_name}</td>
                  <td className="text-center">{report[1].exam_description}</td>
                  <td className="text-center">{report[1].exam_grade}</td>
                  <td className="text-center">{report[1].numberOfQuestions}</td>
                  <td className="text-center">
                    {report[1].numberOfExamineesExamined}
                  </td>
                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td id="operations-buttons" className="text-center">
                      <Link to={`/app/reports/${report[1].exam_id}`}>
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td id="operations-buttons" className="text-center">
                      <Link to={`/clubs/reports/${report[1].exam_id}`}>
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td id="operations-buttons" className="text-center">
                      <Link to={`/admin/reports/${report[1].exam_id}`}>
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
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
};

export default Reports;
