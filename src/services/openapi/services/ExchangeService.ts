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

    /**
     * Retrieves summarized information of all exchange data
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService1(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/all`,
        });
        return result.body;
    }

    /**
     * Retrieves all the exchange data, including order info
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService2(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/full`,
        });
        return result.body;
    }

    /**
     * Retrieves all exchange station data
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService3(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/station`,
        });
        return result.body;
    }

    /**
     * Retrieves exchange price chart data for the given ticker
     * @param exchangeTicker Format: 'Material.ExchangeCode'
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService4(
        exchangeTicker: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/cxpc/${exchangeTicker}`,
        });
        return result.body;
    }

    /**
     * Retrieves exchange price chart data for the given ticker
     * @param exchangeTicker Format: 'Material.ExchangeCode'
     * @param timeStamp Format: 'Milliseconds since epoch, UTC'
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService5(
        exchangeTicker: string,
        timeStamp: number,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/cxpc/${exchangeTicker}/${timeStamp}`,
        });
        return result.body;
    }

    /**
     * Retrieves a provided company code's orders on all exchanges
     * @param companyCode The 1 to 4 character company code
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService6(
        companyCode: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/orders/${companyCode}`,
        });
        return result.body;
    }

    /**
     * Retrieves a provided company code's orders on all exchanges
     * @param companyCode The 1 to 4 character company code
     * @param exchangeCode The 3 character exchange code
     * @returns any Successfully retrieved payload.
     * @throws ApiError
     */
    public static async getExchangeService7(
        companyCode: string,
        exchangeCode: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/exchange/orders/${companyCode}/${exchangeCode}`,
        });
        return result.body;
    }

}