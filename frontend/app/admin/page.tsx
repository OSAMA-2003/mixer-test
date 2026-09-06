"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
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
  CheckCircle,
  XCircle,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Check,
  X,
  ExternalLink,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#fab818] selection:text-slate-950" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#008ba3] text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 border border-[#fab818] animate-bounce">
          <Sparkles className="w-5 h-5 text-[#fab818]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Navbar */}
      <header className="bg-[#004754]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fab818] text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
              🍹
            </div>
            <div>
              <h1 className="font-cairo font-black text-xl sm:text-2xl text-white flex items-center gap-2">
                لوحة تحكم <span className="text-[#fab818]">الخلاط</span>
              </h1>
              <p className="text-xs text-cyan-200/80 font-medium">إدارة المنيو، التصنيفات، التقييمات والإعدادات</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold">
              <span className={`w-2.5 h-2.5 rounded-full ${isApiOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span>{isApiOnline ? "السيرفر متصل أونلاين" : "وضع الذاكرة المباشر"}</span>
            </div>

            <button
              onClick={loadAllData}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-4 py-2 rounded-xl shadow-md text-xs sm:text-sm transition"
            >
              <span>معاينة الموقع</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-cyan-400">
              <span className="text-xs font-bold">إجمالي الأصناف</span>
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-white mt-2">{menuItems.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">صنف مسجل بالمنيو</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-[#fab818]">
              <span className="text-xs font-bold">الأقسام</span>
              <FolderTree className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-white mt-2">{categories.length}</p>
            <p className="text-[10px] text-slate-400 mt-1">تصنيف رئيسي</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-bold">تقييمات معلقة</span>
              <Star className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-amber-300 mt-2">{pendingReviewsCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">تحتاج مراجعة وقبول</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-rose-400">
              <span className="text-xs font-bold">رسائل جديدة</span>
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-rose-300 mt-2">{unreadFeedbackCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">شكاوى واقتراحات غير مقروءة</p>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold">حالة الـ DB</span>
              <Database className="w-5 h-5" />
            </div>
            <p className="text-sm font-black text-emerald-300 mt-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{dbStats?.connected ? "MongoDB Atlas" : "In-Memory Mode"}</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">سريعة ومضمونة</p>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-slate-800 mb-8">
          {[
            { id: "items", label: "الأصناف والمنيو", icon: UtensilsCrossed, badge: menuItems.length },
            { id: "categories", label: "الأقسام والتصنيفات", icon: FolderTree, badge: categories.length },
            { id: "reviews", label: "تقييمات العملاء", icon: Star, badge: pendingReviewsCount > 0 ? pendingReviewsCount : undefined },
            { id: "feedback", label: "الشكاوى والاقتراحات", icon: MessageSquareWarning, badge: unreadFeedbackCount > 0 ? unreadFeedbackCount : undefined },
            { id: "settings", label: "إعدادات المطعم", icon: Settings },
            { id: "seed", label: "قاعدة البيانات والمزامنة", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer border
                  ${isActive
                    ? "bg-[#008ba3] text-white border-[#fab818] shadow-lg shadow-[#008ba3]/20"
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="bg-[#fab818] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MENU ITEMS */}
        {activeTab === "items" && (
          <div className="space-y-6">
            {/* Search & Actions Top Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-3xl border border-slate-800">
              <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={itemSearch}
                    onChange={(e) => setItemSearch(e.target.value)}
                    placeholder="ابحث باسم الصنف أو الوصف..."
                    className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-[#008ba3]"
                  />
                </div>

                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="py-2.5 px-4 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-[#008ba3]"
                >
                  <option value="all">كل الأقسام</option>
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة صنف جديد</span>
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-slate-900 border rounded-3xl overflow-hidden flex flex-col justify-between transition duration-300 ${
                    item.is_available ? "border-slate-800 hover:border-[#008ba3]" : "border-rose-900/50 opacity-60"
                  }`}
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                      <img
                        src={item.image || item.img || "/products/p1.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.badge && (
                        <span className="absolute top-3 right-3 bg-[#fab818] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                          {item.badge}
                        </span>
                      )}
                      {item.is_special && (
                        <span className="absolute top-3 left-3 bg-[#008ba3] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>سبيشيال</span>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-cairo font-black text-base text-white">{item.name}</h3>
                        <span className="text-xs font-black text-[#fab818] shrink-0">
                          {item.is_daily ? "يومي" : `${item.price} ج.م`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.description || "لا يوجد وصف"}</p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleStock(item)}
                        className={`p-2 rounded-xl text-xs font-bold transition ${
                          item.is_available
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-rose-950 text-rose-400 border border-rose-800"
                        }`}
                        title={item.is_available ? "إيقاف الصنف" : "تفعيل الصنف"}
                      >
                        {item.is_available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleToggleSpecial(item)}
                        className={`p-2 rounded-xl text-xs font-bold transition ${
                          item.is_special
                            ? "bg-cyan-950 text-cyan-400 border border-cyan-800"
                            : "bg-slate-800 text-slate-400"
                        }`}
                        title="تبديل العرض بالسبيشيال"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowItemModal(true);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-rose-400 transition"
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

        {/* TAB 2: CATEGORIES */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-3xl border border-slate-800">
              <h2 className="text-lg font-black font-cairo text-white">إدارة أقسام وتصنيفات المنيو</h2>
              <button
                onClick={() => {
                  setEditingCat({ title: "", icon: "Flame", display_order: categories.length + 1, description: "" });
                  setShowCatModal(true);
                }}
                className="flex items-center gap-2 bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-5 py-2 rounded-2xl text-xs sm:text-sm shadow-md"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>قسم جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const itemCount = menuItems.filter((i) => i.category_id === cat.id).length;
                return (
                  <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#008ba3]/20 text-[#fab818] flex items-center justify-center font-bold">
                          🍹
                        </div>
                        <div>
                          <h3 className="font-cairo font-black text-base text-white">{cat.title}</h3>
                          <span className="text-xs text-slate-400">كود القسم: {cat.id}</span>
                        </div>
                      </div>
                      <p className="text-xs text-cyan-400 mt-3 font-bold">{itemCount} صنف مسجل في هذا القسم</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setEditingCat(cat);
                          setShowCatModal(true);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-rose-400"
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

        {/* TAB 3: CUSTOMER REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-2">
                {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setReviewFilter(st)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer border ${
                      reviewFilter === st
                        ? "bg-[#008ba3] text-white border-[#fab818]"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    {st === "all" ? "الكل" : st === "pending" ? "معلقة" : st === "approved" ? "مقبولة" : "مرفوضة"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <p className="text-center py-12 text-slate-500">لا توجد تقييمات في هذه الفئة حالياً</p>
              ) : (
                filteredReviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-white text-base">{rev.name}</span>
                        {rev.phone && <span className="text-xs text-slate-400">({rev.phone})</span>}
                        <div className="flex items-center gap-1 text-[#fab818]">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-200 mt-2 font-medium bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {rev.status !== "approved" && (
                        <button
                          onClick={() => handleReviewStatus(rev.id, "approved")}
                          className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 text-xs font-bold"
                        >
                          <Check className="w-4 h-4" />
                          <span>قبول</span>
                        </button>
                      )}
                      {rev.status !== "rejected" && (
                        <button
                          onClick={() => handleReviewStatus(rev.id, "rejected")}
                          className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-amber-950 hover:bg-amber-900 text-amber-400 border border-amber-800 text-xs font-bold"
                        >
                          <X className="w-4 h-4" />
                          <span>رفض</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-2.5 rounded-2xl bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800"
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
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-2">
                {(["all", "complaint", "suggestion"] as const).map((tp) => (
                  <button
                    key={tp}
                    onClick={() => setFeedbackFilter(tp)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold cursor-pointer border ${
                      feedbackFilter === tp
                        ? "bg-[#008ba3] text-white border-[#fab818]"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    {tp === "all" ? "جميع الرسائل" : tp === "complaint" ? "الشكاوى" : "الاقتراحات"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredFeedback.length === 0 ? (
                <p className="text-center py-12 text-slate-500">لا توجد شكاوى أو اقتراحات مسجلة</p>
              ) : (
                filteredFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className={`bg-slate-900 border rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      fb.is_read ? "border-slate-800 opacity-80" : "border-rose-800 shadow-lg shadow-rose-950/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-white text-base">{fb.name}</span>
                        <span className="text-xs text-cyan-300 font-mono">{fb.phone}</span>
                        <span
                          className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                            fb.type === "complaint" ? "bg-rose-950 text-rose-300 border border-rose-800" : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          }`}
                        >
                          {fb.type === "complaint" ? "شكوى" : "اقتراح"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 mt-2 font-medium bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        {fb.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleFeedbackRead(fb.id, fb.is_read)}
                        className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                      >
                        {fb.is_read ? "تمييز كغير مقروء" : "تمييز كمقروء ✅"}
                      </button>
                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        className="p-2.5 rounded-2xl bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800"
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

        {/* TAB 5: RESTAURANT SETTINGS */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-black font-cairo text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Settings className="w-6 h-6 text-[#fab818]" />
              <span>تحديث بيانات ومعلومات مطعم الخلاط</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">اسم المطعم (بالعربي)</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">اسم المطعم (بالإنجليزي)</label>
                <input
                  type="text"
                  value={settings.name_en}
                  onChange={(e) => setSettings({ ...settings, name_en: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">الشعار الترويجي (Slogan)</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">رقم الواتساب الرسمي (مع كود الدولة)</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">أرقام الهواتف (مفصولة بفواصل)</label>
                <input
                  type="text"
                  value={settings.phones?.join(", ")}
                  onChange={(e) => setSettings({ ...settings, phones: e.target.value.split(",").map((s) => s.trim()) })}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">العنوان والتواجد</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">مواعيد العمل</label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-[#fab818] hover:bg-[#e0a410] text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm shadow-xl cursor-pointer"
              >
                حفظ التعديلات الآن ✅
              </button>
            </div>
          </form>
        )}

        {/* TAB 6: SEED & SYSTEM */}
        {activeTab === "seed" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-black font-cairo text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Database className="w-6 h-6 text-[#008ba3]" />
              <span>مزامنة وإعادة تعبئة قاعدة البيانات (Database Seeder)</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              تتيح لك هذه الأداة بضغطة زر واحدة استرجاع كافة الأصناف (150+ صنف)، الأقسام، والإعدادات الافتراضية الخاصة بمطعم الخلاط ومزامنتها مباشرة مع MongoDB Atlas.
            </p>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-[#fab818]">إحصائيات المزامنة الحالية:</h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300">
                <div>عدد الأقسام بالمُنشئ: {categories.length}</div>
                <div>عدد الأصناف بالمُنشئ: {menuItems.length}</div>
                <div>التقييمات المسجلة: {reviews.length}</div>
                <div>الشكاوى والاقتراحات: {feedback.length}</div>
              </div>
            </div>

            <button
              onClick={handleSeed}
              className="w-full flex items-center justify-center gap-2 bg-[#008ba3] hover:bg-[#00768b] text-white font-black py-4 rounded-2xl shadow-xl transition cursor-pointer text-sm"
            >
              <RefreshCw className="w-5 h-5" />
              <span>بدء مزامنة قاعدة البيانات بضغطة واحدة (1-Click Seed)</span>
            </button>
          </div>
        )}

      </div>

      {/* ITEM EDIT/ADD MODAL */}
      {showItemModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowItemModal(false)}
              className="absolute left-5 top-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cairo font-black text-xl text-white mb-6">
              {editingItem.id ? "تعديل تفاصيل الصنف" : "إضافة صنف جديد بالمنيو"}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">اسم الصنف (بالعربي)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">القسم التابع له</label>
                  <select
                    value={editingItem.category_id || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-bold"
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
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">السعر (بالجنيه المصري)</label>
                  <input
                    type="number"
                    disabled={editingItem.is_daily}
                    value={editingItem.is_daily ? 0 : editingItem.price || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={editingItem.is_daily || false}
                      onChange={(e) => setEditingItem({ ...editingItem, is_daily: e.target.checked })}
                      className="w-4 h-4 rounded text-[#008ba3]"
                    />
                    <span>سعر يومي / متغير</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">شارة ترويجية (Badge)</label>
                <input
                  type="text"
                  placeholder="مثال: الأكثر طلباً 🔥، جديد ✨، فاخر"
                  value={editingItem.badge || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">الوصف والمكونات</label>
                <textarea
                  rows={2}
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              {/* Image Upload section */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">صورة الصنف</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="رابط الصورة المباشر أو مسارها"
                    value={editingItem.image || editingItem.img || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value, img: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                  />
                  <label className="flex items-center gap-1.5 bg-[#008ba3] hover:bg-[#00778f] text-white px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "جاري الرفع..." : "رفع لـ Cloudinary"}</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingItem.is_available !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, is_available: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span>الصنف متاح للطلب</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingItem.is_special || false}
                    onChange={(e) => setEditingItem({ ...editingItem, is_special: e.target.checked })}
                    className="w-4 h-4 rounded text-[#fab818]"
                  />
                  <span>عرض في سبيشيال الرئسية 🌟</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-6 py-2.5 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#fab818] text-slate-950 font-black text-xs shadow-md"
                >
                  حفظ الصنف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY EDIT/ADD MODAL */}
      {showCatModal && editingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setShowCatModal(false)}
              className="absolute left-5 top-5 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-cairo font-black text-xl text-white mb-6">
              {editingCat.id ? "تعديل بيانات القسم" : "إضافة قسم جديد"}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">اسم القسم (بالعربي)</label>
                <input
                  type="text"
                  required
                  value={editingCat.title || ""}
                  onChange={(e) => setEditingCat({ ...editingCat, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ترتيب العرض</label>
                <input
                  type="number"
                  value={editingCat.display_order || 1}
                  onChange={(e) => setEditingCat({ ...editingCat, display_order: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الوصف</label>
                <input
                  type="text"
                  value={editingCat.description || ""}
                  onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-5 py-2 rounded-2xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-[#fab818] text-slate-950 font-black text-xs"
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
