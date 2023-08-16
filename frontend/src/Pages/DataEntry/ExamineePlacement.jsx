import { React, useState } from "react";
import { useParams } from "react-router-dom";
import ExamineePlacementBefore from "./ExamineePlacementBefore";
import Placement from "./Placement";
import Students from "./Students";
import Subjects from "./Subjects";

const ExamineePlacement = (props) => {
  const [page, setPage] = useState(2);
  const [examId, setExamId] = useState("");
  const [addExamPopup, setAddExamPopup] = useState(true);

  const pageDisplay = () => {
    if (page === 1) {
      return <Subjects setPage={setPage} examId={examId}></Subjects>;
    }
    if (page === 2) {
      return (
        <ExamineePlacementBefore
          placementId={props.placementId}
          setPage={setPage}
          setExamId={setExamId}
          setClosePlacementOptions={props.setClosePlacementOptions}
        ></ExamineePlacementBefore>
      );
    }
    if (page === 3) {
      return (
        <Placement
          hidePopup={setAddExamPopup}
          setPage={setPage}
          setExamId={setExamId}
        ></Placement>
      );
    }
  };
  return (
    <>
      <div className="container">
        <div className="row pagination-row g-0">
          <div className="col-2 m-1">
            <button
              onClick={() => setPage(1)}
              className={`w-100 btn ${
                page == 1 ? "btn-primary" : "btn-outline-primary"
              } `}
            >
              قياس المستوي نهاية الفرقة
            </button>
          </div>
          <div className="col-2 m-1">
            <button
              onClick={() => setPage(2)}
              className={`w-100 btn ${
                page == 2 ? "btn-primary" : "btn-outline-primary"
              } `}
            >
              قياس المستوي بداية الفرقة
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

export default ExamineePlacement;
