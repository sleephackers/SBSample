const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Student.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    year: req.body.year,
    course: req.body.course,
    experience: req.body.experience,
    work: req.body.work
  });
  student
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /students",
        createdStudent: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:studentID", (req, res, next) => {
  const id = req.params.studentId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You passed an ID"
    });
  }
});

router.patch("/:studentID", (req, res, next) => {
  res.status(200).json({
    message: "Updated student!"
  });
});

router.delete("/:studentID", (req, res, next) => {
  res.status(200).json({
    message: "Deleted student!"
  });
});

module.exports = router;
