import React, { useMemo } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import {Card} from './Card'
import styled from "styled-components";
import Slide from 'react-reveal/Slide';

const GameContainer = styled.div`
  margin: 32px;
`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`

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
    <GameContainer>
      <button onClick={buildDeck}>Build Deck</button>
      <h1>Owner ID: {deck.owner}</h1>
      <CardsContainer>
        {deck.cards &&
          deck.cards.map((card: {type: string, attributes: any}, index) => (
          <Slide top>
              <Card key={index} type={card.type} attributes={card.attributes} />
          </Slide>
          ))}
      </CardsContainer>
      <hr />
      {/* <input placeholder="amount of coins" value={coins} onChange={setAmountOfCoins} type="number" />
      <button onClick={buildMerchantShip}>Build Merchant Ship</button> 
      <button onClick={clearMerchantShips}>Clear Merchant Ships</button>
      <h1>Owner ID: {merchantShips.owner}</h1>
      <CardsContainer>
        {merchantShips.cards &&
          merchantShips.cards.map((card: {type: string, attributes: any}, index) => (
              <Card key={index} type={card.type} attributes={card.attributes} delay={index}/>
            )
          )
        }
        </CardsContainer> */}
    </GameContainer>
  );
};

export default React.memo(Game);
