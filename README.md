# MyDuka Frontend

This is the frontend for the MyDuka application, a modern, role-based management tool for small retail businesses. It is a Single-Page Application (SPA) built with React and Vite, designed to be fast, responsive, and user-friendly.

## Table of Contents
- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment to Vercel](#deployment-to-vercel)
- [Key Features](#key-features)

## About The Project
The MyDuka frontend provides an intuitive user interface for Merchants, Admins, and Clerks to manage store operations, from inventory and sales to staff and payments.

**Built With:**
- React
- Vite
- Redux Toolkit for state management
- React Router for client-side routing
- Tailwind CSS for styling
- Framer Motion for page animations
- Axios for API requests
- React Hot Toast for notifications

## Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AdrianMaina/my-duka-frontend.git

2. Navigate to the project directory:
   ```sh
   cd myduka-frontend

3. Install NPM packages:
   ```sh
   npm install


### Environment Variables
Before running the application, you need to create an environment file to tell the frontend where to find the backend API.

In the root of the project, create a file named .env.

Add the following line, pointing to your local backend server:


VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
Running Locally
- Start the development server:
  ```sh
  npm run dev

The application will be available at http://localhost:5173.


### Project Structure
The src/ directory is organized by feature and function:

api/: Contains the configured Axios instance for making API calls.

app/: Contains the main Redux store configuration.

components/: Contains reusable UI components, organized by feature (e.g., layout, inventory, ui).

features/: Contains all Redux Toolkit "slices" that manage the application's state.

pages/: Contains the main page components, organized by user role (e.g., merchant, admin, clerk, public).

### Deployment to Vercel
This application is configured for easy deployment to Vercel.

Push to GitHub: Ensure your latest code is pushed to a GitHub repository.

Import Project on Vercel: Connect your GitHub repository to a new Vercel project. Vercel will automatically detect that it is a Vite project and use the correct build settings.

Set Environment Variable: In your Vercel project's settings, go to "Environment Variables" and add the following:

Key: VITE_API_BASE_URL

Value: The full URL to your live backend API (e.g., https://myduka-backend.onrender.com/api/v1).

Add vercel.json: To ensure Vercel handles client-side routing correctly, add a vercel.json file to the root of your project with the following content:

json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
Deploy: Vercel will automatically build and deploy your site upon every push to your main branch.

### Key Features
# Merchant (Owner)
Manage multiple stores.

Invite, deactivate, and delete Admin and Clerk accounts.

View detailed sales and financial reports per store.

Manage supplier payments and view M-Pesa transaction logs.

# Admin (Manager)
Manage the master inventory for a specific store (add, edit, delete products).

Approve or decline supply requests from Clerks.

View operational dashboards with spoilage and stock trends.

Invite new Clerks to their store.

# Clerk (Shopkeeper)
Record sales using a simple POS-style interface, which automatically updates inventory.

Log incoming stock deliveries from suppliers.

Request new stock when items are running low.

Log spoiled or damaged items.

# Backend Repository
https://github.com/AdrianMaina/my-duka-backend.
