/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class InfrastructureService {

    /**
     * Posts INFRASTRUCTURE_DATA_DATA data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postInfrastructureService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/infrastructure`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts INFRASTRUCTURE_PROJECTS_DATA data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postInfrastructureService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/infrastructure/project`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves infrastucture payload for the given PlanetOrInfrastructureId
     * @param planetOrInfrastructureId The planet or infrastucture id.  Can be any of the following:
     * 1) PopulationId/InfrastructureId
     * 2) PlanetId
     * 3) PlanetNaturalId
     * 4) PlanetName
     *
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getInfrastructureService(
        planetOrInfrastructureId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/infrastructure/${planetOrInfrastructureId}`,
        });
        return result.body;
    }

}