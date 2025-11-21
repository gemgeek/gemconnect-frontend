# GemConnect Frontend - Project Nexus 📱✨

[![Published on Expo](https://img.shields.io/badge/Published_on-Expo-4630EB?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/accounts/gem_geek/projects/mobile)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Apollo Client](https://img.shields.io/badge/Apollo_Client-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)](https://www.apollographql.com/)

## 📖 About GemConnect
**GemConnect** is a modern, visual-first social media application designed for creators to share portfolio work and connect in a distraction-free environment.

This repository contains the **Mobile Frontend**, built with **React Native (Expo)** and **TypeScript**. It communicates with a Django backend via **GraphQL**, featuring a robust authentication system, dynamic feed, and real-time user interactions.

## 🚀 Live Demo
**Scan to Run on your Phone (Expo Go):**

🔗 **Project Link:** [https://expo.dev/accounts/gem_geek/projects/mobile](https://expo.dev/accounts/gem_geek/projects/mobile)

---

## 🛠 Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Core** | **React Native (Expo)** | Cross-platform mobile development (iOS & Android). |
| **Language** | **TypeScript** | Type safety and robust code structure. |
| **Data Layer** | **Apollo Client** | GraphQL queries, mutations, and caching. |
| **Navigation** | **Expo Router** | File-based routing (Tabs + Stacks). |
| **Storage** | **AsyncStorage** | Persisting JWT tokens and user preferences. |
| **Media** | **Expo Image Picker** | Accessing device gallery for uploads. |

---

## ⚡ Key Features (Implemented)

### 🔐 Authentication & Security
* **JWT Flow:** Secure Login and Registration connected to Django.
* **Persistence:** Auto-login functionality using stored tokens.
* **Secure Inputs:** Password visibility toggles and validation.

### 🏠 Dynamic Home Feed
* **Real-Time Data:** Fetches posts directly from the PostgreSQL database via GraphQL.
* **Interactions:**
    * **Like System:** Optimistic UI updates (heart turns red instantly).
    * **Comments:** Functional slide-up modal to view and add comments.
    * **Share:** Custom share sheet UI.

### 📸 Content Creation
* **Media Uploads:** Integrated native Image Picker to upload photos from the gallery.
* **Base64 Handling:** Converts images for secure transmission to the backend.

### 👤 Profile Management
* **Dynamic Profile:** Displays user stats (Followers/Following) and post grid.
* **Edit Profile:** Fully functional edit screen with local storage persistence for bio and name changes.
* **Public Profiles:** Ability to view other users' profiles and Follow/Unfollow them.

---

## 📂 Project Structure
The project follows the **Expo Router** directory structure:

```bash
gemconnect-frontend/mobile/
├── app/                  # Screens & Navigation (Routes)
│   ├── (tabs)/           # Bottom Tab Bar (Feed, Explore, Add, Messages, Profile)
│   ├── user/             # Dynamic Public Profile routes
│   ├── _layout.tsx       # Root Layout & Providers
│   ├── login.tsx         # Auth Screens
│   └── ...
├── src/
│   ├── components/       # Reusable UI (PostItem, CommentsModal, etc.)
│   ├── graphql/          # Apollo Queries & Mutations
│   └── types/            # TypeScript Interfaces
├── assets/               # Images & Fonts
└── app.json              # Expo Configuration
```

---

## Mobile App Prototype

![GemConnect Screens](/assets/prototype.png)


---

## 💻 Installation Guide

### Clone the repository
```bash
git clone https://github.com/<your-username>/gemconnect-frontend.git
cd gemconnect-frontend/mobile
```

### Install dependencies
```bash
npm install
```

### Start the server
```bash
npx expo start
```

### Run on Device
- Scan the QR code with the **Expo Go** app (Android/iOS).  
- Press **a** for Android Emulator or **i** for iOS Simulator.

---

## 🔮 Future Roadmap

- **Real-Time Chat:** Upgrade the Messages UI to use WebSockets for live chat.  
- **Stories:** Implement 24-hour disappearing status updates.  
- **Push Notifications:** Notify users when they receive a like or follow.

---

## 🤝 Contributing
This project was built as a **Capstone Project** for the **ProDev Engineering Program**.  
Developed by **Matilda Esenam Gbeve**.

---