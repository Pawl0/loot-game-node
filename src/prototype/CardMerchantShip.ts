import CardPrototype from "./CardPrototype";

export default class CardMerchantShip extends CardPrototype {


    constructor() {
        super()
        this.type = "trade-ship"
    }

    clone() {
        return Object.create(this)
    }

}