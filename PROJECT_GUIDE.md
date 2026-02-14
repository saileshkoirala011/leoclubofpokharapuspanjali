# LEO Club Pokhara Puspanjali - Complete Project Setup

    ## 📋 Project Overview

    This is a full-stack web application for LEO Club Pokhara Puspanjali built with:
    - **Frontend**: React + Vite + Tailwind CSS
    - **Backend**: Express.js + MongoDB + Cookie Parser
    - **Database**: MongoDB for storing contacts, team members, gallery, and about information

    ## 🏗️ Project Structure

    ```
    my-app/
    ├── frontend (React Vite App)
    │   ├── src/
    │   │   ├── Components/
    │   │   │   ├── Abouts.jsx          (About page with MongoDB integration)
    │   │   │   ├── Contact.jsx         (Contact form → MongoDB)
    │   │   │   ├── Gallery.jsx         (Gallery with filtering)
    │   │   │   ├── Teams.jsx           (Team members display)
    │   │   │   └── AdminDashboard.jsx  (Admin panel)
    │   │   ├── Page/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Hero.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   └── ...other pages
    │   │   ├── App.jsx                 (Main app with routes)
    │   │   └── main.jsx
    │   └── package.json
    │
    ├── backend (Express API)
    │   ├── config/
    │   │   ├── database.js             (MongoDB connection)
    │   │   ├── env.js                  (Environment variables)
    │   │   └── cookies.js              (Cookie configuration)
    │   ├── models/
    │   │   ├── Contact.js              (Contact schema)
    │   │   ├── Team.js                 (Team member schema)
    │   │   ├── Gallery.js              (Gallery item schema)
    │   │   └── About.js                (About content schema)
    │   ├── api/
    │   │   ├── routes.js               (All API routes)
    │   │   ├── contactController.js    (Contact CRUD)
    │   │   ├── teamController.js       (Team CRUD)
    │   │   ├── galleryController.js    (Gallery CRUD)
    │   │   └── aboutController.js      (About CRUD)
    │   ├── middleware/
    │   │   └── errorHandler.js         (Error handling)
    │   ├── server.js                   (Main server file)
    │   ├── package.json
    │   └── .env                        (Environment config)
    │
    └── .env                            (Root environment file)
    ```

    ## 🚀 Getting Started

    ### Prerequisites
    - Node.js (v18+)
    - MongoDB (running locally or cloud)
    - npm or yarn

    ### Installation

    1. **Clone/Navigate to project**
    ```bash
    cd my-app
    ```

    2. **Install root dependencies**
    ```bash
    npm install
    ```

    3. **Install backend dependencies**
    ```bash
    cd backend
    npm install
    cd ..
    ```

    ### Configuration

    1. **Configure .env file** (root directory)
    ```env
    PORT=5000
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost:27017/myapp
    JWT_SECRET=your-super-secret-jwt-key-change-in-production
    COOKIE_MAX_AGE=604800000
    FRONTEND_URL=http://localhost:5173
    ```

    2. **Start MongoDB** (if running locally)
    ```bash
    mongod
    ```

    ### Running the Project

    **Terminal 1: Backend Server**
    ```bash
    cd backend
    npm run dev
    # or npm start
    # Server runs on http://localhost:5000
    ```

    **Terminal 2: Frontend Dev Server**
    ```bash
    npm run dev
    # Frontend runs on http://localhost:5173
    ```

    ## 📡 API Endpoints

    ### Base URL
    ```
    http://localhost:5000
    ```

    ### Health Check
    ```
    GET /health
    ```

    ### Contact Management
    ```
    POST   /api/contacts              - Create contact
    GET    /api/contacts              - Get all contacts
    GET    /api/contacts/:id          - Get contact by ID
    PUT    /api/contacts/:id          - Update contact status
    DELETE /api/contacts/:id          - Delete contact
    ```

    **Contact Schema:**
    ```json
    {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string",
    "status": "new|read|replied"
    }
    ```

    ### Team Management
    ```
    POST   /api/team                  - Create team member
    GET    /api/team                  - Get all team members
    GET    /api/team/:id              - Get team member by ID
    PUT    /api/team/:id              - Update team member
    DELETE /api/team/:id              - Delete team member
    ```

    **Team Schema:**
    ```json
    {
    "name": "string",
    "position": "string",
    "image": "string (URL)",
    "bio": "string",
    "email": "string",
    "phone": "string",
    "socialLinks": {
        "facebook": "string",
        "twitter": "string",
        "linkedin": "string",
        "instagram": "string"
    }
    }
    ```

    ### Gallery Management
    ```
    GET    /api/gallery                 - Get all gallery items
    GET    /api/gallery?category=event  - Filter by category
    POST   /api/gallery                 - Create gallery item
    GET    /api/gallery/:id             - Get gallery item by ID
    PUT    /api/gallery/:id             - Update gallery item
    DELETE /api/gallery/:id             - Delete gallery item
    ```

    **Gallery Schema:**
    ```json
    {
    "title": "string",
    "description": "string",
    "image": "string (URL)",
    "category": "event|workshop|competition|meeting|other",
    "date": "date"
    }
    ```

    ### About Management
    ```
    POST   /api/about                  - Create about content
    GET    /api/about                  - Get all about content
    GET    /api/about/:id              - Get about by ID
    PUT    /api/about/:id              - Update about content
    DELETE /api/about/:id              - Delete about content
    ```

    **About Schema:**
    ```json
    {
    "title": "string",
    "description": "string",
    "image": "string (URL)",
    "content": "string",
    "missionStatement": "string",
    "visionStatement": "string"
    }
    ```

    ### Authentication
    ```
    POST   /api/login                  - User login (mock)
    POST   /api/logout                 - User logout
    ```

    ## 🎨 Frontend Pages

    ### Main Routes
    - `/` - Home page with hero, sections, and footer
    - `/Abouts` - About page (fetches from MongoDB)
    - `/Team` - Team members display (fetches from MongoDB)
    - `/Contact` - Contact form submission (saves to MongoDB)
    - `/Gallery` - Photo gallery with category filter
    - `/admin` - Admin dashboard (view and manage all data)

    ## 🔧 Features

    ### ✅ Implemented
    - Full CRUD API for all data types
    - MongoDB integration
    - Cookie-based sessions
    - Contact form submissions
    - Team member management
    - Photo gallery with filtering
    - Admin dashboard
    - Error handling
    - Responsive UI with Tailwind CSS

    ### 🚀 Ready for Enhancement
    - User authentication (JWT tokens)
    - File upload for images
    - Advanced search and filtering
    - Email notifications
    - Analytics dashboard
    - Role-based access control
    - Password reset functionality

    ## 📱 Key Components

    ### Contact.jsx
    - Fetches from `/api/contacts`
    - Real-time form validation
    - Success/error messages
    - Loading states

    ### Teams.jsx
    - Displays team members from MongoDB
    - Fallback to default team if no data
    - Social media links
    - Responsive grid layout

    ### Gallery.jsx
    - Category filtering
    - Lazy loading support
    - Hover effects
    - Date sorting

    ### Abouts.jsx
    - Mission and vision statements
    - Dynamic content from database
    - Fallback default content

    ### AdminDashboard.jsx
    - Manage contacts, team, gallery, and about
    - Delete operations
    - Status tracking
    - Responsive table view

    ## 🛠️ Scripts

    ### Frontend
    ```bash
    npm run dev      - Start development server
    npm run build    - Build for production
    npm run lint     - Run ESLint
    npm run preview  - Preview production build
    ```

    ### Backend
    ```bash
    npm start        - Start server
    npm run dev      - Start with auto-reload (node --watch)
    ```

    ## 💾 Database Models

    ### Contact
    ```javascript
    - name (required)
    - email (required, unique pattern)
    - subject (required)
    - message (required)
    - status (default: 'new')
    - timestamps (createdAt, updatedAt)
    ```

    ### Team
    ```javascript
    - name (required)
    - position (required)
    - image (optional)
    - bio (optional)
    - email (optional)
    - phone (optional)
    - socialLinks (object)
    - timestamps
    ```

    ### Gallery
    ```javascript
    - title (required)
    - description (optional)
    - image (required)
    - category (enum: event, workshop, competition, meeting, other)
    - date (default: now)
    - timestamps
    ```

    ### About
    ```javascript
    - title (required)
    - description (required)
    - image (optional)
    - content (required)
    - missionStatement (optional)
    - visionStatement (optional)
    - timestamps
    ```

    ## 🔐 Environment Variables

    ```env
    PORT                    - Server port (default: 5000)
    NODE_ENV               - development/production
    MONGODB_URI            - MongoDB connection string
    JWT_SECRET             - JWT secret key
    COOKIE_MAX_AGE         - Cookie expiration in ms
    FRONTEND_URL           - Frontend URL for CORS
    ```

    ## 📝 Sample API Requests

    ### Create Contact
    ```bash
    curl -X POST http://localhost:5000/api/contacts \
    -H "Content-Type: application/json" \
    -d '{
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Inquiry",
        "message": "Hello..."
    }'
    ```

    ### Add Team Member
    ```bash
    curl -X POST http://localhost:5000/api/team \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Jane Smith",
        "position": "Vice President",
        "email": "jane@example.com",
        "phone": "+977-xxxx-xxxx"
    }'
    ```

    ### Add Gallery Item
    ```bash
    curl -X POST http://localhost:5000/api/gallery \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Annual Event 2024",
        "description": "Our annual charity event",
        "image": "https://example.com/image.jpg",
        "category": "event"
    }'
    ```

    ## 🐛 Troubleshooting

    ### MongoDB Connection Failed
    - Ensure MongoDB is running
    - Check `MONGODB_URI` in `.env`
    - Try: `mongodb://localhost:27017/myapp`

    ### CORS Errors
    - Check `FRONTEND_URL` in backend `.env`
    - Make sure frontend and backend run on correct ports

    ### API Not Responding
    - Check if backend server is running
    - Verify port 5000 is not in use
    - Check terminal for error messages

    ### Form Not Submitting
    - Verify backend server is running
    - Check network tab in browser dev tools
    - Ensure MongoDB is connected

    ## 📧 Contact & Support

    For LEO Club Pokhara Puspanjali related queries:
    - Email: leoclubpokharapuspanjali@gmail.com
    - Location: Pokhara, Nepal

    ## 📄 License

    This project is created for LEO Club Pokhara Puspanjali

    ---

    **Last Updated**: January 22, 2026
    **Version**: 1.0.0
    **Status**: Fully Functional ✅
