export type Currency = 'PLN' | 'EUR' | 'UAH';

export interface FarmData {
  totalArea: number;
  isYoungFarmer: boolean;
  isSmallFarm: boolean;

  // Crop areas
  leguminousArea: number;
  fodderArea: number;
  starchPotatoesArea: number;
  sugarBeetsArea: number;
  tomatoesArea: number;
  hopsArea: number;
  strawberriesArea: number;
  flaxArea: number;
  fiberHempArea: number;

  // Animal counts
  cattleCount: number;
  cowsCount: number;
  sheepCount: number;
  goatsCount: number;

  // Ecoschemes areas
  honeyPlantsArea: number;
  extensiveGrasslandArea: number;
  winterCoverArea: number;
  cropDiversificationArea: number;
  waterRetentionArea: number;
  fallowLandArea: number;
  biologicalProtectionArea: number;
  microFertilizersArea: number;
  iprOrchardArea: number;
  iprBerryArea: number;
  iprAgriculturalArea: number;
  iprVegetableArea: number;
  eliteSeedCerealsArea: number;
  eliteSeedLegumesArea: number;
  eliteSeedPotatoesArea: number;
}

export interface PaymentResult {
  basicIncomeSupport: number;
  redistributivePayment: number;
  youngFarmersPayment: number;
  smallFarmsPayment: number;
  supplementaryBasicPayment: number;
  total: number;
}

export interface CropPaymentResult {
  leguminousCrops: number;
  fodderCrops: number;
  starchPotatoes: number;
  sugarBeets: number;
  tomatoes: number;
  hops: number;
  strawberries: number;
  flax: number;
  fiberHemp: number;
  total: number;
}

export interface AnimalPaymentResult {
  cattle: number;
  cows: number;
  sheep: number;
  goats: number;
  total: number;
}

export interface EcoschemeResult {
  honeyPlants: number;
  extensiveGrassland: number;
  winterCover: number;
  cropDiversification: number;
  waterRetention: number;
  fallowLand: number;
  biologicalProtection: number;
  microFertilizers: number;
  iprOrchard: number;
  iprBerry: number;
  iprAgricultural: number;
  iprVegetable: number;
  eliteSeedCereals: number;
  eliteSeedLegumes: number;
  eliteSeedPotatoes: number;
  total: number;
}

export interface CalculationResult {
  directPayments: PaymentResult;
  cropPayments: CropPaymentResult;
  animalPayments: AnimalPaymentResult;
  ecoschemes: EcoschemeResult;
  grandTotal: number;
  grandTotalConverted: number;
}

export interface SubsidyRate {
  rate: number;
  limit?: number;
}

export interface SubsidiesData {
  directPayments: {
    basicIncomeSupport: number;
    redistributivePayment: number;
    youngFarmersPayment: number;
    smallFarmsPayment: number;
    supplementaryBasicPayment: number;
  };
  cropPayments: Record<string, number>;
  animalPayments: Record<string, SubsidyRate>;
  ecoschemes: Record<string, number>;
  limits: {
    redistributiveMaxHa: number;
    smallFarmsMaxHa: number;
    cattleLimit: number;
    cowsLimit: number;
    ecoschemesMaxHa: number;
  };
  currencyRates: Record<Currency, number>;
}