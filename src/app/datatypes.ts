type ResourceTypeId = 'MINERAL'|'LIQUID'|'GASEOUS';

interface BuildRequirement {
  MaterialName: string;
  MaterialId: string;
  MaterialTicker: string;
  MaterialCategory: string;
  MaterialAmount: number;
  MaterialWeight: number;
  MaterialVolume: number;
}

type IndustryId = 'CHEMISTRY'|'CONSTRUCTION'|'ELECTRONICS'|'FOOD_INDUSTRIES'|'FUEL_REFINING'|'MANUFACTURING'|'METALLURGY'|'RESOURCE_EXTRACTION'|'AGRICULTURE';
type CurrencyId = 'NCC'|'CIS'|'AIC'|'ICA'|'ECD';

interface ProductionFee {
  Category: IndustryId;
  FeeAmount: number;
  FeeCurrency: CurrencyId;
}

interface PlanetaryResource {
  MaterialId: string;
  ResourceType: ResourceTypeId;
  Factor: number;
}

export interface PlanetData {
  PlanetId: string;
  PlanetNaturalId: string;
  PlanetName: string;
  SystemId: string;
  Resources: PlanetaryResource[];
  BuildRequirements: BuildRequirement[];
  ProductionFees: ProductionFee[];
  COGCPrograms: any[];
  COGCVotes: any[];
  COGCUpkeep: any[];
  Namer: string|null;
  NamingDataEpochMs: number;
  Nameable: boolean;
  Gravity: number;
  MagneticField: number;
  Mass: number;
  MassEarth: number;
  OrbitSemiMajorAxis: number;
  OrbitEccentricity: number;
  OrbitInclination: number;
  OrbitRightAscension: number;
  OrbitPeriapsis: number;
  OrbitIndex: number;
  Pressure: number;
  Radiation: number;
  Radius: number;
  Sunlight: number;
  Surface: boolean;
  Temperature: number;
  Fertility: number;
  HasLocalMarket: boolean;
  HasChamberOfCommerce: boolean;
  HasWarehouse: boolean;
  HasAdministrationCenter: boolean;
  HasShipyard: boolean;
  FactionCode: string|null;
  FactionName: string|null;
  GovernorId: string|null;
  GovernorUserName: string|null;
  GovernorCorporationId: string|null;
  GovernorCorporationName: string|null;
  GovernorCorporationCode: string|null;
  CurrencyName: string|null;
  CurrencyCode: CurrencyId|null;
  CollectorId: string|null;
  CollectorName: string|null;
  CollectorCode: string|null; // TODO: what is this?
  BaseLocalMarketFee: number;
  LocalMarketFeeFactor: number;
  WarehouseFee: number;
  PopulationId: string;
  COGCProgramStatus: string|null; // enum?
  PlanetTier: number;
  UserNameSubmitted: string;
  Timestamp: string; // TODO: convert to ts number
}

export interface CommodityAmount {
  CommodityName: string;
  CommodityTicker: string;
  Weight: number;
  Volume: number;
  Amount: number;
}

export interface BuildingRecipe {
  Inputs: CommodityAmount[];
  Outputs: CommodityAmount[];
  RecipeName: string;
  DurationMs: number;
}

export interface BuildingData {
  BuildingCosts: CommodityAmount[];
  Recipes: BuildingRecipe[];
  Name: string;
  Ticker: string;
  Expertise: IndustryId;
  Pioneers: number;
  Settlers: number;
  Technicians: number;
  Engineers: number;
  Scientists: number;
  AreaCost: number;
  UserNameSubmitted: string;
  Timestamp: string; // should be a number
}


export interface MaterialData {
  CategoryName: string;
  CategoryId: string;
  Name: string;
  MatId: string;
  Ticker: string;
  Weight: number;
  Volume: number;
  UserNameSubmitted: string;
  Timestamp: string;
}

export interface CXOrderData {
  OrderId: string;
  CompanyId: string;
  CompanyName: string;
  CompanyCode: string;
  ItemCount: number|null; // MM is null
  ItemCost: number;
}

export interface CXListingData {
  BuyingOrders: CXOrderData[];
  SellingOrders: CXOrderData[];
  CXDataModelId: string;
  MaterialName: string;
  MaterialTicker: string;
  MaterialId: string;
  ExchangeName: string;
  ExchangeCode: string;
  Currency: CurrencyId;
  Previous: number;
  PriceTimeEpochMs: number;
  High: number;
  AllTimeHigh: number;
  Low: number;
  AllTimeLow: number;
  Ask: number|null;
  AskCount: number|null;
  Bid: number|null;
  BidCount: number|null;
  Supply: number;
  Demand: number;
  Traded: number;
  VolumeAmount: number;
  PriceAverage: number;
  NarrowPriceBandLow: number;
  NarrowPriceBandHigh: number;
  WidePriceBandLow: number;
  WidePriceBandHigh: number;
  MMBuy: number|null;
  MMSell: number|null;
  UserNameSubmitted: string;
  Timestamp: string;
}
