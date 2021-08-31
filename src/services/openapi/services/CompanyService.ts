/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class CompanyService {

    /**
     * Posts COMPANY_DATA payload.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postCompanyService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/company`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts COMPANY_DATA_DATA payload.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postCompanyService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/company/data`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves company data by CompanyCode
     * @param companyCode The company code to lookup
     * @returns any Successfully retrieved company data.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getCompanyService(
        companyCode: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/company/code/${companyCode}`,
            errors: {
                401: `Current user is not authenticated or does not have permission to view the data`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves company data by CompanyName
     * @param companyName The company name to lookup
     * @returns any Successfully retrieved company data.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getCompanyService1(
        companyName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/company/name/${companyName}`,
            errors: {
                401: `Current user is not authenticated or does not have permission to view the data`,
            },
        });
        return result.body;
    }

}