import { JWT } from "google-auth-library";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";

export default class GoogleSheetService {
    private serviceAccountAuth: JWT | null = null
    private sheets: Map<string, GoogleSpreadsheetWorksheet> = new Map()
    private readonly scopes: string[] = ['https://www.googleapis.com/auth/spreadsheets']
    constructor(
        private readonly email: string,
        private readonly key: string,
        private readonly tableIds: string[],
        private readonly targetSheet: string
    ) {}

    async auth() {
        this.serviceAccountAuth = new JWT({
            email: this.email,
            key: this.key,
            scopes: this.scopes
        })
         await Promise.all(
            this.tableIds.map(async (id) => {
                const doc = new GoogleSpreadsheet(id, this.serviceAccountAuth!)
                await doc.loadInfo()

                const sheet = doc.sheetsByTitle[this.targetSheet]

                if (!sheet) {
                    throw new Error(`Лист ${this.targetSheet} не найден в таблице ${id}`)
                }

                this.sheets.set(id, sheet)
            })
        )
    }

    private ensureInitialized() {
        if (!this.serviceAccountAuth || this.sheets.size === 0) {
            throw new Error("GoogleSheetService не инициализирован. Вызови init()")
        }
    }


    async addData(data: Record<string, any>[]) {
        this.ensureInitialized()
        await Promise.all(
            Array.from(this.sheets.values()).map(sheet => sheet.addRows(data))
        )
    }

    async updateData(data: string) {
        this.ensureInitialized()
    }
}