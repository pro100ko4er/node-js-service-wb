import type { ITariffsBoxSchema } from "../db/schemes.js";
import { google, sheets_v4 } from "googleapis"

export default class GoogleSheetService {

    private sheetsApi: sheets_v4.Sheets | null = null

    private readonly scopes = [
        "https://www.googleapis.com/auth/spreadsheets"
    ]

    private readonly headers = [
        "boxDeliveryBase",
        "boxDeliveryCoefExpr",
        "boxDeliveryLiter",
        "boxDeliveryMarketplaceBase",
        "boxDeliveryMarketplaceCoefExpr",
        "boxDeliveryMarketplaceLiter",
        "boxStorageBase",
        "boxStorageCoefExpr",
        "boxStorageLiter",
        "geoName",
        "warehouseName",
        "createdAt",
        "updatedAt"
    ]

    constructor(
        private readonly email: string,
        private readonly key: string,
        private readonly tableIds: string[],
        private readonly targetSheet: string
    ) {}

    async auth() {

        const auth = new google.auth.JWT({
            email: this.email,
            key: this.key,
            scopes: this.scopes
        })

        this.sheetsApi = google.sheets({
            version: "v4",
            auth
        })
    }

    private ensureInitialized() {
        if (!this.sheetsApi) {
            throw new Error("GoogleSheetService не инициализирован. Вызови auth()")
        }
    }

    async addHeaders() {

        this.ensureInitialized()

        await Promise.all(
            this.tableIds.map(id =>
                this.sheetsApi!.spreadsheets.values.update({
                    spreadsheetId: id,
                    range: `${this.targetSheet}!A1:M1`,
                    valueInputOption: "RAW",
                    requestBody: {
                        values: [this.headers]
                    }
                })
            )
        )
    }

    async updateData(data: ITariffsBoxSchema[]) {

        this.ensureInitialized()

        const today = new Date().toISOString().slice(0, 10)

        await Promise.all(

            this.tableIds.map(async tableId => {

                const res = await this.sheetsApi!.spreadsheets.values.get({
                    spreadsheetId: tableId,
                    range: `${this.targetSheet}!A2:M`
                })

                const rows = res.data.values || []

                const index = new Map<string, number>()

                rows.forEach((row, i) => {

                    const warehouseName = row[10]
                    const createdAt = row[11]

                    if (createdAt?.startsWith(today)) {
                        index.set(warehouseName, i + 2)
                    }

                })

                const updates: sheets_v4.Schema$ValueRange[] = []
                const newRows: any[][] = []

                for (const item of data) {

                    const rowData = [
                        item.boxDeliveryBase,
                        item.boxDeliveryCoefExpr,
                        item.boxDeliveryLiter,
                        item.boxDeliveryMarketplaceBase,
                        item.boxDeliveryMarketplaceCoefExpr,
                        item.boxDeliveryMarketplaceLiter,
                        item.boxStorageBase,
                        item.boxStorageCoefExpr,
                        item.boxStorageLiter,
                        item.geoName,
                        item.warehouseName,
                        item.createdAt,
                        item.updatedAt
                    ]

                    const rowIndex = index.get(item.warehouseName)

                    if (rowIndex) {

                        updates.push({
                            range: `${this.targetSheet}!A${rowIndex}:M${rowIndex}`,
                            values: [rowData]
                        })

                    } else {

                        newRows.push(rowData)

                    }
                }

                if (updates.length) {

                    await this.sheetsApi!.spreadsheets.values.batchUpdate({
                        spreadsheetId: tableId,
                        requestBody: {
                            valueInputOption: "USER_ENTERED",
                            data: updates
                        }
                    })

                }

                if (newRows.length) {

                    await this.sheetsApi!.spreadsheets.values.append({
                        spreadsheetId: tableId,
                        range: `${this.targetSheet}!A:M`,
                        valueInputOption: "USER_ENTERED",
                        requestBody: {
                            values: newRows
                        }
                    })

                }

            })
        )
    }
}