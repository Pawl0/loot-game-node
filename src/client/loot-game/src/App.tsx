import { useState } from 'react';
import Game from './components/Game'

function App() {
  const [playerID, setPlayerID] = useState("")
  const [play, setPlay] = useState(false)
 

  return (
    <div>
      <h1>Player {playerID}</h1>
      <hr />
      {!play && <button onClick={() => setPlay(true)}>PLAY</button>}
      {play && <Game setPlayerID={setPlayerID} />}
    </div>
  );
}

export default App;
