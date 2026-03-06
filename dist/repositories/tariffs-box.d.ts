import knex from "knex";
import type { ITariffsBoxSchema, ITariffsBoxSchemaWithoutId } from "../db/schemes.js";
export default class TariffsBoxRepository {
    private client;
    private readonly table;
    constructor(client: knex.Knex);
    insertAll(data: ITariffsBoxSchemaWithoutId[]): Promise<ITariffsBoxSchema[]>;
}
//# sourceMappingURL=tariffs-box.d.ts.map