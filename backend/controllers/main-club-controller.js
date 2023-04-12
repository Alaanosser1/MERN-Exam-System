import connection from "../database.js";
import Joi from "joi";

export const createMainClub = (req, res) => {
  const clubName = req.body.clubName;
  const clubDescription = req.body.clubDescription;
  const clubNumber = req.body.clubNumber;

  connection
    .promise()
    .query(
      `INSERT INTO main_club(club_name,club_description, club_number)
          VALUES('${clubName}','${clubDescription}','${clubNumber}')`
    )
    .then((data) => {
      res.status(201).json({
        status: "ok",
        msg: "Created",
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 Internal Server Error",
      });
    });
};

export const editMainClub = (req, res) => {
  const clubName = req.body.clubName;
  const clubDescription = req.body.clubDescription;
  const clubNumber = req.body.clubNumber;
  const clubId = req.body.clubId;

  const schema = Joi.object().keys({
    clubName: Joi.string().required(),
    clubDescription: Joi.string().required(),
    clubNumber: Joi.allow(),
    clubId: Joi.allow(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  connection
    .promise()
    .query(
      `
          UPDATE main_club
          SET club_name = '${clubName}',
          club_description = '${clubDescription}',
          club_number = '${clubNumber}'
          WHERE club_id = '${clubId}'
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
          msg: "No exam with that ID",
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

export const deleteMainClub = (req, res) => {
  const examId = req.query.clubId;

  connection
    .promise()
    .query(
      `
            UPDATE main_club 
            SET is_deleted = '1'
            WHERE club_id = '${clubId}'
            `
    )
    .then((data) => {
      if (data[0].affectedRows != 0) {
        res.status(200).json({
          status: "Ok",
          msg: "Deleted",
        });
      } else {
        res.status(404).json({
          status: "error",
          msg: "No exam with this ID",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};

export const getMainClubs = async (req, res) => {
  let clubs = [];
  let isError = false;
  await connection
    .promise()
    .query(`SELECT * FROM main_club`)
    .then((data) => {
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i].is_deleted == 0) {
          clubs.push(data[0][i]);
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
  for (let i = 0; i < clubs.length; i++) {
    await connection
      .promise()
      .query(
        `SELECT COUNT(*) as count FROM sub_club WHERE main_club_id = ${clubs[i].club_id} `
      )
      .then((data) => {
        Object.assign(clubs[i], {
          number_of_sub_clubs: data[0][0].count,
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
    res.status(200).json({
      clubs: clubs,
    });
  }
};

export const getSingleMainClub = async (req, res) => {
  const clubId = req.query.clubId;
  console.log("CLUBID", clubId);
  await connection
    .promise()
    .query(`SELECT * FROM main_club WHERE club_id = '${clubId}'`)
    .then((data) => {
      res.status(200).json({
        club: data[0],
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: "error",
        msg: "500 internal server error",
      });
    });
};
