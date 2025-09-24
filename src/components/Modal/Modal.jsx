import "./Modal.css";
const Modal = ({ handleRestart, gameEnded, msg, closeModal, icon }) => {
  if (!gameEnded) {
    setTimeout(() => {
      closeModal();
    }, 3000);
  }
  return (
    <div className="modal">
    
      <p>{icon}</p>
      <div className={`modal-body ${gameEnded ? "red" : "black"}`}>{msg}</div>
      {gameEnded ? (
        <button className="btn restart" onClick={handleRestart}>
          ✨ Play again
        </button>
      ) : (
        <button className="btn close" onClick={closeModal}>
          🎮 Go
        </button>
      )}
    </div>
  );
};

export default Modal;