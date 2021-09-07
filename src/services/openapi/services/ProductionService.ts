/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class ProductionService {

    /**
     * Posts PRODUCTION_SITE_PRODUCTION_LINES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postProductionService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/production`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve all production lines for provided UserName
     * @param userName The username to retrieve production lines for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getProductionService(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/production/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve all the planets where production lines are present for the provided UserName
     * @param userName The username to retrieve a planet list for
     * @returns string Successfully retrieved payload
     * @throws ApiError
     */
    public static async getProductionService1(
        userName: string,
    ): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/production/planets/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve production line for the given UserName on the specified Planet
     * @param userName The username to retrieve a planet list for
     * @param planet The planet.  It can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getProductionService2(
        userName: string,
        planet: string,
    ): Promise<Array<any>> {
        const result = await __request({
            method: 'GET',
            path: `/production/${userName}/${planet}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

}