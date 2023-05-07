import { useState, React, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ExamReportDetails = () => {
  const [examEvaluationStats, setExamEvaluationStats] = useState("");
  let { examId } = useParams();

  useEffect(() => {
    getExamEvaluationStats();
  }, []);
  const getExamEvaluationStats = () => {
    axios
      .get(
        "http://localhost:4000/evaluate/getExamEvaluationStats" ||
          "http://192.168.1.10:4000/evaluate/getExamEvaluationStats",
        {
          // headers: {
          //   "auth-token": user.token,
          // },
          params: {
            examId,
          },
        }
      )
      .then((res) => {
        console.log(res.data.examEvaluationStats, "reportDetails");
        setExamEvaluationStats(res.data.examEvaluationStats);
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
              <th className="text-center" scope="col">
                الاسم
              </th>
              <th className="text-center" scope="col">
                النوع
              </th>
              <th className="text-center" scope="col">
                الرتبة
              </th>
              <th className="text-center" scope="col">
                الرقم التعريفي
              </th>
              <th className="text-center" scope="col">
                الدرجة
              </th>
              <th className="text-center" scope="col">
                عدد الاجابات الصحيحة
              </th>
              <th className="text-center" scope="col">
                عدد الاجابات الخاطئة
              </th>
              <th className="text-center" scope="col">
                النتيجة
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(examEvaluationStats).map((report) => {
              return (
                <tr scope="row" key={report[1].examinee_id}>
                  <td className="text-center">{report[1].examinee_name}</td>
                  <td className="text-center">{report[1].examinee_type}</td>
                  <td className="text-center">{report[1].examinee_rank}</td>
                  {report[1].examinee_type == "ضابط" && (
                    <td className="text-center">
                      {report[1].examinee_seniority_number}
                    </td>
                  )}
                  {report[1].examinee_type == "فرد" && (
                    <td className="text-center">
                      {report[1].examinee_police_number}
                    </td>
                  )}
                  {report[1].examinee_type == "مدني" && (
                    <td className="text-center">
                      {report[1].examinee_civilian_number}
                    </td>
                  )}
                  <td className="text-center">{report[1].exam_grade}</td>
                  <td className="text-center">
                    {report[1].total_correct_answers}
                  </td>
                  <td className="text-center">
                    {report[1].total_wrong_answers}
                  </td>
                  <td className="text-center">{`${report[1].examinee_grade}/${report[1].exam_grade}`}</td>
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/clubs/reports/${report[1].exam_id}/${report[1].examinee_id}`}
                      >
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/app/reports/${report[1].exam_id}/${report[1].examinee_id}`}
                      >
                        <button className="btn btn-outline-success">
                          تفاصيل
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/admin/reports/${report[1].exam_id}/${report[1].examinee_id}`}
                      >
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

export default ExamReportDetails;
