import express from "express";
import {
  createQuestionBank,
  deleteQuestionBank,
  editQuestionBank,
  getQuestionBanks,
  getQuestions,
} from "../controllers/question-bank-controller.js";

const questionBankRouter = express.Router();

questionBankRouter.post("/createQuestionbank", createQuestionBank);
questionBankRouter.get("/getQuestionBanks", getQuestionBanks);
questionBankRouter.get("/getQuestions", getQuestions);
questionBankRouter.delete("/deleteQuestionBank", deleteQuestionBank);
questionBankRouter.put("/editQuestionBank", editQuestionBank);

export default questionBankRouter;
