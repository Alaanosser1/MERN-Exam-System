import express from "express";
import { addExaminee } from "../controllers/examinee-controller.js";

const examineeRouter = express.Router();
examineeRouter.get("/addExaminee", addExaminee);

export default examineeRouter;
