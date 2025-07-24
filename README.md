# MyDuka - Frontend (Tailwind CSS Version)

This is the Vite + React frontend for MyDuka, a Progressive Web App (PWA) for managing small Kenyan shops. This version has been fully refactored to use **Tailwind CSS** for all styling.

## ✨ Features

* **Role-Based Dashboards:** Separate, secure interfaces for Merchants, Admins, and Clerks.
* **Mobile-First & Responsive:** Looks and works great on any device, built with Tailwind's responsive utilities.
* **PWA Ready:** Can be installed on a user's home screen for an app-like experience.
* **Utility-First Styling:** All styling is done with Tailwind CSS for rapid and consistent UI development.
* **Secure JWT Authentication:** Uses JWT for secure login and session management.
* **State Management:** Centralized state management with Redux Toolkit.
* **Zoho-Style Navigation:** Clean, collapsible sidebar for easy navigation.
* **M-Pesa Integration:** UI for paying suppliers and viewing transaction history.
* **Data Visualization:** Uses Recharts for simple, touch-friendly charts.

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd myduka-frontend-tailwind
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    The API base URL is configured in `src/api/api.js`. Update it to point to your deployed backend.
    ```javascript
    // src/api/api.js
    const api = axios.create({
      baseURL: '[https://your-backend-url.com/api/v1](https://your-backend-url.com/api/v1)', 
    });
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

## ⚙️ Deployment

This Vite project is configured for easy, automated deployment on platforms like **Vercel** or **Netlify**.

1.  Push your code to a GitHub repository.
2.  Connect your repository to Vercel or Netlify.
3.  Configure the build command: `npm run build`
4.  Configure the output directory: `dist`
5.  Deploy!

## 🖼️ Screenshots

*(Add screenshots of the landing page, merchant dashboard, and payment form here after development)*

By Ian Githae.

## 🔗 Database ERD

A link to the database Entity-Relationship Diagram can be found [here](https://link-to-your-erd-image.com).

