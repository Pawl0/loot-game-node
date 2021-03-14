import Card from './CardInterface'

interface Deck {
    cards: Array<Card>
    getCard: Function
}

export default Deck