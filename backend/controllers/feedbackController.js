const Feedback = require("../models/Feedback");
const { memoryStore, isDbConnected } = require("../data/memoryStore");

// @desc    Submit public suggestion or complaint
// @route   POST /api/feedback
// @access  Public
const createFeedback = async (req, res, next) => {
  try {
    const { name, phone, type, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "Name, phone, and message are required" });
    }

    const feedbackId = `fb_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    if (isDbConnected()) {
      const feedback = await Feedback.create({
        id: feedbackId,
        name,
        phone,
        type: type === "complaint" ? "complaint" : "suggestion",
        message,
        is_read: false,
      });
      return res.status(201).json({ success: true, data: feedback });
    }

    const newFeedback = {
      id: feedbackId,
      name,
      phone,
      type: type === "complaint" ? "complaint" : "suggestion",
      message,
      is_read: false,
      createdAt: new Date().toISOString(),
    };
    memoryStore.feedback.unshift(newFeedback);

    res.status(201).json({ success: true, data: newFeedback });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all feedback tickets (Admin)
// @route   GET /api/feedback/all
// @access  Admin
const getAllFeedback = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const feedbackList = await Feedback.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: feedbackList.length, data: feedbackList });
    }

    res.json({ success: true, count: memoryStore.feedback.length, data: memoryStore.feedback });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle feedback read/unread status
// @route   PATCH /api/feedback/:id/read
// @access  Admin
const toggleReadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    if (isDbConnected()) {
      const feedback = await Feedback.findOneAndUpdate(
        { id },
        { is_read: is_read !== undefined ? Boolean(is_read) : true },
        { new: true }
      );
      if (!feedback) {
        return res.status(404).json({ success: false, message: "Feedback ticket not found" });
      }
      return res.json({ success: true, data: feedback });
    }

    const index = memoryStore.feedback.findIndex((f) => f.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Feedback ticket not found" });
    }

    memoryStore.feedback[index].is_read = is_read !== undefined ? Boolean(is_read) : true;
    res.json({ success: true, data: memoryStore.feedback[index] });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete feedback ticket
// @route   DELETE /api/feedback/:id
// @access  Admin
const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const feedback = await Feedback.findOneAndDelete({ id });
      if (!feedback) {
        return res.status(404).json({ success: false, message: "Feedback ticket not found" });
      }
      return res.json({ success: true, message: "Feedback ticket deleted successfully" });
    }

    const initialLen = memoryStore.feedback.length;
    memoryStore.feedback = memoryStore.feedback.filter((f) => f.id !== id);

    if (memoryStore.feedback.length === initialLen) {
      return res.status(404).json({ success: false, message: "Feedback ticket not found" });
    }

    res.json({ success: true, message: "Feedback ticket deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  toggleReadStatus,
  deleteFeedback,
};
