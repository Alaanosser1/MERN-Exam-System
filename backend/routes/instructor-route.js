import express from "express";
import {
  addInstructor,
  instructorLogin,
} from "../controllers/instructor-controller.js";

const instructorRouter = express.Router();
instructorRouter.post("/addInstructor", addInstructor);
instructorRouter.post("/instructorLogin", instructorLogin);

export default instructorRouter;
