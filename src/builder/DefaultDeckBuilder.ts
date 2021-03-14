import {CardMerchantShip, CardPirateShip} from "../prototype";
import { CardInterface, Deck } from "../model";
import DeckBuilder from "./DeckBuilder";
import { buildAllMerchantShips, buildAllPirateShipsWithSkulls } from "./functions";
import { COLORS, NUM_COLORS} from '../utils/constants'

class DefaultDeckBuilder implements DeckBuilder {

    private deck: Deck
    private merchantShips: Array<CardMerchantShip>
    private pirateShips: Array<CardPirateShip>
    private pirateShipPrototype: CardPirateShip
    private merchantShipPrototype: CardMerchantShip

    constructor() {
        this.reset()
    }

    reset() {
       this.deck =  new Deck([])
    }

    setMerchantShipPrototype(merchantShipPrototype: CardMerchantShip) {
        console.log("merchantShipPrototype set: ", merchantShipPrototype)
        this.merchantShipPrototype = merchantShipPrototype
    }

    setPirateShipPrototype(pirateShipPrototype: CardPirateShip) {
        this.pirateShipPrototype = pirateShipPrototype
    }

    private setMerchantShips(merchantShips: Array<CardMerchantShip>) {
        this.merchantShips = merchantShips
    }

    buildMerchantShipsWithGold(quantity: number, coins: number, merchantShipPrototype: CardMerchantShip) {
        const merchantShips = []
        console.log("merchantShipPrototype: ", merchantShipPrototype)
        for (let i = 0; i < quantity; i++) {
            const merchantShip:CardMerchantShip = merchantShipPrototype?.clone()
            merchantShip.setAttributes({coins})
            merchantShips.push(merchantShip.getCard())
        }

        return merchantShips;
    }

    buildMerchantShips() {
        const merchantShips = buildAllMerchantShips(this.buildMerchantShipsWithGold, this.merchantShipPrototype);
        this.setMerchantShips(merchantShips)
    }

    private setPirateShips(pirateShips: Array<CardPirateShip>) {
        this.pirateShips = pirateShips
    }

    buildPirateShipsWithSkulls(quantity: number, skulls: number, pirateShipPrototype: CardPirateShip) {
        const pirateShipsWithSkulls = []
        for (let i = 0; i < quantity; i++) {
            const pirateShip:CardPirateShip = pirateShipPrototype.clone()
            pirateShip.setAttributes({skulls})
            pirateShipsWithSkulls.push(pirateShip)
        }

        return pirateShipsWithSkulls;
    }

    buildPirateShipsWithColors(pirateShipsWithSkulls: Array<CardPirateShip>) {
        let pirateShipsWithColors = []

        for(let i = 0; i < NUM_COLORS; i++) {
            pirateShipsWithSkulls.forEach((pirateShipWithSkulls) => {
                pirateShipWithSkulls.setAttributes({...pirateShipWithSkulls.attributes, color: COLORS[i]})
                const copyOfPirateShipWithSkulls = Object.assign(pirateShipWithSkulls)
                pirateShipsWithColors.push(copyOfPirateShipWithSkulls.getCard())  
            })
        }

        this.setPirateShips(pirateShipsWithColors)
    }

    buildPirateShips() {

        const pirateShipsWithSkulls = buildAllPirateShipsWithSkulls(this.buildPirateShipsWithSkulls, this.pirateShipPrototype);

        this.buildPirateShipsWithColors(pirateShipsWithSkulls)
    }

    createDeck() {
        
        this.buildMerchantShips()
        this.buildPirateShips()
        const cards = [
            ...this.merchantShips,
            ...this.pirateShips,
        ]

        this.setDeck(cards)
    }

    setDeck(cards: Array<CardInterface>) {
        this.deck.setCards(cards)
    }

    getDeck(): Deck {
        if (this.deck.cards.length === 0) {
            this.createDeck()
        }
        const deck = this.deck
        this.reset()
        return deck
    }
    
}

export default DefaultDeckBuilder