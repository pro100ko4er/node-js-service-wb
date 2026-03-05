import knex from "knex";
import type { ITariffsBoxSchema, ITariffsBoxSchemaWithoutId } from "../db/schemes.js";

export default class TariffsBoxRepository {
    private client
    private readonly table = 'tariffs_box'
    constructor(client: knex.Knex) {
        this.client = client
    }

    async insert(data: ITariffsBoxSchemaWithoutId): Promise<ITariffsBoxSchema[]> {
        return this.client<ITariffsBoxSchema>(this.table).insert(data).returning("*")
    }

    async getOneByPk(id: number): Promise<ITariffsBoxSchema | undefined> {
        return this.client<ITariffsBoxSchema>(this.table).select().where({
                id
            }).first()
    }

    async getAll(limit: number, page: number): Promise<ITariffsBoxSchema[]> {
        const offset = limit * (page - 1)
        return this.client<ITariffsBoxSchema>(this.table).select().limit(limit).offset(offset)
    }

    async update(data: ITariffsBoxSchema): Promise<ITariffsBoxSchema | undefined> {
        return this.client<ITariffsBoxSchema>(this.table).update(data).returning("*").where({id: data.id}).then(rows => rows[0])
    }

    async remove(id: number): Promise<ITariffsBoxSchema | undefined> {
        return this.client<ITariffsBoxSchema>(this.table).del().returning('*').where({id}).then(rows => rows[0])
    }
}