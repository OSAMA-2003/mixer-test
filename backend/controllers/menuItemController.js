const MenuItem = require("../models/MenuItem");
const Category = require("../models/Category");
const { memoryStore, isDbConnected } = require("../data/memoryStore");

// @desc    Get full nested menu grouped by categories
// @route   GET /api/menu/full
// @access  Public
const getFullMenu = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const categories = await Category.find().sort({ display_order: 1 }).lean();
      const allItems = await MenuItem.find().sort({ display_order: 1 }).lean();

      const fullMenu = categories.map((cat) => {
        const items = allItems
          .filter((item) => item.category_id === cat.id)
          .map((item) => ({
            ...item,
            price_formatted: item.is_daily ? "يومي" : item.price,
          }));

        return { ...cat, items };
      });

      return res.json({ success: true, count: fullMenu.length, data: fullMenu });
    }

    // In-memory fallback
    const categories = [...memoryStore.categories].sort((a, b) => a.display_order - b.display_order);
    const allItems = [...memoryStore.menuItems].sort((a, b) => a.display_order - b.display_order);

    const fullMenu = categories.map((cat) => {
      const items = allItems
        .filter((item) => item.category_id === cat.id)
        .map((item) => ({
          ...item,
          price_formatted: item.is_daily ? "يومي" : item.price,
        }));
      return { ...cat, items };
    });

    res.json({ success: true, count: fullMenu.length, data: fullMenu });
  } catch (error) {
    next(error);
  }
};

// @desc    Get special dishes for carousel
// @route   GET /api/menu/special
// @access  Public
const getSpecialItems = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const items = await MenuItem.find({ is_special: true, is_available: true }).sort({ display_order: 1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    const items = memoryStore.menuItems
      .filter((i) => i.is_special && (i.is_available !== false))
      .sort((a, b) => a.display_order - b.display_order);

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Get promotional offer items
// @route   GET /api/menu/offers
// @access  Public
const getOfferItems = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const items = await MenuItem.find({ is_offer: true, is_available: true }).sort({ display_order: 1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    const items = memoryStore.menuItems
      .filter((i) => i.is_offer && (i.is_available !== false))
      .sort((a, b) => a.display_order - b.display_order);

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Get menu items with optional category/special/offer filter
// @route   GET /api/menu/items
// @access  Public
const getItems = async (req, res, next) => {
  try {
    const { category_id, is_special, is_offer } = req.query;

    if (isDbConnected()) {
      const filter = {};
      if (category_id && category_id !== "all") filter.category_id = category_id;
      if (is_special !== undefined) filter.is_special = is_special === "true";
      if (is_offer !== undefined) filter.is_offer = is_offer === "true";

      const items = await MenuItem.find(filter).sort({ display_order: 1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    let items = [...memoryStore.menuItems];
    if (category_id && category_id !== "all") {
      items = items.filter((i) => i.category_id === category_id);
    }
    if (is_special !== undefined) {
      const isSpec = is_special === "true";
      items = items.filter((i) => Boolean(i.is_special) === isSpec);
    }
    if (is_offer !== undefined) {
      const isOff = is_offer === "true";
      items = items.filter((i) => Boolean(i.is_offer) === isOff);
    }
    items.sort((a, b) => a.display_order - b.display_order);

    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

// @desc    Upsert menu item (Create or Update)
// @route   POST /api/menu/items
// @access  Admin
const upsertMenuItem = async (req, res, next) => {
  try {
    const {
      id,
      category_id,
      name,
      price,
      original_price,
      is_daily,
      badge,
      description,
      image,
      img,
      is_available,
      is_special,
      is_offer,
      display_order,
    } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ success: false, message: "Name and Category ID are required" });
    }

    let finalIsDaily = Boolean(is_daily);
    let finalPrice = 0;

    if (price === "يومي" || String(price).trim() === "يومي") {
      finalIsDaily = true;
      finalPrice = 0;
    } else {
      finalPrice = Number(price) || 0;
    }

    const itemId = id || `item_${Date.now()}`;
    const finalImg = image || img || "";
    const finalOriginalPrice = original_price ? Number(original_price) : 0;

    if (isDbConnected()) {
      const categoryExists = await Category.findOne({ id: category_id });
      if (!categoryExists) {
        await Category.create({ id: category_id, title: category_id, display_order: 99 });
      }

      const menuItem = await MenuItem.findOneAndUpdate(
        { id: itemId },
        {
          id: itemId,
          category_id,
          name,
          price: finalPrice,
          original_price: finalOriginalPrice,
          is_daily: finalIsDaily,
          badge: badge || "",
          description: description || "",
          image: finalImg,
          is_available: is_available !== undefined ? Boolean(is_available) : true,
          is_special: is_special !== undefined ? Boolean(is_special) : false,
          is_offer: is_offer !== undefined ? Boolean(is_offer) : false,
          display_order: display_order !== undefined ? Number(display_order) : 0,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json({ success: true, data: menuItem });
    }

    // In-memory fallback
    const catIndex = memoryStore.categories.findIndex((c) => c.id === category_id);
    if (catIndex === -1) {
      memoryStore.categories.push({ id: category_id, title: category_id, display_order: 99 });
    }

    const itemIndex = memoryStore.menuItems.findIndex((i) => i.id === itemId);
    const newItem = {
      id: itemId,
      category_id,
      name,
      price: finalPrice,
      original_price: finalOriginalPrice,
      is_daily: finalIsDaily,
      badge: badge || "",
      description: description || "",
      image: finalImg,
      img: finalImg,
      is_available: is_available !== undefined ? Boolean(is_available) : true,
      is_special: is_special !== undefined ? Boolean(is_special) : false,
      is_offer: is_offer !== undefined ? Boolean(is_offer) : false,
      display_order: display_order !== undefined ? Number(display_order) : 0,
    };

    if (itemIndex >= 0) {
      memoryStore.menuItems[itemIndex] = newItem;
    } else {
      memoryStore.menuItems.push(newItem);
    }

    res.json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/items/:id
// @access  Admin
const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const item = await MenuItem.findOneAndDelete({ id });
      if (!item) {
        return res.status(404).json({ success: false, message: "Menu item not found" });
      }
      return res.json({ success: true, message: "Menu item deleted successfully" });
    }

    // In-memory fallback
    const initialLen = memoryStore.menuItems.length;
    memoryStore.menuItems = memoryStore.menuItems.filter((i) => i.id !== id);

    if (memoryStore.menuItems.length === initialLen) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFullMenu,
  getSpecialItems,
  getOfferItems,
  getItems,
  upsertMenuItem,
  deleteMenuItem,
};
