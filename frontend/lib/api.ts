// API Client for New Port Said / الخلاط Restaurant Backend
import { RESTAURANT_INFO, MENU_CATEGORIES, MENU_ITEMS } from "./data.js";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Category {
  id: string;
  title: string;
  image?: string;
  description?: string;
  icon?: string;
  display_order?: number;
  items?: MenuItem[];
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  price: number;
  original_price?: number;
  is_daily?: boolean;
  badge?: string;
  description?: string;
  image?: string;
  img?: string;
  is_available?: boolean;
  is_special?: boolean;
  is_offer?: boolean;
  display_order?: number;
}

export interface RestaurantSettings {
  id?: string;
  name: string;
  name_en: string;
  tagline: string;
  phones: string[];
  address: string;
  whatsapp: string;
  working_hours: string;
  facebook_url: string;
  instagram_url: string;
  show_offers_section?: boolean;
}

export interface Review {
  id: string;
  name: string;
  phone?: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;
}

export interface Feedback {
  id: string;
  name: string;
  phone: string;
  type: "suggestion" | "complaint";
  message: string;
  is_read: boolean;
  createdAt?: string;
}

// ----------------------------------------------------
// Health & Stats
// ----------------------------------------------------
export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { cache: "no-store" });
    const data = await res.json();
    return data.status === "ok";
  } catch (err) {
    return false;
  }
}

export async function getSeedStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/seed/stats`, { cache: "no-store" });
    return await res.json();
  } catch (err) {
    return { success: false, connected: false, stats: { categories: 0, menuItems: 0, reviews: 0, feedback: 0 } };
  }
}

export async function seedDatabase() {
  try {
    const res = await fetch(`${API_BASE_URL}/seed`, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { success: false, message: "فشل الاتصال بالسيرفر أثناء المزامنة" };
  }
}

// ----------------------------------------------------
// Menu & Categories
// ----------------------------------------------------
export async function fetchFullMenu() {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/full`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      return data.data;
    }
    throw new Error("No data");
  } catch (err) {
    console.warn("API offline or error, using local fallback menu");
    // Fallback logic
    return MENU_CATEGORIES.filter((c) => c.id !== "all").map((cat) => ({
      id: cat.id,
      title: cat.name,
      icon: "Flame",
      display_order: 1,
      items: MENU_ITEMS.filter((i) => i.category === cat.id).map((i) => ({
        id: i.id,
        category_id: i.category,
        name: i.name,
        price: i.price,
        badge: i.badge || "",
        image: i.img,
        img: i.img,
        description: i.desc || "",
        is_available: true,
        is_special: i.category === "special",
      })),
    }));
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return MENU_CATEGORIES.filter((c) => c.id !== "all").map((cat, idx) => ({
      id: cat.id,
      title: cat.name,
      display_order: idx + 1,
      icon: "Flame",
    }));
  }
}

export async function upsertCategory(category: Partial<Category>) {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  return await res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, { method: "DELETE" });
  return await res.json();
}

// ----------------------------------------------------
// Menu Items
// ----------------------------------------------------
export async function fetchSpecialItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/special`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return MENU_ITEMS.filter((i) => i.category === "special").map((i) => ({
      id: i.id,
      category_id: i.category,
      name: i.name,
      price: i.price,
      badge: i.badge || "",
      image: i.img,
      img: i.img,
      description: i.desc || "",
      is_available: true,
      is_special: true,
    }));
  }
}

export async function fetchOfferItems(): Promise<MenuItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/menu/offers`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return [
      {
        id: "shikar",
        category_id: "special",
        name: "شيكار",
        price: 65,
        original_price: 85,
        badge: "عرض خاص 🔥",
        image: "/products/offer-1.jfif",
        img: "/products/offer-1.jfif",
        description: "خلطة الخلاط السحرية الغنية بقطع الفواكه والكريمة.",
        is_available: true,
        is_offer: true,
      },
      {
        id: "avocado-nuts",
        category_id: "special",
        name: "أفوكادو عصير مكسرات",
        price: 85,
        original_price: 110,
        badge: "خصم حصري 🔥",
        image: "/products/offer-2.jfif",
        img: "/products/offer-2.jfif",
        description: "أفوكادو بلدي طازج مع العسل الطبيعي والمكسرات الفاخرة.",
        is_available: true,
        is_offer: true,
      },
      {
        id: "soft-caramel",
        category_id: "special",
        name: "ميلك شيك اوريو",
        price: 60,
        original_price: 100,
        badge: "خصم حصري 🔥",
        image: "/products/offer-3.jfif",
        img: "/products/offer-3.jfif",
        description: "ميلك شيك اوريو غني مع صوص الشوكولاتة الدافي.",
        is_available: true,
        is_offer: true,
      },

    ];
  }
}

export async function fetchMenuItems(categoryId?: string): Promise<MenuItem[]> {
  try {
    const url = categoryId ? `${API_BASE_URL}/menu/items?category_id=${categoryId}` : `${API_BASE_URL}/menu/items`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    let items = MENU_ITEMS;
    if (categoryId && categoryId !== "all") {
      items = items.filter((i) => i.category === categoryId);
    }
    return items.map((i) => ({
      id: i.id,
      category_id: i.category,
      name: i.name,
      price: i.price,
      badge: i.badge || "",
      image: i.img,
      img: i.img,
      description: i.desc || "",
      is_available: true,
      is_special: i.category === "special",
    }));
  }
}

export async function upsertMenuItem(item: Partial<MenuItem>) {
  const res = await fetch(`${API_BASE_URL}/menu/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return await res.json();
}

export async function deleteMenuItem(id: string) {
  const res = await fetch(`${API_BASE_URL}/menu/items/${id}`, { method: "DELETE" });
  return await res.json();
}

// ----------------------------------------------------
// Cloudinary Upload
// ----------------------------------------------------
export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "new-portsaid");

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success && data.url) return data.url;
    return null;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}

// ----------------------------------------------------
// Restaurant Settings
// ----------------------------------------------------
export async function fetchRestaurantSettings(): Promise<RestaurantSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return {
      name: RESTAURANT_INFO.name,
      name_en: "The Mixer",
      tagline: RESTAURANT_INFO.tagline,
      phones: [RESTAURANT_INFO.phone],
      address: RESTAURANT_INFO.address,
      whatsapp: RESTAURANT_INFO.whatsapp,
      working_hours: RESTAURANT_INFO.hours,
      facebook_url: "https://facebook.com",
      instagram_url: "https://instagram.com",
    };
  }
}

export async function updateRestaurantSettings(settings: Partial<RestaurantSettings>) {
  const res = await fetch(`${API_BASE_URL}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  return await res.json();
}

// ----------------------------------------------------
// Reviews
// ----------------------------------------------------
export async function submitCustomerReview(review: { name: string; phone?: string; rating: number; comment: string }) {
  const res = await fetch(`${API_BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return await res.json();
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/approved`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return [];
  }
}

export async function fetchAllReviews(): Promise<Review[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews/all`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return [];
  }
}

export async function updateReviewStatus(id: string, status: "approved" | "rejected" | "pending") {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return await res.json();
}

export async function deleteReview(id: string) {
  const res = await fetch(`${API_BASE_URL}/reviews/${id}`, { method: "DELETE" });
  return await res.json();
}

// ----------------------------------------------------
// Feedback & Complaints
// ----------------------------------------------------
export async function submitFeedback(feedback: { name: string; phone: string; type: "suggestion" | "complaint"; message: string }) {
  const res = await fetch(`${API_BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback),
  });
  return await res.json();
}

export async function fetchAllFeedback(): Promise<Feedback[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/feedback/all`, { cache: "no-store" });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (data.success && data.data) return data.data;
    throw new Error("No data");
  } catch (err) {
    return [];
  }
}

export async function toggleFeedbackReadStatus(id: string, is_read: boolean) {
  const res = await fetch(`${API_BASE_URL}/feedback/${id}/read`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_read }),
  });
  return await res.json();
}

export async function deleteFeedback(id: string) {
  const res = await fetch(`${API_BASE_URL}/feedback/${id}`, { method: "DELETE" });
  return await res.json();
}
