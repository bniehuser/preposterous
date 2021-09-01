/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class WorkforceService {

    /**
     * Posts WORKFORCE_WORKFORCES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postWorkforceService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/workforce`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves workforce data for the specified user
     * @param userName The username to retrieve workforce data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getWorkforceService(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/workforce/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves list of planet where the specified user has Workforce data
     * @param userName The username to retrieve workforce data for
     * @returns string Successfully retrieved payload
     * @throws ApiError
     */
    public static async getWorkforceService1(
        userName: string,
    ): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/workforce/planets/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves workforce data for the specified usernaem and planet
     * @param userName The username to retrieve workforce data for
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getWorkforceService2(
        userName: string,
        planet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/workforce/${userName}/${planet}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

}
