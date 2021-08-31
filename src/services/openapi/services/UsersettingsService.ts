/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserSettings_BurnRate_Exclusion } from '../models/UserSettings_BurnRate_Exclusion';
import { request as __request } from '../core/request';

export class UsersettingsService {

    /**
     * Currently unused.  Will be used in the future
     * @returns any Success
     * @throws ApiError
     */
    public static async postUsersettingsService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/usersettings/general`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Currently unused.  Will be used in the future
     * @returns any Success
     * @throws ApiError
     */
    public static async getUsersettingsService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/usersettings/general`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Currently unused.  Will be used in the future
     * @param userName
     * @returns any Success
     * @throws ApiError
     */
    public static async getUsersettingsService1(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/usersettings/general/${userName}`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Adds a BurnRateExclusion
     * @param burnRateExclusion A BurnRateExclusion
     * @returns any Success
     * @throws ApiError
     */
    public static async postUsersettingsService1(
        burnRateExclusion: UserSettings_BurnRate_Exclusion,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/usersettings/burnrate/addexclusion`,
            body: burnRateExclusion,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Deletes a BurnRateExclusion
     * @param burnRateExclusion A BurnRateExclusion
     * @returns any Success
     * @throws ApiError
     */
    public static async postUsersettingsService2(
        burnRateExclusion: UserSettings_BurnRate_Exclusion,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/usersettings/burnrate/deleteexclusion`,
            body: burnRateExclusion,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves BurnRateSettings for the specified user
     * @param userName The UserName to retrieve BurnRate settings for
     * @returns any Success
     * @throws ApiError
     */
    public static async getUsersettingsService2(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/usersettings/burnrate/${userName}`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrivies BurnRateSettings for the specified user on the specified planet
     * @param userName The UserName to retrieve BurnRate settings for
     * @param planetNaturalId The PlanetNaturalId
     * @returns any Success
     * @throws ApiError
     */
    public static async getUsersettingsService3(
        userName: string,
        planetNaturalId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/usersettings/burnrate/${userName}/${planetNaturalId}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissiosn`,
            },
        });
        return result.body;
    }

    /**
     * Currently unused.  Will be used in the future
     * @returns any Success
     * @throws ApiError
     */
    public static async postUsersettingsService3(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/usersettings/burnrate/yellowthreshold`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Currently unused.  Will be used in the future
     * @returns any Success
     * @throws ApiError
     */
    public static async postUsersettingsService4(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/usersettings/burnrate/redthreshold`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

}