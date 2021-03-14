import express from "express"
import http from "http"
import socketioWildcard from "socketio-wildcard"
import path from "path"
import cors from "cors"

const webApp = express()

const clientPath = path.join(__dirname, "../client/loot-game/build/")
webApp.use(express.static(clientPath))
webApp.use(cors)

const middleware = socketioWildcard();

console.log('> Socket started')

const webServer = http.createServer(webApp)

const io = require("socket.io")(webServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
});

io.use(middleware);

export { io, webApp }

export default webServer