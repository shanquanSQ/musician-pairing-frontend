// Import React Router Functions
import { Routes, Route } from "react-router-dom";

// Styling
import "./App.css";

// Import Auth Provider

// Import Components
import { NavBar } from "./NavBar/NavBar.js";

// Import Pages
import { HomePage } from "./Pages/HomePage.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
