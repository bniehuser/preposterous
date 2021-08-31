/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class LocalmarketService {

    /**
     * Posts LOCAL_MARKET_DATA_DATA data payload
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postLocalmarketService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/localmarket`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves LocalMarket data for the provided LocalMarketId
     * @param localMarketId The MarketId (see payload in FIORest)
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getLocalmarketService(
        localMarketId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/localmarket/${localMarketId}`,
        });
        return result.body;
    }

    /**
     * Retrieves LocalMarket data for provided Planet
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getLocalmarketService1(
        planet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/localmarket/planet/${planet}`,
        });
        return result.body;
    }

    /**
     * Retrieves LocalMarket data for provided Planet and specified type
     * @param planet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @param type Can be any of the following:
     * 1) BUY | BUYS | BUYING
     * 2) SELL | SELLS | SELLING
     * 3) SHIP | SHIPPING
     *
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getLocalmarketService2(
        planet: string,
        type: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/localmarket/planet/${planet}/${type}`,
        });
        return result.body;
    }

    /**
     * Retrieves shipping LocalMarket data for the provided Planet where the pick-up location is SourcePlanet
     * @param sourcePlanet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getLocalmarketService3(
        sourcePlanet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/localmarket/shipping/source/${sourcePlanet}`,
        });
        return result.body;
    }

    /**
     * Retrieves shipping LocalMarket data for the provided Planet where the drop-off location is DestinationPlanet
     * @param destinationPlanet Can be any of the following:
     * 1) PlanetId
     * 2) PlanetNaturalId
     * 3) PlanetName
     *
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getLocalmarketService4(
        destinationPlanet: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/localmarket/shipping/destination/${destinationPlanet}`,
        });
        return result.body;
    }

    /**
     * Retrieves all ads found by specified Company
     * @param company Can be any of the following:
     * 1) CompanyId
     * 2) CompanyId
     * 3) CompanyName
     *
     * @returns any Successfully retrieved payload.  See FIORest source for payload definition
     * @throws ApiError
     */
    public static async getLocalmarketService5(
        company: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/localmarket/company/${company}`,
        });
        return result.body;
    }

}