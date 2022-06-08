const express = require("express");
const router = express.Router();

const mysqlConnection = require("../startup/db");

router.get("/video", async (req, res) => {
  try {
    mysqlConnection.query(
      "select video.*,vl.list_id,vl.name,vl.link from video inner join videolist as vl on video.id = vl.video_id",
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).send(result);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/video/:id", async (req, res) => {
  const id = req.params.id;
  try {
    mysqlConnection.query(
      "select video.*,vl.list_id,vl.name,vl.link from video inner join videolist as vl on video.id = vl.video_id where id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).send(result);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/videos", async (req, res) => {
  try {
    mysqlConnection.query("select * from video", (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/video", async (req, res) => {
  const { name, description, active } = req.body;
  try {
    mysqlConnection.query(
      "insert into video (NAME, DESCRIPTION, ACTIVE) values (?, ?, ?)",
      [name, description, active],
      (err, result) => {
        if (err) {
          console.log("Error while inserting data", err);
          return res.status(400).send();
        }
        return res.status(200).send("Inserted Successfully");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.patch("/video/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const active = req.body.active;

  try {
    mysqlConnection.query(
      "update video set NAME=?, DESCRIPTION=?,ACTIVE=? where id=?",
      [name, description, active, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).send("Updated Successfully");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.delete("/video/:id", async (req, res) => {
  const id = req.params.id;
  try {
    mysqlConnection.query("delete from video where id = ?", [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      if (result.affectedRows == 0) {
        return res.status(404).send("No Video With That List_id");
      }
      return res.status(200).send("Deleted Successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
