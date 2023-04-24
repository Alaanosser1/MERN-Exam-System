import { React, useEffect, useState, useRef } from "react";
import AddExam from "./AddExam";
import CreateExamStep1 from "./CreateExamStep1";
import CreateExamStep2 from "./CreateExamStep2";
import Popup from "./Popup";

const CreateExamForm = () => {
  const [page, setPage] = useState(1);
  const [examId, setExamId] = useState("");
  const [addExamPopup, setAddExamPopup] = useState(true);

  const pageDisplay = () => {
    if (page === 1) {
      return (
        <AddExam
          hidePopup={setAddExamPopup}
          setPage={setPage}
          setExamId={setExamId}
        ></AddExam>
      );
    }
    if (page === 2) {
      {
        console.log(examId, "FROM EXAM FORM");
      }
      return (
        <CreateExamStep1 setPage={setPage} examId={examId}></CreateExamStep1>
      );
    }
  };
  return (
    <>
      <div className="container">
        <div class=" progress m-5">
          <div
            class={`progress-bar ${page === 1 && "w-0"}
             ${page === 2 && "w-50"} ${page === 3 && "w-100"}   `}
            role="progressbar"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        {pageDisplay()}
      </div>
    </>
  );
};
export default CreateExamForm;
