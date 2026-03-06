import { google, sheets_v4 } from "googleapis";
export default class GoogleSheetService {
    email;
    key;
    tableIds;
    targetSheet;
    sheetsApi = null;
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets"
    ];
    headers = [
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
    ];
    constructor(email, key, tableIds, targetSheet) {
        this.email = email;
        this.key = key;
        this.tableIds = tableIds;
        this.targetSheet = targetSheet;
    }
    async auth() {
        const auth = new google.auth.JWT({
            email: this.email,
            key: this.key,
            scopes: this.scopes
        });
        this.sheetsApi = google.sheets({
            version: "v4",
            auth
        });
    }
    ensureInitialized() {
        if (!this.sheetsApi) {
            throw new Error("GoogleSheetService не инициализирован. Вызови auth()");
        }
    }
    async addHeaders() {
        this.ensureInitialized();
        await Promise.all(this.tableIds.map(id => this.sheetsApi.spreadsheets.values.update({
            spreadsheetId: id,
            range: `${this.targetSheet}!A1:M1`,
            valueInputOption: "RAW",
            requestBody: {
                values: [this.headers]
            }
        })));
    }
    async updateData(data) {
        this.ensureInitialized();
        const today = new Date().toISOString().slice(0, 10);
        await Promise.all(this.tableIds.map(async (tableId) => {
            const res = await this.sheetsApi.spreadsheets.values.get({
                spreadsheetId: tableId,
                range: `${this.targetSheet}!A2:M`
            });
            const rows = res.data.values || [];
            const index = new Map();
            rows.forEach((row, i) => {
                const warehouseName = row[10];
                const createdAt = row[11];
                if (createdAt?.startsWith(today)) {
                    index.set(warehouseName, i + 2);
                }
            });
            const updates = [];
            const newRows = [];
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
                ];
                const rowIndex = index.get(item.warehouseName);
                if (rowIndex) {
                    updates.push({
                        range: `${this.targetSheet}!A${rowIndex}:M${rowIndex}`,
                        values: [rowData]
                    });
                }
                else {
                    newRows.push(rowData);
                }
            }
            if (updates.length) {
                await this.sheetsApi.spreadsheets.values.batchUpdate({
                    spreadsheetId: tableId,
                    requestBody: {
                        valueInputOption: "USER_ENTERED",
                        data: updates
                    }
                });
            }
            if (newRows.length) {
                await this.sheetsApi.spreadsheets.values.append({
                    spreadsheetId: tableId,
                    range: `${this.targetSheet}!A:M`,
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: newRows
                    }
                });
            }
        }));
    }
}
//# sourceMappingURL=google-sheet-service.js.map