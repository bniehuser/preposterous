/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class BuildingService {

    /**
     * Posts building game data (WorldReactorData) to the server.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postBuildingService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/building`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Gets a list of all buildings (WorldReactorData).
     * @returns any Retrieval success.  For payload, try it out
     * @throws ApiError
     */
    public static async getBuildingService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/building/allbuildings`,
        });
        return result.body;
    }

    /**
     * Retrieve a payload describing the specified BuildingTicker
     * @param buildingTicker The building ticker to retrieve
     * @returns any Retrieval success.  For payload, try it out
     * @throws ApiError
     */
    public static async getBuildingService1(
        buildingTicker: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/building/${buildingTicker}`,
        });
        return result.body;
    }

}