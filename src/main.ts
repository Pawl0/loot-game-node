import { Deck } from 'src/model';
import { DeckDirector } from './builder'
import DeckBuilder from './builder/DeckBuilder'

class Game {

    deckDirector: DeckDirector
    deck: Deck

    constructor(deckBuilder: DeckBuilder) {
        this.deckDirector = new DeckDirector(deckBuilder)

        this.deckDirector.buildDeck()

        this.deck = deckBuilder.getDeck()
    }
    
}

export default Game