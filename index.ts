var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

import DrawShipContext, {DrawMerchantShipStrategy, DrawPirateShipStrategy} from "./src/gameplay/playerActions/drawCardStrategy"
import Table from "./src/gameplay/table/index"

console.log("Loot game is running")

const table = Table.getInstance()

table.setState([])

console.log('Table state: ', table)

const drawPirateShip = new DrawShipContext(new DrawPirateShipStrategy())
const drawMerchantShip = new DrawShipContext(new DrawMerchantShipStrategy())


const insertPirate = (value: number ) => {

    console.log("Pirate with "+value+" of strength inserted")
    drawPirateShip.execute(value)

}

const insertMerchant = (value: number ) => {

    console.log("Merchant with "+value+" of gold inserted")
    drawMerchantShip.execute(value)

}

const main = () => {
    setInterval(() => {
        insertMerchant(Math.floor(Math.random()*9))
        console.log('Table state: ', table.getState())
    }, 5000)

    setInterval(() => {
        insertPirate(Math.floor(Math.random()*4))
        console.log('Table state: ', table.getState())
    }, 11000)
    
}

main()