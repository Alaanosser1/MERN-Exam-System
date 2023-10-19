import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateExamineeSubjectsGrades = (props) => {
  const [examineeGrades, setExamineeGrades] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjectId, setSubjectId] = useState("");

  const user =
    JSON.parse(localStorage.getItem("instructor-token")) ||
    JSON.parse(localStorage.getItem("data-entry-token")) ||
    JSON.parse(localStorage.getItem("admin-token"));
  const { subClubId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getExamineeSubjectGradesData();
  }, []);

  const getExamineeSubjectGradesData = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getExamineeSubjectsGrades`,
        {
          params: {
            examineeId: props.examinee.examinee_id,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        setExamineeGrades(res.data.examineeGrades);
        const initialGrades = res.data.examineeGrades.map((item) => ({
          subject_id: item.subject_id,
          examinee_grade: item.examinee_grade,
        }));
        console.log(initialGrades, "INITIALGRADES");
        setGrades(initialGrades);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formSubmit = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/editExamineeSubjectGrade`,
        {
          subClubId,
          gradesObject: grades,
          examineeId: props.examinee.examinee_id,
        },
        {
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((data) => {
        props.rerender();
        props.hidePopup(false);
      });
    console.log(grades[1]);
  };

  const handleGradeChange = (subject_id, value) => {
    // Create a copy of the current grades
    const updatedGrades = [...grades];

    // Find the index of the subject_id in the grades array
    const index = updatedGrades.findIndex(
      (grade) => grade.subject_id === subject_id
    );

    if (index !== -1) {
      // If subject_id exists in grades, update the examinee_grade
      updatedGrades[index].examinee_grade = value;
    } else {
      // If subject_id doesn't exist, create a new entry
      updatedGrades.push({ subject_id, examinee_grade: value });
    }

    // Update the state with the new grades
    setGrades(updatedGrades);
  };

  return (
    <>
      <div dir="rtl" className="container">
        <div className="row">
          <h2 className="m-5">تعديل درجات المواد</h2>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            {Object.values(examineeGrades).map((grade) => {
              // Use Object.values to get values from the object
              return (
                <div className="col-4">
                  <h5 className="mt-4 ">
                    {grade.subject_name} &#40;{grade.subject_grade}&#41;
                  </h5>
                  <input
                    className="form-control form-control-lg"
                    type="number"
                    aria-label=".form-control-lg example"
                    defaultValue={grade.examinee_grade}
                    onChange={(e) =>
                      handleGradeChange(grade.subject_id, e.target.value)
                    }
                  />
                </div>
              );
            })}
          </div>
          <br></br>
          <div className="row d-flex justify-content-center mt-3">
            <button
              type="submit"
              className="btn btn-outline-primary mt-3 w-25"
              onClick={handleSubmit}
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateExamineeSubjectsGrades;
