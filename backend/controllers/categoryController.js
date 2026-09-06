const Category = require("../models/Category");
const MenuItem = require("../models/MenuItem");
const { memoryStore, isDbConnected } = require("../data/memoryStore");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const categories = await Category.find().sort({ display_order: 1 });
      return res.json({ success: true, count: categories.length, data: categories });
    }

    const categories = [...memoryStore.categories].sort((a, b) => a.display_order - b.display_order);
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Upsert category (Create or Update)
// @route   POST /api/categories
// @access  Admin
const upsertCategory = async (req, res, next) => {
  try {
    const { id, title, image, description, icon, display_order } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Category title is required" });
    }

    const categoryId = id || `cat_${Date.now()}`;

    if (isDbConnected()) {
      const category = await Category.findOneAndUpdate(
        { id: categoryId },
        {
          id: categoryId,
          title,
          image: image || "",
          description: description || "",
          icon: icon || "Flame",
          display_order: display_order !== undefined ? Number(display_order) : 0,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, data: category });
    }

    // In-memory fallback
    const index = memoryStore.categories.findIndex((c) => c.id === categoryId);
    const newCategory = {
      id: categoryId,
      title,
      image: image || "",
      description: description || "",
      icon: icon || "Flame",
      display_order: display_order !== undefined ? Number(display_order) : 0,
    };

    if (index >= 0) {
      memoryStore.categories[index] = newCategory;
    } else {
      memoryStore.categories.push(newCategory);
    }

    res.json({ success: true, data: newCategory });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category and cascade delete items
// @route   DELETE /api/categories/:id
// @access  Admin
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const category = await Category.findOneAndDelete({ id });
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      const deletedItems = await MenuItem.deleteMany({ category_id: id });
      return res.json({
        success: true,
        message: `Category '${category.title}' and ${deletedItems.deletedCount} items deleted`,
      });
    }

    // In-memory fallback
    const initialLen = memoryStore.categories.length;
    memoryStore.categories = memoryStore.categories.filter((c) => c.id !== id);
    const itemsLen = memoryStore.menuItems.length;
    memoryStore.menuItems = memoryStore.menuItems.filter((i) => i.category_id !== id);

    if (memoryStore.categories.length === initialLen) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.json({
      success: true,
      message: `Category deleted and ${itemsLen - memoryStore.menuItems.length} items removed`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  upsertCategory,
  deleteCategory,
};
