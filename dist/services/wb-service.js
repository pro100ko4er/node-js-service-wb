import { AxiosError } from "axios";
import createApiService from "../http/index.js";
export default class WbService {
    wb_api_key;
    axiosInstance;
    constructor(wb_api_key) {
        this.wb_api_key = wb_api_key;
        this.axiosInstance = createApiService('https://common-api.wildberries.ru', this.wb_api_key);
    }
    async getTariffsBox(date) {
        try {
            const response = await this.axiosInstance.get('/api/v1/tariffs/box', {
                params: {
                    date
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    if (error.response.status === 429) {
                        throw Error('429wb');
                    }
                }
                throw Error(error.message, { cause: error.response?.data });
            }
            throw error;
        }
    }
}
//# sourceMappingURL=wb-service.js.map