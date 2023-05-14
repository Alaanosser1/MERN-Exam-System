import express from "express";
import {
  createQuestionMcq,
  createQuestionEssay,
  editQuestion,
  deleteQuestion,
} from "../controllers/question-controller.js";
import auth from "../middleware/verifyToken.js";

const questionRouter = express.Router();

questionRouter.post("/createQuestionMcq", auth, createQuestionMcq);
questionRouter.post("/createQuestionEssay", auth, createQuestionEssay);
questionRouter.put("/editQuestion", auth, editQuestion);
questionRouter.delete("/deleteQuestion", auth, deleteQuestion);

export default questionRouter;
