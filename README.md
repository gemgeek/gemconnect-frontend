# GemConnect Frontend - Project Nexus 📱✨

## About GemConnect
GemConnect is a modern culture-centric social media application designed to help users express themselves, share posts, explore content, and connect with others in a smooth and engaging mobile experience.  
This repository contains the frontend (mobile app) built using React Native and TypeScript, with GraphQL for dynamic data fetching from the backend.

The app includes 19 beautifully designed screens such as onboarding, authentication, home feed, explore, notifications, messaging, add-post, profile, edit profile, image update, and settings.

---

## Features
- **Onboarding & Authentication**
  - Welcome screens, login, signup, location selection

- **Dynamic Home Feed**
  - GraphQL-powered posts
  - Likes, comments, and share functionality
  - Smooth UI updates and transitions

- **Comments & Share Modals**
  - Layered interfaces for user interactions

- **Explore Page**
  - Discovery grid for culture and content exploration

- **Posting System**
  - Create new posts with text and images

- **Messaging**
  - Main chats list
  - One-on-one conversation screens

- **User Profile**
  - User posts grid
  - Edit profile & change profile photo
  - Share profile

- **Settings**
  - Account options, security, and privacy

---

## Mobile App Prototype

![GemConnect Screens](/assets/prototype.png)


---

## Tech Stack
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **API:** GraphQL (Apollo Client)
- **Navigation:** React Navigation (Bottom Tabs + Stack)
- **State Management:** Apollo Cache, React Hooks
- **Styling:** Tailwind (NativeWind) or Styled Components
- **Build Tool:** Expo CLI

---

## Badges
<p align="left">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/Apollo_Client-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white" alt="Apollo Client" />
  <img src="https://img.shields.io/badge/React_Navigation-000000?style=for-the-badge&logo=react&logoColor=white" alt="React Navigation" />
</p>

---

## Project Structure
```
gemconnect-frontend/
├── src/
│   ├── assets/           (images, icons, fonts)
│   ├── components/       (reusable UI components)
│   ├── screens/          (19 app screens)
│   ├── navigation/       (tab + stack navigation)
│   ├── graphql/          (queries, mutations)
│   ├── hooks/            (custom logic)
│   ├── utils/            (helpers)
│   └── styles/           (global styles)
├── App.tsx               (app entry)
├── package.json
├── README.md
└── docs/
    └── images/           (screen previews)
```

---

## Installation

1. **Clone the repository**
```
git clone https://github.com/<your-username>/gemconnect-frontend.git
cd gemconnect-frontend
```

2. **Install dependencies**
```
npm install
```

3. **Start the Expo development server**
```
npx expo start
```

4. **Environment Variables**
Create a `.env` file:
```
GRAPHQL_API_URL=https://your-backend-url/graphql/
```

---

## Usage
- Open the app through Expo Go (Android/iOS).
- Navigate through onboarding → login → home feed.
- Interact with posts: like, comment, share.
- Explore content.
- Create posts.
- Chat with users.
- Edit and manage profile.
- Access notifications and settings.

---

## Next Steps
- Integrate real-time updates using GraphQL Subscriptions.
- Improve animations and micro-interactions.
- Implement push notifications.
- Prepare web version after mobile completion.

---

## Collaboration & Contributions
This frontend is part of the ProDev engineering project.  
Pull requests or suggestions are welcome under mentorship guidelines.

---

## Roadmap
- Build and refine UI components
- Connect all screens to backend API
- Implement full profile editing logic
- Add real-time messaging
- Finalize and polish UX
- Deploy mobile app build


  