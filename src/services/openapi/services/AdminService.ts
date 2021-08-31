/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Admin_Create } from '../models/Admin_Create';
import type { Admin_Disable } from '../models/Admin_Disable';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * Check if the user is an administrator
     * @returns any User is an admin
     * @throws ApiError
     */
    public static async getAdminService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/admin`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Checks if the UserName provided exists
     * @param userName The username to check
     * @returns any The username exists
     * @throws ApiError
     */
    public static async getAdminService1(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/admin/${userName}`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a list of all usernames provided data from chat messages
     * @returns string Successfully retrieved a list of all users
     * @throws ApiError
     */
    public static async getAdminService2(): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/admin/allusers`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a count of all usernames provided data from chat messages
     * @returns number Successfully retrieved a count of all users
     * @throws ApiError
     */
    public static async getAdminService3(): Promise<number> {
        const result = await __request({
            method: 'GET',
            path: `/admin/usercount`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves request data statistics for this run instance
     * @returns any Successfully retrieved request data statistics
     * @throws ApiError
     */
    public static async getAdminService4(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/admin/requestdata`,
        });
        return result.body;
    }

    /**
     * Creates an account
     * @param adminCreatePayload New account information
     * @returns any User successfully created/overwritten
     * @throws ApiError
     */
    public static async postAdminService(
        adminCreatePayload: Admin_Create,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/create`,
            body: adminCreatePayload,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Disables an account
     * @param disablePayload Payload to disable an account with reason
     * @returns any User successfully disabled
     * @throws ApiError
     */
    public static async postAdminService1(
        disablePayload: Admin_Disable,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/disable`,
            body: disablePayload,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Clears all CX Data
     * @returns any Successfully cleared all CX data
     * @throws ApiError
     */
    public static async postAdminService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/clearcxdata`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Clears all MAT Data
     * @returns any Successfully cleared all MAT data
     * @throws ApiError
     */
    public static async postAdminService3(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/clearmatdata`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Clears all JumpCache Data
     * @returns any Successfully cleared all JumpCache data
     * @throws ApiError
     */
    public static async postAdminService4(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/clearjumpcache`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * @deprecated
     * Force update system ids (manual upgrade path)
     * @returns any Successfully force updated all PlanetDataModel systemids
     * @throws ApiError
     */
    public static async postAdminService5(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/forceupdatesystemid`,
            errors: {
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

    /**
     * Resets the provided username's userdata"
     * @param userName The UserName to reset
     * @returns any The username's userdata was successfully reset
     * @throws ApiError
     */
    public static async postAdminService6(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/admin/resetuserdata/${userName}`,
            errors: {
                400: `The user doesn't exist`,
                401: `Current user is not authenticated and/or not an administrator`,
            },
        });
        return result.body;
    }

}