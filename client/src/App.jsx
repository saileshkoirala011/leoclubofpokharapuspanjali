import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar  from "./Page/Navbar";
import Footer  from "./Page/Footer";
import Hero    from "./Page/Hero";
import Who     from "./Page/Who";
import Worker  from "./Page/Work";
import Ourteam from "./Page/Team";
import Leader  from "./Page/Leader";

import Team     from "./Components/Teams";
import Abouts   from "./Components/Abouts";
import Contact  from "./Components/Contact";
import Gallery  from "./Components/Gallery";
import Events   from "./Components/Events";
import NotFound from "./Components/NotFound";

import { SpeedInsights } from "@vercel/speed-insights/react";

// Home renders Hero full-screen (Hero uses -mt-[72px] to go behind navbar)
// All other pages need top padding to clear the fixed navbar
const Home = () => (
  <>
    <Hero />
    <Who />
    <Worker />
    <Ourteam />
    <Leader />
  </>
);

function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* 
        Home: no top padding — Hero is full-screen and handles its own offset
        Other pages: pt-[72px] to clear the fixed navbar height
      */}
      <main
        key={pathname}
        className={`page-enter flex-1 ${isHome ? "" : "pt-[72px]"}`}
      >
        <Routes>
          <Route path="/"        element={<Home />}    />
          <Route path="/about"   element={<Abouts />}  />
          <Route path="/team"    element={<Team />}    />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events"  element={<Events />}  />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
