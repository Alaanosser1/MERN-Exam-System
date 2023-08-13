import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import xl from "excel4node";
import * as dotenv from "dotenv";
import { log } from "console";
dotenv.config({ path: "/Users/Nosser/Desktop/Exam-System/backend/.env" });

const app = express();

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
  const mobileNumber2 = req.body.mobileNumber2;
  const carType = req.body.carType;
  const carNumber = req.body.carNumber;
  const birthDate = req.body.birthDate;
  const addressInside = req.body.addressInside;
  const addressOutside = req.body.addressOutside;
  const religion = req.body.religion;
  const financeCode = req.body.financeCode;
  const bankName = req.body.bankName;
  const relationshipStatus = req.body.relationshipStatus;
  const previousClubs = req.body.previousClubs;
  const previousWorkPlaces = req.body.previousWorkPlaces;
  const addressLocation = req.body.addressLocation;
  const graduationDate = req.body.graduationDate;
  const { file, fileName } = req;
  let user;

  // const profilePicture = req.body.profilePicture;
  const examId = 80;

  // console.log(req.file);
  let insertId;

  const handleProfilePictureUpload = async (insertId) => {
    if (file) {
      fs.rename(
        `${process.env.STUDENT_IMAGE_FOLDER_PATH}/${fileName}`,
        `${process.env.STUDENT_IMAGE_FOLDER_PATH}/student${insertId}.png`,
        (err) => {
          if (err) throw err;
          console.log("File Renamed.");
        }
      );
    }
    // else {
    //   fs.appendFile(
    //     `${process.env.STUDENT_IMAGE_FOLDER_PATH}/student${insertId}.png`,
    //     "Hello content!",
    //     function (err) {
    //       if (err) throw err;
    //       console.log("Saved!");
    //     }
    //   );
    // }
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
           examinee_entity, examinee_list_number, examinee_seniority_number,
           examinee_mobile_number, examinee_mobile_number2, examinee_password, examinee_car_type,
           examinee_car_number, examinee_graduation_date, examinee_birth_date,
           examinee_address_inside_cairo, examinee_address_outside_cairo, examinee_religion,
           examinee_finance_code, examinee_bank_name, relationship_status, examinee_previous_clubs,
           examinee_previous_work_places)
            VALUES('${examineeName}','${examineeType}',
            '${examineeRank}','${examineePoliceNumber}',
            '${examineeCivilianNumber}','${examineeEntity}',
            '${listNumber}','${examineeSeniorityNumber}', '${mobileNumber}', '${mobileNumber2}',
             'hemaya@2023', '${carType}', '${carNumber}', '${graduationDate}',
              '${birthDate}', '${addressInside}', '${addressOutside}', '${religion}',
               '${financeCode}', '${bankName}', '${relationshipStatus}', '${previousClubs}',
                '${previousWorkPlaces}')`
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

export const editPoliceOfficer = async (req, res) => {
  const examineeId = req.body.examineeId;
  const examineeName = req.body.name;
  const examineeType = req.body.type;
  const examineePoliceNumber = req.body.policeNumber;
  const examineeSeniorityNumber = req.body.seniorityNumber;
  const examineeCivilianNumber = req.body.codeNumber;
  const examineeRank = req.body.rank;
  const examineeEntity = req.body.entity;
  const mobileNumber = req.body.mobileNumber;
  const mobileNumber2 = req.body.mobileNumber2;
  const carType = req.body.carType;
  const carNumber = req.body.carNumber;
  const birthDate = req.body.birthDate;
  const addressInside = req.body.addressInside;
  const addressOutside = req.body.addressOutside;
  const religion = req.body.religion;
  const financeCode = req.body.financeCode;
  const bankName = req.body.bankName;
  const relationshipStatus = req.body.relationshipStatus;
  const previousClubs = req.body.previousClubs;
  const previousWorkPlaces = req.body.previousWorkPlaces;
  const graduationDate = req.body.graduationDate;

  const updatePoliceOfficer = () => {
    connection
      .promise()
      .query(
        `
        UPDATE examinee
        SET examinee_name = '${examineeName}',
        examinee_seniority_number = '${examineeSeniorityNumber}',
        examinee_type = '${examineeType}',
        examinee_rank = '${examineeRank}',
        examinee_entity = '${examineeEntity}',
        examinee_graduation_date = '${graduationDate}',
        examinee_birth_date = '${birthDate}',
        examinee_religion = '${religion}',
        relationship_status = '${relationshipStatus}',
        examinee_police_number = '${examineePoliceNumber}',
        examinee_civilian_number = '${examineeCivilianNumber}',
        examinee_mobile_number = '${mobileNumber}',
        examinee_mobile_number2 = '${mobileNumber2}',
        examinee_car_type = '${carType}',
        examinee_car_number = '${carNumber}',
        examinee_address_inside_cairo = '${addressInside}',
        examinee_address_outside_cairo = '${addressOutside}',
        examinee_bank_name = '${bankName}',
        examinee_finance_code = '${financeCode}',
        examinee_previous_clubs = '${previousClubs}',
        examinee_previous_work_places = '${previousWorkPlaces}',
        examinee_bank_name = '${bankName}'
        WHERE examinee_id = '${examineeId}'
        `
      )
      .then((data) => {
        if (data[0].affectedRows != 0) {
          res.status(200).json({
            status: "ok",
            msg: "Updated",
          });
        } else {
          res.status(404).json({
            msg: "No examinee with that ID",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  };

  await connection
    .promise()
    .query(
      `SELECT * FROM examinee WHERE
      examinee_id = '${examineeId}'`
    )
    .then((data) => {
      console.log(examineeSeniorityNumber);
      if (data.length > 0 && data[0][0].examinee_id == examineeId) {
        updatePoliceOfficer();
        console.log("inside available and examinee did not change code");
      } else if (data.length > 0 && data[0][0].examinee_id != examineeId) {
        res.status(400).json({
          status: "error",
          msg: "police number is already registered",
        });
        console.log("inside police number is already registered");
        console.log(data[0]);
      } else if (data[0].length < 1) {
        updatePoliceOfficer();
        console.log("inside police number is new");
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
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
  SELECT * FROM examinee 
  JOIN examinee_has_sub_club ON examinee.examinee_id = examinee_has_sub_club.examinee_id
  JOIN exam ON examinee_has_sub_club.sub_club_id = exam.sub_club_id
  JOIN sub_club ON sub_club.sub_club_id = exam.sub_club_id
  JOIN subject ON exam.subject_id = subject.subject_id 
  WHERE examinee.examinee_id = ${examineeId}
  `
    )
    .then(async (data) => {
      exams = data[0];
      for (let i = 0; i < data[0].length; i++) {
        await connection
          .promise()
          .query(
            `
      SELECT * FROM exam_evaluation WHERE
      exam_id = '${data[0][i].exam_id}' AND examinee_id = '${examineeId}'
      `
          )
          .then((data) => {
            console.log(data[0], "DATA[0]");
            if (data[0].length > 0) {
              console.log("insideIF");
              Object.assign(exams[i], {
                isExaminedBefore: true,
              });
            } else {
              Object.assign(exams[i], {
                isExaminedBefore: false,
              });
            }
          });
      }
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
    // console.log(exams);
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

export const getStudentsAndExportToExcel = async (req, res) => {
  let date = new Date();
  let fileName = req.body.fileName;
  let tableArray = req.body.tableArray;
  // "Students" + Date.now() + "_" + Math.floor(Math.random() * 100);
  let students = [];
  let isError = false;
  console.log(tableArray, "TABLE");

  // await connection
  //   .promise()
  //   .query(`SELECT * FROM examinee`)
  //   .then((data) => {
  //     students = data[0];
  //   })
  //   .catch((error) => {
  //     isError = true;
  //     console.log(error);
  //     res.status(500).json({
  //       status: "error",
  //       msg: "500 internal server error",
  //     });
  //   });
  // console.log(students, "DB");
  // console.log(tableArray, "FE");

  try {
    console.log("start");
    var arr = JSON.parse(JSON.stringify(tableArray));
    console.log(arr, "ARR");

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("Student"); // Sheet 이름 설정

    for (const [cnt, item] of arr.entries()) {
      let keys = Object.keys(item);
      var values = Object.values(item);
      keys.forEach((col, ind) => {
        console.log(col);
        console.log(values[ind]);
        ws.cell(cnt + 1, ind + 1).string(String(values[ind]) || "null");
      });
    }
    // Todo: /static/excel 폴더 없을 시 에러 발생.
    wb.write(
      `/Users/Nosser/Desktop/Exam-System/backend/ExcelFiles/${fileName.replaceAll(
        " ",
        ""
      )}.xlsx`,
      function (err, stats) {
        if (err) {
          console.log(err);
          console.log("User Excel File Error");
          res.send({ status: "error" });
        } else {
          console.log("User Excel File Done");
          res.download(
            `/Users/Nosser/Desktop/Exam-System/backend/ExcelFiles/${fileName.replaceAll(
              " ",
              ""
            )}.xlsx`,
            (err) => {
              if (err) {
                res.send({
                  status: "error",
                  errMsg: err,
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    isError = true;
    console.log(err);
    console.log("User Excel File Error");
    res.send({ status: "error" });
  }
  // if (!isError) {
  //   res.status(200).json({
  //     students: students,
  //   });
  // }
};
