import type { Axios } from "axios"
import createApiService from "../http/index.js"

export default class WbService {
    private wb_api_key: string
    private axiosInstance: Axios
    constructor(wb_api_key: string) {
        this.wb_api_key = wb_api_key
        this.axiosInstance = createApiService('https://common-api.wildberries.ru', this.wb_api_key)
    }

    async getTariffsBox(date: string) {
        const data = await this.axiosInstance.get('/api/v1/tariffs/box', {
            params: {
                date
            }
        })
        return data
    }
}