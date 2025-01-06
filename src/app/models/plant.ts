

export enum TechnologyProvider {
  OtherTech = "OtherTech",
  SunPower = "SunPower",
}


export interface RenewableEnergyPlant {
  id: number;
  name: string;
  energyTypeId: number;
  country: string;
  cityOrRegion: string;
  latitude: number;
  longitude: number;
  installedCapacity: number;
  startDate: Date;
  owner: string;
  status: string;
  estimatedAnnualProduction: number;
  emissionsAvoided: number;
  constructionCost: number;
  numberOfUnits: number;
  capacityFactor: number;
  technologyProvider: string;
  rating: number;
  history?: string;
  renewableEnergyDataHistories?: HistoricPlant[];
  nameEnergy?: string
}

export interface Plant {
  id?: number;
  name: string;
  energyTypeId: number;
  country: string;
  cityOrRegion: string;
  latitude: number;
  longitude: number;
  installedCapacity: number;
  startDate: Date;
  owner: string;
  status: string;
  estimatedAnnualProduction: number;
  emissionsAvoided: number;
  constructionCost: number;
  numberOfUnits: number;
  capacityFactor: number;
  technologyProvider: string;
  rating: number;
  history: string;
}

export interface HistoricPlant {
  historyId: number;
  plantId: number;
  recordDate: Date;
  estimatedAnnualProduction: number;
  emissionsAvoided: number;
  constructionCostAmpliacion: number;
  numberOfUnits: number;
  capacityFactor: number;
  technologyProvider: string;
  rating: number;
}
