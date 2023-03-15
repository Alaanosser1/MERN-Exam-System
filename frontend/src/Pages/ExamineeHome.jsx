import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExamineeHome = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getExams();
  }, []);

  const getExams = () => {
    axios
      .get("http://localhost:4000/exam/getExams")
      .then((res) => {
        console.log(res.data.exams, "EXAMS");
        setExams(res.data.exams);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container w-100 h-100 p-5">
        <div className="row me-3 text-end">
          <h1 className="">الامتحانات</h1>
        </div>
        <br />
        <br />
        <div className="row">
          {Object.entries(exams).map((exam) => {
            return (
              <div
                className="col-4 d-flex justify-content-center mb-5"
                key={exam[1].exam_id}
              >
                <div className="card exam-card text-end">
                  <div className="card-body">
                    <h4 className="card-title">
                      {exam[1].exam_name.substring(0, 30)}
                    </h4>
                    <p className="card-text">
                      {exam[1].exam_description.substring(0, 30)}...
                    </p>
                    <br />
                    <div className="row">
                      <Link
                        to={`/app/ExamineeExam/${exam[1].exam_id}`}
                        className="btn btn-outline-primary"
                      >
                        ابدأ الامتحان
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ExamineeHome;
