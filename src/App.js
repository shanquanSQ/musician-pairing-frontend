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
import { JamChatroomPage } from "./Pages/JamChatroomPage.js";
import { SignUpPage } from "./Pages/SignUpPage.js";
import { SignUpDetailsPage } from "./Pages/SignUpDetailsPage.js";
import { SingleJamRoomPage } from "./Pages/SingleJamRoomPage.js";
import { SignUpPictureUpload } from "./Pages/SignUpPictureUpload.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage motion={motion} />} />
        <Route path="login" element={<LoginPage motion={motion} />} />
        <Route path="signup" element={<SignUpPage motion={motion} />} />
        <Route
          path="profilepictureupload"
          element={<SignUpPictureUpload motion={motion} />}
        />
        <Route
          path="additionaldetails"
          element={<SignUpDetailsPage motion={motion} />}
        />
        <Route path="search" element={<SearchPage motion={motion} />} />

        <Route path="userprofile" element={<ProfilePage motion={motion} />} />
        <Route
          path="jamchatroom"
          element={<JamChatroomPage motion={motion} />}
        ></Route>

        <Route
          path="/:chatroomId/jamroom"
          element={<SingleJamRoomPage motion={motion} />}
        />
      </Routes>
    </>
  );
}

export default App;
