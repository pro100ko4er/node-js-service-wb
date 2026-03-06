import logger from "../utils/logger.js";
export default class SyncTariffsUseCase {
    repo;
    sheetService;
    wbApi;
    constructor(repo, sheetService, wbApi) {
        this.repo = repo;
        this.sheetService = sheetService;
        this.wbApi = wbApi;
    }
    async execute() {
        try {
            const today = new Date().toISOString().slice(0, 10);
            const data = await this.wbApi.getTariffsBox(today);
            logger.info("Получена новая информация о коробах");
            const dataFromDb = await this.repo.insertAll(data.response.data.warehouseList);
            logger.info("Информация загружена в БД");
            await this.sheetService.updateData(dataFromDb);
            logger.info("Информация загружена в Гугл таблицы");
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === '429wb') {
                    logger.error("Слишком много запросов WB");
                }
                logger.error(error.message);
            }
        }
    }
}
//# sourceMappingURL=sync-tariffs-usecase.js.map