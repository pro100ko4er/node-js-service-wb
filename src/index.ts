import knexInstance from "./db/index.js"
import migrations from "./db/migrations.js"
import createSchemes from "./db/schemes.js"
import WbService from "./services/wb-service.js"
import GoogleSheetService from "./services/google-sheet-service.js"
import TariffsBoxRepository from "./repositories/tariffs-box.js"
import SyncTariffsUseCase from "./usecases/sync-tariffs-usecase.js"
import { config, configDotenv } from "dotenv"
import { getConfig } from "./config.js"
import cron from 'node-cron'
async function bootstrap() {
    config()
    const appConfig = getConfig()
    await createSchemes(knexInstance)
    const tariffBoxRepository = new TariffsBoxRepository(knexInstance)
    const wbService = new WbService(appConfig.WB_API_KEY)
    const googleSheetsService = new GoogleSheetService(appConfig.GOOGLE_SERVICE_ACCOUNT_EMAIL, appConfig.GOOGLE_PRIVATE_KEY, appConfig.TABLE_IDS.split(','), 'stocks_coefs')
    const syncTariffUseCase = new SyncTariffsUseCase(tariffBoxRepository, googleSheetsService, wbService)
    cron.schedule('* * * * *', () => {
        syncTariffUseCase.execute()
    })
}




bootstrap()