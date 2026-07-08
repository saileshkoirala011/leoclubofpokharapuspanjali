import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

// Pages / Sections
import Navbar from "./Page/Navbar";
import Footer from "./Page/Footer";

import Hero from "./Page/Hero";
import Who from "./Page/Who";
import Worker from "./Page/Work";
import Ourteam from "./Page/Team";
import Leader from "./Page/Leader";

// Route Components
import Team from "./Components/Teams";
import Abouts from "./Components/Abouts";
import Contact from "./Components/Contact";
import Gallery from "./Components/Gallery";

// Vercel Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/react";



const Home = () => {
  return (
    <>
      <Hero />
      <Who />
      <Worker />
      <Ourteam />
      <Leader />
    </>
  );
};


// ================= APP =================
function App() {
  return (
    <div className="App">

      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Abouts />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

    </div>
  );
}

export default App;