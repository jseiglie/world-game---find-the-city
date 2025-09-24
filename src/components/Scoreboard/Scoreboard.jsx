import "./Scoreboard.css"
const Scoreboard = ({ kml, placedMarkers, correct }) => {
  return (
    <section className="scoreboard-wrapper">
      <div>
        <p className="score">{kml}km left</p>
      </div>
      <div className="scoreboard">
      <div>
        <p className="score">Markers:</p>
        <p className="score" style={{fontSize: "24px", fontWeight: "bold"}}>{placedMarkers}</p>
      </div>
      <div>
        <p className="score">Correct:</p>
        <p className="score" style={{fontSize: "24px", fontWeight: "bold"}}>{correct}</p>
      </div>
      </div>
    </section>
  )
}
export default Scoreboard