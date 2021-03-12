import DrawShipStrategy from './DrawShipStrategy'
import Table from '../../table'

export default class DrawMerchantShipStrategy implements DrawShipStrategy {
    execute(value: number) {
        const tableState = Table.getInstance().getState()
        tableState.push({card: "Merchant ship", value})
    }
}