import express from "express";
import {
  createMainClub,
  editMainClub,
  deleteMainClub,
  getMainClubs,
  getSingleMainClub,
} from "../controllers/main-club-controller.js";

const clubRouter = express.Router();
clubRouter.post("/createMainClub", createMainClub);
clubRouter.post("/editMainClub", editMainClub);
clubRouter.delete("/deleteMainClub", deleteMainClub);
clubRouter.get("/getMainClubs", getMainClubs);
clubRouter.get("/getSingleMainClub", getSingleMainClub);

export default clubRouter;
