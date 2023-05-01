import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { pipeline } from "stream";

const app = express();

//Add new Instructor
export const addExaminee = async (req, res, next) => {
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
  let user;
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
  if (examineeType == "ضابط") {
    await connection
      .promise()
      .query(
        `SELECT * FROM examinee WHERE
       examinee_seniority_number ='${examineeSeniorityNumber}'`
      )
      .then((data) => {
        user = data[0];
        console.log(user, "USERRRR officer");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  } else if (examineeType == "فرد") {
    await connection
      .promise()
      .query(
        `SELECT * FROM examinee WHERE
       examinee_police_number ='${examineePoliceNumber}'`
      )
      .then((data) => {
        user = data[0];
        console.log(user, "USERRRR farrd", examineePoliceNumber);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  } else if (examineeType == "مدني") {
    await connection
      .promise()
      .query(
        `SELECT * FROM examinee WHERE
      examinee_civilian_number = '${examineeCivilianNumber}'`
      )
      .then((data) => {
        user = data[0];
        console.log(user, "USERRRR madany");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  }
  if (user.length > 0) {
    res.status(400).json({
      status: "error",
      msg: "police number is already registered",
    });
  } else {
    connection
      .promise()
      .query(
        `INSERT INTO examinee(examinee_name, examinee_type,
        examinee_rank, examinee_police_number, examinee_civilian_number,
         examinee_entity, examinee_list_number, examinee_seniority_number, examinee_mobile_number, examinee_password)
            VALUES('${examineeName}','${examineeType}',
            '${examineeRank}','${examineePoliceNumber}',
            '${examineeCivilianNumber}','${examineeEntity}','${listNumber}',
             '${examineeSeniorityNumber}', '${mobileNumber}', 'hemaya@2023')`
      )
      .then((data) => {
        insertId = data[0].insertId;
        // handleAuth();
        connection
          .promise()
          .query(
            `INSERT INTO examinee_has_sub_club(examinee_id, sub_club_id)
              VALUES('${insertId}','${subClubId}')`
          )
          .then((data) => {})
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              status: "error",
              msg: "500 Internal Server Error",
            });
          });
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
  }
};

export const examineeLogin = async (req, res) => {
  const examineeId = req.body.examineeId;
  const password = req.body.password;

  let user = await connection.promise().query(`
            SELECT * FROM examinee
             WHERE examinee_id ='${examineeId}' 
             `);
  if (user[0].length == 0) {
    console.log("NO ID FOUND");
    res.status(401).json({
      status: "401",
      msg: "wrong credentials id",
    });
  } else {
    if (user[0][0].examinee_password != password) {
      console.log("NO PASS FOUND");
      res.status(401).send("wrong credentials pass");
    } else {
      const token = jwt.sign(
        {
          id: user[0][0].examinee_id,
          firstName: user[0][0].examinee_name,
          policeNumber: user[0][0].examinee_police_number,
          civilianNumber: user[0][0].examinee_civilian_number,
          seniorityNumber: user[0][0].examinee_seniority_number,
          rank: user[0][0].examinee_rank,
          type: user[0][0].examinee_type,
        },
        `${process.env.TOKEN_SECRET}`
      );
      res.header("auth-token", token).json({
        token: token,
      });
    }
  }
};

//SELECT fields FROM table ORDER BY id DESC
export const getStudents = async (req, res) => {
  let students = [];
  let isError = false;

  await connection
    .promise()
    .query(`SELECT * FROM examinee`)
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

export const addExamineeToClub = (req, res) => {
  const examineeId = req.body.examineeId;
  const subClubId = req.body.subClubId;

  connection
    .promise()
    .query(
      `
  INSERT INTO examinee_has_sub_club(examinee_id, sub_club_id)
  VALUES('${examineeId}','${subClubId}')
  `
    )
    .then((data) => {
      res.status(200).json({
        status: "ok",
        msg: "added to club",
      });
    })
    .catch((err) => {
      if (err.errno == "1062") {
        res.status(409).json({
          status: "error",
          msg: "already registerd to club",
        });
      } else {
        res.status(500).json({
          status: "error",
          msg: "500 internal server error",
        });
      }
      console.log(err.errno == "1062");
    });
};

export const getExamineeClubs = (req, res) => {
  const examineeId = req.query.examineeId;

  connection
    .promise()
    .query(
      `
  SELECT * FROM examinee_has_sub_club 
  JOIN sub_club ON examinee_has_sub_club.sub_club_id = sub_club.sub_club_id
  JOIN main_club ON main_club.club_id = sub_club.main_club_id
  WHERE examinee_has_sub_club.examinee_id =' ${examineeId}'
  `
    )
    .then((data) => {
      res.status(200).json({
        status: "ok",
        clubs: data[0],
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

export const getExamineeExams = async (req, res) => {
  const examineeId = req.query.examineeId;
  let exams;
  let isError = false;

  await connection
    .promise()
    .query(
      `
  SELECT * FROM examinee JOIN examinee_has_sub_club ON examinee.examinee_id = examinee_has_sub_club.examinee_id
  JOIN exam ON examinee_has_sub_club.sub_club_id = exam.sub_club_id
  JOIN sub_club ON sub_club.sub_club_id = exam.sub_club_id
  WHERE examinee.examinee_id = ${examineeId}
  `
    )
    .then((data) => {
      exams = data[0];
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });

  for (let i = 0; i < exams.length; i++) {
    await connection
      .promise()
      .query(
        `SELECT COUNT(*) as count FROM exam_has_question WHERE exam_id = ${exams[i].exam_id} `
      )
      .then((data) => {
        Object.assign(exams[i], {
          NumberOfQuestions: data[0][0].count,
        });
      })
      .catch((error) => {
        isError = true;
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 internal server error",
        });
      });
  }

  if (!isError) {
    console.log(exams);
    res.status(200).json({
      exams: exams,
    });
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
