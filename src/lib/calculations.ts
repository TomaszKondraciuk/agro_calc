import type { FarmData, CalculationResult, Currency } from '@/types';
import { SUBSIDIES_DATA_2025 } from './subsidies-data';
import { convertCurrency } from './utils';

/**
 * Main calculation function for all subsidies
 */
export function calculateSubsidies(
  farmData: FarmData, 
  targetCurrency: Currency = 'PLN'
): CalculationResult {
  const data = SUBSIDIES_DATA_2025;

  // Calculate direct payments
  const directPayments = calculateDirectPayments(farmData, data);

  // Calculate crop payments
  const cropPayments = calculateCropPayments(farmData, data);

  // Calculate animal payments
  const animalPayments = calculateAnimalPayments(farmData, data);

  // Calculate ecoschemes
  const ecoschemes = calculateEcoschemes(farmData, data);

  // Grand total in EUR first
  const grandTotal = directPayments.total + cropPayments.total + 
                    animalPayments.total + ecoschemes.total;

  // Convert to target currency
  const grandTotalConverted = convertCurrency(grandTotal, targetCurrency);

  return {
    directPayments,
    cropPayments,
    animalPayments,
    ecoschemes,
    grandTotal,
    grandTotalConverted
  };
}

function calculateDirectPayments(farmData: FarmData, data: typeof SUBSIDIES_DATA_2025) {
  const { totalArea, isYoungFarmer, isSmallFarm } = farmData;
  const { directPayments, limits } = data;

  // Basic income support
  const basicIncomeSupport = totalArea * directPayments.basicIncomeSupport;

  // Redistributive payment (max 30 ha)
  const redistributiveArea = Math.min(totalArea, limits.redistributiveMaxHa);
  const redistributivePayment = redistributiveArea * directPayments.redistributivePayment;

  // Young farmers payment
  const youngFarmersPayment = isYoungFarmer ? 
    totalArea * directPayments.youngFarmersPayment : 0;

  // Small farms payment (max 5 ha = 1125 EUR total)
  const smallFarmsPayment = isSmallFarm && totalArea <= limits.smallFarmsMaxHa 
    ? Math.min(totalArea * directPayments.smallFarmsPayment, 1125) 
    : 0;

  // Supplementary basic payment
  const supplementaryBasicPayment = totalArea * directPayments.supplementaryBasicPayment;

  const total = basicIncomeSupport + redistributivePayment + youngFarmersPayment + 
                smallFarmsPayment + supplementaryBasicPayment;

  return {
    basicIncomeSupport,
    redistributivePayment,
    youngFarmersPayment,
    smallFarmsPayment,
    supplementaryBasicPayment,
    total
  };
}

function calculateCropPayments(farmData: FarmData, data: typeof SUBSIDIES_DATA_2025) {
  const { cropPayments } = data;

  const calculations = {
    leguminousCrops: farmData.leguminousArea * cropPayments.leguminousCrops,
    fodderCrops: farmData.fodderArea * cropPayments.fodderCrops,
    starchPotatoes: farmData.starchPotatoesArea * cropPayments.starchPotatoes,
    sugarBeets: farmData.sugarBeetsArea * cropPayments.sugarBeets,
    tomatoes: farmData.tomatoesArea * cropPayments.tomatoes,
    hops: farmData.hopsArea * cropPayments.hops,
    strawberries: farmData.strawberriesArea * cropPayments.strawberries,
    flax: farmData.flaxArea * cropPayments.flax,
    fiberHemp: farmData.fiberHempArea * cropPayments.fiberHemp,
  };

  const total = Object.values(calculations).reduce((sum, value) => sum + value, 0);

  return { ...calculations, total };
}

function calculateAnimalPayments(farmData: FarmData, data: typeof SUBSIDIES_DATA_2025) {
  const { animalPayments } = data;

  // Apply limits where they exist
  const cattleCount = animalPayments.cattle.limit 
    ? Math.min(farmData.cattleCount, animalPayments.cattle.limit) 
    : farmData.cattleCount;
  const cowsCount = animalPayments.cows.limit 
    ? Math.min(farmData.cowsCount, animalPayments.cows.limit) 
    : farmData.cowsCount;

  const calculations = {
    cattle: cattleCount * animalPayments.cattle.rate,
    cows: cowsCount * animalPayments.cows.rate,
    sheep: farmData.sheepCount * animalPayments.sheep.rate,
    goats: farmData.goatsCount * animalPayments.goats.rate,
  };

  const total = Object.values(calculations).reduce((sum, value) => sum + value, 0);

  return { ...calculations, total };
}

function calculateEcoschemes(farmData: FarmData, data: typeof SUBSIDIES_DATA_2025) {
  const { ecoschemes } = data;

  const calculations = {
    honeyPlants: farmData.honeyPlantsArea * ecoschemes.honeyPlants,
    extensiveGrassland: farmData.extensiveGrasslandArea * ecoschemes.extensiveGrassland,
    winterCover: farmData.winterCoverArea * ecoschemes.winterCover,
    cropDiversification: farmData.cropDiversificationArea * ecoschemes.cropDiversification,
    waterRetention: farmData.waterRetentionArea * ecoschemes.waterRetention,
    fallowLand: farmData.fallowLandArea * ecoschemes.fallowLand,
    biologicalProtection: farmData.biologicalProtectionArea * ecoschemes.biologicalProtection,
    microFertilizers: farmData.microFertilizersArea * ecoschemes.microFertilizers,
    iprOrchard: farmData.iprOrchardArea * ecoschemes.iprOrchard,
    iprBerry: farmData.iprBerryArea * ecoschemes.iprBerry,
    iprAgricultural: farmData.iprAgriculturalArea * ecoschemes.iprAgricultural,
    iprVegetable: farmData.iprVegetableArea * ecoschemes.iprVegetable,
    eliteSeedCereals: farmData.eliteSeedCerealsArea * ecoschemes.eliteSeedCereals,
    eliteSeedLegumes: farmData.eliteSeedLegumesArea * ecoschemes.eliteSeedLegumes,
    eliteSeedPotatoes: farmData.eliteSeedPotatoesArea * ecoschemes.eliteSeedPotatoes,
  };

  const total = Object.values(calculations).reduce((sum, value) => sum + value, 0);

  return { ...calculations, total };
}

/**
 * Validate farm data for common errors
 */
export function validateFarmData(farmData: FarmData): string[] {
  const errors: string[] = [];

  // Check if total area is reasonable
  if (farmData.totalArea < 0) {
    errors.push('Total area cannot be negative');
  }

  if (farmData.totalArea > 10000) {
    errors.push('Total area seems unreasonably large (>10,000 ha)');
  }

  // Check ecoschemes limit
  const totalEcoArea = [
    farmData.honeyPlantsArea,
    farmData.extensiveGrasslandArea,
    farmData.winterCoverArea,
    farmData.cropDiversificationArea,
    farmData.waterRetentionArea,
    farmData.fallowLandArea,
    farmData.biologicalProtectionArea,
    farmData.microFertilizersArea,
    farmData.iprOrchardArea,
    farmData.iprBerryArea,
    farmData.iprAgriculturalArea,
    farmData.iprVegetableArea,
    farmData.eliteSeedCerealsArea,
    farmData.eliteSeedLegumesArea,
    farmData.eliteSeedPotatoesArea,
  ].reduce((sum, area) => sum + area, 0);

  if (totalEcoArea > SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa) {
    errors.push(`Ecoschemes total area exceeds limit (${SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa} ha)`);
  }

  return errors;
}