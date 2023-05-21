import express from "express";
import connection from "../database.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

//Add new Instructor
export const addDataEntry = async (req, res) => {
  const name = req.body.dataEntryName;
  const password = req.body.dataEntryPassword;
  const policeNumber = req.body.dataEntryPoliceNumber;
  const rank = req.body.dataEntryRank;

  console.log(req.body);
  const schema = Joi.object().keys({
    dataEntryName: Joi.string().required(),
    dataEntryPassword: Joi.string().required(),
    dataEntryPoliceNumber: Joi.required(),
    dataEntryRank: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    console.log(result.error.details[0].message);
    return res.status(400).send(result.error.details[0].message);
  }

  const user = await connection
    .promise()
    .query(
      `SELECT * FROM data_entry_person WHERE data_entry_police_number ='${policeNumber}'`
    )
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
  if (user[0].length > 0) {
    return res.status(409).json({
      status: "error",
      msg: "Police Number is already registered",
    });
  } else {
    connection
      .promise()
      .query(
        `INSERT INTO data_entry_person(data_entry_name,
            data_entry_password, data_entry_police_number, data_entry_rank)
            VALUES('${name}','${password}','${policeNumber}', '${rank}')`
      )
      .then((data) => {
        return res.status(201).json({
          status: "ok",
          msg: "Created",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          status: "error",
          msg: "500 Internal Server Error",
        });
      });
  }
};

export const dataEntryLogin = async (req, res) => {
  const policeNumber = req.body.policeNumber;
  const password = req.body.password;

  try {
    let user = await connection.promise().query(`
              SELECT * FROM data_entry_person
               WHERE data_entry_police_number ='${policeNumber}'
               `);
    if (user[0].length == 0) {
      return res.status(401).json({
        status: "401",
        msg: "wrong credentials police number",
      });
    } else {
      if (password != user[0][0].data_entry_password) {
        res.status(401).send("wrong credentials pass");
      } else {
        const token = jwt.sign(
          {
            id: user[0][0].data_entry_id,
            firstName: user[0][0].data_entry_name,
            policeNumber: user[0][0].data_entry_police_number,
            userType: "data entry",
            //   rank: user[0][0].data_entry_rank,
          },
          `${process.env.TOKEN_SECRET}`
        );
        res.header("auth-token", token).json({
          token: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: "500 Internal Server Error",
    });
  }
};

export const dataEntryLogout = async (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.sendStatus(200);
  });
};
