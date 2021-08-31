/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class ContractService {

    /**
     * Posts CONTRACTS_CONTRACTS payload. See FIORest source for payload definition
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postContractService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/contract`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts CONTRACTS_CONTRACT payload. See FIORest source for payload definition
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postContractService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/contract/change`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves most recent 100 contracts for the current user
     * @returns any Successfully retrieved contracts payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getContractService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/allcontracts`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves most recent 100 contracts for the given UserName
     * @param userName The UserName to lookup
     * @returns any Successfully retrieved contracts payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getContractService1(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/allcontracts/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have permission`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves contracts which can be extended or are within 1 day of ending
     * @returns any Successfully retrieved contracts payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getContractService2(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/concerns`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves concerning contracts for the given UserName
     * Concerning contracts are defined as contracts which:
     * 1) Can be extended
     * 2) Are within 1 day of ending
     *
     * @param userName The UserName to lookup
     * @returns any Successfully retrieved contracts payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getContractService3(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/concerns/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have permission`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves loan contracts for the current user
     * @returns any Successfully retrieved contracts payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getContractService4(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/loans`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves loan contracts for the given UserName
     * @param userName The UserName to lookup
     * @returns any Successfully retrieved contracts payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getContractService5(
        userName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/loans/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have permission`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves taco statistics for EatTacos88
     * @returns any Successfully retrieved contracts payload.
     * @throws ApiError
     */
    public static async getContractService6(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/taco`,
            errors: {
                401: `Current user is not authenticated or does not have permission`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves information on the location of your shipments
     * This will retrieve the location of your shipment, assuming that user
     * is also present on FIO and has given you the 'ShipmentTracking' permission
     *
     * @returns any Successfully retrieved shipment tracking information.  See payload.
     * @throws ApiError
     */
    public static async getContractService7(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contract/shipments`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

}