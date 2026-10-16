import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
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
          <header className="top-nav">
            <Link to="/" className="brand" aria-label="Home">
              <span className="brand-mark">B</span>
              <span className="brand-text">BiteBloom</span>
            </Link>

            <nav className="nav-links" aria-label="Main navigation">
              <Link to="/">Home</Link>
              <Link to="/recipes">Recipes</Link>
            </nav>
          </header>

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
