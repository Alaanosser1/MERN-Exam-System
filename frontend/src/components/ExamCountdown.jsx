import React from "react";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";

const ExamCountdown = (props) => {
  const navigate = useNavigate();

  const Completionist = async () => {
    await props.evaluateQuestions();
    await props.evaluateExam();
    props.redirect();
  };

  return (
    <h5>
      <Countdown date={Date.now() + props.examTime - props.examOngoingTime}>
        <Completionist />
      </Countdown>
    </h5>
  );
};

export default ExamCountdown;
