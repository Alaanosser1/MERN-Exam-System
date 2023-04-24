import MainClubs from "./Pages/DataEntry/MainClubs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SubClubs from "./Pages/DataEntry/SubClubs";
import SubClubDashboard from "./Pages/DataEntry/SubClubDashboard";
import DataEntrySidebar from "./components/DataEntrySidebar";
import Students from "./Pages/DataEntry/Students";
import StudentProfile from "./Pages/DataEntry/StudentProfile";

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
            <Route path="/mainClubs" element={<MainClubs />} />
            <Route path="/subClubs/:mainClubId" element={<SubClubs />} />
            <Route
              path="/subClubs/:mainClubId/:subClubId"
              element={<SubClubDashboard />}
            />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:studentId" element={<StudentProfile />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Clubs;
