import express from "express";
import auth from "../middleware/verifyToken.js";
import {
  createMainQuestionBank,
  deleteMainQuestionBank,
  editMainQuestionBank,
  getMainQuestionBanks,
  getMainQuestionBank,
} from "../controllers/main-question-bank-controller.js";

const mainQuestionBankRouter = express.Router();

mainQuestionBankRouter.post(
  "/createMainQuestionBank",
  auth,
  createMainQuestionBank
);
mainQuestionBankRouter.get("/getMainQuestionBanks", auth, getMainQuestionBanks);
mainQuestionBankRouter.get("/getMainQuestionBank", getMainQuestionBank);
mainQuestionBankRouter.delete(
  "/deleteMainQuestionBank",
  auth,
  deleteMainQuestionBank
);
mainQuestionBankRouter.put("/editMainQuestionBank", auth, editMainQuestionBank);

export default mainQuestionBankRouter;
