import type { ITariffsBoxSchema } from "../db/schemes.js";
export default class GoogleSheetService {
    private readonly email;
    private readonly key;
    private readonly tableIds;
    private readonly targetSheet;
    private sheetsApi;
    private readonly scopes;
    private readonly headers;
    constructor(email: string, key: string, tableIds: string[], targetSheet: string);
    auth(): Promise<void>;
    private ensureInitialized;
    addHeaders(): Promise<void>;
    updateData(data: ITariffsBoxSchema[]): Promise<void>;
}
//# sourceMappingURL=google-sheet-service.d.ts.map