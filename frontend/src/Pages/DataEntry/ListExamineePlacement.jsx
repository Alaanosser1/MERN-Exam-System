import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";

const ListExamineePlacement = (props) => {
  useEffect(() => {
    getPlacementOptions();
    getPlacementData();
  }, []);
  const [placementOptions, setPlacementOptions] = useState("");
  const [placementData, setPlacementData] = useState("");
  const [optionList, setOptionList] = useState([]);
  let optionsObject = [{}];
  const { studentId } = useParams();

  const getPlacementOptions = () => {
    axios
      .get(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/getPlacementOptionsValues`,
        {
          params: {
            placementId: props.placementId,
            examineeId: studentId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.placementOptions, "Placementoptions");
        setPlacementOptions(res.data.placementOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPlacementData = () => {
    axios
      .get(`http://${process.env.REACT_APP_API_IP}:4000/subClub/getPlacement`, {
        params: {
          placementId: props.placementId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
      .then((res) => {
        console.log(res.data.placement, "placement data");
        setPlacementData(res.data.placement);
        // setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fillExamineePlacementData = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/subClub/fillExamineePlacementData`,
        {
          optionsObject: placementOptions,
          params: {
            placementId: props.placementId,
          },
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((res) => {
        console.log(res.data.placementOptions, "Placementoptions");
        props.setClosePlacementOptions(false);
        // setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeValueBefore = (e, i) => {
    e.preventDefault();
    placementOptions[i].value_before = e.target.value;
    console.log(placementOptions);
  };
  const handleChangeValueAfter = (e, i) => {
    e.preventDefault();
    placementOptions[i].value_after = e.target.value;
    console.log(placementOptions);
  };
  return (
    <>
      <div dir="rtl" className="container">
        <div className="row">
          {placementData.length > 0 && (
            <h2 className="text-center text-primary">
              {" "}
              {placementData[0].placement_name}{" "}
            </h2>
          )}
        </div>
        {Object.entries(placementOptions).map((option, index) => {
          return (
            <>
              <h4 className="mt-3  text-primary">{option[1].option_name}</h4>
              <div className="row mt-1">
                <div className="col-6 mt-1">
                  <h6 className="mt-1">بداية الفرقة</h6>
                  <input
                    type="text"
                    // defaultValue={option[1].option_name}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    disabled
                    defaultValue={option[1].value_before}
                    onChange={(e) => handleChangeValueBefore(e, index)}
                  />
                </div>
                <div className="col-6 mt-1">
                  <h6 className="mt-1">نهاية الفرقة</h6>
                  <input
                    type="text"
                    // defaultValue={option[1].option_name}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    disabled
                    defaultValue={option[1].value_after}
                    onChange={(e) => handleChangeValueAfter(e, index)}
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ListExamineePlacement;
