import CardPrototype from "./CardPrototype";

export default class CardPirateShip extends CardPrototype {


    constructor() {
        super()
        this.type = "pirate-ship"
    }

    clone() {
        return Object.create(this)
    }

}