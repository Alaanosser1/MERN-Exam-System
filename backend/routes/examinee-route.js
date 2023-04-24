import express from "express";
import multer from "multer";
import {
  addExaminee,
  storeExamineeAnswer,
  getStudents,
  getStudent,
} from "../controllers/examinee-controller.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "/Users/Nosser/Desktop/Exam-System/frontend/src/profilePictures/students"
    );
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${Math.floor(Math.random() * 100)}_${
      file.originalname
    }`;
    req.fileName = fileName;
    console.log(req.fileName, "INSIDEFILENAME");
    cb(null, fileName);
  },
});
const upload = multer({ storage }).single("img");
const examineeRouter = express.Router();
examineeRouter.post("/addExaminee", upload, addExaminee);
examineeRouter.post("/storeExamineeAnswer", storeExamineeAnswer);
examineeRouter.get("/getStudents", getStudents);
examineeRouter.get("/getStudent", getStudent);

export default examineeRouter;
