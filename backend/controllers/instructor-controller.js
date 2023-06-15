import express from "express";
import connection from "../database.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

//Add new Instructor
// export const addInstructor = async (req, res) => {
//   const name = req.body.instructorName;
//   const password = req.body.instructorPassword;
//   const policeNumber = req.body.instructorPoliceNumber;
//   // const rank = req.body.instructorRank;

//   console.log(req.body);
//   const schema = Joi.object().keys({
//     instructorName: Joi.string().required(),
//     instructorPassword: Joi.string().required(),
//     instructorPoliceNumber: Joi.required(),
//     instructorRank: Joi.string().required(),
//   });
//   const result = schema.validate(req.body);
//   if (result.error) {
//     console.log(result.error.details[0].message);
//     return res.status(400).send(result.error.details[0].message);
//   }

//   const user = await connection
//     .promise()
//     .query(
//       `SELECT * FROM instructor WHERE instructor_police_number ='${policeNumber}'`
//     );
//   if (user[0].length > 0) {
//     return res.status(409).json({
//       status: "error",
//       msg: "Police Number is already registered",
//     });
//   } else {
//     bcrypt.hash(password, 10, async function (err, hash) {
//       if (err) {
//         console.log(err);
//         res.status(500).json({
//           status: "error",
//           msg: "500 Internal Server Error",
//         });
//       }
//       const hashedPassword = hash;
//       connection
//         .promise()
//         .query(
//           `INSERT INTO instructor(instructor_name, instructor_password, instructor_police_number)
//               VALUES('${name}','${hashedPassword}','${policeNumber}')`
//         )
//         .then((data) => {
//           res.status(201).json({
//             status: "ok",
//             msg: "Created",
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//           res.status(500).json({
//             status: "error",
//             msg: "500 Internal Server Error",
//           });
//         });
//     });
//   }
// };

export const addInstructor = async (req, res, next) => {
  const instructorName = req.body.name;
  const instructorCivilianNumber = req.body.instructorCivilianNumber;
  const currentWorkPlace = req.body.currentWorkPlace;
  const rankOrScienceDgree = req.body.rankOrScienceDgree;
  const mobileNumber = req.body.mobileNumber;
  const mobileNumber2 = req.body.mobileNumber2;
  const carType = req.body.carType;
  const carNumber = req.body.carNumber;
  const birthDate = req.body.birthDate;
  const homeAddress = req.body.homeAddress;
  const officeAddress = req.body.officeAdderss;
  const religion = req.body.religion;
  const financeCode = req.body.financeCode;
  const bankName = req.body.bankName;
  const relationshipStatus = req.body.relationshipStatus;
  const previousExperience = req.body.previousExperience;
  const qualifications = req.body.addressLocation;

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
        `${process.env.STUDENT_IMAGE_FOLDER_PATH}student${insertId}.png`,
        (err) => {
          if (err) throw err;
          console.log("File Renamed.");
        }
      );
    } else {
      fs.appendFile(
        `${process.env.STUDENT_IMAGE_FOLDER_PATH}/student${insertId}.png`,
        "Hello content!",
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
    }
  };
  await connection
    .promise()
    .query(
      `SELECT * FROM instructor WHERE
      instructor_civilian_number = '${instructorCivilianNumber}'`
    )
    .then((data) => {
      user = data[0];
      console.log(user, "instructor found");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
  if (user.length > 0) {
    res.status(400).json({
      status: "error",
      msg: "civinlian number is already registered",
    });
  } else {
    connection
      .promise()
      .query(
        `INSERT INTO instructors (instructor_name, instructor_civilian_number, current_working_place, rank, mobile_number,
           mobile_number2, car_type, car_number, birth_date, home_address, office_address, religion, finance_code,
            bank_name, relationship_status, previous_experience, qualifications) 
            VALUES ('${instructorName}','${instructorCivilianNumber}', '${currentWorkPlace}', '${rankOrScienceDgree}',
             '${mobileNumber}','${mobileNumber2}', '${carType}', '${carNumber}', '${birthDate}', '${homeAddress}',
               '${officeAddress}', '${religion}', '${financeCode}', '${bankName}', '${relationshipStatus}','${previousExperience}',
                '${qualifications}')`
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

export const instructorLogin = async (req, res) => {
  const policeNumber = req.body.policeNumber;
  const password = req.body.password;

  let user = await connection.promise().query(`
              SELECT * FROM instructor
               WHERE instructor_police_number ='${policeNumber}'
               `);
  if (user[0].length == 0) {
    res.status(401).json({
      status: "401",
      msg: "wrong credentials police number",
    });
  } else {
    bcrypt.compare(
      password,
      user[0][0].instructor_password,
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (!result) {
          res.status(401).send("wrong credentials pass");
        } else {
          const token = jwt.sign(
            {
              id: user[0][0].instructor_id,
              firstName: user[0][0].instructor_name,
              policeNumber: user[0][0].instructor_police_number,
              userType: "instructor",
              rank: user[0][0].instructor_rank,
            },
            `${process.env.TOKEN_SECRET}`
          );
          res.header("auth-token", token).json({
            token: token,
          });
        }
      }
    );
  }
};

export const instructorLogout = async (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.sendStatus(200);
  });
};
