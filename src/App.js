// Import React Router Functions
import { Routes, Route } from "react-router-dom";

// Styling
import "./App.css";

// Import Libraries
import { motion } from "framer-motion";

// Import Auth Provider

// Import Components
import { NavBar } from "./Components/NavBar/NavBar.js";

// Import Pages
import { LandingPage } from "./Pages/LandingPage.js";
import { LoginPage } from "./Pages/LoginPage.js";
import { SearchPage } from "./Pages/SearchPage.js";
import { ProfilePage } from "./Pages/ProfilePage.js";
import { JamChatroom } from "./Pages/JamChatroom.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage motion={motion} />} />
        <Route path="login" element={<LoginPage motion={motion} />} />
        <Route path="search" element={<SearchPage motion={motion} />} />

        <Route path="userprofile" element={<ProfilePage motion={motion} />} />
        <Route path="jamchatroom" element={<JamChatroom motion={motion} />} />
      </Routes>
    </>
  );
}

export default App;
