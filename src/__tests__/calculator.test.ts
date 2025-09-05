import { describe, it, expect } from 'vitest';
import { calculateSubsidies, validateFarmData } from '@/lib/calculations';
import { SUBSIDIES_DATA_2025 } from '@/lib/subsidies-data';
import type { FarmData } from '@/types';

describe('Agricultural Subsidies Calculator', () => {
  const mockFarmData: FarmData = {
    totalArea: 25.5,
    isYoungFarmer: true,
    isSmallFarm: false,
    leguminousArea: 5.0,
    fodderArea: 3.5,
    starchPotatoesArea: 2.0,
    sugarBeetsArea: 1.5,
    tomatoesArea: 0.5,
    hopsArea: 1.0,
    strawberriesArea: 0.8,
    flaxArea: 0.3,
    fiberHempArea: 0.2,
    cattleCount: 15,
    cowsCount: 8,
    sheepCount: 25,
    goatsCount: 10,
    honeyPlantsArea: 4.0,
    extensiveGrasslandArea: 3.0,
    winterCoverArea: 2.5,
    cropDiversificationArea: 2.0,
    waterRetentionArea: 1.5,
    fallowLandArea: 1.0,
    biologicalProtectionArea: 0.8,
    microFertilizersArea: 0.5,
    iprOrchardArea: 1.2,
    iprBerryArea: 0.7,
    iprAgriculturalArea: 2.3,
    iprVegetableArea: 0.9,
    eliteSeedCerealsArea: 1.1,
    eliteSeedLegumesArea: 0.6,
    eliteSeedPotatoesArea: 0.4
  };

  describe('Direct Payments Calculations', () => {
    it('should calculate basic income support correctly', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedBasicSupport = mockFarmData.totalArea * SUBSIDIES_DATA_2025.directPayments.basicIncomeSupport;
      expect(results.directPayments.basicIncomeSupport).toBeCloseTo(expectedBasicSupport, 2);
    });

    it('should apply redistributive payment limit (30 ha)', () => {
      const results = calculateSubsidies(mockFarmData);
      const maxRedistributiveArea = Math.min(mockFarmData.totalArea, 30);
      const expectedRedistributive = maxRedistributiveArea * SUBSIDIES_DATA_2025.directPayments.redistributivePayment;
      expect(results.directPayments.redistributivePayment).toBeCloseTo(expectedRedistributive, 2);
    });

    it('should include young farmer payment when applicable', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedYoungFarmer = mockFarmData.totalArea * SUBSIDIES_DATA_2025.directPayments.youngFarmersPayment;
      expect(results.directPayments.youngFarmersPayment).toBeCloseTo(expectedYoungFarmer, 2);
    });

    it('should not include young farmer payment when not applicable', () => {
      const nonYoungFarmerData = { ...mockFarmData, isYoungFarmer: false };
      const results = calculateSubsidies(nonYoungFarmerData);
      expect(results.directPayments.youngFarmersPayment).toBe(0);
    });

    it('should include small farm payment when applicable', () => {
      const smallFarmData = { 
        ...mockFarmData, 
        totalArea: 4.5, 
        isSmallFarm: true 
      };
      const results = calculateSubsidies(smallFarmData);
      const expectedSmallFarm = smallFarmData.totalArea * SUBSIDIES_DATA_2025.directPayments.smallFarmsPayment;
      expect(results.directPayments.smallFarmsPayment).toBeCloseTo(expectedSmallFarm, 2);
    });

    it('should limit small farm payment to 1125 EUR maximum', () => {
      const smallFarmData = { 
        ...mockFarmData, 
        totalArea: 5.0, 
        isSmallFarm: true 
      };
      const results = calculateSubsidies(smallFarmData);
      expect(results.directPayments.smallFarmsPayment).toBeLessThanOrEqual(1125);
    });
  });

  describe('Crop Payments Calculations', () => {
    it('should calculate tomato payments correctly (highest rate)', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedTomatoes = mockFarmData.tomatoesArea * SUBSIDIES_DATA_2025.cropPayments.tomatoes;
      expect(results.cropPayments.tomatoes).toBeCloseTo(expectedTomatoes, 2);
    });

    it('should calculate leguminous crops payments', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedLeguminous = mockFarmData.leguminousArea * SUBSIDIES_DATA_2025.cropPayments.leguminousCrops;
      expect(results.cropPayments.leguminousCrops).toBeCloseTo(expectedLeguminous, 2);
    });

    it('should sum all crop payments correctly', () => {
      const results = calculateSubsidies(mockFarmData);
      const manualSum = 
        results.cropPayments.leguminousCrops +
        results.cropPayments.fodderCrops +
        results.cropPayments.starchPotatoes +
        results.cropPayments.sugarBeets +
        results.cropPayments.tomatoes +
        results.cropPayments.hops +
        results.cropPayments.strawberries +
        results.cropPayments.flax +
        results.cropPayments.fiberHemp;
      expect(results.cropPayments.total).toBeCloseTo(manualSum, 2);
    });
  });

  describe('Animal Payments Calculations', () => {
    it('should apply cattle limit (20 animals)', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedCattle = Math.min(mockFarmData.cattleCount, 20) * SUBSIDIES_DATA_2025.animalPayments.cattle.rate;
      expect(results.animalPayments.cattle).toBeCloseTo(expectedCattle, 2);
    });

    it('should apply cows limit (20 animals)', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedCows = Math.min(mockFarmData.cowsCount, 20) * SUBSIDIES_DATA_2025.animalPayments.cows.rate;
      expect(results.animalPayments.cows).toBeCloseTo(expectedCows, 2);
    });

    it('should not limit sheep and goats', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedSheep = mockFarmData.sheepCount * SUBSIDIES_DATA_2025.animalPayments.sheep.rate;
      const expectedGoats = mockFarmData.goatsCount * SUBSIDIES_DATA_2025.animalPayments.goats.rate;
      expect(results.animalPayments.sheep).toBeCloseTo(expectedSheep, 2);
      expect(results.animalPayments.goats).toBeCloseTo(expectedGoats, 2);
    });
  });

  describe('Ecoschemes Calculations', () => {
    it('should calculate honey plants payments (highest ecoscheme rate)', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedHoneyPlants = mockFarmData.honeyPlantsArea * SUBSIDIES_DATA_2025.ecoschemes.honeyPlants;
      expect(results.ecoschemes.honeyPlants).toBeCloseTo(expectedHoneyPlants, 2);
    });

    it('should calculate IPR orchard payments (highest IPR rate)', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedIprOrchard = mockFarmData.iprOrchardArea * SUBSIDIES_DATA_2025.ecoschemes.iprOrchard;
      expect(results.ecoschemes.iprOrchard).toBeCloseTo(expectedIprOrchard, 2);
    });

    it('should sum all ecoschemes correctly', () => {
      const results = calculateSubsidies(mockFarmData);
      const ecoschemeValues = Object.values(results.ecoschemes);
      const manualSum = ecoschemeValues.slice(0, -1).reduce((sum, val) => sum + val, 0); // Exclude total
      expect(results.ecoschemes.total).toBeCloseTo(manualSum, 2);
    });
  });

  describe('Grand Total Calculations', () => {
    it('should sum all payment categories correctly', () => {
      const results = calculateSubsidies(mockFarmData);
      const expectedGrandTotal = 
        results.directPayments.total +
        results.cropPayments.total +
        results.animalPayments.total +
        results.ecoschemes.total;
      expect(results.grandTotal).toBeCloseTo(expectedGrandTotal, 2);
    });

    it('should convert currency correctly', () => {
      const resultsEUR = calculateSubsidies(mockFarmData, 'EUR');
      const resultsPLN = calculateSubsidies(mockFarmData, 'PLN');
      const expectedPLN = resultsEUR.grandTotal * SUBSIDIES_DATA_2025.currencyRates.PLN;
      expect(resultsPLN.grandTotalConverted).toBeCloseTo(expectedPLN, 2);
    });

    it('should maintain EUR as base currency', () => {
      const results = calculateSubsidies(mockFarmData, 'EUR');
      expect(results.grandTotal).toBe(results.grandTotalConverted);
    });
  });

  describe('Data Validation', () => {
    it('should validate normal farm data without errors', () => {
      const errors = validateFarmData(mockFarmData);
      expect(errors).toHaveLength(0);
    });

    it('should detect negative area', () => {
      const invalidData = { ...mockFarmData, totalArea: -5 };
      const errors = validateFarmData(invalidData);
      expect(errors.some(error => error.includes('negative'))).toBe(true);
    });

    it('should detect unreasonably large area', () => {
      const invalidData = { ...mockFarmData, totalArea: 15000 };
      const errors = validateFarmData(invalidData);
      expect(errors.some(error => error.includes('unreasonably large'))).toBe(true);
    });

    it('should validate ecoschemes area limit', () => {
      const totalEcoArea = Object.keys(mockFarmData)
        .filter(key => key.includes('Area') && key !== 'totalArea')
        .reduce((sum, key) => {
          const value = mockFarmData[key as keyof FarmData];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
      
      if (totalEcoArea > SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa) {
        const errors = validateFarmData(mockFarmData);
        expect(errors.some(error => error.includes('exceeds limit'))).toBe(true);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero values correctly', () => {
      const zeroFarmData: FarmData = {
        totalArea: 0,
        isYoungFarmer: false,
        isSmallFarm: false,
        leguminousArea: 0,
        fodderArea: 0,
        starchPotatoesArea: 0,
        sugarBeetsArea: 0,
        tomatoesArea: 0,
        hopsArea: 0,
        strawberriesArea: 0,
        flaxArea: 0,
        fiberHempArea: 0,
        cattleCount: 0,
        cowsCount: 0,
        sheepCount: 0,
        goatsCount: 0,
        honeyPlantsArea: 0,
        extensiveGrasslandArea: 0,
        winterCoverArea: 0,
        cropDiversificationArea: 0,
        waterRetentionArea: 0,
        fallowLandArea: 0,
        biologicalProtectionArea: 0,
        microFertilizersArea: 0,
        iprOrchardArea: 0,
        iprBerryArea: 0,
        iprAgriculturalArea: 0,
        iprVegetableArea: 0,
        eliteSeedCerealsArea: 0,
        eliteSeedLegumesArea: 0,
        eliteSeedPotatoesArea: 0
      };

      const results = calculateSubsidies(zeroFarmData);
      expect(results.grandTotal).toBe(0);
      expect(results.directPayments.total).toBe(0);
      expect(results.cropPayments.total).toBe(0);
      expect(results.animalPayments.total).toBe(0);
      expect(results.ecoschemes.total).toBe(0);
    });

    it('should handle maximum limits correctly', () => {
      const maxFarmData = { 
        ...mockFarmData, 
        totalArea: 50, 
        cattleCount: 25, 
        cowsCount: 25 
      };
      const results = calculateSubsidies(maxFarmData);
      
      // Check redistributive payment cap at 30 ha
      expect(results.directPayments.redistributivePayment).toBeLessThanOrEqual(
        30 * SUBSIDIES_DATA_2025.directPayments.redistributivePayment
      );
      
      // Check animal limits
      expect(results.animalPayments.cattle).toBeLessThanOrEqual(
        20 * SUBSIDIES_DATA_2025.animalPayments.cattle.rate
      );
      expect(results.animalPayments.cows).toBeLessThanOrEqual(
        20 * SUBSIDIES_DATA_2025.animalPayments.cows.rate
      );
    });
  });
});

describe('Subsidies Data Integrity', () => {
  it('should have valid currency rates', () => {
    expect(SUBSIDIES_DATA_2025.currencyRates.EUR).toBe(1);
    expect(SUBSIDIES_DATA_2025.currencyRates.PLN).toBeGreaterThan(0);
    expect(SUBSIDIES_DATA_2025.currencyRates.UAH).toBeGreaterThan(0);
  });

  it('should have positive rates for all payments', () => {
    // Direct payments
    Object.values(SUBSIDIES_DATA_2025.directPayments).forEach(rate => {
      expect(rate).toBeGreaterThan(0);
    });

    // Crop payments
    Object.values(SUBSIDIES_DATA_2025.cropPayments).forEach(rate => {
      expect(rate).toBeGreaterThan(0);
    });

    // Animal payments
    Object.values(SUBSIDIES_DATA_2025.animalPayments).forEach(payment => {
      expect(payment.rate).toBeGreaterThan(0);
    });

    // Ecoschemes
    Object.values(SUBSIDIES_DATA_2025.ecoschemes).forEach(rate => {
      expect(rate).toBeGreaterThan(0);
    });
  });

  it('should have reasonable limits', () => {
    expect(SUBSIDIES_DATA_2025.limits.redistributiveMaxHa).toBe(30);
    expect(SUBSIDIES_DATA_2025.limits.smallFarmsMaxHa).toBe(5);
    expect(SUBSIDIES_DATA_2025.limits.cattleLimit).toBe(20);
    expect(SUBSIDIES_DATA_2025.limits.cowsLimit).toBe(20);
    expect(SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa).toBeGreaterThan(0);
  });
});