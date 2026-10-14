import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Mainpage from './components/Mainpage.jsx';
import Mealinfo from './components/Mealinfo.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-glow app-glow--one" />
        <div className="app-glow app-glow--two" />
        <div className="app-frame">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recipes" element={<Mainpage />} />
            <Route path="/recipe/:mealid" element={<Mealinfo />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
