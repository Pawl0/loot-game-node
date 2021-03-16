import CardPrototype from "./CardPrototype";

export default class CardAdmiral extends CardPrototype {


    constructor() {
        super()
        this.type = "admiral"
    }

    clone() {
        return Object.create(this)
    }

}