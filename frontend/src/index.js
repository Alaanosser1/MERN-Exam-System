import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import App from "./App";
import ExamineeHome from "./Pages/ExamineeHome";
import Login from "./components/Login";
import Exams from "./Pages/Exams";
import Home from "./Pages/Home";
import ExamineeExam from "./Pages/ExamineeExam";
import EditAndPreviewExam from "./components/EditAndPreviewExam";
import CreateExamForm from "./components/CreateExamForm";
import CreateExamStep2 from "./components/CreateExamStep2";
import QuestionBanks from "./Pages/QuestionBanks";
import ViewQuestionBank from "./components/ViewQuestionBank";
import AddQuestion from "./components/AddQuestion";
import AddQuestionBank from "./components/AddQuestionBank";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/examineeHome" element={<ExamineeHome />} />
        <Route path="/login" element={<Login />} />

        <Route path="app" element={<App />}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/ExamineeExam/:examId" element={<ExamineeExam />} />
          <Route path="/app/exams" element={<Exams />} />
          <Route path="/app/exams/:examId" element={<EditAndPreviewExam />} />
          <Route
            path="/app/exams/createExamForm"
            element={<CreateExamForm />}
          />
          <Route
            path="/app/exams/:examId/addQuestions"
            element={<CreateExamStep2 />}
          />
          <Route path="/app/questionBanks" element={<QuestionBanks />} />
          <Route
            path="/app/questionBanks/:questionBankId"
            element={<ViewQuestionBank />}
          />
          <Route
            path="/app/questionBanks/:questionBankId/addQuestion"
            element={<AddQuestion />}
          />
          <Route path="/app/addQuestionBank" element={<AddQuestionBank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
