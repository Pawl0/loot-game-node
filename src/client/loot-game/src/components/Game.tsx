import React, { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import { Card } from './Card'
import styled from "styled-components";
// import Slide from 'react-reveal/Slide';
import { Hand } from "./Hand";
import { DeckInterface } from "../../../../model";

const GameContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Table = styled.div`
  width: 90%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, brown, red);
  border-radius: 32px;
  box-shadow: 20px 20px 33px 10px;
`


const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`

const Game: React.FC<{ setPlayerID: Function }> = ({ setPlayerID }) => {
  const [deck, setDeck] = useState<DeckInterface>(null as unknown as DeckInterface);
  const [merchantShips, setMerchantShips] = useState({ owner: "", cards: [] });
  const [coins, setCoins] = useState(0);
  const [dragged, setDragged] = useState<any>()

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
    socket.emit("build-merchant-ship", { socketID: socket.id, coins })
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

  socket.on("deck-built", ({ owner, deck: initialDeck }) => {
    console.log(`Player ${owner} built a deck`);
    console.log("deck cards: ", initialDeck.cards)
    setDeck(initialDeck);
  });

  socket.on("merchant-ship-built", (data) => {
    console.log(`Player ${data.owner} built a merchant ship`);
    console.log("merchant ship cards: ", data.cards)
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

  useEffect(() => {
    buildDeck()

    console.clear();

    const listener = document.addEventListener;

    listener("dragstart", (event: any) => {
      console.log("start !");
      return setDragged(event.target);
    });

    listener("dragend", (event) => {
      return console.log("end !");
    });

    listener("dragover", function (event) {
      return event.preventDefault();
    });

  }, [])

  useEffect(() => {
    document.addEventListener("drop", (event: any) => {
      console.log("drop !");
      event.preventDefault();
      console.log("className: ", event?.target.className)
      console.log({ dragged })
      if (event?.target.className.includes("dropzone") && dragged) {
        dragged.parentNode.removeChild(dragged);
        return event.target.appendChild(dragged);
      }
    });
  }, [dragged])

  useEffect(() => {
    console.log({ deck })
  }, [deck])

  return (
    <GameContainer>
      <Table id="table" draggable="true" className="dropzone" />
      {deck && <Hand socket={socket} />}
    </GameContainer>
  );
};

export default React.memo(Game);
