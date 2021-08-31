/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class MaterialService {

    /**
     * Posts WORLD_MATERIAL_CATEGORIES payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postMaterialService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/material`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves all materials.  See FIORest source for payload definition
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getMaterialService(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/material/allmaterials`,
        });
        return result.body;
    }

    /**
     * Retrieves an individual material by Ticker.  See FIORest source for payload definition
     * @param materialTicker The Ticker of the material to retrieve
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getMaterialService1(
        materialTicker: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/material/${materialTicker}`,
        });
        return result.body;
    }

    /**
     * Retrieves all materials that belong to the provided CategoryName. See FIORest source for payload definition
     * @param categoryName The CategoryName to retrieve
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getMaterialService2(
        categoryName: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/material/category/${categoryName}`,
        });
        return result.body;
    }

}