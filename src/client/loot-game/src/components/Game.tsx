import React, { useMemo } from "react";
import { io } from "socket.io-client";
import { useState } from "react";

const Game: React.FC<{ setPlayerID: Function }> = ({ setPlayerID }) => {
  const [deck, setDeck] = useState({ owner: "", cards: [] });
  const [merchantShips, setMerchantShips] = useState({ owner: "", cards: [] });
  const [coins, setCoins] = useState(0);

  const socket = useMemo(() => io(), []);

  const setAmountOfCoins = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoins(parseInt(event.target.value))
  }

  const buildDeck = () => {
    console.log("Building deck");
    socket.emit("build-deck", socket.id);
  };

  const buildMerchantShip = () => {
    console.log("Building merchant ship")
    socket.emit("build-merchant-ship", {socketID: socket.id, coins})
  }

  const clearMerchantShips = () => {
    console.log("Clearing merchant ships")
    socket.emit("clear-merchant-ships", socket.id)
  }

  socket.on("connect", () => {
    const playerId = socket.id;
    setPlayerID(playerId);
    console.log(`Player connected with id: ${playerId}`);
  });

  socket.on("deck-built", (data) => {
    console.log(`Player ${data.owner} built a deck`);
    console.log("deck cards: ",data.deck.cards)
    setDeck({
      owner: data.owner,
      cards: data.deck.cards,
    });
  });

  socket.on("merchant-ship-built", (data) => {
    console.log(`Player ${data.owner} built a merchant ship`);
    console.log("merchant ship cards: ",data.cards)
    setMerchantShips({
      owner: data.owner,
      cards: data.cards,
    })
  })

  socket.on("merchant-ships-cleared", (data) => {
    console.log(`Player ${data.owner} cleared merchant ships`);
    setMerchantShips({
      owner: data.owner,
      cards: data.cards,
    })
  })

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
      <hr />
      <input placeholder="amount of coins" value={coins} onChange={setAmountOfCoins} type="number" />
      <button onClick={buildMerchantShip}>Build Merchant Ship</button> 
      <button onClick={clearMerchantShips}>Clear Merchant Ships</button>
      <h1>Owner ID: {merchantShips.owner}</h1>
      <ul>
        {merchantShips.cards &&
          merchantShips.cards.map((card, index) => (
            <li key={index}>{JSON.stringify(card)}</li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(Game);
