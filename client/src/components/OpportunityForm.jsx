import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const OpportunityForm = ({
  initialData = {},
  isEdit = false,
  opportunityId,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: initialData.customerName || "",
    contactName: initialData.contactName || "",
    contactEmail: initialData.contactEmail || "",
    contactPhone: initialData.contactPhone || "",
    requirement: initialData.requirement || "",
    estimatedValue: initialData.estimatedValue || "",
    stage: initialData.stage || "New",
    priority: initialData.priority || "Medium",
    nextFollowUpDate: initialData.nextFollowUpDate?.split("T")[0] || "",
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await api.put(`/opportunities/${opportunityId}`, formData);
      } else {
        await api.post("/opportunities", formData);
      }

      navigate("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? "Edit Opportunity" : "Create Opportunity"}
        </h1>
        <p className="text-gray-500 mt-1">
          Manage customer opportunities and sales pipeline.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8"
      >
        {/* Customer Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Customer Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>

              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="ABC Technologies"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>

              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>

              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Opportunity Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Opportunity Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirement Summary *
              </label>

              <textarea
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Describe the customer's requirement..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Deal Value
              </label>

              <input
                type="number"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleChange}
                placeholder="500000"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pipeline Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Pipeline Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage
              </label>

              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Follow-Up
              </label>

              <input
                type="date"
                name="nextFollowUpDate"
                value={formData.nextFollowUpDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="5"
            placeholder="Additional notes, meeting outcomes, customer feedback..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Opportunity"
                : "Create Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpportunityForm;
