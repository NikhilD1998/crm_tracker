import { Link, Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>

            <div>
              <h1 className="font-bold text-lg text-gray-900">CRM Pipeline</h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Sales Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab("opportunities")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === "opportunities"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Opportunities
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
