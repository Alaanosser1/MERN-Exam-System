import express from "express";
import connection from "../database.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

//Add new Instructor
export const adminLogin = async (req, res) => {
  const policeNumber = req.body.policeNumber;
  const password = req.body.password;

  let user = await connection.promise().query(`
            SELECT * FROM admin
             WHERE admin_police_number ='${policeNumber}'
             `);
  if (user[0].length == 0) {
    res.status(401).json({
      status: "401",
      msg: "wrong credentials police number",
    });
  } else {
    if (password != user[0][0].admin_password) {
      res.status(401).send("wrong credentials pass");
    } else {
      const token = jwt.sign(
        {
          id: user[0][0].admin_id,
          firstName: user[0][0].admin_name,
          policeNumber: user[0][0].admin_police_number,
          userType: "admins",
          rank: user[0][0].admin_rank,
        },
        `${process.env.TOKEN_SECRET}`
      );
      res.header("auth-token", token).json({
        token: token,
      });
    }
  }
};

export const dataEntryLogout = async (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.sendStatus(200);
  });
};
