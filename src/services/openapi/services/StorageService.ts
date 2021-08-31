/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class StorageService {

    /**
     * Posts STORAGE_CHANGE payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postStorageService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/storage/change`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves storage data
     * @param userName The username to retrieve storage data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getStorageService(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/storage/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves list of Planets where storage data exists for UserName
     * @param userName The username to retrieve storage data for
     * @returns string Successfully retrieved payload
     * @throws ApiError
     */
    public static async getStorageService1(
        userName: string,
    ): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/storage/planets/${userName}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves list of Planets where storage data exists for UserName
     * @param userName The username to retrieve storage data for
     * @param storageDescription Can be any of the following:
     * 1) StorageId
     * 2) PlanetId
     * 3) PlanetNaturalId
     * 4) PlanetName
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getStorageService2(
        userName: string,
        storageDescription: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/storage/${userName}/${storageDescription}`,
            errors: {
                401: `Current user is not authenticated or doesn't have appropriate permissions`,
            },
        });
        return result.body;
    }

}