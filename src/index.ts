import { DefaultDeckBuilder } from "./builder";
import Game from "./main";
import SocketSingleton from "./network/socket";
import { CardMerchantShip, CardPirateShip, CardPirateCaptain } from './prototype'

const socketInstance = SocketSingleton.getInstance()

const merchantShipPrototype = new CardMerchantShip()
const pirateShipPrototype = new CardPirateShip()
const pirateCaptainPrototype = new CardPirateCaptain()

const deckBuilder = new DefaultDeckBuilder()
deckBuilder.setMerchantShipPrototype(merchantShipPrototype)
deckBuilder.setPirateShipPrototype(pirateShipPrototype)
deckBuilder.setPirateCaptainPrototype(pirateCaptainPrototype)

const game = new Game(deckBuilder);

let merchantShips = [];

const players = [];

const addPlayer = (player) => {
  players.push(player);
  console.log(
    "Total of players: ",
    players.length
  );
  console.log("Players connected: ", players);
};

const removePlayer = (player) => {
  players.splice(players.indexOf(player), 1);
};

const addMerchantShip = (coins: number) => {
  const newMerchantShip: CardMerchantShip = merchantShipPrototype.clone();
  newMerchantShip.setAttributes({ coins });
  merchantShips.push(newMerchantShip.getCard());
};

const clearMerchantShips = () => {
  merchantShips = [];
};

const io = socketInstance.getSocket()

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
    console.log(
      "Player: " + socketID + " built deck: "
    );
    game.deck.listCards();
    io.emit("deck-built", {
      owner: socketID,
      deck: game.deck,
    });
    console.log(
      "Total of players: ",
      players.length
    );
    console.log("Players connected: ", players);
  });

  socket.on(
    "build-merchant-ship",
    ({ socketID, coins }) => {
      addMerchantShip(coins);
      console.log(
        "Player: " +
          socketID +
          " built merchant ship: "
      );
      console.log(
        "MerchantShips: ",
        merchantShips
      );
      io.emit("merchant-ship-built", {
        owner: socketID,
        cards: merchantShips,
      });
      console.log(
        "Total of players: ",
        players.length
      );
      console.log("Players connected: ", players);
    }
  );

  socket.on(
    "clear-merchant-ships",
    (socketID) => {
      clearMerchantShips();
      console.log(
        "Player: " +
          socketID +
          " cleared merchant ships!!!"
      );
      io.emit("merchant-ships-cleared", {
        owner: socketID,
        cards: merchantShips,
      });
      console.log(
        "Total of players: ",
        players.length
      );
      console.log("Players connected: ", players);
    }
  );
});

const webServer = socketInstance.getWebServer()

webServer.listen(
  process.env.PORT || 3000,
  function () {
    console.log(
      "> Server listening on port:",
      process.env.PORT || 3000
    );
  }
);
