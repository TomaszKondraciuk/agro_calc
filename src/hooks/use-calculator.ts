'use client';

import { useState, useCallback, useMemo } from 'react';
import type { FarmData, CalculationResult, Currency } from '@/types';
import { calculateSubsidies, validateFarmData } from '@/lib/calculations';
import { debounce } from '@/lib/utils';

const initialFarmData: FarmData = {
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
  eliteSeedPotatoesArea: 0,
};

export function useCalculator() {
  const [farmData, setFarmData] = useState<FarmData>(initialFarmData);
  const [preferredCurrency, setPreferredCurrency] = useState<Currency>('PLN');
  const [isCalculating, setIsCalculating] = useState(false);

  // Debounced update function to prevent excessive calculations
  const debouncedCalculate = useCallback(
    debounce(() => setIsCalculating(false), 300),
    []
  );

  const updateFarmData = useCallback((updates: Partial<FarmData>) => {
    setIsCalculating(true);
    setFarmData(prev => ({ ...prev, ...updates }));
    debouncedCalculate();
  }, [debouncedCalculate]);

  const results = useMemo((): CalculationResult => {
    return calculateSubsidies(farmData, preferredCurrency);
  }, [farmData, preferredCurrency]);

  const validationErrors = useMemo(() => {
    return validateFarmData(farmData);
  }, [farmData]);

  const resetCalculator = useCallback(() => {
    setFarmData(initialFarmData);
  }, []);

  const toggleCurrency = useCallback(() => {
    setPreferredCurrency(prev => {
      const currencies: Currency[] = ['PLN', 'EUR', 'UAH'];
      const currentIndex = currencies.indexOf(prev);
      return currencies[(currentIndex + 1) % currencies.length];
    });
  }, []);

  const exportToCSV = useCallback(() => {
    const data = [
      ['Category', 'Amount', 'Currency'],
      ['Direct Payments', results.directPayments.total.toFixed(2), preferredCurrency],
      ['Crop Payments', results.cropPayments.total.toFixed(2), preferredCurrency],
      ['Animal Payments', results.animalPayments.total.toFixed(2), preferredCurrency],
      ['Ecoschemes', results.ecoschemes.total.toFixed(2), preferredCurrency],
      ['Total', results.grandTotalConverted.toFixed(2), preferredCurrency],
      ['', '', ''],
      ['Calculation Date', new Date().toLocaleDateString(), ''],
      ['Currency', preferredCurrency, ''],
      ['Source', 'ARiMR/MRiRW 2025', ''],
    ];

    const csvContent = data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `agricultural-subsidies-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [results, preferredCurrency]);

  return {
    farmData,
    updateFarmData,
    results,
    validationErrors,
    resetCalculator,
    preferredCurrency,
    setPreferredCurrency,
    toggleCurrency,
    exportToCSV,
    isCalculating,
  };
}