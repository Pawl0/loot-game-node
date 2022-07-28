import { useState } from 'react';
import Game from './components/Game'

function App() {
  const [playerID, setPlayerID] = useState("")
  const [play, setPlay] = useState(false)


  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", margin: 0 }}>
      <h1>Player {playerID}</h1>
      <hr />
      {!play && <button onClick={() => setPlay(true)}>PLAY</button>}
      {play && <Game setPlayerID={setPlayerID} />}
    </div>
  );
}

export default App;
