/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class VersionService {

    /**
     * Retrieves latest version number of the FIOUI
     * @returns string Success
     * @throws ApiError
     */
    public static async getVersionService(): Promise<string> {
        const result = await __request({
            method: 'GET',
            path: `/version/latest`,
        });
        return result.body;
    }

    /**
     * Retrieves latest version release notes of the FIOUI as an rtf file
     * @returns any Success
     * @throws ApiError
     */
    public static async getVersionService1(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/version/releasenotes`,
        });
        return result.body;
    }

    /**
     * Retrieves latest FIOUI setup executable
     * @returns any Success
     * @throws ApiError
     */
    public static async getVersionService2(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/version/download`,
        });
        return result.body;
    }

    /**
     * Redirects you to to the FIO Chrome Extension page
     * @returns any Success
     * @throws ApiError
     */
    public static async getVersionService3(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/version/extension/download`,
        });
        return result.body;
    }

    /**
     * Retrieves the latest version of the FIO uploader script
     * @returns any Success
     * @throws ApiError
     */
    public static async getVersionService4(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/version/extension/script`,
        });
        return result.body;
    }

}