import express from "express";
import multer from "multer";
import {
  addExaminee,
  storeExamineeAnswer,
  getStudents,
  getStudent,
  getExamineeClubs,
  addExamineeToClub,
  examineeLogin,
  getExamineeExams,
} from "../controllers/examinee-controller.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "C:/Exam-System/MERN-Exam-System-master/frontend/src/profilePictures/students"
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
examineeRouter.post("/examineeLogin", examineeLogin);
examineeRouter.post("/addExamineeToClub", addExamineeToClub);
examineeRouter.get("/getStudents", getStudents);
examineeRouter.get("/getStudent", getStudent);
examineeRouter.get("/getExamineeClubs", getExamineeClubs);
examineeRouter.get("/getExamineeExams", getExamineeExams);

export default examineeRouter;
