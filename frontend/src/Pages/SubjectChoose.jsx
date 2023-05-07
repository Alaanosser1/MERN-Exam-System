import { React, useState } from "react";
import { useForm } from "react-hook-form";

const SubjectChoose = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeSubject = (e) => {
    e.preventDefault();
    props.setSubjectId(e.target.value);
    console.log(e.target.value, "TEST");
  };

  return (
    <>
      <h5 className="mb-3"> المادة </h5>
      <select
        {...register("subjectRequired", { required: true })}
        onChange={handleChangeSubject}
        required
        id="inputState"
        className="form-control"
      >
        <option selected disabled value={""}>
          اختر المادة
        </option>
        {props.subjects.map((subject) => (
          <option key={subject.subject_id} value={subject.subject_id}>
            {subject.subject_name}
          </option>
        ))}
      </select>
      {errors.subjectRequired && (
        <span className="text-danger">من فضلك اختر المادة *</span>
      )}
    </>
  );
};

export default SubjectChoose;
