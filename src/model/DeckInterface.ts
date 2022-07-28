import Card from './CardInterface'

interface Deck {
    cards: Array<Card>
    getCard(): Card
    setCards(cards: Array<Card>): void
    gethand(length?: number): Array<Card>
}

export default Deck