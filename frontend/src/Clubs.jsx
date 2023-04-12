import MainClubs from "./Pages/MainClubs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import SubClubs from "./Pages/SubClubs";
import SubClubDashboard from "./Pages/SubClubDashboard";
import DataEntrySidebar from "./components/DataEntrySidebar";

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
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Clubs;
