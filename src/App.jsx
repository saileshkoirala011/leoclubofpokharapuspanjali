import React from "react";
import './App.css';
import Navbar from "./Page/Navbar";
import Hero from "./Page/Hero";
import Who from "./Page/Who";
import Worker from "./Page/Work";
import Ourteam from "./Page/Team";
import Leader from "./Page/Leader";
import Footer from "./Page/Footer";
import Team from "./Components/Teams";
import Abouts from "./Components/Abouts";
import Contact from "./Components/Contact";
import Gallery from "./Components/Gallery";
import AdminDashboard from "./Components/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Hero />
      <Who />
      <Worker />
      <Ourteam />
      <Leader />
     
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Abouts" element={<Abouts />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
