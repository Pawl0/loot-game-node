import { DefaultDeckBuilder } from "./builder";
import Game from "./main";
import SocketSingleton from "./network/socket";
import {
  CardMerchantShip,
  CardPirateShip,
  CardPirateCaptain,
} from "./prototype";

const socketInstance =
  SocketSingleton.getInstance();

const merchantShipPrototype =
  new CardMerchantShip();
const pirateShipPrototype = new CardPirateShip();
const pirateCaptainPrototype =
  new CardPirateCaptain();

const deckBuilder = new DefaultDeckBuilder();
deckBuilder.setMerchantShipPrototype(
  merchantShipPrototype
);
deckBuilder.setPirateShipPrototype(
  pirateShipPrototype
);
deckBuilder.setPirateCaptainPrototype(
  pirateCaptainPrototype
);

const game = new Game(deckBuilder);

let merchantShips = [];

const players = [];

const addPlayer = (player) => {
  players.push(player);
};

const removePlayer = (player) => {
  players.splice(players.indexOf(player), 1);
};

const addMerchantShip = (coins: number) => {
  const newMerchantShip: CardMerchantShip =
    merchantShipPrototype.clone();
  newMerchantShip.setAttributes({ coins });
  merchantShips.push(newMerchantShip.getCard());
};

const clearMerchantShips = () => {
  merchantShips = [];
};

const io = socketInstance.getSocket();

io.on("connection", (socket) => {
  // io.emit("newID", generatePlayerID())

  const playerId = socket.id;
  console.log(`> Player connected: ${playerId}`);

  addPlayer({ playerId: playerId });

  socket.on("disconnect", () => {
    removePlayer({ playerId: playerId });
    console.log(
      `> Player disconnected: ${playerId}`
    );
  });

  socket.on("build-deck", (socketID) => {
    game.deckDirector.buildDeck();
    game.deck.listCards();
    io.emit("deck-built", {
      owner: socketID,
      deck: game.deck,
    });
  });

  socket.on(
    "build-merchant-ship",
    ({ socketID, coins }) => {
      addMerchantShip(coins);
      io.emit("merchant-ship-built", {
        owner: socketID,
        cards: merchantShips,
      });
    }
  );

  socket.on(
    "clear-merchant-ships",
    (socketID) => {
      clearMerchantShips();
      io.emit("merchant-ships-cleared", {
        owner: socketID,
        cards: merchantShips,
      });
    }
  );

  socket.on(
    "get-hand",
    ({ socketID, length }) => {
      const hand = game.deck.gethand(length);
      io.emit("on-get-hand", hand);
    }
  );

  socket.on("get-players", () => {
    socket.emit("on-get-players", {
      players,
    });
  });
});

const webServer = socketInstance.getWebServer();

webServer.listen(
  process.env.PORT || 3000,
  function () {
    console.log(
      "> Server listening on port:",
      process.env.PORT || 3000
    );
  }
);
