import { React, useState } from "react";
import { useParams } from "react-router-dom";
import Students from "../components/Students";
import Subjects from "../components/Subjects";

const SubClubDashboard = () => {
  const [page, setPage] = useState();
  const [examId, setExamId] = useState("");
  const [addExamPopup, setAddExamPopup] = useState(true);

  const pageDisplay = () => {
    if (page === 1) {
      return (
        <Students
          hidePopup={setAddExamPopup}
          setPage={setPage}
          setExamId={setExamId}
        ></Students>
      );
    }
    if (page === 2) {
      return <Subjects setPage={setPage} examId={examId}></Subjects>;
    }
  };
  return (
    <>
      <div className="container">
        <div className="row pagination-row g-0">
          <div className="col-2 m-1">
            <button
              onClick={() => setPage(1)}
              className="w-100 btn btn-outline-primary"
            >
              المواد
            </button>
          </div>
          <div className="col-2">
            <button
              onClick={() => setPage(2)}
              className="w-100 btn btn-outline-primary"
            >
              الملتحقين بالفرقة
            </button>
          </div>
          {/* <div className="col-2">
            <button className="w-100 btn-outline-primary">test</button>
          </div> */}
        </div>
        {pageDisplay()}
      </div>
    </>
  );
};

export default SubClubDashboard;
