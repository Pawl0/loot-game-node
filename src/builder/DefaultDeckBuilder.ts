import { CardInterface, Deck } from "../model";
import { yellowPirateShips } from "./cards/yellowPirateShip";
import DeckBuilder from "./DeckBuilder";

class DefaultDeckBuilder implements DeckBuilder {

    private deck: Deck

    constructor() {
        this.reset()
    }

    reset() {
       this.deck =  new Deck([])
    }


    createDeck() {
        const cards = [
            ...yellowPirateShips
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