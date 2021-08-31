/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Rain_PlanetBuilding = {
    NaturalId?: string;
    /**
     * The right-hand side hash is the first 8 characters of the BuildingId
     */
    Id?: string;
    Ticker?: string;
    /**
     * This is a long integer which represents epoch time in milliseconds
     */
    Created?: number;
    /**
     * The condition of the building
     */
    Condition?: number;
}
