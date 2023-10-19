import connection from "../database.js";

export const createFitnessLevelMeasurement = async (req, res) => {
  const fitnessLevelBefore = req.body.fitnessLevelBefore;
  const fitnessLevelDuring = req.body.fitnessLevelDuring;
  const fitnessLevelAfter = req.body.fitnessLevelAfter;
  const textureBefore = req.body.textureBefore;
  const textureAfter = req.body.textureAfter;
  const subClubId = req.body.subClubId;
  const examineeId = req.body.examineeId;
  const behavior = req.body.behavior; // Add behavior as a parameter
  const perseverance = req.body.perseverance; // Add perseverance as a parameter

  connection
    .promise()
    .execute(
      `INSERT INTO fitness_level_measurement
    (fitness_level_before, fitness_level_during,
    fitness_level_after, texture_before, texture_after, sub_club_id, examinee_id, behavior, perseverance)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, // Include behavior and perseverance in the INSERT statement
      [
        fitnessLevelBefore,
        fitnessLevelDuring,
        fitnessLevelAfter,
        textureBefore,
        textureAfter,
        subClubId,
        examineeId,
        behavior, // Include behavior here
        perseverance, // Include perseverance here
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
  const textureBefore = req.body.textureLevelBefore;
  const textureAfter = req.body.textureLevelAfter;
  const shootingBefore = req.body.shootingBefore;
  const shootingTest = req.body.shootingTest;
  const subClubId = req.body.subClubId;
  const examineeId = req.body.examineeId;
  const behavior = req.body.behavior; // Add behavior as a parameter
  const perseverance = req.body.perseverance; // Add perseverance as a parameter

  console.log(
    fitnessLevelBefore,
    fitnessLevelDuring,
    fitnessLevelAfter,
    textureBefore,
    textureAfter,
    shootingBefore,
    shootingTest,
    subClubId,
    examineeId,
    behavior, // Log behavior
    perseverance // Log perseverance
  );

  const query = `
  UPDATE fitness_level_measurement
  SET fitness_level_before = ?,
      fitness_level_during = ?,
      fitness_level_after = ?,
      texture_before = ?,
      texture_after = ?,
      shooting_level_before = ?,
      shooting_level_test = ?,
      behavior = ?, 
      perseverance = ? 
  WHERE examinee_id = ? AND sub_club_id = ?
    `;

  await connection
    .promise()
    .execute(query, [
      fitnessLevelBefore,
      fitnessLevelDuring,
      fitnessLevelAfter,
      textureBefore,
      textureAfter,
      shootingBefore,
      shootingTest,
      behavior, // Include behavior here
      perseverance, // Include perseverance here
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
    const data = await connection.promise().query(
      `SELECT 
        fitness_level_before, 
        fitness_level_after, 
        fitness_level_during,
        texture_before, 
        texture_after, 
        shooting_level_before, 
        shooting_level_test, 
        examinee.examinee_id, 
        examinee_name, 
        examinee_rank,
        behavior, -- Include behavior in the SELECT statement
        perseverance -- Include perseverance in the SELECT statement
      FROM fitness_level_measurement 
      JOIN examinee ON fitness_level_measurement.examinee_id = examinee.examinee_id 
      WHERE fitness_level_measurement.sub_club_id = ?`,
      [subClubId]
    );
    res.status(200).json({
      subClubfitnessLevelMeasurement: data[0],
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
