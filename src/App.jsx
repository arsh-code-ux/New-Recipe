import './App.css'
import Mainpage from './components/Mainpage.jsx';

function App() {
    return (
      <div className="app-shell">
        <video className="app-background-video" autoPlay muted loop playsInline>
          <source src="/food.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="app-overlay" />
        <div className="app-frame">
          <Mainpage />
        </div>
      </div>
  );
}
export default App;
