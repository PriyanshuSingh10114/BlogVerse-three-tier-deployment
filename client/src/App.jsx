import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          {/* Add other routes here later */}
          <Route path="*" element={<div className="text-center pt-32 text-2xl font-bold">404 - Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
