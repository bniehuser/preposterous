/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Rain_Building } from '../models/Rain_Building';
import type { Rain_BuildingCost } from '../models/Rain_BuildingCost';
import type { Rain_BuildingRecipe } from '../models/Rain_BuildingRecipe';
import type { Rain_BuildingWorkforce } from '../models/Rain_BuildingWorkforce';
import type { Rain_Liquid } from '../models/Rain_Liquid';
import type { Rain_Material } from '../models/Rain_Material';
import type { Rain_PlanetBuilding } from '../models/Rain_PlanetBuilding';
import type { Rain_PlanetBuildingReclaimable } from '../models/Rain_PlanetBuildingReclaimable';
import type { Rain_PlanetProduction } from '../models/Rain_PlanetProduction';
import type { Rain_PlanetProductionInput } from '../models/Rain_PlanetProductionInput';
import type { Rain_PlanetProductionOutput } from '../models/Rain_PlanetProductionOutput';
import type { Rain_PlanetResource } from '../models/Rain_PlanetResource';
import type { Rain_PlanetWorkforce } from '../models/Rain_PlanetWorkforce';
import type { Rain_Prices } from '../models/Rain_Prices';
import type { Rain_RecipeInput } from '../models/Rain_RecipeInput';
import type { Rain_RecipeOutput } from '../models/Rain_RecipeOutput';
import type { Rain_Storage } from '../models/Rain_Storage';
import type { Rain_UserPlanet } from '../models/Rain_UserPlanet';
import { request as __request } from '../core/request';

export class RainService {

    /**
     * Retrieves all building data
     * @returns Rain_Building Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService(): Promise<Array<Rain_Building>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/buildings`,
        });
        return result.body;
    }

    /**
     * Retrieves all building cost data (normalized)
     * @returns Rain_BuildingCost Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService1(): Promise<Array<Rain_BuildingCost>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/buildingcosts`,
        });
        return result.body;
    }

    /**
     * Retrieves all building workforce data (normalized)
     * @returns Rain_BuildingWorkforce Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService2(): Promise<Array<Rain_BuildingWorkforce>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/buildingworkforces`,
        });
        return result.body;
    }

    /**
     * Retrieves all building recipe data (normalized)
     * @returns Rain_BuildingRecipe Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService3(): Promise<Array<Rain_BuildingRecipe>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/buildingrecipes`,
        });
        return result.body;
    }

    /**
     * Retrieves all material data
     * @returns Rain_Material Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService4(): Promise<Array<Rain_Material>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/materials`,
        });
        return result.body;
    }

    /**
     * Retrieves all CX price data
     * @returns Rain_Prices Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService5(): Promise<Array<Rain_Prices>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/prices`,
        });
        return result.body;
    }

    /**
     * Retrieves all recipe input data (normalized)
     * @returns Rain_RecipeInput Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService6(): Promise<Array<Rain_RecipeInput>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/recipeinputs`,
        });
        return result.body;
    }

    /**
     * Retrieves all recipe output data (normalized)
     * @returns Rain_RecipeOutput Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService7(): Promise<Array<Rain_RecipeOutput>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/recipeoutputs`,
        });
        return result.body;
    }

    /**
     * Retrieves all planet resource data (normalized)
     * @returns Rain_PlanetResource Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService8(): Promise<Array<Rain_PlanetResource>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/planetresources`,
        });
        return result.body;
    }

    /**
     * Retrieves liquid asset data for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_Liquid Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService9(
        userName: string,
    ): Promise<Array<Rain_Liquid>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userliquid/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planets for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_UserPlanet Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService10(
        userName: string,
    ): Promise<Array<Rain_UserPlanet>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanets/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet buildings for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_PlanetBuilding Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService11(
        userName: string,
    ): Promise<Array<Rain_PlanetBuilding>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanetbuildings/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet building reclaimables for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_PlanetBuildingReclaimable Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService12(
        userName: string,
    ): Promise<Array<Rain_PlanetBuildingReclaimable>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanetbuildingreclaimables/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet production for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_PlanetProduction Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService13(
        userName: string,
    ): Promise<Array<Rain_PlanetProduction>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanetproduction/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet production inputs for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_PlanetProductionInput Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService14(
        userName: string,
    ): Promise<Array<Rain_PlanetProductionInput>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanetproductioninput/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet production outputs for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_PlanetProductionOutput Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService15(
        userName: string,
    ): Promise<Array<Rain_PlanetProductionOutput>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanetproductionoutput/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet production workforces for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_PlanetWorkforce Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService16(
        userName: string,
    ): Promise<Array<Rain_PlanetWorkforce>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userplanetworkforce/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves planet production workforces for the given UserName
     * @param userName The username to retrieve data for
     * @returns Rain_Storage Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRainService17(
        userName: string,
    ): Promise<Array<Rain_Storage>> {
        const result = await __request({
            method: 'GET',
            path: `/rain/userstorage/${userName}`,
            errors: {
                401: `Current user is not authenticated or does not have appropriate permissions`,
            },
        });
        return result.body;
    }

}