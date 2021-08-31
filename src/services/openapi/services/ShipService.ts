/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class ShipService {

    /**
     * Posts SHIP_SHIPS payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postShipService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/ship/ships`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts SHIP_FLIGHT_FLIGHTS payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postShipService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/ship/flights`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves ship data
     * @param userName The username to retrieve ship data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getShipService(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/ship/ships/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves ship fuel store data
     * @param userName The username to ship stl/ftl store models for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getShipService1(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/ship/ships/fuel/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves ship flight data
     * @param userName The username to retrieve flight data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getShipService2(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/ship/flights/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

}