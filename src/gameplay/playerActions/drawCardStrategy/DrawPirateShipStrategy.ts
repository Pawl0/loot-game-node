import DrawShipStrategy from './DrawShipStrategy'
import Table from '../../table'

export default class DrawPirateShipStrategy implements DrawShipStrategy {
    execute(value: number) {
        const tableState = Table.getInstance().getState()
        tableState.push({card: "Pirate ship", value})
    }
}