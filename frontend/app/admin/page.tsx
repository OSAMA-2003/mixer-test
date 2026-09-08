"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  FolderTree,
  Star,
  MessageSquareWarning,
  Settings,
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  ChefHat,
  SlidersHorizontal,
  Flame,
  Coffee,
  Wine,
  Sparkle,
  Layers,
  HeartHandshake,
} from "lucide-react";

import {
  checkApiHealth,
  getSeedStats,
  seedDatabase,
  fetchCategories,
  upsertCategory,
  deleteCategory,
  fetchMenuItems,
  upsertMenuItem,
  deleteMenuItem,
  uploadImageToCloudinary,
  fetchRestaurantSettings,
  updateRestaurantSettings,
  fetchAllReviews,
  updateReviewStatus,
  deleteReview,
  fetchAllFeedback,
  toggleFeedbackReadStatus,
  deleteFeedback,
  Category,
  MenuItem,
  RestaurantSettings,
  Review,
  Feedback,
} from "@/lib/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"items" | "categories" | "reviews" | "feedback" | "settings" | "seed">("items");

  // System status
  const [isApiOnline, setIsApiOnline] = useState<boolean>(false);
  const [dbStats, setDbStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings>({
    name: "الخلاط — سوهاج",
    name_en: "The Mixer — Sohag",
    tagline: "أصل الانبساط • عصير فريش وخلطات ملهاش مثيل في سوهاج",
    phones: ["01007375151"],
    address: "سوهاج — بجوار مستشفى الهلال",
    whatsapp: "201007375151",
    working_hours: "يومياً من ١٢:٠٠ ظهراً حتى ٠٢:٠٠ بعد منتصف الليل",
    facebook_url: "",
    instagram_url: "",
  });

  // Filters
  const [itemSearch, setItemSearch] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("all");
  const [reviewFilter, setReviewFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [feedbackFilter, setFeedbackFilter] = useState<"all" | "suggestion" | "complaint">("all");

  // Modals
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);

  // Initial load
  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = async () => {
    setLoading(true);
    const health = await checkApiHealth();
    setIsApiOnline(health);

    const [statsRes, catsData, itemsData, reviewsData, feedbackData, settingsData] = await Promise.all([
      getSeedStats(),
      fetchCategories(),
      fetchMenuItems(),
      fetchAllReviews(),
      fetchAllFeedback(),
      fetchRestaurantSettings(),
    ]);

    if (statsRes.success) setDbStats(statsRes);
    setCategories(catsData);
    setMenuItems(itemsData);
    setReviews(reviewsData);
    setFeedback(feedbackData);
    if (settingsData) setSettings(settingsData);

    setLoading(false);
  };

  // Item Handlers
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.category_id) {
      showToast("يرجى ملء الاسم والقسم بشكل صحيح");
      return;
    }

    const res = await upsertMenuItem(editingItem);
    if (res.success) {
      showToast(editingItem.id ? "تم تحديث الصنف بنجاح ✨" : "تمت إضافة الصنف بنجاح 🎉");
      setShowItemModal(false);
      setEditingItem(null);
      loadAllData();
    } else {
      showToast(res.message || "حدث خطأ أثناء الحفظ");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذا الصنف؟")) return;
    const res = await deleteMenuItem(id);
    if (res.success) {
      showToast("تم حذف الصنف بنجاح");
      loadAllData();
    }
  };

  const handleToggleStock = async (item: MenuItem) => {
    const updated = { ...item, is_available: !item.is_available };
    const res = await upsertMenuItem(updated);
    if (res.success) {
      showToast(updated.is_available ? "الصنف الآن متاح للعملاء" : "تم إيقاف الصنف مؤقتاً (غير متاح)");
      loadAllData();
    }
  };

  const handleToggleSpecial = async (item: MenuItem) => {
    const updated = { ...item, is_special: !item.is_special };
    const res = await upsertMenuItem(updated);
    if (res.success) {
      showToast(updated.is_special ? "تمت إضافة الصنف للسبيشيال 🌟" : "تمت إزالة الصنف من السبيشيال");
      loadAllData();
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const url = await uploadImageToCloudinary(file);
    setUploadingImage(false);

    if (url) {
      setEditingItem((prev) => ({ ...prev, image: url, img: url }));
      showToast("تم رفع الصورة إلى Cloudinary بنجاح ☁️");
    } else {
      showToast("فشل رفع الصورة. يرجى تجربة رابط مباشر");
    }
  };

  // Category Handlers
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat || !editingCat.title) return;
    const res = await upsertCategory(editingCat);
    if (res.success) {
      showToast("تم حفظ القسم بنجاح");
      setShowCatModal(false);
      setEditingCat(null);
      loadAllData();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("تنبيه: حذف القسم سيؤدي إلى حذف جميع الأصناف التابعة له! هل أنت متأكد؟")) return;
    const res = await deleteCategory(id);
    if (res.success) {
      showToast(res.message);
      loadAllData();
    }
  };

  // Moderation Handlers
  const handleReviewStatus = async (id: string, status: "approved" | "rejected" | "pending") => {
    const res = await updateReviewStatus(id, status);
    if (res.success) {
      showToast(`تم تغيير حالة التقييم إلى ${status === "approved" ? "مقبول" : status === "rejected" ? "مرفوض" : "معلق"}`);
      loadAllData();
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("حذف هذا التقييم؟")) return;
    const res = await deleteReview(id);
    if (res.success) {
      showToast("تم حذف التقييم");
      loadAllData();
    }
  };

  // Feedback Handlers
  const handleToggleFeedbackRead = async (id: string, currentRead: boolean) => {
    const res = await toggleFeedbackReadStatus(id, !currentRead);
    if (res.success) {
      showToast(currentRead ? "تم تمييز الرسالة كغير مقروءة" : "تم تمييز الرسالة كمقروءة");
      loadAllData();
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm("حذف هذه الرسالة؟")) return;
    const res = await deleteFeedback(id);
    if (res.success) {
      showToast("تم حذف الرسالة");
      loadAllData();
    }
  };

  // Settings Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateRestaurantSettings(settings);
    if (res.success) {
      showToast("تم حفظ إعدادات المطعم بنجاح ✅");
      loadAllData();
    }
  };

  // Seed Handler
  const handleSeed = async () => {
    if (!confirm("هل تريد إعادة مزامنة البيانات بالبيانات الأصلية للمطعم؟")) return;
    setLoading(true);
    const res = await seedDatabase();
    setLoading(false);
    showToast(res.message);
    loadAllData();
  };

  // Filtered views
  const filteredItems = menuItems.filter((i) => {
    const matchCat = selectedCatFilter === "all" || i.category_id === selectedCatFilter;
    const matchSearch =
      i.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      (i.description && i.description.toLowerCase().includes(itemSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  const filteredReviews = reviews.filter((r) => reviewFilter === "all" || r.status === reviewFilter);
  const filteredFeedback = feedback.filter((f) => feedbackFilter === "all" || f.type === feedbackFilter);

  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;
  const unreadFeedbackCount = feedback.filter((f) => !f.is_read).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#fab818] selection:text-[#015f70]" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#008ba3] text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 border-2 border-[#fab818] animate-bounce text-sm">
          <Sparkles className="w-5 h-5 text-[#fab818]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Brand Header Banner */}
      <header className="bg-gradient-to-r from-[#004754] via-[#00798f] to-[#015f70] text-white shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -left-10 top-0 w-72 h-72 rounded-full bg-[#fab818]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-10 -bottom-10 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

            {/* Brand Title & Logo */}
            <div className="flex items-center gap-4 text-center sm:text-right">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl p-2 border border-white/20 shadow-lg backdrop-blur-md shrink-0">
                <Image
                  src="/logo.png"
                  alt="الخلاط"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-black tracking-widest text-[#fab818] bg-white/10 px-3 py-0.5 rounded-full border border-white/10">
                    لوحة تحكم الإدارة
                  </span>
                  <span className="text-xs text-cyan-200/80 font-medium">الخلاط • سوهاج</span>
                </div>
                <h1 className="font-cairo font-black text-2xl sm:text-4xl text-white tracking-tight mt-1">
                  إدارة مطعم <span className="text-[#fab818]">الخلاط</span>
                </h1>
              </div>
            </div>

            {/* Quick Actions & Status */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-xs font-bold text-white">
                <span className={`w-2.5 h-2.5 rounded-full ${isApiOnline ? "bg-emerald-400 animate-pulse" : "bg-[#fab818]"}`} />
                <span>{isApiOnline ? "السيرفر متصل أونلاين" : "وضع الذاكرة المباشر"}</span>
              </div>

              <button
                onClick={loadAllData}
                className="p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 transition cursor-pointer shadow-sm hover:scale-105"
                title="تحديث البيانات"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-[#fab818]" : ""}`} />
              </button>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-5 py-2.5 rounded-2xl shadow-lg hover:shadow-xl transition text-xs sm:text-sm hover:scale-105"
              >
                <span>معاينة الموقع الرئيسي</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 5 Stats Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">

          {/* Stat 1: Total Items */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-cyan-900/5 flex flex-col justify-between hover:border-[#008ba3]/30 transition group">
            <div className="flex items-center justify-between text-[#008ba3]">
              <span className="text-xs font-black">إجمالي الأصناف</span>
              <div className="w-9 h-9 rounded-2xl bg-[#008ba3]/10 flex items-center justify-center group-hover:bg-[#008ba3] group-hover:text-white transition">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-slate-900 font-cairo">{menuItems.length}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">صنف مسجل بالمنيو</p>
            </div>
          </div>

          {/* Stat 2: Total Categories */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-cyan-900/5 flex flex-col justify-between hover:border-[#fab818]/30 transition group">
            <div className="flex items-center justify-between text-[#e5a510]">
              <span className="text-xs font-black">الأقسام الرئيسية</span>
              <div className="w-9 h-9 rounded-2xl bg-[#fab818]/15 flex items-center justify-center group-hover:bg-[#fab818] group-hover:text-slate-950 transition">
                <FolderTree className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-slate-900 font-cairo">{categories.length}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">قسم بالمنيو</p>
            </div>
          </div>

          {/* Stat 3: Pending Reviews */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-cyan-900/5 flex flex-col justify-between hover:border-amber-400/30 transition group">
            <div className="flex items-center justify-between text-amber-600">
              <span className="text-xs font-black">تقييمات معلقة</span>
              <div className="w-9 h-9 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition">
                <Star className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-amber-600 font-cairo">{pendingReviewsCount}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">تنتظر القبول والعرض</p>
            </div>
          </div>

          {/* Stat 4: Unread Feedback */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-cyan-900/5 flex flex-col justify-between hover:border-rose-400/30 transition group">
            <div className="flex items-center justify-between text-rose-500">
              <span className="text-xs font-black">شكاوى واقتراحات</span>
              <div className="w-9 h-9 rounded-2xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition">
                <MessageSquareWarning className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-rose-500 font-cairo">{unreadFeedbackCount}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">رسالة غير مقروءة</p>
            </div>
          </div>

          {/* Stat 5: DB Status */}
          <div className="col-span-2 lg:col-span-1 bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-cyan-900/5 flex flex-col justify-between hover:border-emerald-500/30 transition group">
            <div className="flex items-center justify-between text-emerald-600">
              <span className="text-xs font-black">حالة قاعدة البيانات</span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-black text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{dbStats?.connected ? "MongoDB Atlas" : "In-Memory Mode"}</span>
              </p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">جاهزية كاملة 100%</p>
            </div>
          </div>

        </div>

        {/* Tab Navigation Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {[
            { id: "items", label: "الأصناف والمنيو", icon: UtensilsCrossed, badge: menuItems.length },
            { id: "categories", label: "الأقسام والتصنيفات", icon: FolderTree, badge: categories.length },
            { id: "reviews", label: "تقييمات العملاء", icon: Star, badge: pendingReviewsCount > 0 ? pendingReviewsCount : undefined },
            { id: "feedback", label: "الشكاوى والاقتراحات", icon: MessageSquareWarning, badge: unreadFeedbackCount > 0 ? unreadFeedbackCount : undefined },
            { id: "settings", label: "إعدادات المطعم", icon: Settings },
            { id: "seed", label: "مزامنة البيانات", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shrink-0 cursor-pointer shadow-sm
                  ${isActive
                    ? "bg-[#008ba3] text-white shadow-md shadow-[#008ba3]/20 ring-2 ring-[#fab818]"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? "bg-[#fab818] text-slate-950" : "bg-slate-200 text-slate-800"}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MENU ITEMS MANAGEMENT */}
        {activeTab === "items" && (
          <div className="space-y-6">
            {/* Search & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xl shadow-cyan-900/5">
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    placeholder="ابحث باسم الصنف أو الوصف..."
                    className="w-full pl-4 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#008ba3] transition"
                  />
                  {itemSearch && (
                    <button onClick={() => setItemSearch("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#008ba3] cursor-pointer"
                >
                  <option value="all">جميع الأقسام</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    name: "",
                    category_id: categories[0]?.id || "special",
                    price: 50,
                    is_daily: false,
                    badge: "",
                    description: "",
                    image: "/products/p1.jpg",
                    is_available: true,
                    is_special: false,
                    display_order: menuItems.length + 1,
                  });
                  setShowItemModal(true);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition hover:scale-105 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة صنف جديد</span>
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    item.is_available ? "border-slate-100 hover:-translate-y-1" : "border-rose-200 opacity-60 bg-rose-50/20"
                  }`}
                >
                  <div>
                    {/* Dish Image Container */}
                    <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={item.image || item.img || "/products/p1.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.badge && (
                        <span className="absolute top-3 right-3 bg-[#fab818] text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
                          {item.badge}
                        </span>
                      )}
                      {item.is_special && (
                        <span className="absolute top-3 left-3 bg-[#008ba3] text-white font-black text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>سبيشيال</span>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-cairo font-black text-lg text-slate-900 line-clamp-1">{item.name}</h3>
                        <div className="flex items-baseline gap-1 shrink-0">
                          <span className="text-xl font-black text-[#008ba3]">
                            {item.is_daily ? "يومي" : item.price}
                          </span>
                          {!item.is_daily && <span className="text-xs font-bold text-slate-500">ج.م</span>}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                        {item.description || "لا يوجد وصف مسجل"}
                      </p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleStock(item)}
                        className={`p-2 rounded-xl text-xs font-bold transition shadow-sm ${
                          item.is_available
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                        }`}
                        title={item.is_available ? "إيقاف الصنف مؤقتاً" : "تفعيل مبيعات الصنف"}
                      >
                        {item.is_available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleToggleSpecial(item)}
                        className={`p-2 rounded-xl text-xs font-bold transition shadow-sm ${
                          item.is_special
                            ? "bg-cyan-50 text-[#008ba3] border border-cyan-200 hover:bg-cyan-100"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                        title="عرض في كارت السبيشيال بالرئيسية"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowItemModal(true);
                        }}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-[#008ba3] text-slate-700 hover:text-white transition shadow-sm"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-700 hover:text-white transition shadow-sm"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CATEGORIES MANAGEMENT */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-100 shadow-xl shadow-cyan-900/5">
              <div>
                <h2 className="text-xl font-black font-cairo text-slate-900">أقسام وتصنيفات المنيو</h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">التحكم في ترتيب وتنظيم أقسام المطعم</p>
              </div>

              <button
                onClick={() => {
                  setEditingCat({ title: "", icon: "Flame", display_order: categories.length + 1, description: "" });
                  setShowCatModal(true);
                }}
                className="flex items-center gap-2 bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition hover:scale-105"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة قسم جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const itemCount = menuItems.filter((i) => i.category_id === cat.id).length;
                return (
                  <div key={cat.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md hover:shadow-xl transition flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#008ba3]/10 text-[#008ba3] flex items-center justify-center font-bold text-xl border border-[#008ba3]/15">
                          🍹
                        </div>
                        <div>
                          <h3 className="font-cairo font-black text-lg text-slate-900">{cat.title}</h3>
                          <span className="text-xs text-slate-400 font-mono">كود: {cat.id}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#008ba3] mt-4 font-black bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100 inline-block">
                        {itemCount} صنف مسجل في هذا القسم
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setEditingCat(cat);
                          setShowCatModal(true);
                        }}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-[#008ba3] text-slate-700 hover:text-white transition shadow-sm"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-700 hover:text-white transition shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER REVIEWS MODERATION */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xl shadow-cyan-900/5">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setReviewFilter(st)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition ${
                      reviewFilter === st
                        ? "bg-[#008ba3] text-white shadow-md shadow-[#008ba3]/20"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {st === "all" ? "جميع التقييمات" : st === "pending" ? "معلقة للمراجعة" : st === "approved" ? "مقبولة ومعروضة" : "مرفوضة"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 text-slate-400">
                  <Star className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="font-bold">لا توجد تقييمات في هذه الفئة حالياً</p>
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div key={rev.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-black font-cairo text-slate-900 text-lg">{rev.name}</span>
                        {rev.phone && <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">({rev.phone})</span>}
                        <div className="flex items-center gap-1 text-[#fab818]">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {rev.status !== "approved" && (
                        <button
                          onClick={() => handleReviewStatus(rev.id, "approved")}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-xs font-bold transition shadow-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>موافقة ونشر</span>
                        </button>
                      )}
                      {rev.status !== "rejected" && (
                        <button
                          onClick={() => handleReviewStatus(rev.id, "rejected")}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white border border-amber-200 text-xs font-bold transition shadow-sm"
                        >
                          <X className="w-4 h-4" />
                          <span>رفض التقييم</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-2.5 rounded-2xl bg-slate-100 hover:bg-rose-600 text-slate-600 hover:text-white transition shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: FEEDBACK & COMPLAINTS */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-xl shadow-cyan-900/5">
              <div className="flex items-center gap-2">
                {(["all", "complaint", "suggestion"] as const).map((tp) => (
                  <button
                    key={tp}
                    onClick={() => setFeedbackFilter(tp)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition ${
                      feedbackFilter === tp
                        ? "bg-[#008ba3] text-white shadow-md shadow-[#008ba3]/20"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {tp === "all" ? "جميع الرسائل" : tp === "complaint" ? "الشكاوى ⚠️" : "الاقتراحات 💡"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredFeedback.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 text-slate-400">
                  <MessageSquareWarning className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="font-bold">لا توجد شكاوى أو اقتراحات مسجلة حالياً</p>
                </div>
              ) : (
                filteredFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className={`bg-white border rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      fb.is_read ? "border-slate-100 opacity-80" : "border-rose-300 ring-2 ring-rose-200"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-black font-cairo text-slate-900 text-lg">{fb.name}</span>
                        <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-0.5 rounded-full">{fb.phone}</span>
                        <span
                          className={`text-[10px] font-black px-3 py-1 rounded-full ${
                            fb.type === "complaint" ? "bg-rose-100 text-rose-700 border border-rose-200" : "bg-cyan-100 text-[#008ba3] border border-cyan-200"
                          }`}
                        >
                          {fb.type === "complaint" ? "شكوى" : "اقتراح"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                        {fb.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleFeedbackRead(fb.id, fb.is_read)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm ${
                          fb.is_read ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-[#008ba3] text-white hover:bg-[#00768b]"
                        }`}
                      >
                        {fb.is_read ? "تمييز كغير مقروء" : "تمت المراجعة ✅"}
                      </button>
                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        className="p-2.5 rounded-2xl bg-slate-100 hover:bg-rose-600 text-slate-700 hover:text-white transition shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: RESTAURANT SETTINGS FORM */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-cyan-900/5 max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-2xl font-black font-cairo text-slate-900 flex items-center gap-3">
                <Settings className="w-6 h-6 text-[#008ba3]" />
                <span>إعدادات مطعم الخلاط</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">تحديث أرقام الهاتف، الفروع، العناوين وشعار المطعم</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">اسم المطعم (بالعربي)</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">اسم المطعم (بالإنجليزي)</label>
                <input
                  type="text"
                  value={settings.name_en}
                  onChange={(e) => setSettings({ ...settings, name_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">الشعار الترويجي (Slogan)</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">رقم الواتساب الرسمي</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm font-mono focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">أرقام الاتصال (مفصولة بفواصل)</label>
                <input
                  type="text"
                  value={settings.phones?.join(", ")}
                  onChange={(e) => setSettings({ ...settings, phones: e.target.value.split(",").map((s) => s.trim()) })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm font-mono focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">العنوان والتواجد الرئيسي</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">مواعيد العمل الرسمية</label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm shadow-xl hover:scale-105 transition cursor-pointer"
              >
                حفظ الإعدادات الآن ✅
              </button>
            </div>
          </form>
        )}

        {/* TAB 6: DATABASE SEEDER & STATS */}
        {activeTab === "seed" && (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-cyan-900/5 max-w-3xl mx-auto space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-2xl font-black font-cairo text-slate-900 flex items-center gap-3">
                <Database className="w-6 h-6 text-[#008ba3]" />
                <span>مزامنة وإعادة تعبئة قاعدة البيانات (Database Sync)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">استرجاع 150+ صنف وتصنيف افتراضي بضغطة زر واحدة</p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              عند الضغط على زِر المزامنة أدناه، يتم تلقائياً تحديث جميع الأصناف، الأقسام، والإعدادات بالبيانات الأصلية لمطعم الخلاط في MongoDB Atlas.
            </p>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-[#008ba3]">إحصائيات المزامنة الحالية:</h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                <div>الأقسام: {categories.length}</div>
                <div>الأصناف بالمنيو: {menuItems.length}</div>
                <div>التقييمات: {reviews.length}</div>
                <div>الشكاوى والاقتراحات: {feedback.length}</div>
              </div>
            </div>

            <button
              onClick={handleSeed}
              className="w-full flex items-center justify-center gap-2 bg-[#008ba3] hover:bg-[#00768b] text-white font-black py-4 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer text-sm"
            >
              <RefreshCw className="w-5 h-5" />
              <span>بدء مزامنة قاعدة البيانات بضغطة واحدة (1-Click Seed)</span>
            </button>
          </div>
        )}

      </div>

      {/* ITEM ADD/EDIT MODAL */}
      {showItemModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-100 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-right text-slate-900">
            <button
              onClick={() => setShowItemModal(false)}
              className="absolute left-5 top-5 text-slate-400 hover:text-slate-700 p-2 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cairo font-black text-2xl text-slate-900 mb-6 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-[#008ba3]" />
              <span>{editingItem.id ? "تعديل تفاصيل الصنف" : "إضافة صنف جديد بالمنيو"}</span>
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم الصنف (بالعربي)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">القسم التابع له</label>
                  <select
                    value={editingItem.category_id || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3] cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">السعر (بالجنيه المصري)</label>
                  <input
                    type="number"
                    disabled={editingItem.is_daily}
                    value={editingItem.is_daily ? 0 : editingItem.price || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm font-mono focus:ring-2 focus:ring-[#008ba3]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={editingItem.is_daily || false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_daily: e.target.checked })}
                      className="w-4 h-4 rounded text-[#008ba3] focus:ring-[#008ba3]"
                    />
                    <span>سعر يومي / متغير (سوق)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">شارة ترويجية (Badge)</label>
                <input
                  type="text"
                  placeholder="مثال: الأكثر طلباً 🔥، جديد ✨، فاخر"
                  value={editingItem.badge || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الوصف والمكونات</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              {/* Cloudinary Image Upload Section */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">صورة الصنف (Cloudinary / URL)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="رابط الصورة المباشر"
                    value={editingItem.image || editingItem.img || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value, img: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono"
                  />
                  <label className="flex items-center gap-1.5 bg-[#008ba3] hover:bg-[#00768b] text-white px-4 py-3 rounded-2xl text-xs font-bold cursor-pointer shrink-0 shadow-md transition">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "جاري الرفع..." : "رفع صوره"}</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingItem.is_available !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, is_available: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>الصنف متاح للعملاء بالمنيو</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingItem.is_special || false}
                    onChange={(e) => setEditingItem({ ...editingItem, is_special: e.target.checked })}
                    className="w-4 h-4 rounded text-[#fab818] focus:ring-[#fab818]"
                  />
                  <span>عرض في سبيشيال الرئيسية 🌟</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black text-xs shadow-md transition"
                >
                  حفظ الصنف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY ADD/EDIT MODAL */}
      {showCatModal && editingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-100 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative text-right text-slate-900">
            <button
              onClick={() => setShowCatModal(false)}
              className="absolute left-5 top-5 text-slate-400 hover:text-slate-700 p-2 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cairo font-black text-2xl text-slate-900 mb-6">
              {editingCat.id ? "تعديل بيانات القسم" : "إضافة قسم جديد"}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم القسم (بالعربي)</label>
                <input
                  type="text"
                  required
                  value={editingCat.title || ""}
                  onChange={(e) => setEditingCat({ ...editingCat, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ترتيب العرض</label>
                <input
                  type="number"
                  value={editingCat.display_order || 1}
                  onChange={(e) => setEditingCat({ ...editingCat, display_order: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm font-mono focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الوصف</label>
                <input
                  type="text"
                  value={editingCat.description || ""}
                  onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-[#008ba3]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-6 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#fab818] text-slate-950 font-black text-xs shadow-md"
                >
                  حفظ القسم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
