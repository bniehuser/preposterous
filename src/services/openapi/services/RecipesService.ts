/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Recipe_MinimalRecipe } from '../models/Recipe_MinimalRecipe';
import { request as __request } from '../core/request';

export class RecipesService {

    /**
     * Retrieve all recipes
     * @returns Recipe_MinimalRecipe Successfully retrieved payload
     * @throws ApiError
     */
    public static async getRecipesService(): Promise<Array<Recipe_MinimalRecipe>> {
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