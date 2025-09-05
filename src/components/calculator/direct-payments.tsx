'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { FarmData, PaymentResult, Currency } from '@/types';
import { FormField } from '@/components/forms/form-field';
import { NumericInput } from '@/components/forms/numeric-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import { SUBSIDIES_DATA_2025 } from '@/lib/subsidies-data';
import { Calculator, Building, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DirectPaymentsProps {
  farmData: FarmData;
  updateFarmData: (updates: Partial<FarmData>) => void;
  results: PaymentResult;
  preferredCurrency: Currency;
}

export function DirectPayments({ 
  farmData, 
  updateFarmData, 
  results, 
  preferredCurrency 
}: DirectPaymentsProps) {
  const t = useTranslations('directPayments');

  const getDisplayAmount = (eurAmount: number) => {
    return convertCurrency(eurAmount, preferredCurrency);
  };

  const getConvertedRate = (eurRate: number) => {
    return convertCurrency(eurRate, preferredCurrency);
  };

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
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
        >
          <Calculator className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
      </div>

      {/* Information Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Dopłaty bezpośrednie to fundament wsparcia dla każdego gospodarstwa rolnego. 
          Kwoty wyświetlane w <strong>{preferredCurrency}</strong>.
        </AlertDescription>
      </Alert>

      {/* Basic Farm Data Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="border-2 border-green-200 bg-green-50/30 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Building className="h-5 w-5 text-primary" />
              Podstawowe dane gospodarstwa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Total Area */}
              <div className="lg:col-span-2">
                <FormField
                  label={t('totalArea')}
                  tooltip={t('totalAreaTooltip')}
                  required
                >
                  <NumericInput
                    value={farmData.totalArea}
                    onChange={(value) => updateFarmData({ totalArea: value })}
                    placeholder="np. 25.50"
                    unit="ha"
                    min={0}
                    max={10000}
                    step={0.01}
                  />
                </FormField>
                <AnimatePresence>
                  {farmData.totalArea > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-muted-foreground"
                    >
                      Podstawowa stawka: {formatCurrency(getConvertedRate(114.42), preferredCurrency)}/ha
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Farm Type Options */}
              <div className="space-y-4">
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-3 rounded-lg border border-green-200 bg-green-50/50"
                  >
                    <Checkbox
                      id="young-farmer"
                      checked={farmData.isYoungFarmer}
                      onCheckedChange={(checked) => updateFarmData({ isYoungFarmer: checked as boolean })}
                      className="mt-0.5"
                    />
                    <div className="space-y-1">
                      <label htmlFor="young-farmer" className="text-sm font-medium cursor-pointer leading-none">
                        {t('youngFarmer')}
                      </label>
                      <Badge variant="success" className="text-xs">
                        +{formatCurrency(getConvertedRate(58.12), preferredCurrency)}/ha
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {t('youngFarmerDescription')}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-3 p-3 rounded-lg border border-amber-200 bg-amber-50/50"
                  >
                    <Checkbox
                      id="small-farm"
                      checked={farmData.isSmallFarm}
                      onCheckedChange={(checked) => updateFarmData({ isSmallFarm: checked as boolean })}
                      className="mt-0.5"
                    />
                    <div className="space-y-1">
                      <label htmlFor="small-farm" className="text-sm font-medium cursor-pointer leading-none">
                        {t('smallFarm')}
                      </label>
                      <Badge variant="warning" className="text-xs">
                        {formatCurrency(getConvertedRate(225.00), preferredCurrency)}/ha
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {t('smallFarmDescription')}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Display */}
      <AnimatePresence>
        {results.total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white overflow-hidden shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <TrendingUp className="h-5 w-5" />
                  Obliczone dopłaty bezpośrednie
                  <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                    {preferredCurrency}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                  {/* Basic Income Support */}
                  {results.basicIncomeSupport > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="stats-card bg-white/10 backdrop-blur border-white/20 text-white"
                    >
                      <div className="text-sm opacity-90 font-medium">{t('basicIncomeSupport')}</div>
                      <div className="text-2xl font-bold currency-display mt-1">
                        {formatCurrency(getDisplayAmount(results.basicIncomeSupport), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {farmData.totalArea} ha × {formatCurrency(getConvertedRate(114.42), preferredCurrency)}/ha
                      </div>
                    </motion.div>
                  )}

                  {/* Redistributive Payment */}
                  {results.redistributivePayment > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="stats-card bg-white/10 backdrop-blur border-white/20 text-white"
                    >
                      <div className="text-sm opacity-90 font-medium">{t('redistributivePayment')}</div>
                      <div className="text-2xl font-bold currency-display mt-1">
                        {formatCurrency(getDisplayAmount(results.redistributivePayment), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        max 30 ha × {formatCurrency(getConvertedRate(39.80), preferredCurrency)}/ha
                      </div>
                    </motion.div>
                  )}

                  {/* Young Farmers Payment */}
                  {farmData.isYoungFarmer && results.youngFarmersPayment > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="stats-card bg-white/10 backdrop-blur border-white/20 text-white"
                    >
                      <div className="text-sm opacity-90 font-medium">{t('youngFarmersPayment')}</div>
                      <div className="text-2xl font-bold currency-display mt-1">
                        {formatCurrency(getDisplayAmount(results.youngFarmersPayment), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {farmData.totalArea} ha × {formatCurrency(getConvertedRate(58.12), preferredCurrency)}/ha
                      </div>
                    </motion.div>
                  )}

                  {/* Small Farms Payment */}
                  {farmData.isSmallFarm && results.smallFarmsPayment > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="stats-card bg-white/10 backdrop-blur border-white/20 text-white"
                    >
                      <div className="text-sm opacity-90 font-medium">{t('smallFarmsPayment')}</div>
                      <div className="text-2xl font-bold currency-display mt-1">
                        {formatCurrency(getDisplayAmount(results.smallFarmsPayment), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        max {formatCurrency(getConvertedRate(1125), preferredCurrency)}
                      </div>
                    </motion.div>
                  )}

                  {/* Supplementary Basic Payment */}
                  {results.supplementaryBasicPayment > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="stats-card bg-white/10 backdrop-blur border-white/20 text-white"
                    >
                      <div className="text-sm opacity-90 font-medium">{t('supplementaryBasicPayment')}</div>
                      <div className="text-2xl font-bold currency-display mt-1">
                        {formatCurrency(getDisplayAmount(results.supplementaryBasicPayment), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {farmData.totalArea} ha × {formatCurrency(getConvertedRate(13.00), preferredCurrency)}/ha
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Total Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="stats-card bg-white/20 backdrop-blur border-white/30 text-white"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold opacity-90">Suma dopłat bezpośrednich</div>
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
              💡 <span>Wskazówki</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Płatność redystrybucyjna przysługuje maksymalnie do 30 ha</li>
              <li>• Młody rolnik: wiek do 40 lat w dniu składania wniosku</li>
              <li>• Małe gospodarstwo: maksymalnie 5 ha użytków rolnych</li>
              <li>• Wszystkie płatności wymagają spełnienia warunkowości</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              📋 <span>Wymagania</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Status aktywnego rolnika</li>
              <li>• Minimum 1 ha użytków rolnych</li>
              <li>• Przestrzeganie zasad warunkowości</li>
              <li>• Terminowe złożenie wniosku</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}