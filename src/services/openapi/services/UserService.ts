/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Posts USER_DATA payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postUserService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/user`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves all FIO users
     * @returns string Successfully retrieved payload
     * @throws ApiError
     */
    public static async getUserService(): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/user/allusers`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves userdata for specified UserName
     * @param userName The username to retrieve user data for
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getUserService1(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/user/${userName}`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Resets the current user's data.
     * This will delete the following data for your User:
     * 1) Company data
     * 2) ProductionLine data
     * 3) Ship data
     * 4) Site data
     * 5) Workforce data
     * 6) User data
     * 7) Warehouse data
     * 8) Contract data
     *
     * You should only use this if your data has been corrupted by excess hydration timeouts
     *
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async postUserService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/user/resetalldata`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

}