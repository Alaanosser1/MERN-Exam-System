import express from "express";
import connection from "../database.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

export const listExamineeSubClubs = async (req, res) => {
  const examineeId = req.query.examineeId;

  const user = await connection
    .promise()
    .query(
      `
      SELECT * FROM examinee_has_sub_club JOIN sub_club WHERE examinee_has_sub_club.examinee_id = ${examineeId}
       AND sub_club.sub_club_id = examinee_has_sub_club.sub_club_id `
    )
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};
