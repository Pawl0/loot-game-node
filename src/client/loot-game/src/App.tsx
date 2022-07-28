import { useEffect, useState } from "react";
import Game from "./components/Game";

function App() {
  const [playerID, setPlayerID] = useState("");
  const [play, setPlay] = useState(false);
  const [players, setPlayers] = useState<
    { playerId: string }[]
  >([]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Player {playerID}</h1>
        <div>
          <h2>Players connected</h2>
          <ul>
            {players.map((player) => (
              <li>{player.playerId}</li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
      {!play && (
        <button onClick={() => setPlay(true)}>
          PLAY
        </button>
      )}
      {play && (
        <Game
          setPlayerID={setPlayerID}
          setPlayers={setPlayers}
        />
      )}
    </div>
  );
}

export default App;
