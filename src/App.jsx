import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import Home from "@/pages/Home";
import ProjectsPage from "@/pages/ProjectsPage";
import SkillsPage from "@/pages/SkillsPage";
import AchievementsPage from "@/pages/AchievementsPage";
import ContactPage from "@/pages/ContactPage";
import AdminPage from "@/pages/AdminPage";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
        
        <Analytics />
      </div>
    </Router>
  );
}

export default App;