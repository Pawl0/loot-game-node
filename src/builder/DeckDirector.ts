import DeckBuilder from "./DeckBuilder";

class DeckDirector {
  private builder: DeckBuilder;

  constructor(deckBuilder: DeckBuilder) {
    this.builder = deckBuilder;
  }

  public setBuilder(deckBuilder: DeckBuilder) {
    this.builder = deckBuilder;
  }

  public buildDeck() {
    this.builder.getDeck();
  }
}

export default DeckDirector;
