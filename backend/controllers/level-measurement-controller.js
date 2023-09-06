import connection from "../database.js";

export const createFitnessLevelMeasurement = async (req, res) => {
  const fitnessLevelBefore = req.body.fitnessLevelBefore;
  const fitnessLevelDuring = req.body.fitnessLevelDuring;
  const fitnessLevelAfter = req.body.fitnessLevelAfter;
  const textureBefore = req.body.textureBefore;
  const textureAfter = req.body.textureAfter;
  const subClubId = req.body.subClubId;
  const examineeId = req.body.examineeId;

  connection
    .promise()
    .execute(
      `INSERT INTO fitness_level_measurement
    (fitness_level_before, fitness_level_during, 
    fitness_level_after, texture_before, texture_after, sub_club_id, examinee_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fitnessLevelBefore,
        fitnessLevelDuring,
        fitnessLevelAfter,
        textureBefore,
        textureAfter,
        subClubId,
        examineeId,
      ]
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

export const editFitnessLevelMeasurement = async (req, res) => {
  const fitnessLevelBefore = req.body.fitnessLevelBefore;
  const fitnessLevelDuring = req.body.fitnessLevelDuring;
  const fitnessLevelAfter = req.body.fitnessLevelAfter;
  const textureBefore = req.body.textureBefore;
  const textureAfter = req.body.textureAfter;
  const subClubId = req.body.subClubId;
  const examineeId = req.body.examineeId;
  const fitnessLeveMeasurementId = req.body.fitnessLeveMeasurementId;

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const query = `
  UPDATE main_club
  SET fitness_level_measurement = ?,
      fitness_level_during = ?,
      fitness_level_after = ?,
      texture_before = ?,
      texture_after = ?
  WHERE fitness_level_measurement_id = ?
    AND examinee_id = ?
    AND sub_club_id = ?
    `;

  await connection
    .promise()
    .execute(query, [
      fitnessLevelBefore,
      fitnessLevelDuring,
      fitnessLevelAfter,
      textureBefore,
      textureAfter,
      fitnessLeveMeasurementId,
      examineeId,
      subClubId,
    ])
    .then(([data]) => {
      if (data.affectedRows !== 0) {
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

export const getAllSubClubFitnessLevelMeasurement = async (req, res) => {
  const subClubId = req.query.subClubId;

  try {
    const data = await connection
      .promise()
      .query("SELECT * FROM fitness_level_measurement WHERE examinee_id = ?", [
        examineeId,
      ]);
    res.status(200).json({
      subClubfitnessLeveMeasurement: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 internal server error",
    });
  }
};

export const getFitnessLevelMeasurementForExaminee = async (req, res) => {
  const examineeId = req.query.examineeId;
  const subClubId = req.query.subClubId;

  try {
    const data = await connection
      .promise()
      .query(
        "SELECT * FROM fitness_level_measurement WHERE examinee_id = ? AND sub_club_id = ?",
        [examineeId, subClubId]
      );

    res.status(200).json({
      fitnessLeveMeasurement: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "500 internal server error",
    });
  }
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
