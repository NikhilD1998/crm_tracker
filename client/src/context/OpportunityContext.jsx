import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";
import { useAuth } from "./AuthContext";

const OpportunityContext = createContext();

export const OpportunityProvider = ({ children }) => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/opportunities");

      setOpportunities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOpportunities();
    } else {
      setOpportunities([]);
    }
  }, [user]);
  return (
    <OpportunityContext.Provider
      value={{
        opportunities,
        loading,
        fetchOpportunities,
      }}
    >
      {children}
    </OpportunityContext.Provider>
  );
};

export const useOpportunities = () => useContext(OpportunityContext);
