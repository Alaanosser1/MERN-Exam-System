import connection from "../database.js";
import Joi from "joi";

export const createSubClub = (req, res) => {
  const clubName = req.body.clubName;
  const clubDescription = req.body.clubDescription;
  const clubNumber = req.body.clubNumber;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const mainClubId = req.body.mainClubId;
  const studentsType = req.body.studentsType;
  const subClubType = req.body.subClubType;
  const theoriticalGrades = req.body.theoriticalGrades;
  const practicalGrades = req.body.practicalGrades;
  const attendenceGrades = req.body.attendenceGrades;
  const behaviourGrades = req.body.behaviourGrades;
  const placement = req.body.placement;
  const totalGrades =
    parseInt(theoriticalGrades) +
    parseInt(practicalGrades) +
    parseInt(attendenceGrades) +
    parseInt(behaviourGrades);

  connection
    .promise()
    .query(
      `INSERT INTO sub_club(sub_club_name, sub_club_description,
         sub_club_number, start_date, end_date, main_club_id,
         students_type, sub_club_type, theoritical_grades, practical_grades,
         attendence_grades, behaviour_grades, total_grades, placement)
          VALUES(
           '${clubName}','${clubDescription}','${clubNumber}',
           '${startDate}', '${endDate}', '${mainClubId}',
           '${studentsType}', '${subClubType}', '${theoriticalGrades}',
           '${practicalGrades}', '${attendenceGrades}', '${behaviourGrades}',
           '${totalGrades}', '${placement}')`
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

export const editSubClub = (req, res) => {
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

export const deleteSubClub = (req, res) => {
  const clubId = req.query.clubId;

  connection
    .promise()
    .query(
      `
              UPDATE sub_club 
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

export const getSubClubs = async (req, res) => {
  const mainClubId = req.query.mainClubId;
  let clubs = [];
  let isError = false;
  await connection
    .promise()
    .query(`SELECT * FROM sub_club WHERE main_club_id = ${mainClubId}`)
    .then((data) => {
      res.status(200).json({
        clubs: data[0],
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
  //   for (let i = 0; i < clubs.length; i++) {
  //     await connection
  //       .promise()
  //       .query(
  //         `SELECT COUNT(*) as count FROM sub_club WHERE main_club_id = ${clubs[i].club_id} `
  //       )
  //       .then((data) => {
  //         Object.assign(clubs[i], {
  //           number_of_sub_clubs: data[0][0].count,
  //         });
  //       })
  //       .catch((error) => {
  //         isError = true;
  //         console.log(error);
  //         res.status(500).json({
  //           status: "error",
  //           msg: "500 internal server error",
  //         });
  //       });
  //   }

  //   if (!isError) {
  //     res.status(200).json({
  //       clubs: clubs,
  //     });
  //   }
};

export const getSingleSubClub = async (req, res) => {
  const clubId = req.query.clubId;

  await connection
    .promise()
    .query(`SELECT * FROM sub_club WHERE sub_club_id = '${clubId}'`)
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
