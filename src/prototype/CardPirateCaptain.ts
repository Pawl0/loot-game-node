import CardPrototype from "./CardPrototype";

export default class CardPirateCaptain extends CardPrototype {


    constructor() {
        super()
        this.type = "pirate-captain"
    }

    clone() {
        return Object.create(this)
    }

}