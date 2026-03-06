import knex from "knex";
async function migrations(knex) {
    await knex.migrate.latest();
}
export default migrations;
//# sourceMappingURL=migrations.js.map