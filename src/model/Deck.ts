import { DeckInterface, CardInterface } from './'

class Deck implements DeckInterface {

    cards: Array<CardInterface>

    constructor(cards: Array<CardInterface>) {
        this.cards = cards
    }

    public getCard() {
        return this.cards.pop()
    }

    public setCards(cards: Array<CardInterface>) {
        this.cards = cards
    }


    listCards() {
        console.log("Cards from deck: ")
        this.cards.forEach((card, index) => {
            console.log(`${index} - Type: ${card.type} Attributes: ${JSON.stringify(card.attributes)}`)
        })
    }
}

export default Deck