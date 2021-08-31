/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class ExchangeService {

    /**
     * Posts COMEX_BROKER_DATA data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postExchangeService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/exchange`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves Exchange data for the provided ExchangeTicker
     * @param exchangeTicker Format: 'Material.ExchangeCode'
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getExchangeService(
        exchangeTicker: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/${exchangeTicker}`,
        });
        return result.body;
    }

}