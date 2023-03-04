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

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-2 side-bar-container sticky-top">
          <Sidebar />
        </div>
        <div className="col-9">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:examId" element={<EditAndPreviewExam />} />
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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
