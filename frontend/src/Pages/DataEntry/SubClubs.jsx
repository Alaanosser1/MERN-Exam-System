import { React, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Popup from "../../components/Popup";
import AddSubClub from "../../components/AddSubClub";
import { useParams } from "react-router-dom";
import ExportStudent from "./ExportStudent";

const SubClubs = () => {
  useEffect(() => {
    getSubClubs();
    getMainClub();
  }, []);

  const [subClubs, setSubClubs] = useState("");
  const [mainClub, setMainClub] = useState("");
  const [addSubClub, setAddSubClub] = useState(false);
  const refOne = useRef(null);
  const [exportPopup, setExportPopup] = useState(false);
  const [tableArray, setTableArray] = useState();

  let { mainClubId } = useParams();

  const getSubClubs = () => {
    axios
      .get(`http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubs`, {
        params: {
          mainClubId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
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
        `http://${process.env.REACT_APP_API_IP}:4000/mainClub/getSingleMainClub`,
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

  const tableToArray = async () => {
    setTableArray([]);
    const trs = document.querySelectorAll("#students-table tr");
    console.log(trs, "TRS");

    for (let tr of trs) {
      let th_td = tr.querySelectorAll("td:not(#operations-buttons)");
      if (th_td.length == 0) {
        th_td = tr.getElementsByTagName("th");
      }
      let th_td_array = Array.from(th_td);
      th_td_array = th_td_array.map((tag) => tag.innerText);
      // console.log(th_td_array, "HAHAHAHHA");
      setTableArray((tableArray) => [...tableArray, th_td_array]);
      // console.log(tableArray, "TABLETOARRAY");
    }
    setExportPopup(true);
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
      <Popup trigger={exportPopup} setTrigger={setExportPopup}>
        <ExportStudent
          setExportPopup={setExportPopup}
          tableArray={tableArray}
          setTableArray={setTableArray}
        />
      </Popup>
      <div className="container list-container">
        <div className="row" dir="rtl">
          <div className="col-6">
            <h3 className="mt-5">فرق {`(${mainClub.club_name})`}</h3>
          </div>
          <div className="col-3 text-start">
            <button
              id="export-button"
              onClick={() => {
                tableToArray();
              }}
              className="btn btn-outline-primary mt-5"
            >
              استخراج الي اكسيل
            </button>
          </div>
          <div className="col-3 text-start">
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
          className="table mt-2 table-striped border table-responsive-lg"
          id="students-table"
        >
          <thead>
            <tr>
              {/* <th scope="col">ID</th> */}
              <th className="" scope="col">
                رقم الفرقة
              </th>
              <th className="" scope="col">
                الاسم
              </th>
              <th className="" scope="col">
                الوصف
              </th>
              <th className="" scope="col">
                تاريخ البدء
              </th>
              <th className="" scope="col">
                تاريخ الانتهاء
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(subClubs).map((club) => {
              return (
                <tr scope="row" key={club[1].sub_club_id}>
                  <td className="">{club[1].sub_club_number}</td>
                  <td className="">{club[1].sub_club_name}</td>
                  <td className="col-3">
                    {`${club[1].sub_club_description.substring(0, 50)}..`}
                  </td>
                  <td className="">
                    {
                      new Date(club[1].start_date)
                        .toISOString()
                        .slice(0, 19)
                        .split("T")[0]
                    }
                  </td>
                  <td className="">
                    {
                      new Date(club[1].end_date)
                        .toISOString()
                        .slice(0, 19)
                        .split("T")[0]
                    }
                  </td>

                  {JSON.parse(localStorage.getItem("instructor-token")) && (
                    <td id="operations-buttons" className="text-center">
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
                    <td id="operations-buttons" className="text-center">
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
                    <td id="operations-buttons" className="text-center">
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
