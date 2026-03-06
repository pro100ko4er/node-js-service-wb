import knex from "knex";
import type { ITariffsBoxSchema, ITariffsBoxSchemaWithoutId } from "../db/schemes.js";

export default class TariffsBoxRepository {
    private client
    private readonly table = 'tariffs_box'
    constructor(client: knex.Knex) {
        this.client = client
    }

    async insertAll(data: ITariffsBoxSchemaWithoutId[]): Promise<ITariffsBoxSchema[]> {
        return this.client<ITariffsBoxSchema>(this.table).insert(data).onConflict(['createdAt', 'warehouseName']).merge({updatedAt: this.client.fn.now()}).returning("*")
    }
}