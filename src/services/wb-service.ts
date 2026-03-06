import { AxiosError, type Axios } from "axios"
import createApiService from "../http/index.js"
import type { ITariffsBoxSchemaWithoutId } from "../db/schemes.js"


export interface ITariffsBoxWbFormat {
    response: {
        data: {
            dtNextBox: string,
            dtTillMax: string,
            warehouseList: ITariffsBoxSchemaWithoutId[]
        }
    }
}


export default class WbService {
    private wb_api_key: string
    private axiosInstance: Axios
    constructor(wb_api_key: string) {
        this.wb_api_key = wb_api_key
        this.axiosInstance = createApiService('https://common-api.wildberries.ru', this.wb_api_key)
    }

    async getTariffsBox(date: string) {
        try {
            const response = await this.axiosInstance.get<ITariffsBoxWbFormat>('/api/v1/tariffs/box', {
            params: {
                date
            }
            })
            return response.data
        } catch (error) {
            if(error instanceof AxiosError) {
                if(error.response) {
                    if(error.response.status === 429) {
                        throw Error('429wb')
                    }
                }
                throw Error(error.message, {cause: error.response?.data})
            }
            throw error
        }
        
    }
}