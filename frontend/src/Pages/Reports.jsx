import { useState, React, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState("");
  useEffect(() => {
    getReports();
  }, []);
  const getReports = () => {
    axios
      .get(
        "http://localhost:4000/evaluate/getExamsReport" ||
          "http://192.168.1.10:4000/evaluate/getExamsReport",
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

  return (
    <>
      <div className="container list-container m-5">
        <div className="row" dir="rtl">
          <div className="col-9">
            <h1 className="mt-5">التقارير</h1>
          </div>
        </div>

        <table
          dir="rtl"
          className="table mt-5 table-striped border table-responsive-lg"
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
                    <td className="text-center">
                      <Link to={`/app/reports/${report[1].exam_id}`}>
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center">
                      <Link to={`/clubs/reports/${report[1].exam_id}`}>
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td className="text-center">
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
