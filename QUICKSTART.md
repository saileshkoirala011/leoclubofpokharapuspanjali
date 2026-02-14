# 🚀 Quick Start Guide

        ## One-Click Setup

        ### Step 1: Navigate to Project
        ```bash
        cd c:\Users\saile\Project\my-app
    ```

    ### Step 2: Install Dependencies
    ```bash
    npm install
    cd backend && npm install && cd ..
    ```

    ### Step 3: Configure MongoDB
    Edit `.env` file in root directory:
    ```
    MONGODB_URI=mongodb://localhost:27017/myapp
    ```

    ### Step 4: Start Services

    **Terminal 1 - Backend:**
    ```bash
    cd backend
    npm run dev
    ```
    ✅ Server running on http://localhost:5000

    **Terminal 2 - Frontend:**
    ```bash
    npm run dev
    ```
    ✅ App running on http://localhost:5173

    ## 📍 Access Points

    | Service | URL | Purpose |
    |---------|-----|---------|
    | Frontend | http://localhost:5173 | Main web app |
    | Backend API | http://localhost:5000 | API server |
    | Admin Dashboard | http://localhost:5173/admin | Manage content |
    | Health Check | http://localhost:5000/health | API status |

    ## 🎯 Key Features

    ✅ **Contact Form** - Saves to MongoDB  
    ✅ **Team Management** - Display and manage team  
    ✅ **Gallery** - Photo showcase with filtering  
    ✅ **About Page** - Dynamic content  
    ✅ **Admin Panel** - Manage all data  
    ✅ **Responsive Design** - Works on all devices  
    ✅ **MongoDB Integration** - All data persisted  
    ✅ **Cookies & Sessions** - User tracking  

    ## 📝 Common Tasks

    ### View All Contacts (Admin)
    1. Go to http://localhost:5173/admin
    2. Click "Contacts" tab
    3. View all submitted contact forms

    ### Add Team Member (via API)
    ```bash
    curl -X POST http://localhost:5000/api/team \
    -H "Content-Type: application/json" \
    -d '{"name":"John","position":"President"}'
    ```

    ### Upload Gallery Photo
    1. Go to http://localhost:5173/admin
    2. Click "Gallery" tab
    3. Use API to add images

    ### Submit Contact Form
    1. Go to http://localhost:5173/Contact
    2. Fill form and submit
    3. Check admin panel to see it saved

    ## 🔧 Troubleshooting

    | Problem | Solution |
    |---------|----------|
    | "Connection refused" | Start MongoDB: `mongod` |
    | "Cannot find module" | Run: `npm install` |
    | Port already in use | Change PORT in .env |
    | CORS errors | Check FRONTEND_URL in .env |

    ## 📱 Page Walkthrough

    ### Home (/)
    - Hero section with organization intro
    - Features and highlights
    - Team preview
    - Call to action

    ### About (/Abouts)
    - Organization information
    - Mission statement
    - Vision statement
    - Community service details

    ### Team (/Team)
    - All team members with photos
    - Positions and contact info
    - Social media links
    - Fetched from MongoDB

    ### Contact (/Contact)
    - Contact form
    - Sends data to MongoDB
    - Success/error messages
    - Address and contact details

    ### Gallery (/Gallery)
    - Photo showcase
    - Filter by category (event, workshop, etc.)
    - Hover effects
    - Date sorting

    ### Admin (/admin)
    - View all contacts
    - View all team members
    - View gallery
    - View about content
    - Delete items
    - Manage data

    ## 🎓 Learning Path

    1. **Understand Structure** - Read PROJECT_GUIDE.md
    2. **Check Components** - Review React components in src/
    3. **Test APIs** - Use curl or Postman
    4. **Modify Content** - Use admin dashboard
    5. **Extend Features** - Add new routes and components

    ## 💡 Pro Tips

    - Use Browser DevTools → Network to debug API calls
    - Check Terminal for backend error messages
    - Use Admin Dashboard to verify data is saved
    - Fallback data ensures app works without API
    - All routes support CORS for future integrations

    ## 🚨 Important Notes

    - MongoDB must be running for data persistence
    - Admin dashboard doesn't require login yet
    - Default images used if no images uploaded
    - Cookie-based sessions track user activity
    - Environment variables are loaded from .env

    ## 📞 Support

    Check PROJECT_GUIDE.md for:
    - Complete API documentation
    - Database schemas
    - Component details
    - Configuration options

    ---

    Happy Coding! 🎉
