import type TariffsBoxRepository from "../repositories/tariffs-box.js";
import type GoogleSheetService from "../services/google-sheet-service.js";
import type WbService from "../services/wb-service.js";
export default class SyncTariffsUseCase {
    private readonly repo;
    private readonly sheetService;
    private readonly wbApi;
    constructor(repo: TariffsBoxRepository, sheetService: GoogleSheetService, wbApi: WbService);
    execute(): Promise<void>;
}
//# sourceMappingURL=sync-tariffs-usecase.d.ts.map