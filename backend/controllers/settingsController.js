const RestaurantSettings = require("../models/RestaurantSettings");
const { memoryStore, isDbConnected } = require("../data/memoryStore");
const { defaultSettings } = require("../data/defaultData");

// @desc    Get restaurant settings (Singleton pattern)
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      let settings = await RestaurantSettings.findOne({ id: "default_settings" });
      if (!settings) {
        settings = await RestaurantSettings.create(defaultSettings);
      }
      return res.json({ success: true, data: settings });
    }

    res.json({ success: true, data: memoryStore.settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update restaurant settings
// @route   PUT /api/settings
// @access  Admin
const updateSettings = async (req, res, next) => {
  try {
    const updateData = req.body;

    if (isDbConnected()) {
      const settings = await RestaurantSettings.findOneAndUpdate(
        { id: "default_settings" },
        { ...updateData, id: "default_settings" },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, data: settings });
    }

    memoryStore.settings = { ...memoryStore.settings, ...updateData, id: "default_settings" };
    res.json({ success: true, data: memoryStore.settings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
