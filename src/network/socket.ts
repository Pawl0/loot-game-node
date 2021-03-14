import express from "express"
import http from "http"
import socketioWildcard from "socketio-wildcard"
import path from "path"
import cors from "cors"

export default class SocketSingleton {

  private webServer
  private static instance: SocketSingleton
  private io

  constructor() {
    const clientPath = path.join(__dirname, "../client/loot-game/build/")
    const webApp = express()
    webApp.use(express.static(clientPath))
    webApp.use(cors)

    const middleware = socketioWildcard();

    this.webServer = http.createServer(webApp)

    this.io = require("socket.io")(this.webServer, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        },
    });

    this.io.use(middleware);
    console.log('> Socket started')
  }

  getSocket() {
    return this.io
  }

  getWebServer() {
    return this.webServer
  }

  public static getInstance(): SocketSingleton {
    if (!SocketSingleton.instance) {
            SocketSingleton.instance = new SocketSingleton();
        }

        return SocketSingleton.instance;
  }

}