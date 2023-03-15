import express from "express";
import connection from "../database.js";

const app = express();

//Add new Instructor
export function addExaminee(req, res) {
  const examineeName = req.body.examineeName;
  const examineeType = req.body.examineeType;
  const examineeRank = req.body.examineeRank;
  const examineePoliceNumber = req.body.examineePoliceNumber;
  const examineeCivilianNumber = req.body.examineeCivilianNumber;
  const examineeEntity = req.body.examineeEntity;
  const clubName = req.body.clubName;
  const clubNumber = req.body.clubNumber;
  const listNumber = req.body.listNumber;
  connection
    .promise()
    .query(
      `INSERT INTO examinee(examinee_name, examinee_type,
        examinee_rank,examinee_police_number, examinee_civilian_number,
         examinee_entity, club_name, club_number, list_number)
            VALUES('${examineeName}','${examineeType}',
            '${examineeRank}','${examineePoliceNumber}',
            '${examineeCivilianNumber}','${examineeEntity}',
            '${clubName}','${clubNumber}','${listNumber}',
            )`
    )
    .then((data) => {
      res.status(201).json({
        status: "ok",
        msg: "Created",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
}
