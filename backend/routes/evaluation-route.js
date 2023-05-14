import express from "express";
import {
  evaluateQuestions,
  evaluateExam,
  getExamsReport,
  getExamEvaluationStats,
  getEachQuestionEvaluationStats,
} from "../controllers/evaluation-controller.js";

const evaluationRouter = express.Router();
evaluationRouter.get("/evaluateQuestions", evaluateQuestions);
evaluationRouter.get("/evaluateExam", evaluateExam);
evaluationRouter.get("/getExamsReport", getExamsReport);
evaluationRouter.get("/getExamEvaluationStats", getExamEvaluationStats);
evaluationRouter.get(
  "/getEachQuestionEvaluationStats",
  getEachQuestionEvaluationStats
);

export default evaluationRouter;
