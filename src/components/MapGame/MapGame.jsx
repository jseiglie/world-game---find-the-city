import { useState, useEffect } from "react";
import {
  MapContainer,
  GeoJSON,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapGame.css";
import data from "../../assets/data/capitalCities.json";
import worldGeoJSON from "../../assets/data/countries.geo.json";
import Modal from "../Modal/Modal";
import Scoreboard from "../Scoreboard/Scoreboard";
import Settings from "../Settings/Settings";
import HighScores from "../HighScores/HighScores";
import CountryLabels from "../CountryLabels/CountryLabels";

// Fix for Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}

const MapGame = () => {
  const capitalCities = data.capitalCities;
  const [currentCity, setCurrentCity] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [kml, setKml] = useState(1500);
  const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [placedMarkers, setPlacedMarkers] = useState(0);
  const [modalContent, setModalContent] = useState({ msg: "", icon: "" });
  const [correct, setCorrect] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    online: false,
    username: "localPlayer",
    hard: true,
  });
  const [showScores, setShowScores] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [localScores, setLocalScores] = useState(
    localStorage.getItem("highScores")
      ? JSON.parse(localStorage.getItem("highScores"))
      : []
  );

  const pickRandomCity = () =>
    setCurrentCity(
      capitalCities[Math.floor(Math.random() * capitalCities.length)]
    );

  const MapClickHandler = ({ onClick }) => {
    useMapEvents({
      click(e) {
        onClick(e.latlng);
      },
    });
    return null;
  };

  const newCity = () => {
    let newcity = pickRandomCity();
    if (newcity === currentCity) {
      newCity();
    }
    return newcity;
  };

  const checkAmountOfScores = (arr, newScore) => {
    let aux = [...arr, newScore];
    let sortedScores = aux.sort((a, b) => b.score - a.score);
    return aux.length < 10 ? sortedScores : sortedScores.slice(0, 10);
  };

  const updateHighScore = (newScore) => {
    if (settings.online) {
      setHighScores(checkAmountOfScores(highScores, newScore));
      return;
    }
    let aux = checkAmountOfScores(localScores, newScore);
    setLocalScores(aux);
    localStorage.setItem("highScores", JSON.stringify(aux));
    return;
  };

  const updateScore = (distance) => {
    setPlacedMarkers((prev) => prev + 1);
    let aux = Math.max(0, kml - Math.floor(distance));
    setKml(aux);

    if (distance < 201 && aux > 0) {
      setCorrect((prev) => prev + 1);
      setModalContent({
        msg: `Correct! You were only ${distance.toFixed(1)} km away.`,
        icon: "🎉",
      });
    } else if (aux <= 0) {
      const finalScore = {
        username: settings.username,
        score: correct,
      };
      updateHighScore(finalScore);
      setModalContent({
        msg: "Game Over! Your score reached zero.",
        icon: "💀",
      });
      setGameEnded(true);
    } else {
      setModalContent({
        msg: `Not quite. You were ${distance.toFixed(1)} km away.`,
        icon: "⚠️",
      });
    }
    return setShowModal(true);
  };

  const handleMapClick = (latlng) => {
    if (!currentCity) return;
    setClickedLocation(latlng);
    const distance = getDistance(
      latlng.lat,
      latlng.lng,
      currentCity.lat,
      currentCity.lng
    );

    updateScore(distance);

    return setTimeout(() => {
      newCity();
      setClickedLocation(null);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    return setModalContent({ msg: "", icon: "" });
  };

  const handleRestart = () => {
    setGameEnded(false);
    setKml(1500);
    pickRandomCity();
    setPlacedMarkers(0);
    return handleCloseModal();
  };

  const handleHighScores = () => {
    setShowSettings(false);
    setShowScores(!showScores);
  };

  const handleSettings = () => {
    setShowScores(false);
    setShowSettings(!showSettings);
  };

  const handleResetScores = () => {
    setLocalScores([]);
    localStorage.setItem("highScores", JSON.stringify([]));
  }

  useEffect(() => {
    pickRandomCity();
  }, []);

  return (
    <section className="map-game-wrapper">
        <h1 className="title">
          <span className="icon">🗺️</span>Map Game
          <span className="icon">📌</span>
        </h1>
      <section>
        <Scoreboard kml={kml} placedMarkers={placedMarkers} correct={correct} />
        <p className="target">
          {currentCity ? `Target: ${currentCity.capitalCity}` : "Loading..."}
        </p>
      </section>

      <MapContainer center={[20, 0]} zoom={3} className="map">
        <GeoJSON
          data={worldGeoJSON}
          className="countries"
          style={() => ({
            fillColor: "transparent",
            color: "#4b4b4cff",
            weight: 2,
          })}

        />
          <CountryLabels geojson={worldGeoJSON} hard={settings.hard} />

        {clickedLocation && (
          <Marker position={[clickedLocation.lat, clickedLocation.lng]}>
            <Popup>Your guess for {currentCity.name}</Popup>
          </Marker>
        )}

        {clickedLocation && (
          <Marker
            position={[currentCity.lat, currentCity.lng]}
            icon={icon({
              iconUrl:
                "https://imgs.search.brave.com/StkXB-zacsYf0pNWbL3zKcvlG9O5W7JSg6ivHobKaR0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/OTYwNjI2Mi92ZWN0/b3IvYS1tYXAtcGlu/LWljb24td2l0aC1h/LXRyYW5zcGFyZW50/LWJhY2tncm91bmQt/dmVjdG9yLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1BcjBC/Z3JreEgyTUFrcjR2/NjJCQXB4QTVsajA0/NzVQR0hjWnBXc3VQ/aVpvPQ",
              iconSize: [35, 34],
              iconAnchor: [10, 34],
              popupAnchor: [0, -30],
            })}
          >
            <Popup>{currentCity.name}</Popup>
          </Marker>
        )}

        <MapClickHandler onClick={handleMapClick} />
      </MapContainer>

      {showModal && (
        <Modal
          handleRestart={handleRestart}
          gameEnded={gameEnded}
          msg={modalContent.msg}
          closeModal={handleCloseModal}
          icon={modalContent.icon}
        />
      )}
      <div className="footer">
        <button onClick={handleHighScores} className="my-1">
          🏆 HighScores
        </button>
        <button onClick={handleSettings} className="my-1">
          ⚙️ Settings
        </button>
      </div>
      {showSettings && (
        <Settings
          settings={settings}
          updateSettings={setSettings}
          close={() => setShowSettings(false)}
        />
      )}
      {showScores && (
        <HighScores
          settings={settings}
          scores={settings.online ? highScores : localScores}
          resetScores={handleResetScores}
        />
      )}
      <p>Developed for Digital Cuisine - 2025 @Javier Seiglie</p>
    </section>
  );
};

export default MapGame;
