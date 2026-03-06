import knex from "knex";
export interface ITariffsBoxSchema {
    id: number;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    geoName: string;
    warehouseName: string;
    createdAt: string;
    updatedAt: string;
}
export type ITariffsBoxSchemaWithoutId = Omit<ITariffsBoxSchema, 'id'> & {
    id?: number;
};
declare function createSchemes(knex: knex.Knex): Promise<void>;
export declare function downSchemes(knex: knex.Knex): Promise<void>;
export default createSchemes;
//# sourceMappingURL=schemes.d.ts.map