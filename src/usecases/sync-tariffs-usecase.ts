import type TariffsBoxRepository from "../repositories/tariffs-box.js";
import type GoogleSheetService from "../services/google-sheet-service.js";
import type WbService from "../services/wb-service.js";

export default class SyncTariffsUseCase {
    constructor(
        private readonly repo: TariffsBoxRepository,
        private readonly sheetService: GoogleSheetService,
        private readonly wbApi: WbService
    ) {}

    async execute() {
        try {
            
        } catch (error) {
            
        }
    }
}