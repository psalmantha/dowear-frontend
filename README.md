# dowear: a buy and sell app

## Overview
This repository contains the frontend implementation of dowear. The frontend is built using React and communicates with the backend API to support product listings, seller ratings, shopping cart functionality, and checkout processes.

## Features
- User Authentication & Authorization (Login, Sign-Up, Protected Routes)
- Product Listing (Grid/List view, Pagination, Sorting)
- Search & Filter Products (By category, tags, price, etc.)
- Product Detail Page (Including variations, ratings, reviews)
- Shopping Cart Management (Add, update, remove items)
- Checkout Process (Display summary, input shipping info)
- Recently Viewed Items (Track via local/session storage)
- Related Product Recommendations (Based on categories/tags)
- Seller Ratings (Display and submit reviews)
- New & Featured Products Sections (Display on homepage)
- Responsive Design (Mobile-first using Tailwind CSS)
- Product Images Upload & Display (Upload images during product creation and display image per product)
- Categorized Products (Display and filter by category)

## Technologies Used
- *Vite + React*
- *React Router*
- *Axios* (for API requests)
- *Tailwind CSS*

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js [Download here](https://nodejs.org/en/download/prebuilt-installer)

### Installation
1. Clone this repository:
```bash
   git clone https://github.com/psalmantha/dowear-frontend.git`
```
3. Navigate to the project directory:
```bash
   cd dowear-frontend
```
4. Install dependencies:
```bash 
   npm install
```
5. Configure the .env file with the backend API URL:
```bash 
env
   VITE_API_URL = http://localhost:3000/api
```  
5. Start the development server:
```bash 
   npm run dev
```  
   The application will run at http://localhost:3000.

### Connecting to Backend
Ensure the backend server is running at http://localhost:3000 (or the specified API URL in .env) for the frontend to function correctly.

## Related Repository
This project is paired with the backend implementation built with Node.js, Express, and Sequelize. Find the backend repository here: [dowear backend](https://github.com/msbasilisco/dowear-backend.git)

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any features, fixes, or enhancements.

## This project is created by
- Basilisco, Farah Jane
- Bonachita, Clybel Djen
- Ipong, Psalmantha Allaine
