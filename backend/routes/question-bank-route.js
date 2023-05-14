import express from "express";
import auth from "../middleware/verifyToken.js";
import {
  createQuestionBank,
  deleteQuestionBank,
  editQuestionBank,
  getQuestionBanks,
  getQuestions,
  getQuestionBank,
} from "../controllers/question-bank-controller.js";

const questionBankRouter = express.Router();

questionBankRouter.post("/createQuestionbank", auth, createQuestionBank);
questionBankRouter.get("/getQuestionBanks", auth, getQuestionBanks);
questionBankRouter.get("/getQuestionBank", getQuestionBank);
questionBankRouter.get("/getQuestions", auth, getQuestions);
questionBankRouter.delete("/deleteQuestionBank", auth, deleteQuestionBank);
questionBankRouter.put("/editQuestionBank", auth, editQuestionBank);

export default questionBankRouter;
