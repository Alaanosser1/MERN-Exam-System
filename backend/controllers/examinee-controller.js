import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { pipeline } from "stream";

const app = express();

//Add new Instructor
export const addExaminee = (req, res, next) => {
  const examineeName = req.body.name;
  const examineeType = req.body.type;
  const examineePoliceNumber = req.body.policeNumber;
  const examineeSeniorityNumber = req.body.seniorityNumber;
  const examineeCivilianNumber = req.body.codeNumber;
  const examineeRank = req.body.rank;
  const examineeEntity = req.body.entity;
  const mainClubId = req.body.mainClubId;
  const subClubId = req.body.subClubId;
  const listNumber = req.body.listNumber;
  const mobileNumber = req.body.mobileNumber;
  const { file, fileName } = req;
  // const profilePicture = req.body.profilePicture;
  const examId = 80;

  // console.log(req.file);
  let insertId;

  const handleProfilePictureUpload = async (insertId) => {
    fs.rename(
      `/Users/Nosser/Desktop/Exam-System/frontend/src/profilePictures/students/${fileName}`,
      `/Users/Nosser/Desktop/Exam-System/frontend/src/profilePictures/students/student${insertId}.png`,
      (err) => {
        if (err) throw err;
        console.log("File Renamed.");
      }
    );
  };
  // const handleAuth = async () => {
  //   await connection
  //     .promise()
  //     .query(`SELECT * FROM examinee_attempt WHERE examinee_id ='${insertId}'`)
  //     .then((data) => {
  //       console.log(data[0][0], "SAJDNASKJDN");
  //       const token = jwt.sign(
  //         {
  //           examineeId: data[0][0].examinee_id,
  //           examineeType: data[0][0].examinee_type,
  //           examineeName: data[0][0].examinee_name,
  //           examineePoliceNumber: data[0][0].examinee_police_number,
  //           examineeSeniorityNumber: data[0][0].examinee_seniority_number,
  //           examineeCivilianNumber: data[0][0].examinee_civilian_number,
  //           examineeRank: data[0][0].examinee_rank,
  //           examineeClubName: data[0][0].club_name,
  //           examineeClubNumber: data[0][0].club_number,
  //         },
  //         `${process.env.TOKEN_SECRET}`
  //       );
  //       console.log(token);
  //       res.header("auth-token-examinee", token).json({
  //         token: token,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         status: "error",
  //         msg: "500 Internal Server Error",
  //       });
  //     });
  // };

  connection
    .promise()
    .query(
      `INSERT INTO examinee(examinee_name, examinee_type,
        examinee_rank, examinee_police_number, examinee_civilian_number,
         examinee_entity, examinee_list_number, examinee_seniority_number,
          main_club_id, sub_club_id, examinee_mobile_number)
            VALUES('${examineeName}','${examineeType}',
            '${examineeRank}','${examineePoliceNumber}',
            '${examineeCivilianNumber}','${examineeEntity}','${listNumber}',
             '${examineeSeniorityNumber}', '${mainClubId}', '${subClubId}', '${mobileNumber}')`
    )
    .then((data) => {
      insertId = data[0].insertId;
      // handleAuth();
      handleProfilePictureUpload(insertId);
      res.status(200).json({
        status: "ok",
        msg: "created",
      });
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};

//SELECT fields FROM table ORDER BY id DESC
export const getStudents = async (req, res) => {
  let students = [];
  let isError = false;

  await connection
    .promise()
    .query(
      `SELECT * FROM examinee JOIN main_club ON examinee.main_club_id = main_club.club_id
       JOIN sub_club ON examinee.sub_club_id = sub_club.sub_club_id`
    )
    .then((data) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].is_deleted == 0) {
          students.push(data[0][i]);
        }
      }
    })
    .catch((error) => {
      isError = true;
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });

  if (!isError) {
    res.status(200).json({
      students: students,
    });
  }
};

export const storeExamineeAnswer = async (req, res) => {
  const examinee = req.body.examineeId;
  const exam = req.body.examId;
  const question = req.body.questionId;
  const examineeAnswer = req.body.examineeAnswer;
  let checkAnswerExists = false;
  let isError = false;
  console.log(examineeAnswer + " ay haga ");

  try {
    await connection
      .promise()
      .query(
        `
    SELECT * FROM examinee_answer
    WHERE examinee_id = ${examinee} AND exam_id = ${exam} AND
    question_id = ${question}
    `
      )
      .then((data) => {
        console.log("checked answer exists");
        if (data[0].length >= 1) {
          checkAnswerExists = true;
        }
      })
      .catch((error) => {
        console.log(error);
        isError = true;
      });

    if (checkAnswerExists) {
      await connection
        .promise()
        .query(
          `
        DELETE FROM examinee_answer
        WHERE examinee_id = ${examinee} AND
        exam_id = ${exam} AND
        question_id = ${question}
        `
        )
        .then(async (data) => {
          console.log("deleted answer", console.log(examineeAnswer));
          await connection
            .promise()
            .query(
              `
        INSERT INTO examinee_answer (examinee_id, exam_id, question_id, examinee_answer)
        VALUES (?, ?, ?, ?)
        `,
              [examinee, exam, question, examineeAnswer]
            )
            .then((data) => {
              console.log("inserted after deleted");
              res.status(200).json({
                msg: "Answer submitted sucessfully",
                status: "200",
              });
            })
            .catch((error) => {
              console.log(error);
              isError = true;
            });
        })
        .catch((error) => {
          console.log(error);
          isError = true;
        });
    } else {
      await connection
        .promise()
        .query(
          `
        INSERT INTO examinee_answer (examinee_id, exam_id, question_id, examinee_answer)
        VALUES (?, ?, ?, ?)
        `,
          [examinee, exam, question, examineeAnswer]
        )
        .then((data) => {
          console.log("inserted without deleting");
          res.status(200).json({
            msg: "Answer submitted sucessfully",
            status: "200",
          });
        })
        .catch((error) => {
          console.log(error);
          isError = true;
        });
    }
  } catch (err) {
    if (isError) {
      console.log(err);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    }
  }
};

export const getStudent = (req, res) => {
  const examineeId = req.query.examineeId;

  connection
    .promise()
    .query(
      `
  SELECT * FROM examinee
  WHERE examinee_id = ${examineeId}
  `
    )
    .then((data) => {
      res.status(200).json({
        status: "ok",
        student: data[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};
