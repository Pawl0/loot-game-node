import { io, Socket } from "socket.io-client";
import { DeckInterface } from "../../../../model";

export class SocketAdapter {
  private socket: Socket = io();
  private id: string = "";
  constructor() {
    this.onConnect();
  }

  private onConnect() {
    this.socket.on("connect", () => {
      const playerId = this.socket.id;
      this.setSocketId(playerId);
      console.log(
        `Player connected with id: ${playerId}`
      );
    });
  }

  private setSocketId(id: string): void {
    this.id = id;
  }

  public getSocketId(): string {
    return this.id;
  }

  public async getClients(): Promise<any> {
    this.socket.emit("get-players");
    return await this.onGetPlayers();
  }

  private async onGetPlayers() {
    return new Promise((resolve) =>
      this.socket.on(
        "on-get-players",
        ({ players }: { players: string }) => {
          resolve(players);
        }
      )
    );
  }

  public buildDeck(): void {
    this.socket.emit(
      "build-deck",
      this.socket.id
    );
  }

  public onDeckBuilt(
    callback: (params: {
      owner: string;
      deck: DeckInterface;
    }) => void
  ): void {
    this.socket.on("deck-built", callback);
  }

  public async getHand(
    length: number
  ): Promise<any> {
    this.socket.emit("get-hand", {
      socketID: this.socket.id,
      length,
    });
    return await this.onGetHand();
  }

  private async onGetHand(): Promise<any> {
    return new Promise((resolve) => {
      this.socket.on("on-get-hand", (hand) => {
        resolve(hand);
      });
    });
  }
}
