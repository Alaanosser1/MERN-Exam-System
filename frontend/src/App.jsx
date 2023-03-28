import React from "react";
import "./styles/App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./Pages/Home";
import Exams from "./Pages/Exams";
import QuestionBanks from "./Pages/QuestionBanks";
import AddQuestionBank from "./components/AddQuestionBank";
import ViewQuestionBank from "./components/ViewQuestionBank";
import AddQuestion from "./components/AddQuestion";
import EditAndPreviewExam from "./components/EditAndPreviewExam";
import CreateExamForm from "./components/CreateExamForm";
import CreateExamStep2 from "./components/CreateExamStep2";
import ExamineeHome from "./Pages/ExamineeHome";
import ExamineeExam from "./Pages/ExamineeExam";
import PrivateRoutesInstructor from "./ustils/PrivateRoutesInstructor";
import Reports from "./Pages/Reports";
import ExamReportDetails from "./Pages/ExamReportDetails";
import QuestionsReportDetails from "./Pages/QuestionsReportDetails";

function App() {
  console.log(window.location);
  return (
    <div className="App">
      <div className="row">
        <div className="col-2 side-bar-container sticky-top">
          <Sidebar />
        </div>
        <div className="col-9">
          <Routes>
            <Route element={<PrivateRoutesInstructor />}>
              <Route path="/home" element={<Home />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/exams/:examId" element={<EditAndPreviewExam />} />
              <Route path="exams/createExamForm" element={<CreateExamForm />} />
              <Route
                path="exams/:examId/addQuestions"
                element={<CreateExamStep2 />}
              />
              <Route path="/questionBanks" element={<QuestionBanks />} />
              <Route
                path="/questionBanks/:questionBankId"
                element={<ViewQuestionBank />}
              />
              <Route
                path="/questionBanks/:questionBankId/addQuestion"
                element={<AddQuestion />}
              />
              <Route path="/addQuestionBank" element={<AddQuestionBank />} />
              <Route>
                <Route path="/reports" element={<Reports />} />
                <Route
                  path="/reports/:examId"
                  element={<ExamReportDetails />}
                />
                <Route
                  path="/reports/:examId/:examineeId"
                  element={<QuestionsReportDetails />}
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
