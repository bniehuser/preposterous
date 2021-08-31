/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SystemStars_JumpRoute } from '../models/SystemStars_JumpRoute';
import { request as __request } from '../core/request';

export class SystemstarsService {

    /**
     * Posts SYSTEM_STARS_DATA payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postSystemstarsService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/systemstars`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves system star data
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getSystemstarsService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/systemstars`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts WORLD_SECTORS payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postSystemstarsService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/systemstars/worldsectors`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves world sector data
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getSystemstarsService1(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/systemstars/worldsectors`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves jump count from source to destination specified
     * @param source Can be any of the following:
     * 1) SystemId (XK-745)
     * 2) PlanetId
     * 3) PlanetNaturalId
     * 4) PlanetName
     *
     * @param destination Can be any of the following:
     * 1) SystemId (XK-745)
     * 2) PlanetId
     * 3) PlanetNaturalId
     * 4) PlanetName
     *
     * @returns number Success
     * @throws ApiError
     */
    public static async getSystemstarsService2(
        source: string,
        destination: string,
    ): Promise<number> {
        const result = await __request({
            method: 'GET',
            path: `/systemstars/jumpcount/${source}/${destination}`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves jump route from source to destination specified
     * @param source Can be any of the following:
     * 1) SystemId (XK-745)
     * 2) PlanetId
     * 3) PlanetNaturalId
     * 4) PlanetName
     *
     * @param destination Can be any of the following:
     * 1) SystemId (XK-745)
     * 2) PlanetId
     * 3) PlanetNaturalId
     * 4) PlanetName
     *
     * @returns SystemStars_JumpRoute Success
     * @throws ApiError
     */
    public static async getSystemstarsService3(
        source: string,
        destination: string,
    ): Promise<Array<SystemStars_JumpRoute>> {
        const result = await __request({
            method: 'GET',
            path: `/systemstars/jumproute/${source}/${destination}`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts SYSTEM_STAR data
     * @returns any Success
     * @throws ApiError
     */
    public static async postSystemstarsService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/systemstars/star`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves SYSTEM_STAR data provided a Star definition
     * @param star Can be any of the following:
     * 1) SystemId (hash)
     * 2) SystemName (Benten)
     * 3) SystemNaturalId (XK-745)
     *
     * @returns any Success
     * @throws ApiError
     */
    public static async getSystemstarsService4(
        star: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/systemstars/star/${star}`,
        });
        return result.body;
    }

}