import React, { useMemo } from "react";
import { io } from "socket.io-client";
import { useState } from "react";

const Game: React.FC<{ setPlayerID: Function }> = ({ setPlayerID }) => {
  const [deck, setDeck] = useState({ owner: "", cards: [] });

  const socket = useMemo(() => io(), []);

  const buildDeck = () => {
    console.log("Building deck");
    socket.emit("build-deck", socket.id);
  };

  socket.on("connect", () => {
    const playerId = socket.id;
    setPlayerID(playerId);
    console.log(`Player connected with id: ${playerId}`);
  });

  socket.on("deck-built", (data) => {
    console.log(`Player ${data.owner} built a deck`);
    setDeck({
      owner: data.owner,
      cards: data.deck.cards,
    });
  });

  return (
    <div>
      <button onClick={buildDeck}>Build Deck</button>
      <h1>Owner ID: {deck.owner}</h1>
      <ul>
        {deck.cards &&
          deck.cards.map((card, index) => (
            <li key={index}>{JSON.stringify(card)}</li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(Game);
