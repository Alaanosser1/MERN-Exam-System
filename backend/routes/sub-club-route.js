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
  getSubClubPlacements,
  createPlacement,
  getPlacementOptions,
  addPlacementOption,
  removePlacementOption,
  fillExamineePlacementData,
  getPlacementOptionsValues,
  getPlacement,
  deletePlacement,
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
clubRouter.get("/getSubClubPlacements", getSubClubPlacements);
clubRouter.post("/createPlacement", createPlacement);
clubRouter.get("/getPlacementOptions", getPlacementOptions);
clubRouter.post("/addPlacementOption", addPlacementOption);
clubRouter.delete("/removePlacementOption", removePlacementOption);
clubRouter.post("/fillExamineePlacementData", fillExamineePlacementData);
clubRouter.get("/getPlacementOptionsValues", getPlacementOptionsValues);
clubRouter.get("/getPlacement", getPlacement);
clubRouter.delete("/deletePlacement", deletePlacement);

export default clubRouter;
