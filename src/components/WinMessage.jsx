
const WinMessage = ({moves}) => {
  return (
    <div className="win-message">
      <h2>Congratulations!</h2>
      <p>You completed the game in {moves} mvoes!</p>
    </div>
  )
}

export default WinMessage