import express from "express";
import connection from "../database.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

//Add new Instructor
export const addInstructor = async (req, res) => {
  const name = req.body.name;
  const userName = req.body.userName;
  const password = req.body.password;
  const policeNumber = req.body.policeNumber;
  const rank = req.body.rank;

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    policeNumber: Joi.string().required(),
    rank: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const user = await connection
    .promise()
    .query(
      `SELECT * FROM instructor WHERE instructor_police_number ='${policeNumber}'`
    );
  if (user[0].length > 0) {
    return res.status(400).json({
      status: "error",
      msg: "Police Number is already registered",
    });
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err);
        res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      }
      const hashedPassword = hash;
      connection
        .promise()
        .query(
          `INSERT INTO instructor(instructor_name,instructor_username,
        instructor_password, instructor_police_number, instructor_rank)
            VALUES('${name}','${userName}','${hashedPassword}','${policeNumber}', '${rank}')`
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
  console.log(user[0], "LOLOLO");
  if (user[0].length == 0) {
    res.status(404).json({
      status: "404",
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
          res.status(404).send("wrong credentials pass");
        } else {
          const token = jwt.sign(
            {
              id: user[0][0].instructor_id,
              firstName: user[0][0].instructor_name,
              policeNumber: user[0][0].instructor_police_number,
              rank: user[0][0].instructor_rank,
              userName: user[0][0].instuctor_username,
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
