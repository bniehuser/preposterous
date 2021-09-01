/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class SitesService {

    /**
     * Posts SITE_SITES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postSitesService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/sites`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts STORAGE_WAREHOUSES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postSitesService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/sites/warehouses`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves site data
     * @param userName The username to retrieve site data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getSitesService(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/sites/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves list of planet user has site data for
     * @param userName The username to retrieve site data for
     * @returns string Successfully retrieved payload.  List of PlanetId returned
     * @throws ApiError
     */
    public static async getSitesService1(
        userName: string,
    ): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/sites/planets/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves list of planet user has site data for
     * @param userName The username to retrieve site data for
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload.  Site data for specified Planet
     * @throws ApiError
     */
    public static async getSitesService2(
        userName: string,
        planet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/sites/${userName}/${planet}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves all warehouse sites the user has
     * @param userName The username to retrieve site data for
     * @returns any Successfully retrieved payload.  Site data for specified Planet
     * @throws ApiError
     */
    public static async getSitesService3(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/sites/warehouses/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Posts STORAGE_STORAGES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postSitesService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/storage`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

}
