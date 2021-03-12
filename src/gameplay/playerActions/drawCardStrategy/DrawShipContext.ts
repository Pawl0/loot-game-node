
import DrawShipStrategy from './DrawShipStrategy'

export default class DrawShipContext {

    private context: DrawShipStrategy
    
    constructor(drawShipStrategy: DrawShipStrategy) {
        this.context = drawShipStrategy
    }

    setContext(drawShipStrategy: DrawShipStrategy) {
        this.context = drawShipStrategy
    }

    public execute(value: number) {
        this.context.execute(value)
    }
}