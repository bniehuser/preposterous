/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class GlobalService {

    /**
     * Posts COMEX_EXCHANGE_LIST data
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postGlobalService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/global/comexexchanges`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated or isn't admin`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves COMEX_EXCHANGE_LIST data
     * @returns any Successfully retrieved
     * @throws ApiError
     */
    public static async getGlobalService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/global/comexexchanges`,
        });
        return result.body;
    }

    /**
     * Posts COUNTRY_REGISTRY_COUNTRIES data
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postGlobalService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/global/countries`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated or isn't admin`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves COUNTRY_REGISTRY_COUNTRIES data
     * @returns any Successfully retrieved
     * @throws ApiError
     */
    public static async getGlobalService1(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/global/countries`,
        });
        return result.body;
    }

    /**
     * Posts SIMULATION_DATA data
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postGlobalService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/global/simulationdata`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated or isn't admin`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves SIMULATION_DATA data
     * @returns any Successfully retrieved
     * @throws ApiError
     */
    public static async getGlobalService2(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/global/simulationdata`,
        });
        return result.body;
    }

    /**
     * Retrieves workforce needs
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getGlobalService3(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/global/workforceneeds`,
        });
        return result.body;
    }

}