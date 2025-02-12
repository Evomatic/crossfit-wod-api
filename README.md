# **CrossFit WOD API** 🏋️‍♂️  
*A Node.js, TypeScript, and Express API following the MVC pattern*  

## **📌 Overview**  
The **CrossFit WOD API** is a **CRUD-based REST API** built with **Node.js, TypeScript, and Express**, following the **Model-View-Controller (MVC) architecture**. It allows users to **create, read, update, and delete (CRUD)** workout data.
---

## **🚀 Features**  
✅ **Full CRUD operations** for managing CrossFit Workouts of the Day (WODs)  
✅ **RESTful API** structure with proper HTTP methods and responses  
✅ **Model-View-Controller (MVC) architecture** for better separation of concerns  
✅ **TypeScript** for type safety and better developer experience  
✅ **Express.js** for a lightweight and efficient server  
✅ **Error handling** for better API stability  

---

## **🛠️ Tech Stack**  
- **Node.js** – Runtime environment  
- **TypeScript** – Strongly-typed JavaScript  
- **Express.js** – Web framework  
---

## **🔧 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Evomatic/crossfit-wod-api.git
cd crossfit-wod-api
```

### **2️⃣ Install Dependencies**  
```sh
pnpm install
pnpm start
```
---

## **📡 API Endpoints**  

### 🔹 **Records API**
| Method | Endpoint                 | Description                                      |
|--------|--------------------------|--------------------------------------------------|
| GET    | `/api/v1/records`         | Get all records                                 |
| GET    | `/api/v1/records/:recordId` | Get a specific record (UUID required)         |
| POST   | `/api/v1/records`         | Create a new record (Requires `id`, `workout`, `record`) |

---

### 🔹 **Workouts API**
| Method | Endpoint                              | Description                                            |
|--------|--------------------------------------|--------------------------------------------------------|
| GET    | `/api/v1/workouts`                   | Get all workouts                                      |
| GET    | `/api/v1/workouts/:workoutId`        | Get a specific workout (UUID required)               |
| GET    | `/api/v1/workouts/:workoutId/records` | Get records associated with a workout (UUID required) |
| POST   | `/api/v1/workouts`                   | Create a new workout (Requires `name`, `mode`, `equipment`, `exercises`, `trainerTips`) |
| PATCH  | `/api/v1/workouts/:workoutId`        | Update an existing workout (UUID required, optional fields: `name`, `mode`, `equipment`, `exercises`, `trainerTips`) |
| DELETE | `/api/v1/workouts/:workoutId`        | Delete an existing workout (UUID required)           |
