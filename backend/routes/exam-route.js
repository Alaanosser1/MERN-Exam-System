import express from "express";
import {
  createExam,
  deleteExam,
  editExam,
  getExams,
  getExamQuestions,
  removeQuestionFromExam,
  assignQuestionToExam,
} from "../controllers/exam-controller.js";

const examRouter = express.Router();

examRouter.post("/createExam", createExam);
examRouter.get("/getExams", getExams);
examRouter.get("/getExamQuestions", getExamQuestions);
examRouter.delete("/deleteExam", deleteExam);
examRouter.delete("/removeQuestionFromExam", removeQuestionFromExam);
examRouter.put("/editExam", editExam);
examRouter.post("/assignQuestionToExam", assignQuestionToExam);

export default examRouter;
