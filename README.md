# 🔥 BORNOMALA MULTIMEDIA SCHOOL — Farewell Festival 2026 Registration Portal

Official full-stack registration web application and event management portal for **Bornomala Multimedia School Farewell Festival 2026**. Built with **Express, Next.js, and MongoDB** as an efficient **Monorepo**. Deployable to **Render** in **ONE command**!

---

## 🔗 Form Links & Direct Access

The registration form is linked and accessible in multiple ways for easy sharing across WhatsApp groups, social media, and school announcements:

- **Direct Form Link**: `https://your-domain.com/register`
  - A standalone, distraction-free registration page with a copyable share link button.
- **Homepage Modal Link**: `https://your-domain.com/#register` or `https://your-domain.com/?register=true`
  - Automatically pops up the registration form over the festival landing page on page load.
- **Homepage CTA Buttons**:
  - Desktop & Mobile: "Claim Festival Pass", "Register Now", "Open Registration Form".
  - Mobile: Persistent floating bottom action bar **"GET PASS (FORM)"**.

---

## ✨ Key Features

- **Bornomala Multimedia School Branding**:
  - Customized for Bornomala Multimedia School students, batches (Class 10 / SSC Batch 2026, SSC Batch 2025, Junior Organizers, Alumni), and academic groups (Science Group, Business Studies, Humanities, etc.).
- **High-Energy Festival Atmosphere**:
  - Live animated marquee ticker tape.
  - Real-time countdown timer to the farewell night.
  - 6 Festival Zones (Live DJ Rave, Custom T-Shirt Kit, Royal Gala Feast, 360° Neon Photo Dome, Hall of Fame Awards, Starlight Fireworks).
  - Authentic concert ticket stub digital pass generator with barcode representation and celebratory confetti.
- **Mobile-First UX**:
  - Sticky bottom mobile action bar.
  - Full-screen mobile bottom-sheet modal.
  - Tactile touch-friendly T-shirt size selector tiles (S, M, L, XL, XXL, 3XL).
  - Horizontal swipeable photo stories.
- **Admin Control Desk (`/admin/dashboard`)**:
  - Protected admin login (`/admin/login`) with JWT.
  - Default Credentials: `admin@firewell.com` / `admin123`.
  - Full CRUD: Add, View, Edit, and Delete student registrations.
  - Fast 1-tap Check-In button directly on mobile cards / desktop table for school gate entrance.
  - 1-click CSV export for printing badges and organizing T-shirt distributions.

---

## 📸 How to Replace Photo URLs

Open [client/src/app/page.js](file:///Users/mdgolamrabbani/projects/firewell/client/src/app/page.js#L29-L40) and update the `EVENT_PHOTOS` object:

```javascript
export const EVENT_PHOTOS = {
  heroBanner: 'https://...',    // Main stage concert banner
  stageDj: 'https://...',       // DJ concert vibe
  crowdCheer: 'https://...',    // Crowd confetti celebration
  galaDinner: 'https://...',    // Gala buffet feast
  tshirtMerch: 'https://...',   // Custom batch T-shirt
  fireworksSky: 'https://...',  // Fireworks festival night
  friendsHugs: 'https://...',   // Best friends hugging
};
```

---

## 🚀 One-Command Deployment on Render

In Render:
1. **Environment**: `Node`
2. **Build Command**:
   ```bash
   npm run build
   ```
3. **Start Command**:
   ```bash
   npm start
   ```

### Required Environment Variables on Render:
- `NODE_ENV`: `production`
- `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster.mongodb.net/firewell?retryWrites=true&w=majority`
- `JWT_SECRET`: Any random 32+ character string
- `ADMIN_EMAIL`: `admin@firewell.com`
- `ADMIN_PASSWORD`: `admin123`

---

## 💻 Local Run Commands

- **Development (Express on 5001 + Next.js on 3000)**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  ```
- **Start Production Server**:
  ```bash
  npm start
  ```
