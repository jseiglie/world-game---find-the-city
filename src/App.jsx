import "./App.css";
import MapGame from "./components/MapGame/MapGame";

function App() {
  return (
    <>
      <h1 className="title">
        <span className="icon">🗺️</span>Map Game<span className="icon">📌</span>
      </h1>
      <MapGame />
    </>
  );
}

export default App;