import CardInterface from '../model/CardInterface'
import CardType from '../model/CardType'

export default abstract class CardPrototype implements CardInterface{
    
    type: CardType
    attributes: Object

    public setType(cardType: CardType) {
        this.type = cardType
    }

    public setAttributes(attributes: Object) {
        this.attributes = attributes
    }

    public getCard() {
        return {
            type: this.type,
            attributes: this.attributes,
        }
    }

    public abstract clone()
}