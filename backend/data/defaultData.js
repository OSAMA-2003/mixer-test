const defaultSettings = {
  id: "default_settings",
  name: "الخلاط — سوهاج",
  name_en: "The Mixer — Sohag",
  tagline: "أصل الانبساط • عصير فريش وخلطات ملهاش مثيل في سوهاج",
  phones: ["01007375151", "01100130080", "01008329497"],
  address: "سوهاج — بجوار مستشفى الهلال",
  whatsapp: "201007375151",
  working_hours: "يومياً من ١٢:٠٠ ظهراً حتى ٠٢:٠٠ بعد منتصف الليل",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  show_offers_section: true,
};

const defaultCategories = [
  { id: "special", title: "سبيشيال الخلاط", icon: "Sparkles", display_order: 1, image: "/products/p1.jpg", description: "خلطات الخلاط السحرية والكوكايلا المتميزة" },
  { id: "winter", title: "الركن الشتوي", icon: "Flame", display_order: 2, image: "/products/p2.jpg", description: "بليلة وسحلب وأم علي وكسكسي دافئ" },
  { id: "waffles", title: "وافلز الخلاط", icon: "Cookie", display_order: 3, image: "/products/p5.jpg", description: "وافل بلجيكي مقرمش بالنوتيلا واللوتس والفواكه" },
  { id: "rice-pudding", title: "أرز بلبن", icon: "Utensils", display_order: 4, image: "/products/p6.jpg", description: "طواجن وبولات أرز بلبن غنية بالإضافات والآيس كريم" },
  { id: "juices-1l", title: "منيو الـ 1 لتر", icon: "Wine", display_order: 5, image: "/products/p4.jpg", description: "زجاجات عصائر طبيعية مركزة سعة 1 لتر" },
  { id: "sobia-ramadan", title: "سوبيا ورمضانيات", icon: "Coffee", display_order: 6, image: "/products/p1.jpg", description: "سوبيا باردة وعصائر رمضانية أصيلة" },
  { id: "add-ons", title: "إضافات", icon: "PlusCircle", display_order: 7, image: "/products/p3.jpg", description: "إضافات العسل، المكسرات، القشطة، والنوتيلا" },
];

const defaultMenuItems = [
  // SPECIAL
  { id: "shikar", category_id: "special", name: "شيكار", price: 65, original_price: 85, is_offer: true, badge: "عرض خاص 🔥", img: "/products/p1.jpg", image: "/products/p1.jpg", description: "خلطة الخلاط السحرية الغنية بقطع الفواكه والكريمة.", is_special: true, is_available: true, display_order: 1 },
  { id: "lacasa", category_id: "special", name: "لاكاسا", price: 65, badge: "مميز", img: "/products/p2.jpg", image: "/products/p2.jpg", description: "كوكتيل طبقات غني بالفواكه الطازجة والآيس كريم.", is_special: true, is_available: true, display_order: 2 },
  { id: "avocado-nuts", category_id: "special", name: "أفوكادو عصير مكسرات", price: 85, original_price: 110, is_offer: true, badge: "خصم حصري 🔥", img: "/products/p3.jpg", image: "/products/p3.jpg", description: "أفوكادو بلدي طازج مع العسل الطبيعي والمكسرات الفاخرة.", is_special: true, is_available: true, display_order: 3 },
  { id: "manjawy", category_id: "special", name: "مانجاوي", price: 60, badge: "انتعاش", img: "/products/p4.jpg", image: "/products/p4.jpg", description: "عصير مانجو مركز غني بقطع المانجو الطبيعية.", is_special: true, is_available: true, display_order: 4 },
  { id: "fustokado-pro", category_id: "special", name: "فستوكادو برو", price: 65, badge: "جديد ✨", img: "/products/p5.jpg", image: "/products/p5.jpg", description: "مزيج الأفوكادو والفستق الحلبي مع صوص الكريمة.", is_special: true, is_available: true, display_order: 5 },
  { id: "soft-caramel", category_id: "special", name: "سوفت كراميل", price: 65, badge: "", img: "/products/p6.jpg", image: "/products/p6.jpg", description: "ميلك شيك كراميل غني مع صوص الكراميل الدافي.", is_special: true, is_available: true, display_order: 6 },
  { id: "soft-oreo", category_id: "special", name: "سوفت أوريو", price: 65, badge: "محبوب الشباب", img: "/products/p2.jpg", image: "/products/p2.jpg", description: "أوريو مع الآيس كريم وبسكويت مقرمش غرقان شوكولاتة.", is_special: true, is_available: true, display_order: 7 },
  { id: "romanisto", category_id: "special", name: "رومانستو", price: 55, badge: "", img: "/products/p3.jpg", image: "/products/p3.jpg", description: "مزيج الرمان المنعش مع النعناع والصودا الفوارة.", is_special: false, is_available: true, display_order: 8 },
  { id: "florida", category_id: "special", name: "فلوريدا", price: 65, badge: "", img: "/products/p5.jpg", image: "/products/p5.jpg", description: "مزيج فلوريدا الفريش من العصائر الطبيعية.", is_special: false, is_available: true, display_order: 9 },
  { id: "mirage", category_id: "special", name: "ميراج", price: 65, badge: "", img: "/products/p4.jpg", image: "/products/p4.jpg", description: "خلطة ميراج الخاصة بالخلاط.", is_special: false, is_available: true, display_order: 10 },

  // WINTER
  { id: "balila-plain", category_id: "winter", name: "بليلة سادة", price: 35, badge: "", image: "/products/p1.jpg", description: "بليلة سخنة بالحليب الطبيعي والسكر.", is_special: false, is_available: true, display_order: 1 },
  { id: "balila-nuts", category_id: "winter", name: "بليلة مكسرات", price: 75, badge: "دافئ", image: "/products/p2.jpg", description: "بليلة بالحليب غنية بالمكسرات المحمصة القشطة.", is_special: false, is_available: true, display_order: 2 },
  { id: "balila-chickpeas", category_id: "winter", name: "بليلة حمص", price: 30, badge: "", image: "/products/p3.jpg", description: "حمص الشام الدافي الخفيف والمنعش.", is_special: false, is_available: true, display_order: 3 },
  { id: "kuskusi-plain", category_id: "winter", name: "كسكسي سادة", price: 40, badge: "", image: "/products/p4.jpg", description: "كسكسي مصري سخن بالسكر والسمن البلدي.", is_special: false, is_available: true, display_order: 4 },
  { id: "kuskusi-nuts", category_id: "winter", name: "كسكسي مكسرات", price: 70, badge: "", image: "/products/p5.jpg", description: "كسكسي بالسمن البلدي والسكر والمكسرات المشكلة.", is_special: false, is_available: true, display_order: 5 },
  { id: "sahlab-plain", category_id: "winter", name: "سحلب سادة", price: 35, badge: "", image: "/products/p6.jpg", description: "سحلب دافئ تقيل مع سمسم ومكسرات خفيفة.", is_special: false, is_available: true, display_order: 6 },
  { id: "sahlab-fruits", category_id: "winter", name: "سحلب فواكه", price: 60, badge: "", image: "/products/p1.jpg", description: "سحلب سخن مغطى بقطع الفواكه الطازجة.", is_special: false, is_available: true, display_order: 7 },
  { id: "sahlab-oreo", category_id: "winter", name: "سحلب أوريو", price: 60, badge: "", image: "/products/p2.jpg", description: "سحلب بالحليب وبسكويت الأوريو المطحون.", is_special: false, is_available: true, display_order: 8 },
  { id: "sahlab-lotus", category_id: "winter", name: "سحلب لوتس", price: 55, badge: "", image: "/products/p3.jpg", description: "سحلب سخن غرقان بزبوت وزبدة اللوتس الشهية.", is_special: false, is_available: true, display_order: 9 },
  { id: "sahlab-pistachio", category_id: "winter", name: "سحلب بستاشيو", price: 60, badge: "مميز", image: "/products/p4.jpg", description: "سحلب بصوص وزبدة الفستق الحلبي.", is_special: false, is_available: true, display_order: 10 },
  { id: "sahlab-nuts", category_id: "winter", name: "سحلب مكسرات", price: 65, badge: "", image: "/products/p5.jpg", description: "سحلب غني بتشكيلة مكسرات محمصة.", is_special: false, is_available: true, display_order: 11 },
  { id: "om-ali-plain", category_id: "winter", name: "أم علي سادة", price: 45, badge: "", image: "/products/p6.jpg", description: "طاجن أم علي بالحليب الساخن والقشطة.", is_special: false, is_available: true, display_order: 12 },
  { id: "om-ali-nuts", category_id: "winter", name: "أم علي مكسرات", price: 85, badge: "الأكثر طلب شتاءً", image: "/products/p1.jpg", description: "طاجن أم علي سخن بالفرن محشو بالمكسرات الفاخرة والقشطة.", is_special: true, is_available: true, display_order: 13 },
  { id: "om-ali-pistachio", category_id: "winter", name: "أم علي بستاشيو", price: 70, badge: "", image: "/products/p2.jpg", description: "طاجن أم علي مع زبدة الفستق والمكسرات.", is_special: false, is_available: true, display_order: 14 },
  { id: "om-ali-nutella", category_id: "winter", name: "أم علي نوتيلا", price: 60, badge: "", image: "/products/p3.jpg", description: "طاجن أم علي سخن غرقان شوكولاتة نوتيلا.", is_special: false, is_available: true, display_order: 15 },
  { id: "om-ali-lotus", category_id: "winter", name: "أم علي لوتس", price: 60, badge: "", image: "/products/p4.jpg", description: "طاجن أم علي بزبادي وبسكويت اللوتس.", is_special: false, is_available: true, display_order: 16 },

  // WAFFLES
  { id: "waffle-nutella-fruits", category_id: "waffles", name: "وافلز نوتيلا فواكه", price: 70, badge: "مكس رهيب", image: "/products/p5.jpg", description: "وافلز بلجيكي مقرمش غرقان نوتيلا وقطع فواكه طازجة.", is_special: true, is_available: true, display_order: 1 },
  { id: "waffle-nutella-icecream", category_id: "waffles", name: "وافلز نوتيلا آيس كريم", price: 60, badge: "", image: "/products/p6.jpg", description: "وافل سخن مع بول آيس كريم وصوص شوكولاتة نوتيلا.", is_special: false, is_available: true, display_order: 2 },
  { id: "waffle-nutella-plain", category_id: "waffles", name: "وافلز نوتيلا سادة", price: 40, badge: "", image: "/products/p1.jpg", description: "وافلز الذهبي المقرمش مغطى بصوص النوتيلا الأصلي.", is_special: false, is_available: true, display_order: 3 },
  { id: "waffle-pistachio", category_id: "waffles", name: "وافلز بستاشيو", price: 70, badge: "فاخر", image: "/products/p2.jpg", description: "وافلز مقرمش مع زبدة الفستق والمكسرات.", is_special: false, is_available: true, display_order: 4 },
  { id: "waffle-nutella-lotus", category_id: "waffles", name: "وافلز نوتيلا لوتس", price: 50, badge: "", image: "/products/p3.jpg", description: "مكس وافل نوتيلا مع زبدة وبسكويت اللوتس.", is_special: false, is_available: true, display_order: 5 },
  { id: "waffle-mix-couple", category_id: "waffles", name: "وافلز ميكس كابل", price: 45, badge: "", image: "/products/p4.jpg", description: "وافلز مقسم إلى نكهتين مفضلتين حسب اختيارك.", is_special: false, is_available: true, display_order: 6 },
  { id: "waffle-elmixer", category_id: "waffles", name: "وافلز الخلاط الملكي", price: 100, badge: "الملكي", image: "/products/p5.jpg", description: "وافلز عملاق بطبقات الفواكه والآيس كريم والنوتيلا والمكسرات واللوتس.", is_special: true, is_available: true, display_order: 7 },

  // RICE PUDDING
  { id: "rice-pudding-plain", category_id: "rice-pudding", name: "أرز بلبن سادة", price: 30, badge: "", image: "/products/p6.jpg", description: "أرز بلبن كريمي طازج بالحليب الصافي.", is_special: false, is_available: true, display_order: 1 },
  { id: "rice-pudding-icecream", category_id: "rice-pudding", name: "أرز بلبن آيس كريم", price: 50, badge: "", image: "/products/p1.jpg", description: "أرز بلبن مثلج مغطى ببولة آيس كريم فانيليا وصوص.", is_special: false, is_available: true, display_order: 2 },
  { id: "rice-pudding-nuts", category_id: "rice-pudding", name: "أرز بلبن مكسرات", price: 55, badge: "", image: "/products/p2.jpg", description: "أرز بلبن غني بالمكسرات المحمصة والزبيب والسوداني.", is_special: false, is_available: true, display_order: 3 },
  { id: "rice-pudding-fruits", category_id: "rice-pudding", name: "أرز بلبن فواكه", price: 50, badge: "", image: "/products/p3.jpg", description: "أرز بلبن كريمي مع تشكيلة قطع فواكه موسمية.", is_special: false, is_available: true, display_order: 4 },
  { id: "rice-pudding-cashew", category_id: "rice-pudding", name: "أرز بلبن كاجو", price: 60, badge: "فاخر", image: "/products/p4.jpg", description: "أرز بلبن مقرمش بقطع الكاجو المحمص والHoney.", is_special: false, is_available: true, display_order: 5 },
  { id: "rice-pudding-lotus", category_id: "rice-pudding", name: "أرز بلبن لوتس", price: 50, badge: "", image: "/products/p5.jpg", description: "أرز بلبن بزبدة وبسكويت اللوتس البلجيكي.", is_special: false, is_available: true, display_order: 6 },
  { id: "rice-pudding-mango", category_id: "rice-pudding", name: "أرز بلبن قطع مانجا", price: 50, badge: "مفضل الصيف", image: "/products/p6.jpg", description: "أرز بلبن غرقان بقطع المانجو الفريش وصوص المانجو.", is_special: true, is_available: true, display_order: 7 },
  { id: "rice-pudding-special", category_id: "rice-pudding", name: "أرز بلبن سبيشيال الخلاط", price: 75, badge: "سبيشيال", image: "/products/p1.jpg", description: "بول أرز بلبن كبير مع آيس كريم وفواكه ومكسرات وقشطة وعسل.", is_special: true, is_available: true, display_order: 8 },

  // JUICES 1L
  { id: "1l-mango", category_id: "juices-1l", name: "مانجو (1 لتر)", price: 95, badge: "1 لتر", image: "/products/p4.jpg", description: "زجاجة مانجو طبيعي مركز 100% سعة 1 لتر.", is_special: false, is_available: true, display_order: 1 },
  { id: "1l-guava", category_id: "juices-1l", name: "جوافة (1 لتر)", price: 90, badge: "", image: "/products/p3.jpg", description: "عصير جوافة بالحليب فريش 1 لتر.", is_special: false, is_available: true, display_order: 2 },
  { id: "1l-strawberry", category_id: "juices-1l", name: "فراولة (1 لتر)", price: 90, badge: "", image: "/products/p1.jpg", description: "عصير فراولة طبيعي مثلج سعة 1 لتر.", is_special: false, is_available: true, display_order: 3 },
  { id: "1l-banana", category_id: "juices-1l", name: "موز بالحليب (1 لتر)", price: 90, badge: "", image: "/products/p2.jpg", description: "موز بالحليب الفريش سعة 1 لتر.", is_special: false, is_available: true, display_order: 4 },
  { id: "1l-cantaloupe", category_id: "juices-1l", name: "كنتالوب (1 لتر)", price: 90, badge: "", image: "/products/p5.jpg", description: "عصير كنتالوب فريش 1 لتر.", is_special: false, is_available: true, display_order: 5 },
  { id: "1l-lemon", category_id: "juices-1l", name: "ليمون فريش (1 لتر)", price: 90, badge: "", image: "/products/p3.jpg", description: "عصير ليمون منعش سعة 1 لتر.", is_special: false, is_available: true, display_order: 6 },
  { id: "1l-orange", category_id: "juices-1l", name: "برتقال فريش (1 لتر)", price: 90, badge: "", image: "/products/p4.jpg", description: "برتقال طبيعي معصور طازج 1 لتر.", is_special: false, is_available: true, display_order: 7 },
  { id: "1l-apple-elmixer", category_id: "juices-1l", name: "تفاح الخلاط (1 لتر)", price: 90, badge: "", image: "/products/p6.jpg", description: "عصير تفاح الخلاط الطبيعي 1 لتر.", is_special: false, is_available: true, display_order: 8 },
  { id: "1l-kiwi", category_id: "juices-1l", name: "كيوي (1 لتر)", price: 180, badge: "فيتامين C", image: "/products/p5.jpg", description: "عصير كيوي طبيعي مركز 1 لتر.", is_special: false, is_available: true, display_order: 9 },
  { id: "1l-pineapple", category_id: "juices-1l", name: "أناناس (1 لتر)", price: 190, badge: "", image: "/products/p2.jpg", description: "عصير أناناس فريش 1 لتر.", is_special: false, is_available: true, display_order: 10 },
  { id: "1l-mango-avocado", category_id: "juices-1l", name: "مانجو + أفوكادو (1 لتر)", price: 150, badge: "مكس الطاقة", image: "/products/p3.jpg", description: "مزيج قوام الأفوكادو وطعم المانجو الفريش 1 لتر.", is_special: false, is_available: true, display_order: 11 },

  // SOBIA & RAMADAN
  { id: "sobia-plain", category_id: "sobia-ramadan", name: "سوبيا سادة", price: 30, badge: "", image: "/products/p1.jpg", description: "سوبيا الخلاط الشهيرة باردة ومنعشة.", is_special: false, is_available: true, display_order: 1 },
  { id: "sobia-mango", category_id: "sobia-ramadan", name: "سوبيا مانجو", price: 45, badge: "الأكثر شعبية", image: "/products/p4.jpg", description: "سوبيا كريمية مع عصير وقطع المانجو.", is_special: true, is_available: true, display_order: 2 },
  { id: "sobia-strawberry", category_id: "sobia-ramadan", name: "سوبيا فراولة", price: 45, badge: "", image: "/products/p1.jpg", description: "سوبيا الخلاط مع نكهة الفراولة الفريش.", is_special: false, is_available: true, display_order: 3 },
  { id: "sobia-berry", category_id: "sobia-ramadan", name: "سوبيا توت", price: 50, badge: "", image: "/products/p5.jpg", description: "سوبيا منعشة بصوص التوت المشكل.", is_special: false, is_available: true, display_order: 4 },
  { id: "sobia-lotus", category_id: "sobia-ramadan", name: "سوبيا لوتس", price: 50, badge: "", image: "/products/p3.jpg", description: "سوبيا بصوص اللوتس وبسكويت لوتس مطحون.", is_special: false, is_available: true, display_order: 5 },
  { id: "sobia-pistachio", category_id: "sobia-ramadan", name: "سوبيا بستاشيو", price: 50, badge: "مميز", image: "/products/p2.jpg", description: "سوبيا باردة غنية بزبادي وبستاشيو.", is_special: false, is_available: true, display_order: 6 },
  { id: "tamarind", category_id: "sobia-ramadan", name: "تمر هندي بلدنا", price: 30, badge: "", image: "/products/p6.jpg", description: "تمر هندي طبيعي مثلج ومضبوط.", is_special: false, is_available: true, display_order: 7 },
  { id: "doum-milk", category_id: "sobia-ramadan", name: "دوم بالحليب", price: 30, badge: "", image: "/products/p2.jpg", description: "عصير دوم طبيعي مغذي بالحليب الطازج.", is_special: false, is_available: true, display_order: 8 },
  { id: "dates-milk", category_id: "sobia-ramadan", name: "بلح بالحليب", price: 45, badge: "", image: "/products/p3.jpg", description: "بلح أسواني فاخر منقوع في الحليب الدافئ أو البارد.", is_special: false, is_available: true, display_order: 9 },

  // ADD-ONS
  { id: "addon-honey", category_id: "add-ons", name: "إضافة عسل طبيعي", price: 7, badge: "", image: "/products/p1.jpg", description: "عسل نقي 100% لإضافة حلاوة طبيعية.", is_special: false, is_available: true, display_order: 1 },
  { id: "addon-nutella", category_id: "add-ons", name: "إضافة صوص نوتيلا", price: 10, badge: "", image: "/products/p2.jpg", description: "بول شوكولاتة نوتيلا غنية.", is_special: false, is_available: true, display_order: 2 },
  { id: "addon-nuts", category_id: "add-ons", name: "إضافة مكسرات مشكلة", price: 20, badge: "", image: "/products/p3.jpg", description: "تشكيلة كاجو، فستق، وبندق محمصة.", is_special: false, is_available: true, display_order: 3 },
  { id: "addon-cream", category_id: "add-ons", name: "إضافة قشطة بلدي", price: 7, badge: "", image: "/products/p4.jpg", description: "قشطة بلدي دسمة وغنية.", is_special: false, is_available: true, display_order: 4 },
  { id: "addon-basbousa-kunafa", category_id: "add-ons", name: "قطعة بسبوسة أو كنافة", price: 5, badge: "", image: "/products/p5.jpg", description: "قطعة حلويات شرقية طازجة تضاف لطبقك.", is_special: false, is_available: true, display_order: 5 },
];

module.exports = {
  defaultSettings,
  defaultCategories,
  defaultMenuItems,
};
