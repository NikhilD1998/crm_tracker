import { useEffect, useState } from "react";
import api from "../services/api";
import OpportunityCard from "../components/OpportunityCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [stageFilter, setStageFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const stageMatch = !stageFilter || opportunity.stage === stageFilter;

    const priorityMatch =
      !priorityFilter || opportunity.priority === priorityFilter;

    return stageMatch && priorityMatch;
  });

  const fetchOpportunities = async () => {
    try {
      const { data } = await api.get("/opportunities");

      setOpportunities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this opportunity?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/opportunities/${id}`);

      setOpportunities((prev) => prev.filter((opp) => opp._id !== id));
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case "Won":
        return "bg-green-100 text-green-700";
      case "Lost":
        return "bg-red-100 text-red-700";
      case "Qualified":
        return "bg-blue-100 text-blue-700";
      case "Proposal Sent":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-gray-500 mt-1">
            Manage and track your sales pipeline
          </p>
        </div>

        <Link
          to="/create-opportunity"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition text-center"
        >
          + Create Opportunity
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="animate-pulse">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4 px-6 py-4 border-b bg-gray-50">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded w-20" />
              ))}
            </div>

            {/* Table Rows */}
            {[...Array(6)].map((_, row) => (
              <div
                key={row}
                className="grid grid-cols-8 gap-4 px-6 py-5 border-b"
              >
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-8 bg-gray-200 rounded w-24" />
              </div>
            ))}

            {/* Footer Loader */}
            <div className="flex flex-col items-center py-8">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>

              <p className="text-gray-500 font-medium">
                Loading opportunities...
              </p>
            </div>
          </div>
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900">
            No Opportunities Found
          </h3>
          <p className="text-gray-500 mt-2">
            Create your first opportunity to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Company
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Requirement
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Value
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Stage
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Priority
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Follow Up
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Owner
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOpportunities.map((opportunity) => (
                  <tr
                    key={opportunity._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {opportunity.customerName}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {opportunity.requirement}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      ₹{opportunity.estimatedValue?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStageColor(
                          opportunity.stage,
                        )}`}
                      >
                        {opportunity.stage}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                          opportunity.priority,
                        )}`}
                      >
                        {opportunity.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {opportunity.nextFollowUpDate
                        ? new Date(
                            opportunity.nextFollowUpDate,
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {opportunity.owner?.name || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {(opportunity.owner?._id === user?.id ||
                        opportunity.owner === user?.id) && (
                        <div className="flex gap-2">
                          <Link
                            to={`/edit-opportunity/${opportunity._id}`}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm transition"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(opportunity._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
