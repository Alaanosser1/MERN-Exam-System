import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const AllExamineeQuestionare = () => {
  useEffect(() => {
    getExamineeClubs();
  }, []);

  const [clubsData, setClubsData] = useState([]);
  const token = JSON.parse(localStorage.getItem("examinee-token"));
  const user = jwt_decode(token.token);

  const getExamineeClubs = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/questionare/listExamineeSubClubs`,
        {
          params: {
            examineeId: user.id,
          },
        }
      )
      .then((res) => {
        setClubsData(res.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching clubs data: ", error);
        // Handle error state or display an error message to the user
      });
  };

  return (
    <>
      <div dir="rtl" className="container list-container p-5 w-100 h-100 p-5">
        <h1 className="m-5">استطلاعات الرآي</h1>
        <hr />

        <div dir="ltr" className="row">
          <div className="col-3">
            <Link to="/examineeHome" className="btn btn-primary ms-5 w-25 mb-3">
              رجوع
            </Link>
          </div>
        </div>

        <div className="row m-auto p-5">
          {clubsData.map((club, index) => (
            <div className="col-4 mb-5" key={index}>
              <div className="card custom-card text-end">
                <div className="card-body">
                  <h4 className="card-title">{club.sub_club_name}</h4>
                  <h5 className="card-title">{club.studying_year}</h5>
                </div>
                <div className="card-footer text-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Add your logic for handling button click
                    }}
                    className={`btn btn-primary`}
                    style={{ width: "100%" }}
                  >
                    ابدأ الاستطلاع
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllExamineeQuestionare;
