import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import Dashboard from './pages/dashboard/Dashboard';
import MyJournals from './pages/my-journals/MyJournals';
import Favorites from "./pages/favorites/Favorites";
import JournalPage from "./pages/journal-page/JournalPage";
import { ContextProvider } from "./context";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App">
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
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
