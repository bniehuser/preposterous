/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Auth_ChangePassword } from '../models/Auth_ChangePassword';
import type { Auth_CreateApiKey } from '../models/Auth_CreateApiKey';
import type { Auth_LoginAndPassword } from '../models/Auth_LoginAndPassword';
import type { Auth_LoginResponse } from '../models/Auth_LoginResponse';
import type { Auth_PermissionAllowance } from '../models/Auth_PermissionAllowance';
import type { Auth_RevokeApiKey } from '../models/Auth_RevokeApiKey';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login to FIO
     * Authenticates against FIO.
     * Any requests that require auth must have the response AuthToken as a HTTP header:
     * `Authorization`:`<AUTH_TOKEN_HASH>`
     *
     * @param loginAndPasswordPayload Login and password for user
     * @returns Auth_LoginResponse Successfully authenticated
     * @throws ApiError
     */
    public static async postAuthService(
        loginAndPasswordPayload: Auth_LoginAndPassword,
    ): Promise<Auth_LoginResponse> {
        const result = await __request({
            method: 'POST',
            path: `/auth/login`,
            body: loginAndPasswordPayload,
            errors: {
                400: `Failed to parse payload`,
                401: `Failed to authenticate`,
            },
        });
        return result.body;
    }

    /**
     * Determines if the user is authenticated
     * @returns any Authenticated
     * @throws ApiError
     */
    public static async getAuthService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/auth`,
            errors: {
                401: `Not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves all permission allowances
     * @returns Auth_PermissionAllowance Successfully retrieved permission allowances
     * @throws ApiError
     */
    public static async getAuthService1(): Promise<Array<Auth_PermissionAllowance>> {
        const result = await __request({
            method: 'GET',
            path: `/auth/permissions`,
            errors: {
                401: `User not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves all allowances given to the user
     * @returns Auth_PermissionAllowance Successfully retrieved all allowances given to the user
     * @throws ApiError
     */
    public static async getAuthService2(): Promise<Array<Auth_PermissionAllowance>> {
        const result = await __request({
            method: 'GET',
            path: `/auth/visibility`,
            errors: {
                401: `User not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves all users where we have the permissionType specified given to us
     * @param permissionType The PermissionType
     * @returns string Successfully retrieved list of users who have given us the permissionType specified
     * @throws ApiError
     */
    public static async getAuthService3(
        permissionType: 'flight' | 'building' | 'storage' | 'production' | 'workforce' | 'experts' | 'contracts' | 'shipmenttracking',
    ): Promise<Array<string>> {
        const result = await __request({
            method: 'GET',
            path: `/auth/visibility/${permissionType}`,
            errors: {
                401: `User not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Refreshes the user's auth token
     * @returns any Successfully refreshed and AuthToken expiry is now current time plus 24 hours
     * @throws ApiError
     */
    public static async postAuthService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/refreshauthtoken`,
            errors: {
                400: `Failed to find authentication model.  Internal server error`,
                401: `User not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Changes the user's password
     * @param changePasswordPayload Old and new password
     * @returns any Successfully changed password
     * @throws ApiError
     */
    public static async postAuthService2(
        changePasswordPayload: Auth_ChangePassword,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/changepassword`,
            body: changePasswordPayload,
            errors: {
                400: `Failed to parse payload`,
                401: `User not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Add a permission allowance
     * @param permissionAllowancePayload A payload of a user and the permissions you grant them
     * @returns any Successfully added permission allowance
     * @throws ApiError
     */
    public static async postAuthService3(
        permissionAllowancePayload: Auth_PermissionAllowance,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/addpermission`,
            body: permissionAllowancePayload,
            errors: {
                400: `Failed to parse payload`,
                401: `User not authenticated`,
                404: `User specified not found`,
            },
        });
        return result.body;
    }

    /**
     * Delete a permission allowance
     * @param userName The UserName for which to delete the permission allowance
     * @returns any Successfully removed permission allowance
     * @throws ApiError
     */
    public static async postAuthService4(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/deletepermission/${userName}`,
            errors: {
                401: `User not authenticated`,
                404: `User not present in permission allowance table`,
            },
        });
        return result.body;
    }

    /**
     * Creates an API key
     * @param createApiKeyPayload The payload required for creating an API key.
     * @returns any Successfully created API key. Plaintext payload response
     * @throws ApiError
     */
    public static async postAuthService5(
        createApiKeyPayload: Auth_CreateApiKey,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/createapikey`,
            body: createApiKeyPayload,
            errors: {
                400: `Failed to parse payload or Application specified was empty`,
                401: `Failed to authenticate`,
                406: `Exceed 20 API key limit`,
            },
        });
        return result.body;
    }

    /**
     * Revokes an API key
     * @param revokeApiKeyPayload The payload required for revoking an API key.
     * @returns any Successfully revoked API key
     * @throws ApiError
     */
    public static async postAuthService6(
        revokeApiKeyPayload: Auth_RevokeApiKey,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/revokeapikey`,
            body: revokeApiKeyPayload,
            errors: {
                400: `Failed to parse payload`,
                401: `Failed to authenticate`,
            },
        });
        return result.body;
    }

    /**
     * Lists all API keys
     * @param revokeApiKeyPayload The payload required for retrieving all API keys.
     * @returns any Successfully revoked API key
     * @throws ApiError
     */
    public static async postAuthService7(
        revokeApiKeyPayload: Auth_LoginAndPassword,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/listapikeys`,
            body: revokeApiKeyPayload,
            errors: {
                400: `Failed to parse payload`,
                401: `Failed to authenticate`,
            },
        });
        return result.body;
    }

}