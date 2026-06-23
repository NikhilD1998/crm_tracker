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

  if (!opportunity) return <div>Loading...</div>;

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
