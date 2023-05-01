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
  getExamsOfClub,
} from "../controllers/exam-controller.js";

const examRouter = express.Router();

examRouter.post("/createExam", auth, createExam);
examRouter.get("/getExams", getExams);
examRouter.get("/getExamsOfClub", getExamsOfClub);
examRouter.get("/getExam", getExam);
examRouter.get("/getExamQuestions", getExamQuestions);
examRouter.get("/calculateExamTotalGrade", calculateExamTotalGrade);
examRouter.get(
  "/getQuestionBankQuestionsToAddQuestionsToExam",
  auth,
  getQuestionBankQuestionsToAddQuestionsToExam
);
examRouter.delete("/deleteExam", deleteExam);
examRouter.delete("/removeQuestionFromExam", auth, removeQuestionFromExam);
examRouter.put("/editExam", auth, editExam);
examRouter.post("/assignQuestionToExam", auth, assignQuestionToExam);

export default examRouter;
