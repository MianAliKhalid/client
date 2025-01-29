# Modern Web Application

A full-featured web application built with React, featuring user authentication, admin dashboard, file management, and service handling.

## 🚀 Features

- **User Authentication**
  - Register & Login functionality
  - Profile management with avatar upload
  - Password update capabilities
  - JWT-based authentication

- **Admin Dashboard**
  - User management
  - Service management
  - Contact form responses
  - Query approval system

- **File Management**
  - File upload functionality
  - Status tracking (Approved/Pending)
  - Image preview and download
  - Secure file handling

- **Service Management**
  - Service listing
  - Service details view
  - Admin service CRUD operations
  - Price and provider management

## 🛠️ Tech Stack

- React.js
- Tailwind CSS
- React Router Dom
- React Icons
- React Toastify
- Vite

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Layouts/
│   │   │   ├── Pages/         # Admin dashboard pages
│   │   │   └── components/    # Reusable admin components
│   │   └── Navbar.jsx         # Main navigation
│   ├── pages/                 # Main application pages
│   ├── store/                 # Auth context and state management
│   └── json/                  # Static configuration files
└── public/                    # Static assets
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   VITE_BASE_URL=your_backend_url
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

- `VITE_BASE_URL`: Backend API URL

## 🔑 Authentication

The application uses JWT tokens for authentication. Tokens are stored in LocalStorage and managed through the Auth context.

## 👥 User Roles

- **Regular Users**
  - Can view services
  - Upload files
  - Update profile
  - Contact support

- **Administrators**
  - Full CRUD operations
  - User management
  - Query approval
  - Service management

## 🎨 Styling

The application uses Tailwind CSS for styling with a dark theme option and modern UI components.

## ⚙️ API Integration

All API calls are made to the backend specified in the `VITE_BASE_URL` environment variable.

## 🔄 State Management

- Uses React Context API for auth state
- Local state management with useState
- Form handling with controlled components

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request