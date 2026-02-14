import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("contacts");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    try {
      setLoading(true);
      const endpoint =
        tab === "contacts"
          ? "/api/contacts"
          : tab === "team"
          ? "/api/team"
          : tab === "gallery"
          ? "/api/gallery"
          : "/api/about";

      const response = await fetch(`http://localhost:5000${endpoint}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const endpoint =
          activeTab === "contacts"
            ? `/api/contacts/${id}`
            : activeTab === "team"
            ? `/api/team/${id}`
            : activeTab === "gallery"
            ? `/api/gallery/${id}`
            : `/api/about/${id}`;

        const response = await fetch(`http://localhost:5000${endpoint}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchData(activeTab);
          alert("Item deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const tabs = [
    { id: "contacts", label: "Contacts" },
    { id: "team", label: "Team Members" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
               
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    {activeTab === "contacts" && (
                      <>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Subject</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </>
                    )}
                    {activeTab === "team" && (
                      <>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Position</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </>
                    )}
                    {activeTab === "gallery" && (
                      <>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </>
                    )}
                    {activeTab === "about" && (
                      <>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-500">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    data.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        {activeTab === "contacts" && (
                          <>
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.email}</td>
                            <td className="py-3 px-4">{item.subject}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  item.status === "new"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : item.status === "read"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                        {activeTab === "team" && (
                          <>
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4">{item.position}</td>
                            <td className="py-3 px-4">{item.email || "N/A"}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                        {activeTab === "gallery" && (
                          <>
                            <td className="py-3 px-4">{item.title}</td>
                            <td className="py-3 px-4">{item.category}</td>
                            <td className="py-3 px-4">
                              {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                        {activeTab === "about" && (
                          <>
                            <td className="py-3 px-4">{item.title}</td>
                            <td className="py-3 px-4 truncate">
                              {item.description}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
