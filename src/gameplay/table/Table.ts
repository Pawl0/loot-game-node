export default class Table {

    private static instance: Table
    private state: Array<any>

    constructor() {}

    public static getInstance() {
        if (!Table.instance) {
            Table.instance = new Table()
        }
        return Table.instance
    }

    public getState(): Array<any> {
        return this.state
    }

    public setState(state: Array<any>) {
        this.state = state
    }
}