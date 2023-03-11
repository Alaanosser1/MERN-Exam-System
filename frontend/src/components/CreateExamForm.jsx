import { React, useEffect, useState, useRef } from "react";
import AddExam from "./AddExam";
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
      return <CreateExamStep2 examId={examId}></CreateExamStep2>;
    }
  };
  return (
    <>
      <div className="container">
        <div class="progress m-5">
          <div
            class={`progress-bar ${page === 1 && "w-0"} ${
              page === 2 && "w-25"
            }   `}
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
