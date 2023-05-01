import express from "express";
import {
  createSubClub,
  editSubClub,
  deleteSubClub,
  getSubClubs,
  getSingleSubClub,
  getSubClubStudents,
  createSubject,
  editSubject,
  deleteSubject,
  getClubSubjects,
  getSubject,
} from "../controllers/sub-club-controller.js";

const clubRouter = express.Router();
clubRouter.post("/createSubClub", createSubClub);
clubRouter.post("/editSubClub", editSubClub);
clubRouter.delete("/deleteSubClub", deleteSubClub);
clubRouter.get("/getSubClubs", getSubClubs);
clubRouter.get("/getSingleSubClub", getSingleSubClub);
clubRouter.get("/getSubClubStudents", getSubClubStudents);
clubRouter.post("/createSubject", createSubject);
clubRouter.post("/editSubject", editSubject);
clubRouter.delete("/deleteSubject", deleteSubject);
clubRouter.get("/getClubSubjects", getClubSubjects);
clubRouter.get("/getSubject", getSubject);

export default clubRouter;
