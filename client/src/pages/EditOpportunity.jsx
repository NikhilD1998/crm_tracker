import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import OpportunityForm from "../components/OpportunityForm";

const EditOpportunity = () => {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);

  useEffect(() => {
    fetchOpportunity();
  }, []);

  const fetchOpportunity = async () => {
    try {
      const { data } = await api.get(`/opportunities/${id}`);

      setOpportunity(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!opportunity) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          {/* Header */}
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>

              <div className="h-32 bg-gray-200 rounded-xl"></div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>

              <div className="h-32 bg-gray-200 rounded-xl"></div>

              <div className="flex justify-end gap-3">
                <div className="h-12 w-28 bg-gray-200 rounded-xl"></div>
                <div className="h-12 w-40 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <OpportunityForm
        initialData={opportunity}
        isEdit={true}
        opportunityId={id}
      />
    </div>
  );
};

export default EditOpportunity;
