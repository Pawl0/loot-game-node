import CardMerchantShip from "../prototype/CardMechantShip";
import { CardInterface, Deck } from "../model";
import { yellowPirateShips } from "./cards/yellowPirateShip";
import DeckBuilder from "./DeckBuilder";

class DefaultDeckBuilder implements DeckBuilder {

    private deck: Deck
    private merchantShips: Array<CardMerchantShip>

    constructor() {
        this.reset()
    }

    reset() {
       this.deck =  new Deck([])
    }


    private merchantShipPrototype: CardMerchantShip

    buildMerchantShipsWithGold(quantity: number, coins: number) {
        const merchantShips = []
        for (let i = 0; i < quantity; i++) {
            const merchantShip:CardMerchantShip = this.merchantShipPrototype.clone()
            merchantShip.setAttributes({coins})
            console.log("[new created merchantShip]: \n", merchantShip)
            merchantShips.push(merchantShip.getCard())
        }

        return merchantShips;
    }

    private setMerchantShips(merchantShips: Array<CardMerchantShip>) {
        this.merchantShips = merchantShips
    }

    buildMerchantShips() {
        this.merchantShipPrototype = new CardMerchantShip()

        const merchantShips2 = this.buildMerchantShipsWithGold(5, 2)
        const merchantShips3 = this.buildMerchantShipsWithGold(6, 3)
        const merchantShips4 = this.buildMerchantShipsWithGold(5, 4)
        const merchantShips5 = this.buildMerchantShipsWithGold(5, 5)
        const merchantShips6 = this.buildMerchantShipsWithGold(2, 6)
        const merchantShips7 = this.buildMerchantShipsWithGold(1, 7)
        const merchantShips8 = this.buildMerchantShipsWithGold(1, 8)

        this.setMerchantShips([
            ...merchantShips2,
            ...merchantShips3,
            ...merchantShips4,
            ...merchantShips5,
            ...merchantShips6,
            ...merchantShips7,
            ...merchantShips8,
        ])
    }


    createDeck() {
        
        this.buildMerchantShips()
        const cards = [
            ...yellowPirateShips,
            ...this.merchantShips,
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