/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Recipe_MinimalInput } from './Recipe_MinimalInput';
import type { Recipe_MinimalOutput } from './Recipe_MinimalOutput';

export type Recipe_MinimalRecipe = {
    BuildingTicker?: string;
    RecipeName?: string;
    Inputs?: Array<Recipe_MinimalInput>;
    Outputs?: Array<Recipe_MinimalOutput>;
    /**
     * Time in milliseconds
     */
    TimeMs?: number;
}
