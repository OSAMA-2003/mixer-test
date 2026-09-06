const mongoose = require("mongoose");
const { defaultSettings, defaultCategories, defaultMenuItems } = require("./defaultData");

// In-Memory Data Cache
const memoryStore = {
  settings: { ...defaultSettings },
  categories: [...defaultCategories],
  menuItems: [...defaultMenuItems],
  reviews: [
    {
      id: "rev_demo_1",
      name: "أحمد محمود",
      phone: "01012345678",
      rating: 5,
      comment: "أفضل عصير مانجو وأفوكادو في سوهاج بلا منازع! الخدمة ممتازة.",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
    {
      id: "rev_demo_2",
      name: "سارة علي",
      phone: "01198765432",
      rating: 5,
      comment: "الوافلز بالنوتيلا والفواكه خطير وطازج جداً. بنصح بيه.",
      status: "approved",
      createdAt: new Date().toISOString(),
    },
  ],
  feedback: [
    {
      id: "fb_demo_1",
      name: "محمود حسن",
      phone: "01009988776",
      type: "suggestion",
      message: "نتمنى إضافة فرع جديد في وسط البلد بالقرب من الجامعة.",
      is_read: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

const isDbConnected = () => mongoose.connection.readyState === 1;

module.exports = {
  memoryStore,
  isDbConnected,
};
