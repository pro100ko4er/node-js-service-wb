import type TariffsBoxRepository from "../repositories/tariffs-box.js";
import type GoogleSheetService from "../services/google-sheet-service.js";
import type WbService from "../services/wb-service.js";
import logger from "../utils/logger.js";
export default class SyncTariffsUseCase {
    constructor(
        private readonly repo: TariffsBoxRepository,
        private readonly sheetService: GoogleSheetService,
        private readonly wbApi: WbService
    ) {}

    async execute() {
        try {
            const today = new Date().toISOString().slice(0, 10)
            const data = await this.wbApi.getTariffsBox(today)
            logger.info("Получена новая информация о коробах")
            const dataFromDb = await this.repo.insertAll(data.response.data.warehouseList)
            logger.info("Информация загружена в БД")
            await this.sheetService.updateData(dataFromDb)
            logger.info("Информация загружена в Гугл таблицы")
        } catch (error) {
            if(error instanceof Error) {
                if(error.message === '429wb') {
                    logger.error("Слишком много запросов")
                }
                logger.error(error.message)
             }
        }
    }
}