/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Planet_SearchRequest = {
    Materials?: Array<string>;
    IncludeRocky?: boolean;
    IncludeGaseous?: boolean;
    IncludeLowGravity?: boolean;
    IncludeHighGravity?: boolean;
    IncludeLowPressure?: boolean;
    IncludeHighPressure?: boolean;
    IncludeLowTemperature?: boolean;
    IncludeHighTemperature?: boolean;
    MustBeFertile?: boolean;
    MustHaveLocalMarket?: boolean;
    MustHaveChamberOfCommerce?: boolean;
    MustHaveWarehouse?: boolean;
    MustHaveAdministrationCenter?: boolean;
    MustHaveShipyard?: boolean;
    DistanceChecks?: Array<string>;
}
