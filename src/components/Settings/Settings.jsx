import { useEffect, useState } from "react";
import "./Settings.css";
const Settings = ({ settings, updateSettings, close }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setLocalSettings({ ...localSettings, [name]: newValue });
  };

  useEffect(() => {
    if (localSettings.online) {
      alert(
        "Online mode not available."
      );
      setLocalSettings({ ...localSettings, online: false });
    }
  }, [localSettings.online]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localSettings.online) {
      if (!localSettings.username || localSettings.username.trim().length < 3) {
        alert(
          "Username must be at least 3 characters long when online mode is enabled."
        );
        return;
      }
      if (localSettings.username.length > 15) {
        alert("Username cannot exceed 15 characters.");
        return;
      }
      if (/\s/.test(localSettings.username)) {
        alert("Username cannot contain spaces.");
        return;
      }
      if (localSettings.username === "localPlayer") {
        alert("Username cannot be 'localPlayer'.");
        return;
      }
    }
    updateSettings(localSettings);
    close();
  };

  return (
    <section className="border">
      <h3>⚙️ Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-1">
          <label htmlFor="hard">
            Enable Hard Mode:
            <input
              type="checkbox"
              name="hard"
              checked={localSettings.hard}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <p>
          hard mode enabled: disables country names displaying only country borders visible. This is the 
          standard mode for the game.
        </p>
        <p>
          hard mode disabled: displays country names and borders.
        </p>

        <div className="my-1">
          <label htmlFor="online">
            Enable High Score on Server:
            <input
              type="checkbox"
              name="online"
              checked={localSettings.online}
              onChange={handleInputChange}
            />
          </label>
          <p className="">
            {localSettings.online ? (
              <>
                Online mode is <span className="green">enabled</span>.
              </>
            ) : (
              <>
                Online mode is <span className="red">disabled</span>.
              </>
            )}
          </p>
          <div className="my-1">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={localSettings.username}
                onChange={handleInputChange}
                disabled={!localSettings.online}
              />
            </label>
          </div>

          <div className="warning">
            <p>⚠️</p>
            <p>
              Note: Enabling online mode allows your scores to be saved on the
              server and visible to other players. This data could be deleted on
              server updates.
            </p>
          </div>
        </div>

        <input type="submit" value="✅ Save" className="btn save" />
      </form>
    </section>
  );
};

export default Settings;
