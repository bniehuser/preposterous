/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Rain_PlanetResource = {
    Key?: string;
    Planet?: string;
    Ticker?: string;
    /**
     * Can be any of the following:
     * 1) MINERAL
     * 2) LIQUID
     * 3) GASEOUS
     *
     */
    Type?: string;
    /**
     * The factor at which extraction occurrs.  To get daily extraction:
     * - GASEOUS: Factor * 0.60
     * - LIQUID: Factor * 0.70
     * - MINERAL: Factor * 0.70
     *
     */
    Factor?: number;
}
