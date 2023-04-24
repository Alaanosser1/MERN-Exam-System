import { React, useState } from "react";
import { useForm } from "react-hook-form";

const SubClubChoose = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeSubCLub = (e) => {
    e.preventDefault();
    props.setSubClubId(e.target.value);
    console.log(e.target.value, "TEST");
  };

  return (
    <>
      <h5 className="mb-3"> الفرقة </h5>
      <select
        {...register("subClubRequired", { required: true })}
        onChange={handleChangeSubCLub}
        required
        id="inputState"
        className="form-control"
      >
        <option selected disabled value={""}>
          اختر الفرقة
        </option>
        {props.subClubs.map((club) => (
          <option key={club.sub_club_id} value={club.sub_club_id}>
            {club.sub_club_name}
          </option>
        ))}
      </select>
      {errors.subClubRequired && (
        <span className="text-danger">من فضلك اختر الفرقة *</span>
      )}
    </>
  );
};

export default SubClubChoose;
