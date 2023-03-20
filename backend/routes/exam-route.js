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
} from "../controllers/exam-controller.js";

const examRouter = express.Router();

examRouter.post("/createExam", auth, createExam);
examRouter.get("/getExams", auth, getExams);
examRouter.get("/getExamQuestions", auth, getExamQuestions);
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
