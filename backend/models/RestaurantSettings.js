const mongoose = require("mongoose");

const RestaurantSettingsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      default: "default_settings",
    },
    name: {
      type: String,
      default: "مطعم نيو بورسعيد — الخلاط",
    },
    name_en: {
      type: String,
      default: "New Port Said Restaurant — The Mixer",
    },
    tagline: {
      type: String,
      default: "أصل الانبساط • عصير فريش وخلطات ملهاش مثيل في سوهاج",
    },
    phones: {
      type: [String],
      default: ["01007375151", "01100130080", "01008329497"],
    },
    address: {
      type: String,
      default: "سوهاج — بجوار مستشفى الهلال",
    },
    whatsapp: {
      type: String,
      default: "201007375151",
    },
    working_hours: {
      type: String,
      default: "يومياً من ١٢:٠٠ ظهراً حتى ٠٢:٠٠ بعد منتصف الليل",
    },
    facebook_url: {
      type: String,
      default: "https://facebook.com",
    },
    instagram_url: {
      type: String,
      default: "https://instagram.com",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RestaurantSettings", RestaurantSettingsSchema);
