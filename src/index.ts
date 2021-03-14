import { DefaultDeckBuilder } from "./builder";
import Game from "./main";
import webServer, { io, webApp } from "./network/socket";

const game = new Game(new DefaultDeckBuilder());

let playerID = 0

const generatePlayerID = () => {
  return playerID += 1
}

const players = []

const addPlayer = (player) => {
  players.push(player)
  console.log("Total of players: ", players.length)
  console.log("Players connected: ", players)
}

const removePlayer = (player) => {
  players.splice(players.indexOf(player), 1)
}

io.on("connection", (socket) => {

  // io.emit("newID", generatePlayerID())

  const playerId = socket.id
  console.log(`> Player connected: ${playerId}`)

  addPlayer({ playerId: playerId })

  socket.on('disconnect', () => {
      removePlayer({ playerId: playerId })
      console.log(`> Player disconnected: ${playerId}`)
  })

  socket.on("build-deck", (socketID) => {
    game.deckDirector.buildDeck();
    console.log("Player: " + socketID + " built deck: ");
    game.deck.listCards();
    io.emit("deck-built", {owner: socketID, deck: game.deck});
  });
});

webServer.listen(3000, function () {
  console.log("> Server listening on port:", 3000);
});
