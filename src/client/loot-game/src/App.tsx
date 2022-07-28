import { useState } from "react";
import { Game } from "./components/Game";
import { Container, Header } from "./styles";

function App() {
  const [playerID, setPlayerID] = useState("");
  const [play, setPlay] = useState(false);
  const [players, setPlayers] = useState<{ playerId: string }[]>([]);

  return (
    <Container>
      <Header>
        <h1>Player {playerID}</h1>
        {play && (
          <div>
            <h2>Players connected</h2>
            <ul>
              {players.map((player) => (
                <li>{player.playerId}</li>
              ))}
            </ul>
          </div>
        )}
      </Header>
      <hr />
      {!play && <button onClick={() => setPlay(true)}>PLAY</button>}
      {play && <Game setPlayerID={setPlayerID} setPlayers={setPlayers} />}
    </Container>
  );
}

export default App;
