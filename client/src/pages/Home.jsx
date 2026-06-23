import { useState } from "react";

import Navbar from "../components/Navbar";
import Dashboard from "./Dashboard";
import Opportunities from "./Opportunities";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "dashboard" && <Dashboard />}

      {activeTab === "opportunities" && <Opportunities />}
    </>
  );
};

export default Home;
