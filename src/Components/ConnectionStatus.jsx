import React, { useState, useEffect } from "react";
import { api } from "../services/api";

/**
 * ConnectionStatus Component
 * Debug component to verify backend-frontend connection
 * Remove from production
 */
export const ConnectionStatus = () => {
  const [status, setStatus] = useState({
    backend: "checking",
    database: "checking",
    apiUrl: "/api",
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check backend health
        const healthResponse = await api.health.check();
        
        setStatus((prev) => ({
          ...prev,
          backend: healthResponse.success ? "connected" : "error",
          database: healthResponse.success ? "connected" : "error",
        }));
      } catch (error) {
        setStatus((prev) => ({
          ...prev,
          backend: "disconnected",
          database: "disconnected",
        }));
        console.error("Connection check failed:", error);
      }
    };

    checkConnection();
    // Check every 10 seconds
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "checking":
        return "bg-yellow-100 text-yellow-800";
      case "error":
      case "disconnected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 text-sm z-50 max-w-xs">
      <h3 className="font-semibold text-gray-900 mb-3">Connection Status</h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Backend:</span>
          <span className={`px-2 py-1 rounded ${getStatusColor(status.backend)}`}>
            {status.backend}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Database:</span>
          <span className={`px-2 py-1 rounded ${getStatusColor(status.database)}`}>
            {status.database}
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
          API Base: {status.apiUrl}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Updating every 10s...
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;
