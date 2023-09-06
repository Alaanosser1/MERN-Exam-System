import express from "express";
import { createFitnessLevelMeasurement } from "../controllers/level-measurement-controller.js";

const levelMeasurement = express.Router();

levelMeasurement.post(
  "/createFitnessLevelMeasurement",
  createFitnessLevelMeasurement
);

export default levelMeasurement;
