export function getConfig() {
    const WB_API_KEY = process.env.WB_API_KEY;
    if (!WB_API_KEY)
        throw Error("WB_API_KEY не найден!");
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL)
        throw Error("GOOGLE_SERVICE_ACCOUNT_EMAIL не найден!");
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
    if (!GOOGLE_PRIVATE_KEY)
        throw Error("GOOGLE_PRIVATE_KEY не найден!");
    const TARGET_SHEET = process.env.TARGET_SHEET;
    if (!TARGET_SHEET)
        throw Error("TARGET_SHEET не найден!");
    const TABLE_IDS = process.env.TABLE_IDS;
    if (!TABLE_IDS)
        throw Error("TABLE_IDS не найден!");
    return {
        WB_API_KEY,
        GOOGLE_SERVICE_ACCOUNT_EMAIL,
        GOOGLE_PRIVATE_KEY,
        TARGET_SHEET,
        TABLE_IDS
    };
}
//# sourceMappingURL=config.js.map