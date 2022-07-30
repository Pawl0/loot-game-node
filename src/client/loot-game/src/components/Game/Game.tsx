import React, {
  useContext,
  useEffect,
} from "react";
import { useState } from "react";
import { Hand } from "../Hand/Hand";
import { DeckInterface } from "../../../../../model";
import { SocketContext } from "../../SocketContext";
import { GameContainer, Table } from ".";
import { useDragNDrop } from "./useDragNDrop";

export const Game: React.FC<{
  setPlayerID: Function;
  setPlayers: Function;
}> = ({ setPlayerID, setPlayers }) => {
  const [deck, setDeck] = useState<DeckInterface>(
    null as unknown as DeckInterface
  );
  const socket = useContext(SocketContext);
  const {dragged} = useDragNDrop({})

  useEffect(() => {
    setPlayerID(socket.getSocketId());
  }, [socket.getSocketId()]);

  useEffect(() => {
    socket.getClients().then((clients) => {
      setPlayers(clients);
    });
  }, [socket.getClients()]);

  socket.onDeckBuilt(
    ({ owner, deck: initialDeck }) => {
      setDeck(initialDeck);
    }
  );

  useEffect(() => {
    socket.buildDeck();
  }, [])

  useEffect(() => {
    console.log({dragged})
  }, [dragged])

  return (
    <GameContainer>
      <Table
        id="table"
        draggable="true"
        className="dropzone"
      />
      {deck && <Hand />}
    </GameContainer>
  );
};
