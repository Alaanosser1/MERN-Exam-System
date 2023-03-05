import { React, useEffect, useState, useRef } from "react";
import AddExam from "./AddExam";
import CreateExamStep2 from "./CreateExamStep2";
import Popup from "./Popup";


const CreateExamForm = () => {
    const [page, setPage] = useState(1);
    const [examId, setExamId] = useState(1);
    const [addExamPopup, setAddExamPopup] = useState(true)


    const pageDisplay = ()=>{
        if(page === 1){
            return(
                <AddExam hidePopup={setAddExamPopup} setPage = {setPage} setExamId = {setExamId}>LOL</AddExam>
            )
        }
        if(page === 2){
            {console.log(examId, "FROM EXAM FORM")}
            return(
                <CreateExamStep2 examId = {examId}></CreateExamStep2>
            )
        }
    }
  return (
    <>
    {pageDisplay()}
    </>
  )
}
export default CreateExamForm