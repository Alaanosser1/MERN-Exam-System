import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MainClubExams = () => {
  useEffect(() => {
    getMainClubs();
  }, []);

  const [mainClubs, setMainClubs] = useState("");
  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));

  const getMainClubs = () => {
    axios
      .get(
        "http://localhost:4000/mainClub/getMainClubs" ||
          "http://192.168.1.10:4000/mainClub/getMainClubs",
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.clubs, "CLUBS");
        setMainClubs(res.data.clubs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div dir="rtl" className="container mt-5">
        <div className="row mt-5">
          <h1>الامتحانات</h1>
        </div>
        <table
          dir="rtl"
          className="table mt-5 table-striped border table-responsive-lg"
        >
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="text-center" scope="col">
                الاسم
              </th>
              <th className="text-center" scope="col">
                الوصف
              </th>
              <th className="text-center" scope="col">
                عدد الفرق
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(mainClubs).map((club) => {
              return (
                <tr scope="row" key={club[1].club_id}>
                  <td className="text-center">{club[1].club_name}</td>
                  <td className="text-center">
                    {`${club[1].club_description.substring(0, 50)}..`}
                  </td>
                  <td className="text-center">{club[1].number_of_sub_clubs}</td>
                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td className="text-center">
                      <Link to={`/app/mainClubExams/${club[1].club_id}`}>
                        <button className="btn btn-outline-primary">
                          عرض الفرق
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center">
                      <Link to={`/clubs/mainClubExams/${club[1].club_id}`}>
                        <button className="btn btn-outline-primary">
                          عرض الفرق
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td className="text-center">
                      <Link to={`/admin/mainClubExams/${club[1].club_id}`}>
                        <button className="btn btn-outline-primary">
                          عرض الفرق
                        </button>
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainClubExams;