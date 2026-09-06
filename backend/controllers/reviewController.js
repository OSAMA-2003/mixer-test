const Review = require("../models/Review");
const { memoryStore, isDbConnected } = require("../data/memoryStore");

// @desc    Submit public customer review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res, next) => {
  try {
    const { name, phone, rating, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ success: false, message: "Name and comment are required" });
    }

    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    if (isDbConnected()) {
      const review = await Review.create({
        id: reviewId,
        name,
        phone: phone || "",
        rating: rating ? Number(rating) : 5,
        comment,
        status: "pending",
      });
      return res.status(201).json({ success: true, data: review });
    }

    const newReview = {
      id: reviewId,
      name,
      phone: phone || "",
      rating: rating ? Number(rating) : 5,
      comment,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    memoryStore.reviews.unshift(newReview);

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    next(error);
  }
};

// @desc    Get approved customer reviews
// @route   GET /api/reviews/approved
// @access  Public
const getApprovedReviews = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const reviews = await Review.find({ status: "approved" }).sort({ createdAt: -1 });
      return res.json({ success: true, count: reviews.length, data: reviews });
    }

    const reviews = memoryStore.reviews.filter((r) => r.status === "approved");
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews (Admin moderation view)
// @route   GET /api/reviews/all
// @access  Admin
const getAllReviews = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: reviews.length, data: reviews });
    }

    res.json({ success: true, count: memoryStore.reviews.length, data: memoryStore.reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Moderate review status (approved/rejected/pending)
// @route   PATCH /api/reviews/:id/status
// @access  Admin
const updateReviewStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    if (isDbConnected()) {
      const review = await Review.findOneAndUpdate({ id }, { status }, { new: true });
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
      return res.json({ success: true, data: review });
    }

    const index = memoryStore.reviews.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    memoryStore.reviews[index].status = status;
    res.json({ success: true, data: memoryStore.reviews[index] });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Admin
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const review = await Review.findOneAndDelete({ id });
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
      return res.json({ success: true, message: "Review deleted successfully" });
    }

    const initialLen = memoryStore.reviews.length;
    memoryStore.reviews = memoryStore.reviews.filter((r) => r.id !== id);

    if (memoryStore.reviews.length === initialLen) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getApprovedReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
};
