import express from "express";
import { listExamineeSubClubs } from "../controllers/questionare-controller.js";

const questionareRouter = express.Router();

questionareRouter.get("/listExamineeSubClubs", listExamineeSubClubs);

export default questionareRouter;
