import knex from "knex";
export default class TariffsBoxRepository {
    client;
    table = 'tariffs_box';
    constructor(client) {
        this.client = client;
    }
    async insertAll(data) {
        return this.client(this.table).insert(data).onConflict(['createdAt', 'warehouseName']).merge({ updatedAt: this.client.fn.now() }).returning("*");
    }
}
//# sourceMappingURL=tariffs-box.js.map