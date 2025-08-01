# Car Rental System

# 🚗 Car Rental System (CRS)

A full-stack web application for vehicle rentals, built with the MERN stack (MongoDB, Express, React, Node.js). It supports three types of users — Admin, User, and Owner — with role-specific dashboards, secure authentication, and integrated online payments.

---

## 💡 Features

### 🔑 Role-Based Access

| Role      | Responsibilities                                                                       |
| --------- | -------------------------------------------------------------------------------------- |
| **Admin** | Add/manage vehicles, associate vehicles with owners, manage bookings, view vehicle-owner list |
| **User**  | Book vehicles, pay online via Razorpay, manage profile and bookings                   |
| **Owner** | View vehicle-wise earnings & bookings, vehicles managed by admin                      |

---

### 🚀 Core Functionalities

- 📋 **Vehicle Management:** Admin can add, update, delete vehicles.
- 👥 **Owner Management:** Admin can associate vehicles with owners.
- 📅 **Vehicle Booking:** Users can browse and book available vehicles.
- 💳 **Online Payments:** Razorpay integrated for secure transactions.
- 💬 **Chatbot Support:** Botpress chatbot for instant user help.
- 📊 **Role-Specific Dashboards:**
  - Admin: System stats, recent bookings, owner/vehicle management.
  - User: Active bookings, payment history, profile control.
  - Owner: Earnings, bookings of owned vehicles.
- 🌙 **Dark Mode:** Smooth toggle with context API.
- 🔐 **Authentication:**
  - JWT-based secure login for Admin and User.
  - Google OAuth for Owner login.
- 📱 **Responsive UI:** Optimized for desktop and mobile view.

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

## 🔧 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/car-rental-system.git
cd car-rental-system

