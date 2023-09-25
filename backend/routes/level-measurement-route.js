import express from "express";
import {
  createFitnessLevelMeasurement,
  getAllSubClubFitnessLevelMeasurement,
  getFitnessLevelMeasurementForExaminee,
  editFitnessLevelMeasurement,
} from "../controllers/level-measurement-controller.js";

const levelMeasurement = express.Router();

levelMeasurement.post(
  "/createFitnessLevelMeasurement",
  createFitnessLevelMeasurement
);
levelMeasurement.post(
  "/editFitnessLevelMeasurement",
  editFitnessLevelMeasurement
);
levelMeasurement.get(
  "/getAllSubClubFitnessLevelMeasurement",
  getAllSubClubFitnessLevelMeasurement
);
levelMeasurement.get(
  "/getFitnessLevelMeasurementForExaminee",
  getFitnessLevelMeasurementForExaminee
);

export default levelMeasurement;
