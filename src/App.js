import './App.css';
import tmdb_logo from './assets/tmdb_logo.svg'
import Main from './Main';

function App() {
  return (
    <div className="App">
      <div class="main-container">
        <Main />
        <div class="logo-container">
          <p>"This product uses the TMDB API but is not endorsed or certified by TMDB."</p>
          <img src={tmdb_logo} id="logo" alt="logo for TMDB" />
        </div>
      </div>

    </div>
  );
}

export default App;
