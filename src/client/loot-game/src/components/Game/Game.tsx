import React, {
  useContext,
  useEffect,
} from "react";
import { useState } from "react";
import { Hand } from "../Hand/Hand";
import { DeckInterface } from "../../../../../model";
import { SocketContext } from "../../SocketContext";
import { GameContainer, Table } from ".";

export const Game: React.FC<{
  setPlayerID: Function;
  setPlayers: Function;
}> = ({ setPlayerID, setPlayers }) => {
  const [deck, setDeck] = useState<DeckInterface>(
    null as unknown as DeckInterface
  );
  const [dragged, setDragged] = useState<any>();
  const socket = useContext(SocketContext);

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

    const listener = document.addEventListener;

    listener("dragstart", (event: any) => {
      return setDragged(event.target);
    });

    listener("dragover", function (event) {
      return event.preventDefault();
    });
  }, []);

  useEffect(() => {
    document.addEventListener(
      "drop",
      (event: any) => {
        event.preventDefault();
        if (
          event?.target.className.includes(
            "dropzone"
          ) &&
          dragged
        ) {
          dragged.parentNode.removeChild(dragged);
          return event.target.appendChild(
            dragged
          );
        }
      }
    );
  }, [dragged]);

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
