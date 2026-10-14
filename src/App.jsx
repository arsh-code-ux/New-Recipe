import './App.css'
import Mainpage from './components/Mainpage.jsx';

function App() {
  return (
    <div className="app-shell">
      <div className="app-glow app-glow--one" />
      <div className="app-glow app-glow--two" />
      <div className="app-frame">
        <Mainpage />
      </div>
    </div>
  );
}

export default App;
