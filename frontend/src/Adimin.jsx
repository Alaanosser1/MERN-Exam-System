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
import DataEntrySignUp from "./Pages/DataEntrySignUp";
import PrivateRoutesAdmin from "./ustils/PrivateRoutesAdmin";
import MainClubExams from "./Pages/MainClubExams";
import SubClubsExams from "./Pages/SubClubsExams";
import QuestionsReportDetails from "./Pages/QuestionsReportDetails";
import Reports from "./Pages/Reports";
import ExamReportDetails from "./Pages/ExamReportDetails";
import InstructorSignUp from "./Pages/InstructorSignUp";
import AdminSideBar from "./components/AdminSideBar";
import AllInstructors from "./Pages/AllInstructors";
import EnterPlacementGrades from "./Pages/DataEntry/EnterPlacementGrades";

function Admin() {
  console.log(window.location);
  return (
    <div className="App">
      <div className="row">
        <div dir="ltr" className=" col-2 side-bar-container sticky-top">
          <AdminSideBar />
        </div>
        <div className="col-9">
          <Routes>
            <Route element={<PrivateRoutesAdmin />}>
              <Route path="/register" element={<InstructorSignUp />} />
              <Route path="/dataEntrySignUp" element={<DataEntrySignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/mainClubExams" element={<MainClubExams />} />
              <Route
                path="/mainClubExams/:mainClubId"
                element={<SubClubsExams />}
              />
              <Route
                path="/mainClubExams/:mainClubId/:subClubId"
                element={<Exams />}
              />
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
              <Route
                path="/mainQuestionBanks"
                element={<MainQuestionBanks />}
              />
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
              <Route
                path="/subClubs/:mainClubId/:subClubId/:placementId"
                element={<EnterPlacementGrades />}
              />
              <Route path="/students" element={<Students />} />
              <Route
                path="/:currentMainClubId/:currentSubClubId/:studentId"
                element={<StudentProfile />}
              />
              <Route path="/students/:studentId" element={<StudentProfile />} />
              <Route path="/Allstudents" element={<AllStudents />} />
              <Route path="/AllInstructors" element={<AllInstructors />} />
              <Route
                path="/Allstudents/:studentId"
                element={<StudentProfile />}
              />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/:examId" element={<ExamReportDetails />} />
              <Route
                path="/reports/:examId/:examineeId"
                element={<QuestionsReportDetails />}
              />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
