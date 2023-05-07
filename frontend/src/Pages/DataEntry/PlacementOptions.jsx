import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const PlacementOptions = (props) => {
  useEffect(() => {
    getPlacementOptions();
  }, []);

  const [placementOptions, setPlacementOptions] = useState("");
  const [placementOption, setPlacementOption] = useState("");

  const getPlacementOptions = () => {
    axios
      .get(
        "http://localhost:4000/subClub/getPlacementOptions" ||
          "http://192.168.1.10:4000/subClub/getPlacementOptions",
        {
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
        setPlacementOptions(res.data.placementOptions);
        // setSearchResults(res.data.subjects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeOption = (e) => {
    e.preventDefault();
    setPlacementOption(e.target.value);
    console.log(e.target.value);
  };

  const handleOptionRemove = (placementOptionId) => {
    console.log(placementOptionId, "AKSJDS");
    axios
      .delete(`http://localhost:4000/subClub/removePlacementOption`, {
        params: {
          placementOptionId: placementOptionId,
        },
        //   headers: {
        //     "auth-token": user.token,
        //   },
      })
      .then((res) => {
        console.log("deleted");
        getPlacementOptions();
      });
  };

  const handleOptionAdd = (e) => {
    console.log(props.placementId, "FROM OPTIONS");
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/subClub/addPlacementOption" ||
          "http://192.168.1.10:4000/subClub/addPlacementOption",
        {
          placementId: props.placementId,
          optionName: placementOption,
        },
        {
          //   headers: {
          //     "auth-token": user.token,
          //   },
        }
      )
      .then((data) => {
        setPlacementOption("");
        getPlacementOptions();
      });
  };
  return (
    <>
      <div dir="rtl" className="container ">
        <h2 className="m-3 text-center text-primary">عناصر قياس المستوي</h2>
        {Object.entries(placementOptions).map((option, index) => {
          return (
            <>
              <div className="row">
                <h5 className="mt-3">العنصر رقم {index + 1}</h5>
                <div className="col-9 mt-1">
                  <input
                    type="text"
                    autoFocus
                    defaultValue={option[1].option_name}
                    disabled
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  />
                </div>
                <div className="col-2 mt-1">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      handleOptionRemove(option[1].placement_option_id);
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              </div>
            </>
          );
        })}
        <hr className="mt-5" />
        <form onSubmit={handleOptionAdd}>
          <div className="row mt-2">
            <h5 className="mt-3 text-success">اضافة عنصر جديد </h5>
            <div className="col-9">
              <input
                type="text"
                autoFocus
                className="form-control mt-1"
                id="exampleFormControlTextarea1"
                rows="3"
                required
                onChange={handleChangeOption}
                value={placementOption}
              />
            </div>
            <div className="col-1 mt-1">
              <button type="submit" className="btn btn-outline-success w-100">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacementOptions;
