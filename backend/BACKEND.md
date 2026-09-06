# Backend Architecture & Implementation Documentation

This document provides a complete, precise, and standalone specification of the backend implementation created for the **New Port Said Restaurant** application. It contains all exact architectures, schemas, routes, controller logic, and configuration necessary to replicate this backend for another project.

---

## 1. Tech Stack & Dependencies

* **Runtime Environment**: Node.js (CommonJS modules)
* **Web Framework**: Express.js (`v4.21.2`)
* **Database & ODM**: MongoDB Atlas with Mongoose (`v8.9.5`)
* **Media & Cloud Storage**: Cloudinary SDK (`v1.41.3`)
* **File Upload Middleware**: Multer (`v1.4.5-lts.1`) with in-memory storage buffer
* **Cross-Origin Resource Sharing**: CORS (`v2.8.5`)
* **Environment Configuration**: Dotenv (`v16.4.7`)
* **HTTP Request Logger**: Morgan (`v1.10.0`)
* **Development Server**: Nodemon (`v3.1.14`)
* **Stream Handling**: Node.js core `stream` module (`stream.PassThrough`)

---

## 2. Directory & File Structure

```
Backend/
├── config/
│   ├── cloudinary.js          # Cloudinary SDK configuration
│   └── db.js                  # Mongoose MongoDB connection handler
├── controllers/
│   ├── categoryController.js  # Category CRUD & cascade deletion logic
│   ├── feedbackController.js  # Suggestions & complaints logic
│   ├── menuItemController.js  # Menu items CRUD, grouping, & special dishes logic
│   ├── reviewController.js    # Customer reviews & approval workflow logic
│   ├── seedController.js      # 1-click database seeder & statistics
│   ├── settingsController.js  # Singleton restaurant settings logic
│   └── uploadController.js    # Direct dual-mode Cloudinary image upload & deletion
├── data/
│   └── defaultData.js         # Default restaurant dataset (150+ menu items, categories, settings)
├── middleware/
│   ├── errorHandler.js        # Global Express error handling middleware
│   └── upload.js              # Multer memory storage & MIME filter configuration
├── models/
│   ├── Category.js            # Mongoose Category Schema & virtual items relation
│   ├── Feedback.js            # Mongoose Customer Feedback Schema
│   ├── MenuItem.js            # Mongoose Menu Item Schema
│   ├── RestaurantSettings.js  # Mongoose Restaurant Profile & Settings Schema
│   └── Review.js              # Mongoose Customer Review Schema
├── routes/
│   ├── categoryRoutes.js      # /api/categories router
│   ├── feedbackRoutes.js      # /api/feedback router
│   ├── index.js               # Main API aggregator router & /api/health
│   ├── menuItemRoutes.js      # /api/menu router
│   ├── reviewRoutes.js        # /api/reviews router
│   ├── seedRoutes.js          # /api/seed router
│   ├── settingsRoutes.js      # /api/settings router
│   └── uploadRoutes.js        # /api/upload router
├── .env                       # Environment variables
├── .gitignore                 # Node modules & environment ignore rules
├── package.json               # Project manifest & run scripts
└── server.js                  # Express application entry point & listener
```

---

## 3. Environment Variables (`.env`)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=new-portsaid

# JWT Configuration (Reserved)
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary CDN Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 4. Server Initialization (`server.js`) & Config

### Database Connection (`config/db.js`)
* Connects via `mongoose.connect(process.env.MONGODB_URI, { dbName: "new-portsaid" })`.
* Logs host and connected database name on success.
* Exits process on fatal connection failure (`process.exit(1)`).

### Cloudinary Configuration (`config/cloudinary.js`)
* Configures `cloudinary.v2` with `cloud_name`, `api_key`, `api_secret`, and `secure: true`.

### Express Application (`server.js`)
* Enables CORS for all origins (`*`) with methods `GET, POST, PUT, PATCH, DELETE, OPTIONS` and headers `Content-Type, Authorization`.
* Parses JSON bodies up to `25mb` (allowing base64 uploads).
* Parses URL-encoded bodies up to `25mb` with `extended: true`.
* Logs incoming HTTP requests via `morgan("dev")` when `NODE_ENV !== "production"`.
* Serves root route `GET /` with API information.
* Mounts central router on `/api`.
* Registers global `errorHandler` middleware.
* Listens on `process.env.PORT || 5000`.

---

## 5. Database Models & Schema Definitions

All models define custom, persistent string `id` fields (instead of client dependency on internal MongoDB `_id`), and automatically include `timestamps: true` (`createdAt` and `updatedAt`).

### 5.1 Category Model (`models/Category.js`)
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | String | required, unique, trim | Unique string identifier (e.g. `"grills"`, `"cat_123"`) |
| `title` | String | required, trim | Display name in Arabic |
| `image` | String | default: `""` | Banner/card image URL |
| `description` | String | default: `""` | Category overview text |
| `icon` | String | default: `"Flame"` | Lucide icon identifier |
| `display_order` | Number | default: `0` | Sort weight for UI rendering |

* **Virtual Relation**: Defines virtual field `items` pointing to `ref: "MenuItem"`, where `localField: "id"` equals `foreignField: "category_id"`.
* **Options**: `{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }`.

### 5.2 MenuItem Model (`models/MenuItem.js`)
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | String | required, unique, trim | Unique string identifier (e.g. `"g-1"`, `"item_123"`) |
| `category_id` | String | required, trim, index: true | Foreign reference to `Category.id` |
| `name` | String | required, trim | Dish title in Arabic |
| `price` | Number | default: `0` | Numerical base price in EGP |
| `is_daily` | Boolean | default: `false` | True if priced daily/market rate (e.g. Duck, Seafood) |
| `badge` | String | default: `""` | Promotional badge (e.g. `"الأكثر طلباً"`, `"مميز"`) |
| `description` | String | default: `""` | Ingredients and serving description |
| `image` | String | default: `""` | Dish image URL (Cloudinary CDN) |
| `is_available` | Boolean | default: `true` | Stock availability toggle |
| `is_special` | Boolean | default: `false`, index: true | Dish highlighted in homepage `DishCarousel` |
| `display_order` | Number | default: `0` | Ordering within its category |

### 5.3 RestaurantSettings Model (`models/RestaurantSettings.js`)
Implements the Singleton Pattern (`id: "default_settings"`).
| Field | Type | Attributes | Default |
|---|---|---|---|
| `id` | String | unique, default: `"default_settings"` | Singleton key |
| `name` | String | default | `"مطعم نيو بورسعيد"` |
| `name_en` | String | default | `"New Port Said Restaurant"` |
| `tagline` | String | default | `"أكل بشوات • طعم أصيل يُشوى بشغف"` |
| `phones` | `[String]` | default | `["01007375151", "01100130080", "01008329497"]` |
| `address` | String | default | `"سوهاج الجديدة - مول ريتاج 1"` |
| `whatsapp` | String | default | `"201007375151"` |
| `working_hours` | String | default | `"يومياً من ١٢:٠٠ ظهراً حتى ٠٢:٠٠ صباحاً"` |
| `facebook_url` | String | default | `"https://facebook.com"` |
| `instagram_url` | String | default | `"https://instagram.com"` |

### 5.4 Review Model (`models/Review.js`)
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | String | required, unique, trim | Unique review identifier |
| `name` | String | required, trim | Reviewer full name |
| `phone` | String | default: `""`, trim | Reviewer contact number |
| `rating` | Number | default: `5`, min: `1`, max: `5` | 1 to 5 star rating |
| `comment` | String | required, trim | Review comment |
| `status` | String | enum: `["pending", "approved", "rejected"]`, default: `"pending"`, index: true | Moderation status |

### 5.5 Feedback Model (`models/Feedback.js`)
| Field | Type | Attributes | Description |
|---|---|---|---|
| `id` | String | required, unique, trim | Unique ticket identifier |
| `name` | String | required, trim | Sender full name |
| `phone` | String | required, trim | Sender telephone |
| `type` | String | enum: `["suggestion", "complaint"]`, default: `"suggestion"` | Feedback classification |
| `message` | String | required, trim | Message text |
| `is_read` | Boolean | default: `false`, index: true | Admin read status |

---

## 6. API Endpoints Specification

All API endpoints are mounted under the `/api` prefix.

### 6.1 System & Health
* **`GET /`**
  * **Purpose**: Root health ping.
  * **Response**: `{ message, status: "online", docs: "/api/health" }`.
* **`GET /api/health`**
  * **Purpose**: Health check for uptime monitoring and frontend connectivity verification.
  * **Response**: `{ status: "ok", timestamp: ISOString, service: "New Port Said API" }`.

### 6.2 Menu & Items (`/api/menu`)
* **`GET /api/menu/full`**
  * **Purpose**: Returns the complete nested menu for menu pages. Fetches all categories sorted by `display_order`, embeds all matching items for each category (sorted by `display_order`), formatting dynamic prices (`"يومي"` if `is_daily: true` else numeric price).
  * **Response**: `{ success: true, count: N, data: [ { id, title, image, description, icon, display_order, items: [...] } ] }`.
* **`GET /api/menu/special`**
  * **Purpose**: Returns only items flagged as `is_special: true` and `is_available: true`, sorted by `display_order`. Used directly by `DishCarousel`.
  * **Response**: `{ success: true, count: N, data: [ MenuItem ] }`.
* **`GET /api/menu/items`**
  * **Purpose**: Flat list of items with optional query filtering.
  * **Query Params**:
    * `category_id` (string): Filter by category.
    * `is_special` (`"true"` | `"false"`): Filter by special status.
  * **Response**: `{ success: true, count: N, data: [ MenuItem ] }`.
* **`POST /api/menu/items`**
  * **Purpose**: Upserts an item (creates new if `id` is empty/missing, or updates existing by `id`).
  * **Auto-category Check**: If `category_id` does not exist in DB, automatically creates parent Category with `display_order: 99`.
  * **Price Sanitization**: Converts `"يومي"` or `is_daily: true` to boolean flag and numerical price.
  * **Payload**: `{ id?, category_id, name, price, is_daily?, badge?, description?, image?, is_available?, is_special?, display_order? }`.
  * **Response**: `{ success: true, data: MenuItem }` (HTTP 200).
* **`DELETE /api/menu/items/:id`**
  * **Purpose**: Deletes an item by its custom string `id`.
  * **Response**: `{ success: true, message: "Menu item deleted successfully" }` (HTTP 200 or 404).

### 6.3 Categories (`/api/categories`)
* **`GET /api/categories`**
  * **Purpose**: Returns all categories sorted by `display_order: 1`.
  * **Response**: `{ success: true, count: N, data: [ Category ] }`.
* **`POST /api/categories`**
  * **Purpose**: Upserts a category (creates with generated `cat_${Date.now()}` or updates matching `id`).
  * **Payload**: `{ id?, title, image?, description?, icon?, display_order? }`.
  * **Response**: `{ success: true, data: Category }`.
* **`DELETE /api/categories/:id`**
  * **Purpose**: Deletes the category and **cascades deletion** to all menu items belonging to this category (`MenuItem.deleteMany({ category_id: id })`).
  * **Response**: `{ success: true, message: "Category and N items deleted successfully" }`.

### 6.4 Restaurant Settings (`/api/settings`)
* **`GET /api/settings`**
  * **Purpose**: Returns the singleton settings document (`id: "default_settings"`). Creates default if missing.
  * **Response**: `{ success: true, data: RestaurantSettings }`.
* **`PUT /api/settings` & `POST /api/settings`**
  * **Purpose**: Updates restaurant phone numbers, addresses, social links, working hours, taglines.
  * **Payload**: Partial or full `RestaurantSettings` object.
  * **Response**: `{ success: true, data: RestaurantSettings }`.

### 6.5 Customer Reviews (`/api/reviews`)
* **`POST /api/reviews`**
  * **Purpose**: Public submission of customer reviews. Generates unique `rev_${Date.now()}_${random}` ID and forces `status: "pending"`.
  * **Payload**: `{ name, phone?, rating, comment }`.
  * **Response**: `{ success: true, data: Review }` (HTTP 201).
* **`GET /api/reviews/approved`**
  * **Purpose**: Public endpoint returning only approved reviews (`status: "approved"`), sorted by `createdAt: -1`.
  * **Response**: `{ success: true, count: N, data: [ Review ] }`.
* **`GET /api/reviews/all`**
  * **Purpose**: Admin endpoint returning all reviews across all statuses (`pending`, `approved`, `rejected`), sorted by `createdAt: -1`.
  * **Response**: `{ success: true, count: N, data: [ Review ] }`.
* **`PATCH /api/reviews/:id/status`**
  * **Purpose**: Admin moderation action. Validates status against `["approved", "rejected", "pending"]`.
  * **Payload**: `{ status: "approved" | "rejected" | "pending" }`.
  * **Response**: `{ success: true, data: Review }`.
* **`DELETE /api/reviews/:id`**
  * **Purpose**: Admin deletion of a review.
  * **Response**: `{ success: true, message: "Review deleted successfully" }`.

### 6.6 Feedback & Complaints (`/api/feedback`)
* **`POST /api/feedback`**
  * **Purpose**: Public submission of suggestions/complaints. Generates unique `fb_${Date.now()}_${random}` ID and sets `is_read: false`.
  * **Payload**: `{ name, phone, type: "suggestion" | "complaint", message }`.
  * **Response**: `{ success: true, data: Feedback }` (HTTP 201).
* **`GET /api/feedback/all`**
  * **Purpose**: Admin endpoint returning all submissions sorted by `createdAt: -1`.
  * **Response**: `{ success: true, count: N, data: [ Feedback ] }`.
* **`PATCH /api/feedback/:id/read`**
  * **Purpose**: Admin toggle to mark feedback as read/unread.
  * **Payload**: `{ is_read: boolean }` (defaults to `true`).
  * **Response**: `{ success: true, data: Feedback }`.
* **`DELETE /api/feedback/:id`**
  * **Purpose**: Admin deletion of feedback ticket.
  * **Response**: `{ success: true, message: "Feedback deleted successfully" }`.

### 6.7 Cloudinary Uploads (`/api/upload`)
* **`POST /api/upload`**
  * **Purpose**: Unified direct-to-Cloudinary image upload supporting two formats:
    1. **Multipart Form-Data**: Field `image` parsed by Multer into memory buffer, then piped via `stream.PassThrough` to `cloudinary.uploader.upload_stream({ folder })`.
    2. **JSON Base64 / Remote URL**: Field `image` passed to `cloudinary.uploader.upload(req.body.image, { folder })`.
  * **Folder Support**: Accepts `req.body.folder` (defaults to `"new-portsaid"`).
  * **Response**: `{ success: true, url: secure_url, public_id, format, width, height }` (HTTP 200).
* **`DELETE /api/upload`**
  * **Purpose**: Deletes asset from Cloudinary storage.
  * **Payload**: `{ public_id: string }`.
  * **Response**: `{ success: true, result: ... }`.

### 6.8 Database Seeding & Statistics (`/api/seed`)
* **`POST /api/seed`**
  * **Purpose**: One-click idempotent sync of the entire initial database from `data/defaultData.js`. Upserts default settings, all categories, and 150+ menu items with predefined images, descriptions, prices, badges, and `is_special` flags.
  * **Response**: `{ success: true, categoriesCount, itemsCount, message }`.
* **`GET /api/seed/stats`**
  * **Purpose**: Returns real-time collection counts across MongoDB.
  * **Response**: `{ success: true, connected: true, stats: { categories: N, menuItems: N, reviews: N, feedback: N } }`.

---

## 7. Middleware Implementations

### 7.1 File Upload Middleware (`middleware/upload.js`)
* Uses `multer.memoryStorage()` to avoid writing temporary files to server disk.
* Enforces image MIME type filtering:
  ```javascript
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  };
  ```
* Enforces `limits: { fileSize: 10 * 1024 * 1024 }` (10MB maximum file size).

### 7.2 Error Handler Middleware (`middleware/errorHandler.js`)
* Captures all synchronous and asynchronous unhandled errors forwarded via `next(err)`.
* Emits error stack traces to console.
* Determines HTTP status code (falls back to 500 if status is 200).
* Returns uniform JSON:
  ```javascript
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  ```

---

## 8. Key Business Logic Patterns

1. **Custom String IDs vs ObjectId**:
   To avoid tight coupling with MongoDB `_id` format and support static legacy datasets, all documents use explicit string `id`s (e.g., `"grills"`, `"item_1725638_abc"`, `"rev_1725638_xyz"`). Queries and deletions consistently use `{ id: req.params.id }`.

2. **Idempotent Upserts**:
   Controllers use Mongoose's `{ new: true, upsert: true, setDefaultsOnInsert: true }` extensively (`findOneAndUpdate`), enabling a single endpoint to handle both creation and editing without duplicate document creation.

3. **Cascade Deletion**:
   When a category is deleted via `DELETE /api/categories/:id`, the controller automatically executes:
   ```javascript
   await MenuItem.deleteMany({ category_id: id });
   ```
   ensuring no orphaned menu items remain in the database.

4. **Category Auto-Provisioning**:
   If an administrator creates an item under a category ID that has not yet been registered, the backend automatically provisions the category record to preserve referential integrity:
   ```javascript
   const categoryExists = await Category.findOne({ id: category_id });
   if (!categoryExists) {
     await Category.create({ id: category_id, title: category_id, display_order: 99 });
   }
   ```

5. **Daily Market Price vs Numeric Price**:
   Dishes with fluctuating market prices (such as duck or seafood) support `price: "يومي"`. The backend stores `is_daily: true` and sanitizes numerical storage to 0 or numerical input, while the grouped endpoint dynamically outputs `"يومي"` if `is_daily === true`.

6. **Direct Memory-Stream to Cloudinary CDN**:
   Eliminates local file storage in containers/serverless hosts by streaming Multer's in-memory buffer straight into Cloudinary's upload stream API via `stream.PassThrough`.
