const Notice = require('../models/Notice');
const User = require('../models/User');

const createNotice = async (req, res) => {
  const { title, content, targetRoles } = req.body;

  try {
    const notice = new Notice({
      title,
      content,
      targetRoles,
      createdBy: req.user.id
    });

    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ targetRoles: req.user.role })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');
    res.json(notices);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createNotice, getNotices };