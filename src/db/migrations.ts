import knex from "knex"

async function migrations(knex: knex.Knex) {
    await knex.migrate.latest()
}

export default migrations