const Assignment = require('../models/Assignment');
const User = require('../models/User');

const createAssignment = async (req, res) => {
  const { title, description, dueDate, maxMarks } = req.body;

  try {
    const assignment = new Assignment({
      title,
      description,
      dueDate,
      maxMarks,
      createdBy: req.user.id
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAssignments = async (req, res) => {
  try {
    let assignments;
    if (req.user.role === 'student') {
      assignments = await Assignment.find()
        .sort({ dueDate: 1 })
        .populate('createdBy', 'name');
    } else {
      assignments = await Assignment.find({ createdBy: req.user.id })
        .sort({ dueDate: 1 })
        .populate('createdBy', 'name');
    }
    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const submitAssignment = async (req, res) => {
  const { fileUrl } = req.body;

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user.id
    );

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    assignment.submissions.push({
      student: req.user.id,
      fileUrl
    });

    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAssignment, getAssignments, submitAssignment };