import { useAuth } from "../context/AuthContext";

const OpportunityCard = ({ opportunity }) => {
  const { user } = useAuth();

  const isOwner =
    user?.id === opportunity.owner?._id || user?.id === opportunity.owner;

  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const stageColor = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-indigo-100 text-indigo-700",
    Qualified: "bg-purple-100 text-purple-700",
    "Proposal Sent": "bg-orange-100 text-orange-700",
    Won: "bg-green-100 text-green-700",
    Lost: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md border p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">{opportunity.customerName}</h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            priorityColor[opportunity.priority]
          }`}
        >
          {opportunity.priority}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{opportunity.requirement}</p>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Contact:</span>{" "}
          {opportunity.contactName}
        </p>

        <p>
          <span className="font-medium">Email:</span> {opportunity.contactEmail}
        </p>

        <p>
          <span className="font-medium">Value:</span> ₹
          {opportunity.estimatedValue?.toLocaleString()}
        </p>

        <p>
          <span className="font-medium">Follow Up:</span>{" "}
          {new Date(opportunity.nextFollowUpDate).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            stageColor[opportunity.stage]
          }`}
        >
          {opportunity.stage}
        </span>

        {opportunity.owner?.name && (
          <span className="text-xs text-gray-500">
            By {opportunity.owner.name}
          </span>
        )}
      </div>

      {opportunity.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
          {opportunity.notes}
        </div>
      )}

      {isOwner && (
        <div className="mt-5 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Edit
          </button>

          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;
