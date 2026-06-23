import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Opportunities";
import CreateOpportunity from "./pages/CreateOpportunity";
import Opportunities from "./pages/Opportunities";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditOpportunity from "./pages/EditOpportunity";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-opportunity"
          element={
            <ProtectedRoute>
              <CreateOpportunity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/opportunities"
          element={
            <ProtectedRoute>
              <Opportunities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-opportunity/:id"
          element={
            <ProtectedRoute>
              <EditOpportunity />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
