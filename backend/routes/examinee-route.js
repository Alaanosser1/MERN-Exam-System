import express from "express";
import {
  addExaminee,
  storeExamineeAnswer,
} from "../controllers/examinee-controller.js";

const examineeRouter = express.Router();
examineeRouter.post("/addExaminee", addExaminee);
examineeRouter.post("/storeExamineeAnswer", storeExamineeAnswer);

export default examineeRouter;
