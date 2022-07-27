const { Class, Student } = require("../db");
const express = require("express");
const router = express.Router();

// get one class
router.get("/:uuid", async (req, res) => {
  const className = await Class.findOne({ uuid: req.params.uuid });
  const students = await Student.find({ classUuid: className.uuid });
  res.send({
    uuid: className.uuid,
    className: className.className,
    students: students.map((st) => ({ uuid: st.uuid, name: st.studentName })),
  });
});

// add one student to class
router.post("/:uuid", async (req, res) => {
  const className = await Class.findOne({ uuid: req.params.uuid });
  const student = await Student.findOne({ uuid: req.body.uuid });
  className.students.push({ uuid: req.body.uuid, name: student.studentName });
  await className.save();
  res.send(className);
});

module.exports = router;
