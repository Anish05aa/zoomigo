# 🚗 Car Rental System (CRS)

A full-stack web application for vehicle rentals, built with the MERN stack (MongoDB, Express, React, Node.js). It supports three types of users — Admin, User, and Owner — each with role-specific dashboards, secure authentication, and integrated online payments.

---

## 💡 Features

### 🔑 Role-Based Access

| Role      | Responsibilities                                                                       |
| --------- | ---------------------------------------------------------------------------------------- |
| **Admin** | Add/manage vehicles, associate vehicles with owners, manage bookings, view vehicle-owner list |
| **User**  | Book vehicles, pay online via Razorpay, manage profile and bookings                    |
| **Owner** | View vehicle-wise earnings & bookings for their assigned vehicles                      |

---

### 🚀 Core Functionalities

- 📋 **Vehicle Management:** Admin can add, update, and delete vehicles.
- 👥 **Owner Management:** Admin can assign vehicles to owners.
- 📅 **Vehicle Booking:** Users can browse, filter, and book available vehicles.
- 💳 **Online Payments:** Razorpay integration ensures secure transactions.
- 💬 **Chatbot Support:** Botpress chatbot for instant help and guidance.
- 📊 **Role-Specific Dashboards:**
  - **Admin:** Stats, recent bookings, owner & vehicle controls.
  - **User:** Bookings, payments, and profile management.
  - **Owner:** Track earnings and bookings for owned vehicles.
- 🌙 **Dark Mode:** Smooth toggle using the Context API.
- 🔐 **Authentication:**
  - JWT-based secure login for Admin and User.
  - Google OAuth for Owner login.
- 📱 **Responsive UI:** Optimized for both desktop and mobile views.

---

## 🛠️ Tech Stack

### Frontend

- React
- Tailwind CSS
- React Router
- Axios
- Context API

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (Image Uploads)
- Cloudinary (Image Hosting)
- Razorpay (Payments)
- Botpress Webchat

---

## 📸 Screenshots



<img src="https://github.com/user-attachments/assets/34d82435-7294-457b-8aea-1bf8a5dd67a7" alt="Login Page" width="75%" />

<img src="https://github.com/user-attachments/assets/640ddda3-7454-4097-be4c-1010163ee2a6" alt="Dashboard Overview" width="75%" />



<img src="https://github.com/user-attachments/assets/8c42e3d6-5552-40a5-8629-b10783494d9d" alt="Admin Dashboard" width="75%" />
<img src="https://github.com/user-attachments/assets/8270e2d4-72cb-4df1-b21d-9659568d6b34" alt="Owner Panel" width="75%" />
Admin-panel:
<img src="https://github.com/user-attachments/assets/c2dcc7e9-b714-4b04-817a-3b41c0474953" alt="Bookings Page" width="75%" />
<img src="https://github.com/user-attachments/assets/16467497-62d6-4853-b9b2-e811105c0d4d" alt="Vehicle Detail View" width="75%" />
<img src="https://github.com/user-attachments/assets/60f40d43-70ce-4ede-a539-924f4c5e5b92" alt="Chatbot UI" width="75%" />
Owner-dashboard:
<img src="https://github.com/user-attachments/assets/55130244-56b8-4f17-9262-45234b293c8f" alt="Dark Mode Support" width="75%" />

---


