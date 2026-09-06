const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");
const RestaurantSettings = require("../models/RestaurantSettings");
const Review = require("../models/Review");
const Feedback = require("../models/Feedback");
const { memoryStore, isDbConnected } = require("../data/memoryStore");
const { defaultSettings, defaultCategories, defaultMenuItems } = require("../data/defaultData");

// @desc    Seed database with default restaurant dataset
// @route   POST /api/seed
// @access  Admin
const seedDatabase = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      await RestaurantSettings.findOneAndUpdate(
        { id: "default_settings" },
        defaultSettings,
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      let categoriesCount = 0;
      for (const cat of defaultCategories) {
        await Category.findOneAndUpdate({ id: cat.id }, cat, { new: true, upsert: true, setDefaultsOnInsert: true });
        categoriesCount++;
      }

      let itemsCount = 0;
      for (const item of defaultMenuItems) {
        await MenuItem.findOneAndUpdate({ id: item.id }, item, { new: true, upsert: true, setDefaultsOnInsert: true });
        itemsCount++;
      }

      return res.json({
        success: true,
        categoriesCount,
        itemsCount,
        message: `Database synced successfully! ${categoriesCount} categories and ${itemsCount} items updated.`,
      });
    }

    // In-memory re-seed
    memoryStore.settings = { ...defaultSettings };
    memoryStore.categories = [...defaultCategories];
    memoryStore.menuItems = [...defaultMenuItems];

    res.json({
      success: true,
      categoriesCount: defaultCategories.length,
      itemsCount: defaultMenuItems.length,
      message: `In-Memory Dataset refreshed with ${defaultCategories.length} categories and ${defaultMenuItems.length} items.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get database collection statistics
// @route   GET /api/seed/stats
// @access  Admin / Public
const getSeedStats = async (req, res, next) => {
  try {
    const connected = isDbConnected();

    if (connected) {
      const categories = await Category.countDocuments();
      const menuItems = await MenuItem.countDocuments();
      const reviews = await Review.countDocuments();
      const feedback = await Feedback.countDocuments();

      return res.json({
        success: true,
        connected: true,
        stats: { categories, menuItems, reviews, feedback },
      });
    }

    res.json({
      success: true,
      connected: false,
      mode: "in_memory",
      stats: {
        categories: memoryStore.categories.length,
        menuItems: memoryStore.menuItems.length,
        reviews: memoryStore.reviews.length,
        feedback: memoryStore.feedback.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  seedDatabase,
  getSeedStats,
};
