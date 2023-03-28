import express from "express";
import auth from "../middleware/verifyToken.js";
import {
  createExam,
  deleteExam,
  editExam,
  getExams,
  getExamQuestions,
  removeQuestionFromExam,
  assignQuestionToExam,
  getQuestionBankQuestionsToAddQuestionsToExam,
  calculateExamTotalGrade,
  getExam,
} from "../controllers/exam-controller.js";

const examRouter = express.Router();

examRouter.post("/createExam", auth, createExam);
examRouter.get("/getExams", getExams);
examRouter.get("/getExam", getExam);
examRouter.get("/getExamQuestions", getExamQuestions);
examRouter.get("/calculateExamTotalGrade", calculateExamTotalGrade);
examRouter.get(
  "/getQuestionBankQuestionsToAddQuestionsToExam",
  auth,
  getQuestionBankQuestionsToAddQuestionsToExam
);
examRouter.delete("/deleteExam", auth, deleteExam);
examRouter.delete("/removeQuestionFromExam", auth, removeQuestionFromExam);
examRouter.put("/editExam", auth, editExam);
examRouter.post("/assignQuestionToExam", auth, assignQuestionToExam);

export default examRouter;
