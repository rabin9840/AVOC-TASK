const express = require("express");
const router = express.Router();

const mysqlConnection = require("../startup/db");

router.get("/videolist", async (req, res) => {
  try {
    mysqlConnection.query("select * from videolist", (err, result) => {
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

router.get("/videolist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    mysqlConnection.query(
      "select * from videolist where list_id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log("err");
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

router.post("/videolist", async (req, res) => {
  const { video_id, name, link } = req.body;
  try {
    mysqlConnection.query(
      "insert into videolist (video_id, name, link) values (?, ?, ?)",
      [video_id, name, link],
      (err, result) => {
        if (err) {
          console.log("Error While Inserting data", err);
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

router.patch("/videolist/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const link = req.body.link;
  const video_id = req.body.video_id;

  try {
    mysqlConnection.query(
      "update videolist set name=?, link=?,video_id=? where list_id=?",
      [name, link, video_id, id],
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

router.delete("/videolist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    mysqlConnection.query(
      "delete from videolist where list_id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (result.affectedRows == 0) {
          return res.status(404).send("No Video List With That List_id");
        }
        return res.status(200).send("Deleted Successfully");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;
