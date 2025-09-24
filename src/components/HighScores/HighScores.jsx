import "./HighScores.css";
const HighScores = ({ scores, settings }) => {
  return (
    <section className="border hs-wrapper">
      <h3>🏆 High Scores</h3>
      <p>{settings.online ? "Online" : "Offline"}</p>
      <p>Top 10 scores:</p>
      <div className="highscores">
        <ol className="hs-list">
          {scores.length > 0 ? (
            scores.map((score, index) => (
              <li key={index}>
                <span className="hs-player">{score.username}</span>
                <span className="hs-score">{score.score}</span>
              </li>
            ))
          ) : (
            <li className="no-scores">No high scores available</li>
          )}
        </ol>
      </div>
    </section>
  );
};

export default HighScores;
