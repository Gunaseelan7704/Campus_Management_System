const Attendance = require('../models/Attendance');
const User = require('../models/User');

const markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    const existingAttendance = await Attendance.findOne({
      student: studentId,
      date: new Date(date)
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for this date' });
    }

    const attendance = new Attendance({
      student: studentId,
      date,
      status,
      markedBy: req.user.id
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendance = async (req, res) => {
  try {
    let attendance;
    if (req.user.role === 'student') {
      attendance = await Attendance.find({ student: req.user.id })
        .sort({ date: -1 })
        .populate('markedBy', 'name');
    } else {
      attendance = await Attendance.find()
        .sort({ date: -1 })
        .populate('student', 'name')
        .populate('markedBy', 'name');
    }
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { markAttendance, getAttendance };