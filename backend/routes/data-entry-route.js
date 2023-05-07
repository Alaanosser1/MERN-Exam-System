import express from "express";
import {
  addDataEntry,
  dataEntryLogin,
} from "../controllers/data-entry-controller.js";

const dataEnrtyRouter = express.Router();

dataEnrtyRouter.post("/addDataEntry", addDataEntry);
dataEnrtyRouter.post("/dataEntryLogin", dataEntryLogin);

export default dataEnrtyRouter;
