const { Student } = require('../db');
const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// get one student 
router.get('/:uuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.uuid });
  res.send(student);
})

// add one student to the class
router.post('/', async (req, res) => {
  const student = await Student.create(req.body);
  student.save();
  res.send(student);
})

// add one student timeline
router.post('/:uuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.uuid });
  student.assessments.push({ ...req.body, uuid: uuid() });
  student.save();
  res.send(student);
})

// update one student timeline
router.patch('/:studentUuid/:timelineUuid', async (req, res) => {
  const student = await Student.findOne({ uuid: req.params.studentUuid });
  const timelineIndex = student.assessments.findIndex(timeline => timeline.uuid === req.params.timelineUuid);
  student.assessments[timelineIndex] = req.body;
  student.save();
  res.send(student);
})

module.exports = router;
