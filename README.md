# 🏡 Property Dashboard (MERN Stack)

A full-stack property listing and favourites management system built using the MERN stack. Users can browse properties, save favourites, and manage them in real time.

---

## 🚀 Features

- 🔐 User Authentication (JWT based)
- 🏘️ View all available properties
- ⭐ Add properties to favourites
- ❌ Remove properties from favourites
- 📦 Backend-controlled property creation (no UI for adding properties)
- ⚡ Real-time UI updates for favourites
- 📱 Responsive dashboard UI

---

## 🧠 Important Design Decision

Properties are **NOT created from the frontend UI**.

- Properties are added manually through backend (API/Postman)
- Frontend is **read-only for properties**
- Users (buyers) can:
  - View properties
  - Like (favourite) properties
  - Remove from favourites

This keeps:

- Business logic controlled
- No unauthorized property creation
- Cleaner UI

---

## 🛠️ Tech Stack

### Frontend

- React (TypeScript)
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Heroicons

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

---

## 📁 Folder Structure

```
client/
  ├── components/
  ├── pages/
  ├── lib/
  └── ...

server/
  ├── controller/
  ├── model/
  ├── middleware/
  ├── routes/
  └── ...
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
```

### 2. Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

---

### 3. Environment Variables

Create `.env` in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### 4. Run the app

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

---

## 🔗 API Endpoints

### Favourite Routes

- Add to favourite:

```
POST /favourite/add/:propertyId
```

- Get user's favourites:

```
GET /favourite/list
```

- Remove from favourite:

```
DELETE /favourite/remove/:propertyId
```

---

### Property Routes

- Get all properties:

```
GET /property/list
```

- Add property (manual/admin use only):

```
POST /property/add
```

---

## 🧩 How It Works (Simple)

1. User logs in → JWT stored
2. Dashboard loads:
   - Fetch properties
   - Fetch favourites
3. When user clicks ⭐:
   - Sends `propertyId` to backend
   - Stored with `userId`
4. When user removes:
   - Deletes using `userId + propertyId`
5. UI updates instantly (no reload needed)

---

## ⚠️ Known Limitations

- ❌ No UI for adding properties (intentional)
- ❌ No admin panel
- ❌ No image upload for properties

---

## 📌 Future Improvements

- Admin dashboard for property management
- Property images & details page
- Search & filters
- Pagination
- Role-based UI

---

## 👨‍💻 Author

Kunal Shrestha

---

## 📄 License

This project is for learning and personal use.
