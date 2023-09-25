import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateExamineeFitnessMeasurement = (props) => {
  const [fitnessLevelBefore, setFitnessLevelBefore] = useState("");
  const [fitnessLevelAfter, setFitnessLevelAfter] = useState("");
  const [fitnessLevelDuring, setFitnessLevelDuring] = useState("");
  const [textureLevelBefore, setTextureLevelBefore] = useState("");
  const [textureLevelAfter, setTextureLevelAfter] = useState("");
  const [shootingBefore, setShootingBefore] = useState("");
  const [shootingTest, setShootingTest] = useState("");
  const [examineeFitnessData, setExamineeFitnessData] = useState("");

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
    getExamineeFitnessMeasurementData();
  }, []);

  const getExamineeFitnessMeasurementData = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/fitnessLevelMeasurement/getFitnessLevelMeasurementForExaminee`,
        {
          params: {
            subClubId,
            examineeId: props.examinee.examinee_id,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(
          res.data.fitnessLeveMeasurement,
          props.examinee.examinee_id,
          subClubId,
          "Fitness Level Measurement Data For Student"
        );
        setExamineeFitnessData(res.data.fitnessLeveMeasurement);
        setFitnessLevelBefore(
          res.data.fitnessLeveMeasurement[0].fitness_level_before
        );
        setFitnessLevelDuring(
          res.data.fitnessLeveMeasurement[0].fitness_level_during
        );
        setFitnessLevelAfter(
          res.data.fitnessLeveMeasurement[0].fitness_level_after
        );
        setTextureLevelBefore(
          res.data.fitnessLeveMeasurement[0].texture_before
        );
        setTextureLevelAfter(res.data.fitnessLeveMeasurement[0].texture_after);
        setShootingBefore(
          res.data.fitnessLeveMeasurement[0].shooting_level_before
        );
        setShootingTest(res.data.fitnessLeveMeasurement[0].shooting_level_test);
        // setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formSubmit = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/fitnessLevelMeasurement/editFitnessLevelMeasurement`,
        {
          fitnessLevelBefore,
          fitnessLevelAfter,
          fitnessLevelDuring,
          textureLevelBefore,
          textureLevelAfter,
          shootingBefore,
          shootingTest,
          subClubId,
          examineeId: props.examinee.examinee_id,
        },
        {
          headers: {
            "auth-token": user.token,
          },
        }
      )
      .then((data) => {
        props.rerender();
        props.hidePopup(false);
      });
  };

  return (
    <>
      <div dir="rtl" className="container">
        <div className="row">
          <h2 className="m-5">
            {props.examinee.examinee_rank}/&nbsp;
            {props.examinee.examinee_name}
          </h2>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="col-4">
              <h5 className="mt-4 "> اللياقة بداية الفرقة </h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={fitnessLevelBefore}
                onChange={(e) => {
                  setFitnessLevelBefore(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="col-4">
              <h5 className="mt-4"> اللياقة اثناء الفرقة </h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={fitnessLevelDuring}
                onChange={(e) => {
                  setFitnessLevelDuring(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="col-4">
              <h5 className="mt-4"> اللياقة نهاية الفرقة </h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={fitnessLevelAfter}
                onChange={(e) => {
                  setFitnessLevelAfter(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h5 className="mt-4">القوام نهاية الفرقة</h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={textureLevelBefore}
                onChange={(e) => {
                  setTextureLevelBefore(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <h5 className="mt-4">القوام نهاية الفرقة</h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={textureLevelAfter}
                onChange={(e) => {
                  setTextureLevelAfter(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <h5 className="mt-4">الرماية بداية الفرقة</h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={shootingBefore}
                onChange={(e) => {
                  setShootingBefore(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <h5 className="mt-4"> الرماية نهاية الفرقة</h5>
              <input
                className="form-control form-control-lg"
                type="text"
                aria-label=".form-control-lg example"
                value={shootingTest}
                onChange={(e) => {
                  setShootingTest(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
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

export default UpdateExamineeFitnessMeasurement;
