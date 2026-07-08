import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-5">
    <div className="text-center max-w-md">
      <div className="text-[120px] font-extrabold text-blue-100 leading-none select-none">404</div>
      <h1 className="text-2xl font-bold text-gray-900 -mt-4 mb-3">Page Not Found</h1>
      <p className="text-gray-500 text-sm mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition-all active:scale-95 shadow-md text-sm"
      >
        ← Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
