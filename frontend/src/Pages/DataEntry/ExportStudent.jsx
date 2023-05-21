import { React, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Swal from "sweetalert2";
const ExportStudent = (props) => {
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const exportFormSubmit = () => {
    axios
      .post(
        `http://${process.env.REACT_APP_API_IP}:4000/examinee/getStudentsAndExportTopExcel`,
        {
          fileName,
          tableArray: props.tableArray,
        },
        {
          // headers: {
          //   "auth-token": user.token,
          // },
        }
      )
      .then((data) => {
        setFileName("");
        console.log("done exporting");
        Swal.fire({
          title: "تم استخراج الملف بنجاح",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "حسناً",
        }).then(() => {
          props.setExportPopup(false);
          props.setTableArray([]);
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "!حدث خطأ من فضلك حاول مرة اخري ",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "حسناً",
        }).then(() => {
          props.setExportPopup(false);
          props.setTableArray([]);
        });
        console.log(err);
      });
  };
  return (
    <>
      <form dir="rtl" onSubmit={handleSubmit(exportFormSubmit)}>
        <h5 className="mt-5"> اسم الملف </h5>
        <input
          className="form-control form-control-lg "
          type="text"
          aria-label=".form-control-lg example"
          value={fileName}
          {...register("fileNameRequired", { required: true })}
          onChange={(e) => {
            setFileName(e.target.value);
          }}
        />
        {errors.fileNameRequired && (
          <span className="text-danger">من فضلك ادخل اسم الملف</span>
        )}
        <br></br>
        <div className="row d-flex justify-content-center mt-3">
          <button type="submit" className="btn btn-outline-primary mt-3 w-25">
            استخراج
          </button>
        </div>
      </form>
    </>
  );
};

export default ExportStudent;
