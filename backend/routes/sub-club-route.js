import express from "express";
import {
  createSubClub,
  editSubClub,
  deleteSubClub,
  getSubClubs,
  getSingleSubClub,
  getSubClubStudents,
} from "../controllers/sub-club-controller.js";

const clubRouter = express.Router();
clubRouter.post("/createSubClub", createSubClub);
clubRouter.post("/editSubClub", editSubClub);
clubRouter.delete("/deleteSubClub", deleteSubClub);
clubRouter.get("/getSubClubs", getSubClubs);
clubRouter.get("/getSingleSubClub", getSingleSubClub);
clubRouter.get("/getSubClubStudents", getSubClubStudents);

export default clubRouter;
