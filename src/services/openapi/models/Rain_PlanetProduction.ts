/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Rain_PlanetProduction = {
    NaturalId?: string;
    /**
     * The building name (not Ticker)
     */
    Type?: string;
    /**
     * The right-hand side hash is the first 8 characters of the Production id
     */
    Id?: string;
    /**
     * Percentage complete of this production line
     */
    Completed?: number;
    /**
     * The amount of time remaining until production completion in milliseconds
     */
    Remaining?: number;
}
