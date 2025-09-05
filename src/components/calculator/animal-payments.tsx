'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { FarmData, AnimalPaymentResult, Currency } from '@/types';
import { FormField } from '@/components/forms/form-field';
import { NumericInput } from '@/components/forms/numeric-input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import { SUBSIDIES_DATA_2025 } from '@/lib/subsidies-data';
import { PawPrint, TrendingUp, Info, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimalPaymentsProps {
  farmData: FarmData;
  updateFarmData: (updates: Partial<FarmData>) => void;
  results: AnimalPaymentResult;
  preferredCurrency: Currency;
}

export function AnimalPayments({ 
  farmData, 
  updateFarmData, 
  results, 
  preferredCurrency 
}: AnimalPaymentsProps) {
  const t = useTranslations('animalPayments');

  const getDisplayAmount = (eurAmount: number) => {
    return convertCurrency(eurAmount, preferredCurrency);
  };

  const getConvertedRate = (eurRate: number) => {
    return convertCurrency(eurRate, preferredCurrency);
  };

  const animalData = [
    {
      key: 'cattleCount',
      label: 'Bydło (do 24 miesięcy)',
      rate: SUBSIDIES_DATA_2025.animalPayments.cattle.rate,
      limit: SUBSIDIES_DATA_2025.animalPayments.cattle.limit,
      value: farmData.cattleCount,
      result: results.cattle,
      color: 'from-brown-500 to-amber-700',
      icon: '🐄',
      unit: 'szt.'
    },
    {
      key: 'cowsCount',
      label: 'Krowy',
      rate: SUBSIDIES_DATA_2025.animalPayments.cows.rate,
      limit: SUBSIDIES_DATA_2025.animalPayments.cows.limit,
      value: farmData.cowsCount,
      result: results.cows,
      color: 'from-amber-600 to-orange-700',
      icon: '🐮',
      unit: 'szt.',
      highlight: true // Highest rate
    },
    {
      key: 'sheepCount',
      label: 'Owce',
      rate: SUBSIDIES_DATA_2025.animalPayments.sheep.rate,
      limit: null,
      value: farmData.sheepCount,
      result: results.sheep,
      color: 'from-gray-400 to-gray-600',
      icon: '🐑',
      unit: 'szt.'
    },
    {
      key: 'goatsCount',
      label: 'Kozy',
      rate: SUBSIDIES_DATA_2025.animalPayments.goats.rate,
      limit: null,
      value: farmData.goatsCount,
      result: results.goats,
      color: 'from-slate-500 to-slate-700',
      icon: '🐐',
      unit: 'szt.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="section-header">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-lg"
        >
          <PawPrint className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">Dopłaty do zwierząt</h2>
          <p className="text-muted-foreground">Wsparcie dla chowu bydła, owiec i kóz - 2025</p>
        </div>
      </div>

      {/* Information Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Dopłaty do zwierząt przysługują za określone gatunki i grupy wiekowe. 
          Niektóre kategorie mają limity ilości. Kwoty w <strong>{preferredCurrency}</strong>.
        </AlertDescription>
      </Alert>

      {/* Animal Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {animalData.map((animal, index) => (
          <motion.div
            key={animal.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Card className={`hover:shadow-lg transition-shadow ${animal.highlight ? 'ring-2 ring-amber-200' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{animal.icon}</span>
                    {animal.label}
                    {animal.highlight && (
                      <Badge variant="secondary" className="text-xs">
                        TOP
                      </Badge>
                    )}
                  </div>
                  {animal.limit && (
                    <Badge variant="outline" className="text-xs">
                      max {animal.limit}
                    </Badge>
                  )}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  Stawka: {formatCurrency(getConvertedRate(animal.rate), preferredCurrency)}/{animal.unit}
                  {animal.limit && <span className="ml-1 text-orange-600">(limit: {animal.limit} szt.)</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <FormField
                  label="Liczba zwierząt"
                >
                  <NumericInput
                    value={animal.value}
                    onChange={(value) => updateFarmData({ [animal.key]: value })}
                    placeholder="0"
                    unit={animal.unit}
                    min={0}
                    max={animal.limit || 1000}
                    step={1}
                  />
                </FormField>
                
                <AnimatePresence>
                  {animal.value > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-3 rounded-lg bg-gradient-to-r ${animal.color} text-white text-sm`}
                    >
                      <div className="font-medium">
                        {formatCurrency(getDisplayAmount(animal.result), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-90">
                        {animal.limit ? Math.min(animal.value, animal.limit) : animal.value} {animal.unit} × {formatCurrency(getConvertedRate(animal.rate), preferredCurrency)}/{animal.unit}
                        {animal.limit && animal.value > animal.limit && (
                          <div className="text-xs text-red-200 mt-1">
                            ⚠️ Przekroczono limit! Uznane: {animal.limit} {animal.unit}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Results Summary */}
      <AnimatePresence>
        {results.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-amber-600 to-orange-700 text-white overflow-hidden shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <TrendingUp className="h-5 w-5" />
                  Suma dopłat do zwierząt
                  <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                    {preferredCurrency}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="stats-card bg-white/20 backdrop-blur border-white/30 text-white"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold opacity-90">Łączne dopłaty do zwierząt</div>
                      {preferredCurrency !== 'EUR' && (
                        <div className="text-sm opacity-75">
                          ({formatCurrency(results.total, 'EUR')} w EUR)
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold currency-display">
                        {formatCurrency(getDisplayAmount(results.total), preferredCurrency)}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Breakdown by animal type */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {animalData.map((animal, index) => (
                    animal.result > 0 && (
                      <motion.div
                        key={animal.key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white/10 backdrop-blur rounded-lg p-3 text-center border border-white/20"
                      >
                        <div className="text-lg mb-1">{animal.icon}</div>
                        <div className="text-xs font-medium opacity-90">{animal.label}</div>
                        <div className="text-sm font-bold mt-1">
                          {formatCurrency(getDisplayAmount(animal.result), preferredCurrency)}
                        </div>
                      </motion.div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Information Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Stawki i limity</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <span className="font-medium">Krowy:</span> {formatCurrency(getConvertedRate(96.64), preferredCurrency)}/szt. (max 20)</li>
              <li>• <span className="font-medium">Bydło młode:</span> {formatCurrency(getConvertedRate(75.73), preferredCurrency)}/szt. (max 20)</li>
              <li>• <span className="font-medium">Owce:</span> {formatCurrency(getConvertedRate(25.80), preferredCurrency)}/szt. (bez limitu)</li>
              <li>• <span className="font-medium">Kozy:</span> {formatCurrency(getConvertedRate(11.27), preferredCurrency)}/szt. (bez limitu)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              📋 <span>Wymagania</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Zwierzęta muszą być zarejestrowane w systemie</li>
              <li>• Bydło: wiek do 24 miesięcy w dniu złożenia wniosku</li>
              <li>• Przestrzeganie standardów dobrobytu zwierząt</li>
              <li>• Aktualna ewidencja zwierząt</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}