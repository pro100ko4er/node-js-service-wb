import type { ITariffsBoxSchemaWithoutId } from "../db/schemes.js";
export interface ITariffsBoxWbFormat {
    response: {
        data: {
            dtNextBox: string;
            dtTillMax: string;
            warehouseList: ITariffsBoxSchemaWithoutId[];
        };
    };
}
export default class WbService {
    private wb_api_key;
    private axiosInstance;
    constructor(wb_api_key: string);
    getTariffsBox(date: string): Promise<ITariffsBoxWbFormat>;
}
//# sourceMappingURL=wb-service.d.ts.map