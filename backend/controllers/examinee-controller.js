import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";

const app = express();

//Add new Instructor
export const addExaminee = (req, res) => {
  const examineeName = req.body.name;
  const examineeType = req.body.type;
  const examineePoliceNumber = req.body.policeNumber;
  const examineeSeniorityNumber = req.body.seniorityNumber;
  const examineeCivilianNumber = req.body.codeNumber;
  const examineeRank = req.body.rank;
  const examineeEntity = req.body.entity;
  const clubName = req.body.clubName;
  const clubNumber = req.body.clubNumber;
  const listNumber = req.body.listNumber;
  const examId = 80;

  let insertId;

  const handleAuth = async () => {
    await connection
      .promise()
      .query(`SELECT * FROM examinee_attempt WHERE examinee_id ='${insertId}'`)
      .then((data) => {
        console.log(data[0][0], "SAJDNASKJDN");
        const token = jwt.sign(
          {
            examineeId: data[0][0].examinee_id,
            examineeType: data[0][0].examinee_type,
            examineeName: data[0][0].examinee_name,
            examineePoliceNumber: data[0][0].examinee_police_number,
            examineeSeniorityNumber: data[0][0].examinee_seniority_number,
            examineeCivilianNumber: data[0][0].examinee_civilian_number,
            examineeRank: data[0][0].examinee_rank,
            examineeClubName: data[0][0].club_name,
            examineeClubNumber: data[0][0].club_number,
          },
          `${process.env.TOKEN_SECRET}`
        );
        console.log(token);
        res.header("auth-token-examinee", token).json({
          token: token,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  };

  connection
    .promise()
    .query(
      `INSERT INTO examinee_attempt(examinee_name, examinee_type,
        examinee_rank,examinee_police_number, examinee_civilian_number,
         examinee_entity, club_name, club_number, list_number,
          examinee_seniority_number, exam_id)
            VALUES('${examineeName}','${examineeType}',
            '${examineeRank}','${examineePoliceNumber}',
            '${examineeCivilianNumber}','${examineeEntity}',
            '${clubName}','${clubNumber}','${listNumber}',
             '${examineeSeniorityNumber}', '${examId}')`
    )
    .then((data) => {
      insertId = data[0].insertId;
      handleAuth();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
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
