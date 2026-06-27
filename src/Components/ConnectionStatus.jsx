<<<<<<< HEAD
=======
import React, { useState, useEffect } from "react";

/**
 * ConnectionStatus Component
 * Debug component to verify backend-frontend connection.
 * Only renders in development mode (import.meta.env.DEV).
 */
export const ConnectionStatus = () => {
  const [status, setStatus] = useState({
    backend: "checking",
    database: "checking",
  });

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const checkConnection = async () => {
      try {
        const response = await fetch("/api/health");
<<<<<<< HEAD
        let healthResponse;
        try {
          healthResponse = await response.json();
        } catch (parseError) {
          console.error("Failed to parse health check response:", parseError);
          setStatus((prev) => ({
            ...prev,
            backend: "error",
            database: "error",
          }));
          return;
        }

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
=======
        const data = await response.json();
        setStatus({
          backend: data.success ? "connected" : "error",
          database: data.success ? "connected" : "error",
        });
      } catch {
        setStatus({ backend: "disconnected", database: "disconnected" });
>>>>>>> origin/devin/1782546719-security-fixes
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  // Only render in development
  if (!import.meta.env.DEV) return null;

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
      <h3 className="font-semibold text-gray-900 mb-3">Connection Status (Dev)</h3>

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
      </div>
    </div>
  );
};

export default ConnectionStatus;
>>>>>>> origin/devin/1782546707-improve-error-handling
