import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "../../components/Popup";
import AddSubClub from "../../components/AddSubClub";
import { useParams } from "react-router-dom";

const SubClubs = () => {
  useEffect(() => {
    getSubClubs();
    getMainClub();
  }, []);

  const [subClubs, setSubClubs] = useState("");
  const [mainClub, setMainClub] = useState("");
  const [addSubClub, setAddSubClub] = useState(false);
  const refOne = useRef(null);
  let { mainClubId } = useParams();

  const getSubClubs = () => {
    axios
      .get(
        "http://localhost:4000/subClub/getSubClubs" ||
          "http://192.168.1.10:4000/subClub/getSubClubs",
        {
          params: {
            mainClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.clubs, "CLUBS");
        setSubClubs(res.data.clubs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMainClub = () => {
    axios
      .get(
        "http://localhost:4000/mainClub/getSingleMainClub" ||
          "http://192.168.1.10:4000/mainClub/getSingleMainClub",
        {
          params: {
            clubId: mainClubId,
          },
        }
      )
      .then((data) => {
        setMainClub(data.data.club[0]);
      });
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={addSubClub} setTrigger={setAddSubClub}>
          <AddSubClub
            rerender={getSubClubs}
            hidePopup={setAddSubClub}
          ></AddSubClub>
        </Popup>
      </div>
      <div className="container mt-5">
        <div className="row" dir="rtl">
          <div className="col-9">
            <h1 className="mt-5">فرق {`(${mainClub.club_name})`}</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                setAddSubClub(true);
              }}
              className="btn btn-outline-success mt-5"
            >
              اضافة فرقة جديدة
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
                تاريخ البدء
              </th>
              <th className="text-center" scope="col">
                تاريخ الانتهاء
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(subClubs).map((club) => {
              return (
                <tr scope="row" key={club[1].sub_club_id}>
                  <td className="text-center">{club[1].sub_club_name}</td>
                  <td className="text-center">
                    {`${club[1].sub_club_description.substring(0, 50)}..`}
                  </td>
                  <td className="text-center">{club[1].sub_club_number}</td>
                  <td className="text-center">
                    {
                      new Date(club[1].start_date)
                        .toISOString()
                        .slice(0, 19)
                        .split("T")[0]
                    }
                  </td>
                  <td className="text-center">
                    {
                      new Date(club[1].end_date)
                        .toISOString()
                        .slice(0, 19)
                        .split("T")[0]
                    }
                  </td>

                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/app/subClubs/${mainClubId}/${club[1].sub_club_id}`}
                      >
                        <button className="btn btn-outline-primary">
                          تفاصيل الفرقة
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("data-entry-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/clubs/subClubs/${mainClubId}/${club[1].sub_club_id}`}
                      >
                        <button className="btn btn-outline-primary">
                          تفاصيل الفرقة
                        </button>
                      </Link>
                    </td>
                  )}
                  {JSON.parse(localStorage.getItem("admin-token")) && (
                    <td className="text-center">
                      <Link
                        to={`/admin/subClubs/${mainClubId}/${club[1].sub_club_id}`}
                      >
                        <button className="btn btn-outline-primary">
                          تفاصيل الفرقة
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

export default SubClubs;
