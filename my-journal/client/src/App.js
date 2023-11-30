import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import Dashboard from './pages/dashboard/Dashboard';
import MyJournals from './pages/my-journals/MyJournals';
import Favorites from "./pages/favorites/Favorites";
import JournalPage from "./pages/journal-page/JournalPage";
import AuthComponent from "./components/auth-screen/authScreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
      <BrowserRouter>
          <div className="App">
            {isAuthenticated ? (
              <>
                <Navbar />
                <Menu />
                <div className='content'>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/my-journals" element={<MyJournals />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/my-journals/:journalId" element={<JournalPage />} />
                  </Routes>
                </div>
              </>
            ) : (
              <AuthComponent setIsAuthenticated={setIsAuthenticated} />
            )}
          </div>
      </BrowserRouter>
  );
}

export default App;
