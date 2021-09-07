/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Planet_ListItem } from '../models/Planet_ListItem';
import type { Planet_SearchRequest } from '../models/Planet_SearchRequest';
import { request as __request } from '../core/request';

export class PlanetService {

    /**
     * Posts PLANET_DATA_DATA payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postPlanetService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/planet`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts PLANET_COGC_DATA payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postPlanetService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/planet/cogc`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts PLANET_SITES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postPlanetService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/planet/sites`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Searches for a planet given the parameters in the payload
     * @param planetSearchParameters The search parameters. Limitations:
     * 1) Only the first 4 entries in the Materials array will be considered
     * 2) Workforce populations (JobData) will not be present if not authenticated
     * 3) DistanceResults will not be present if not authenticated
     * 4) Only the first 3 entries in the DistanceChecks array will be considered
     *
     * @returns any Successful
     * @throws ApiError
     */
    public static async postPlanetService3(
        planetSearchParameters: Planet_SearchRequest,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/planet/search`,
            body: planetSearchParameters,
            errors: {
                400: `Failed to parse payload`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a list of all planets (minimal payload)
     * @returns Planet_ListItem Successfully retrieved list of all planets
     * @throws ApiError
     */
    public static async getPlanetService(): Promise<Array<Planet_ListItem>> {
        const result = await __request({
            method: 'GET',
            path: `/planet/allplanets`,
        });
        return result.body;
    }

    /**
     * Retrieves all planet data for all planets
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getPlanetService1(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/planet/allplanets/full`,
        });
        return result.body;
    }

    /**
     * Retrieves planet payload.  See FIORest for payload definition
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getPlanetService2(
        planet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/planet/${planet}`,
        });
        return result.body;
    }

    /**
     * Retrieves the planet sites payload.  See FIORest for payload definition
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getPlanetService3(
        planet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/planet/sites/${planet}`,
        });
        return result.body;
    }

    /**
     * Retrieves the number of planet sites for the provided Planet
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getPlanetService4(
        planet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/planet/sitescounts/${planet}`,
        });
        return result.body;
    }

}