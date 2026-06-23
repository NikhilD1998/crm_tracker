import { useAuth } from "../context/AuthContext";
import { useOpportunities } from "../context/OpportunityContext";

const Dashboard = () => {
  const { user } = useAuth();

  const { opportunities } = useOpportunities();

  const myOpportunities = opportunities.filter(
    (opportunity) =>
      opportunity.owner?._id === user?.id || opportunity.owner === user?.id,
  );
  const totalPipelineValue = myOpportunities.reduce(
    (sum, opportunity) => sum + (opportunity.estimatedValue || 0),
    0,
  );

  const wonValue = opportunities
    .filter((opportunity) => opportunity.stage === "Won")
    .reduce((sum, opportunity) => sum + (opportunity.estimatedValue || 0), 0);

  const highPriorityCount = opportunities.filter(
    (opportunity) => opportunity.priority === "High",
  ).length;

  const totalOpportunities = opportunities.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Track your sales pipeline and opportunities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Opportunities</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {totalOpportunities}
              </h2>
            </div>

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              📊
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pipeline Value</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                ₹{totalPipelineValue.toLocaleString()}
              </h2>
            </div>

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              💰
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Won Value</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                ₹{wonValue.toLocaleString()}
              </h2>
            </div>

            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              🎯
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">High Priority</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {highPriorityCount}
              </h2>
            </div>

            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              🔥
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Pipeline Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <span className="text-gray-600">Total Deals</span>
            <span className="font-bold">{totalOpportunities}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <span className="text-green-700">Won Deals</span>
            <span className="font-bold text-green-700">
              {opportunities.filter((o) => o.stage === "Won").length}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
            <span className="text-red-700">Lost Deals</span>
            <span className="font-bold text-red-700">
              {opportunities.filter((o) => o.stage === "Lost").length}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <span className="text-blue-700">Active Deals</span>
            <span className="font-bold text-blue-700">
              {
                opportunities.filter((o) => !["Won", "Lost"].includes(o.stage))
                  .length
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
