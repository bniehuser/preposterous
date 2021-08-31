/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class CxosService {

    /**
     * Posts COMEX_TRADER_ORDERS data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postCxosService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/cxos`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts COMEX_TRADER_ORDER_ADDED data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postCxosService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/cxos/added`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts COMEX_TRADER_ORDER_REMOVED data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postCxosService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/cxos/removed`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts COMEX_TRADER_ORDER_UPDATED data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postCxosService3(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/cxos/updated`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves CXOS data for provided username.  See FIORest source for payload definition
     * @param userName The username to lookup CXOS data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getCxosService(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/cxos/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

}