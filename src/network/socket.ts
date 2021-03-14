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
    connectTimeout: 900000,
    pingTimeout: 900000,
    pingInterval: 900000,
    upgradeTimeout: 9000000,
    timeout: 9000000,
});

io.heartbeatTimeout = 900000;
io.use(middleware);

export { io, webApp }

export default webServer