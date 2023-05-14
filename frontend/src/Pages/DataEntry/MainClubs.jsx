import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import AddMainClub from "../../components/AddMainClub";
import EditMainClub from "../../components/EditMainClub";

const MainClubs = () => {
  useEffect(() => {
    getMainClubs();
  }, []);

  const [mainClubs, setMainClubs] = useState("");
  const [addMainClub, setAddMainClub] = useState(false);
  const [editMainClub, setEditMainClub] = useState(false);
  const [clubId, setClubId] = useState("");
  const refOne = useRef(null);

  const getMainClubs = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/mainClub/getMainClubs`,
        {
          //   headers: {
          //     "auth-token": user.token,
          //   },
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
      <div ref={refOne}>
        <Popup trigger={addMainClub} setTrigger={setAddMainClub}>
          <AddMainClub
            rerender={getMainClubs}
            hidePopup={setAddMainClub}
          ></AddMainClub>
        </Popup>
        <Popup trigger={editMainClub} setTrigger={setEditMainClub}>
          <EditMainClub
            rerender={getMainClubs}
            hidePopup={setEditMainClub}
            clubId={clubId}
          ></EditMainClub>
        </Popup>
      </div>
      <div className="container mt-5">
        <div className="row" dir="rtl">
          <div className="col-9">
            <h1 className="mt-5">الفرق التخصصية</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                setAddMainClub(true);
              }}
              className="btn btn-outline-success mt-5"
            >
              اضافة فرقة تخصصية
            </button>
          </div>
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
                رقم الفرقة
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
                  <td className="text-center">{club[1].club_number}</td>
                  <td className="text-center">{club[1].number_of_sub_clubs}</td>
                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td className="text-center">
                      <Link to={`/app/subClubs/${club[1].club_id}`}>
                        <button className="btn btn-outline-primary">عرض</button>
                      </Link>
                      <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(club[1].club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center">
                      <Link to={`/clubs/subClubs/${club[1].club_id}`}>
                        <button className="btn btn-outline-primary">عرض</button>
                      </Link>
                      <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(club[1].club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td className="text-center">
                      <Link to={`/admin/subClubs/${club[1].club_id}`}>
                        <button className="btn btn-outline-primary">عرض</button>
                      </Link>
                      <button
                        onClick={() => {
                          setEditMainClub(true);
                          setClubId(club[1].club_id);
                        }}
                        className="btn btn-outline-success me-3"
                      >
                        تعديل
                      </button>
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

export default MainClubs;
