import { React, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";
import AddSubject from "../../components/AddSubject";
import EditSubject from "../../components/EditSubject";

const Subjects = () => {
  useEffect(() => {
    getSubjects();
  }, []);

  const [subjects, setSubjects] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [addSubject, setAddSubject] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [editSubject, setEditSubject] = useState(false);
  const refOne = useRef(null);
  const { subClubId } = useParams();

  const getSubjects = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getClubSubjects`,
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
        console.log(res.data.subjects, "SUBJECTS");
        setSubjects(res.data.subjects);
        setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteSubject = (subject) => {
    Swal.fire({
      title: `هل انت متأكد من مسح هذا الامتحان؟`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `http://${process.env.REACT_APP_API_IP}:4000/subClub/deleteSubject`,
            {
              params: {
                subjectId: subject,
              },
              // headers: {
              //   "auth-token": user.token,
              // },
            }
          )
          .then((res) => {
            console.log(res.data);
            getSubjects();
            console.log("deleted");
          });
      }
    });
  };

  return (
    <>
      <div ref={refOne}>
        <Popup trigger={addSubject} setTrigger={setAddSubject}>
          <AddSubject
            rerender={getSubjects}
            hidePopup={setAddSubject}
          ></AddSubject>
        </Popup>
        <Popup trigger={editSubject} setTrigger={setEditSubject}>
          <EditSubject
            rerender={getSubjects}
            hidePopup={setEditSubject}
            subjectId={subjectId}
          ></EditSubject>
        </Popup>
        {/* <Popup trigger={editMainClub} setTrigger={setEditMainClub}>
          <EditMainClub
            rerender={getMainClubs}
            hidePopup={setEditMainClub}
            clubId={clubId}
          ></EditMainClub>
        </Popup> */}
      </div>
      <div className="container list-container">
        <div className="row" dir="rtl">
          <div className="col-9">
            <h1 className="mt-5">المواد</h1>
          </div>
          <div className="col-3">
            <button
              onClick={() => {
                setAddSubject(true);
              }}
              className="btn btn-outline-success mt-5"
            >
              اضافة مادة جديدة
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
              <th className="text-center" scope="col">
                الدرجة
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(subjects).map((subject) => {
              return (
                <tr scope="row" key={subject[1].subject_id}>
                  <td className="text-center">{subject[1].subject_name}</td>
                  <td className="text-center">
                    {`${subject[1].subject_description}`}
                  </td>
                  <td className="text-center">{subject[1].subject_grade}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setEditSubject(true);
                        setSubjectId(subject[1].subject_id);
                      }}
                      className="btn btn-outline-primary m-2"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => {
                        deleteSubject(subject[1].subject_id);
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

export default Subjects;
