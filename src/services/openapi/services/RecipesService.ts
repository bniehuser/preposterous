/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Recipe_MinimalRecipe } from '../models/Recipe_MinimalRecipe';
import { request as __request } from '../core/request';

export class RecipesService {

    /**
     * Retrieves the recipes for a given ticker
     * @returns any Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRecipesService(ticker: string): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/recipe/${ticker}`,
        });
        return result.body;
    }

    /**
     * Retrieve all recipes
     * @returns Recipe_MinimalRecipe Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRecipesService1(): Promise<Array<Recipe_MinimalRecipe>> {
        const result = await __request({
            method: 'GET',
            path: `/recipes/allrecipes`,
            errors: {
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

}
