import {
  CardMerchantShip,
  CardPirateShip,
} from "../prototype";
import { CardInterface, Deck } from "../model";
import DeckBuilder from "./DeckBuilder";
import {
  COLORS,
  NUM_COLORS,
} from "../utils/constants";

class DefaultDeckBuilder implements DeckBuilder {
  private deck: Deck;
  private merchantShips: Array<CardMerchantShip>;
  private pirateShips: Array<CardPirateShip>;
  private pirateShipPrototype: CardPirateShip;
  private merchantShipPrototype: CardMerchantShip;

  constructor() {
    this.reset();
  }

  reset() {
    this.deck = new Deck([]);
  }

  setMerchantShipPrototype(
    merchantShipPrototype: CardMerchantShip
  ) {
    this.merchantShipPrototype = merchantShipPrototype;
  }

  setPirateShipPrototype(
    pirateShipPrototype: CardPirateShip
  ) {
    this.pirateShipPrototype = pirateShipPrototype;
  }

  private setMerchantShips(
    merchantShips: Array<CardMerchantShip>
  ) {
    this.merchantShips = merchantShips;
  }

  buildMerchantShipsWithGold(
    quantity: number,
    coins: number
  ) {
    const merchantShips = [];
    for (let i = 0; i < quantity; i++) {
      const merchantShip: CardMerchantShip = this.merchantShipPrototype.clone();
      merchantShip.setAttributes({ coins });
      merchantShips.push(merchantShip.getCard());
    }

    return merchantShips;
  }

  buildMerchantShips() {
    const merchantShips2 = this.buildMerchantShipsWithGold(
      5,
      2
    );
    const merchantShips3 = this.buildMerchantShipsWithGold(
      6,
      3
    );
    const merchantShips4 = this.buildMerchantShipsWithGold(
      5,
      4
    );
    const merchantShips5 = this.buildMerchantShipsWithGold(
      5,
      5
    );
    const merchantShips6 = this.buildMerchantShipsWithGold(
      2,
      6
    );
    const merchantShips7 = this.buildMerchantShipsWithGold(
      1,
      7
    );
    const merchantShips8 = this.buildMerchantShipsWithGold(
      1,
      8
    );

    const merchantShips = [
      ...merchantShips2,
      ...merchantShips3,
      ...merchantShips4,
      ...merchantShips5,
      ...merchantShips6,
      ...merchantShips7,
      ...merchantShips8,
    ];

    this.setMerchantShips(merchantShips);
  }

  private setPirateShips(
    pirateShips: Array<CardPirateShip>
  ) {
    this.pirateShips = pirateShips;
  }

  buildPirateShipsWithSkulls(
    quantity: number,
    skulls: number
  ) {
    const pirateShipsWithSkulls = [];
    for (let i = 0; i < quantity; i++) {
      const pirateShip: CardPirateShip = this.pirateShipPrototype.clone();
      pirateShip.setAttributes({ skulls });
      pirateShipsWithSkulls.push(pirateShip);
    }

    return pirateShipsWithSkulls;
  }

  buildPirateShipsWithColors(
    pirateShipsWithSkulls: Array<CardPirateShip>
  ) {
    let pirateShipsWithColors = [];

    for (let i = 0; i < NUM_COLORS; i++) {
      pirateShipsWithSkulls.forEach(
        (pirateShipWithSkulls) => {
          pirateShipWithSkulls.setAttributes({
            ...pirateShipWithSkulls.attributes,
            color: COLORS[i],
          });
          const copyOfPirateShipWithSkulls = Object.assign(
            pirateShipWithSkulls
          );
          pirateShipsWithColors.push(
            copyOfPirateShipWithSkulls.getCard()
          );
        }
      );
    }

    this.setPirateShips(pirateShipsWithColors);
  }

  buildPirateShips() {
    const pirateShips1 = this.buildPirateShipsWithSkulls(
      2,
      1
    );
    const pirateShips2 = this.buildPirateShipsWithSkulls(
      4,
      2
    );
    const pirateShips3 = this.buildPirateShipsWithSkulls(
      4,
      3
    );
    const pirateShips4 = this.buildPirateShipsWithSkulls(
      2,
      4
    );

    const pirateShipsWithSkulls = [
      ...pirateShips1,
      ...pirateShips2,
      ...pirateShips3,
      ...pirateShips4,
    ];

    this.buildPirateShipsWithColors(
      pirateShipsWithSkulls
    );
  }

  createDeck() {
    this.buildMerchantShips();
    this.buildPirateShips();
    const cards = [
      ...this.merchantShips,
      ...this.pirateShips,
    ];

    this.setDeck(cards);
  }

  setDeck(cards: Array<CardInterface>) {
    this.deck.setCards(cards);
  }

  getDeck(): Deck {
    if (this.deck.cards.length === 0) {
      this.createDeck();
    }
    const deck = this.deck;
    this.reset();
    return deck;
  }
}

export default DefaultDeckBuilder;
