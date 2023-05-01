import MainClubs from "./Pages/DataEntry/MainClubs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SubClubs from "./Pages/DataEntry/SubClubs";
import SubClubDashboard from "./Pages/DataEntry/SubClubDashboard";
import DataEntrySidebar from "./components/DataEntrySidebar";
import Students from "./Pages/DataEntry/Students";
import AllStudents from "./Pages/DataEntry/AllStudents";
import StudentProfile from "./Pages/DataEntry/StudentProfile";

import Exams from "./Pages/Exams";
import QuestionBanks from "./Pages/QuestionBanks";
import AddQuestionBank from "./components/AddQuestionBank";
import ViewQuestionBank from "./components/ViewQuestionBank";
import AddQuestion from "./components/AddQuestion";
import EditAndPreviewExam from "./components/EditAndPreviewExam";
import CreateExamForm from "./components/CreateExamForm";
import CreateExamStep2 from "./components/CreateExamStep2";
import MainQuestionBanks from "./Pages/MainQuestionBanks";
import ViewMainQuestionBank from "./components/ViewMainQuestionBank";
import CreateExamStep1 from "./components/CreateExamStep1";
import Home from "./Pages/DataEntry/Home";

function Clubs() {
  console.log(window.location);
  return (
    <div className="App">
      <div className="row">
        <div className="col-2 side-bar-container sticky-top">
          <DataEntrySidebar />
        </div>
        <div className="col-9">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:examId" element={<EditAndPreviewExam />} />
            <Route path="exams/createExamForm" element={<CreateExamForm />} />
            <Route
              path="exams/:examId/mainQuestionBanks"
              element={<CreateExamStep1 />}
            />
            <Route
              path="exams/:examId/mainQuestionBank/:mainQuestionBankId/addQuestions"
              element={<CreateExamStep2 />}
            />
            <Route path="/questionBanks" element={<QuestionBanks />} />
            <Route path="/mainQuestionBanks" element={<MainQuestionBanks />} />
            <Route
              path="/mainQuestionBanks/:mainQuestionBankId"
              element={<ViewMainQuestionBank />}
            />
            <Route
              path="/questionBanks/:questionBankId"
              element={<ViewQuestionBank />}
            />
            <Route
              path="/questionBanks/:questionBankId/addQuestion"
              element={<AddQuestion />}
            />
            <Route path="/addQuestionBank" element={<AddQuestionBank />} />
            <Route path="/mainClubs" element={<MainClubs />} />
            <Route path="/subClubs/:mainClubId" element={<SubClubs />} />
            <Route
              path="/subClubs/:mainClubId/:subClubId"
              element={<SubClubDashboard />}
            />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:studentId" element={<StudentProfile />} />
            <Route path="/Allstudents" element={<AllStudents />} />
            <Route
              path="/Allstudents/:studentId"
              element={<StudentProfile />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Clubs;
