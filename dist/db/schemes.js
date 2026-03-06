import knex from "knex";
async function createSchemes(knex) {
    await knex.schema.createTableIfNotExists('tariffs_box', (table) => {
        table.increments('id').primary();
        table.string('boxDeliveryBase', 255),
            table.string('boxDeliveryCoefExpr', 255);
        table.string('boxDeliveryLiter', 255);
        table.string('boxDeliveryMarketplaceBase', 255);
        table.string('boxDeliveryMarketplaceCoefExpr', 255);
        table.string('boxDeliveryMarketplaceLiter', 255);
        table.string('boxStorageBase', 255);
        table.string('boxStorageCoefExpr', 255);
        table.string('boxStorageLiter', 255);
        table.string('geoName', 255);
        table.string('warehouseName', 255);
        table.date('createdAt').defaultTo(knex.raw('CURRENT_DATE'));
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.unique(['warehouseName', 'createdAt']);
    });
}
export async function downSchemes(knex) {
    await knex.schema.dropTableIfExists('tariffs_box');
}
export default createSchemes;
//# sourceMappingURL=schemes.js.map