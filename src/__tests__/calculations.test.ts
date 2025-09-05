import { describe, it, expect } from 'vitest';
import { calculateSubsidies, validateFarmData } from '@/lib/calculations';
import type { FarmData } from '@/types';

describe('Calculations', () => {
  const mockFarmData: FarmData = {
    totalArea: 10,
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
    eliteSeedPotatoesArea: 0,
  };

  describe('calculateSubsidies', () => {
    it('should calculate direct payments correctly', () => {
      const result = calculateSubsidies(mockFarmData, 'EUR');

      // Basic income support: 10 * 114.42 = 1144.2
      expect(result.directPayments.basicIncomeSupport).toBe(1144.2);

      // Redistributive payment: 10 * 39.80 = 398
      expect(result.directPayments.redistributivePayment).toBe(398);

      // Supplementary basic payment: 10 * 13.00 = 130
      expect(result.directPayments.supplementaryBasicPayment).toBe(130);

      // Total should be sum of all payments
      const expectedTotal = 1144.2 + 398 + 130;
      expect(result.directPayments.total).toBe(expectedTotal);
    });

    it('should calculate young farmer payment', () => {
      const youngFarmerData = { ...mockFarmData, isYoungFarmer: true };
      const result = calculateSubsidies(youngFarmerData, 'EUR');

      // Young farmer payment: 10 * 58.12 = 581.2
      expect(result.directPayments.youngFarmersPayment).toBe(581.2);
    });

    it('should calculate small farm payment', () => {
      const smallFarmData = { ...mockFarmData, totalArea: 3, isSmallFarm: true };
      const result = calculateSubsidies(smallFarmData, 'EUR');

      // Small farm payment: 3 * 225 = 675
      expect(result.directPayments.smallFarmsPayment).toBe(675);
    });

    it('should respect small farm payment limit', () => {
      const smallFarmData = { ...mockFarmData, totalArea: 5, isSmallFarm: true };
      const result = calculateSubsidies(smallFarmData, 'EUR');

      // Should be limited to 1125 EUR even though 5 * 225 = 1125
      expect(result.directPayments.smallFarmsPayment).toBe(1125);
    });

    it('should convert currencies correctly', () => {
      const resultEUR = calculateSubsidies(mockFarmData, 'EUR');
      const resultPLN = calculateSubsidies(mockFarmData, 'PLN');

      // PLN should be EUR * 4.45
      expect(resultPLN.grandTotalConverted).toBe(resultEUR.grandTotal * 4.45);
    });
  });

  describe('validateFarmData', () => {
    it('should return no errors for valid data', () => {
      const errors = validateFarmData(mockFarmData);
      expect(errors).toHaveLength(0);
    });

    it('should detect negative total area', () => {
      const invalidData = { ...mockFarmData, totalArea: -5 };
      const errors = validateFarmData(invalidData);
      expect(errors).toContain('Total area cannot be negative');
    });

    it('should detect unreasonably large area', () => {
      const invalidData = { ...mockFarmData, totalArea: 15000 };
      const errors = validateFarmData(invalidData);
      expect(errors).toContain('Total area seems unreasonably large (>10,000 ha)');
    });

    it('should detect ecoschemes area limit exceeded', () => {
      const invalidData = { 
        ...mockFarmData, 
        honeyPlantsArea: 200,
        extensiveGrasslandArea: 150 
      };
      const errors = validateFarmData(invalidData);
      expect(errors).toContain('Ecoschemes total area exceeds limit (300 ha)');
    });
  });
});