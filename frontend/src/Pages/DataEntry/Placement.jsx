import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";
import AddSubject from "../../components/AddSubject";
import EditSubject from "../../components/EditSubject";
import AddPlacement from "../../components/AddPlacement";
import PlacementOptions from "./PlacementOptions";
import StudentSearch from "./StudentsSearch";

const Placement = () => {
  useEffect(() => {
    getPlacements();
    getClubStudents();
  }, []);

  const [placements, setPlacements] = useState("");
  const [placementId, setPlacementId] = useState("");
  const [addPlacement, setAddPlacement] = useState(false);
  const [placementOptions, setPlacementOptions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [editPlacementGrades, setEditPlacementGrades] = useState(false);
  const [students, setStudents] = useState("");

  const [editSubject, setEditSubject] = useState(false);
  const refOne = useRef(null);
  const { subClubId, mainClubId } = useParams();

  const getPlacements = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubPlacements`,
        {
          params: {
            subClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.placements, "Placements");
        setPlacements(res.data.placements);
        // setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePlacement = (placement) => {
    Swal.fire({
      title: `هل انت متأكد من مسح قياس المستوي؟`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `http://${process.env.REACT_APP_API_IP}:4000/subClub/deletePlacement`,
            {
              params: {
                placementId: placement,
              },
              // headers: {
              //   "auth-token": user.token,
              // },
            }
          )
          .then((res) => {
            console.log(res.data);
            getPlacements();
            console.log("deleted");
          });
      }
    });
  };

  const getClubStudents = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getSubClubStudents`,
        {
          params: {
            subClubId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.students, "STUDENTS");
        setStudents(res.data.students);
        setSearchResults(res.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={addPlacement} setTrigger={setAddPlacement}>
          <AddPlacement
            rerender={getPlacements}
            hidePopup={setAddPlacement}
          ></AddPlacement>
        </Popup>
        <Popup trigger={placementOptions} setTrigger={setPlacementOptions}>
          <PlacementOptions placementId={placementId} />
          {console.log(placementId, "FROM PLACEMENT")}
        </Popup>
      </div>
      <div className="container list-container">
        <div className="row" dir="rtl">
          <div className="col-9">
            <h1 className="mt-5">قياس المستوي</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                setAddPlacement(true);
              }}
              className="btn btn-outline-success mt-5"
            >
              اضافة قياس مستوي جديد
            </button>
          </div>
        </div>
        {/* <div dir="rtl" className="row m-3">
          <label htmlFor="">بحث</label>
          <StudentSearch
            content={students}
            setSearchResults={setSearchResults}
          />
        </div> */}

        <table
          dir="rtl"
          className="table mt-2 table-striped border table-responsive-lg"
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
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(placements).map((placement) => {
              return (
                <tr scope="row" key={placement[1].placement_id}>
                  <td className="text-center">{placement[1].placement_name}</td>
                  <td className="text-center">
                    {`${placement[1].placement_description}`}
                  </td>
                  <td className="text-center">
                    <Link to={`${placement[1].placement_id}`}>
                      <button
                        onClick={() => {
                          setEditPlacementGrades(true);
                        }}
                        className="btn btn-outline-success m-2"
                      >
                        ادخال الدرجات
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setPlacementOptions(true);
                        setPlacementId(placement[1].placement_id);
                      }}
                      className="btn btn-outline-primary m-2"
                    >
                      العناصر
                    </button>

                    <button
                      onClick={() => {
                        deletePlacement(placement[1].placement_id);
                      }}
                      className="btn btn-outline-danger m-2"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Placement;
