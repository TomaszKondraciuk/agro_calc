'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { FarmData, CropPaymentResult, Currency } from '@/types';
import { FormField } from '@/components/forms/form-field';
import { NumericInput } from '@/components/forms/numeric-input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import { SUBSIDIES_DATA_2025 } from '@/lib/subsidies-data';
import { Wheat, TrendingUp, Info, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CropPaymentsProps {
  farmData: FarmData;
  updateFarmData: (updates: Partial<FarmData>) => void;
  results: CropPaymentResult;
  preferredCurrency: Currency;
}

export function CropPayments({ 
  farmData, 
  updateFarmData, 
  results, 
  preferredCurrency 
}: CropPaymentsProps) {
  const t = useTranslations('cropPayments');

  const getDisplayAmount = (eurAmount: number) => {
    return convertCurrency(eurAmount, preferredCurrency);
  };

  const getConvertedRate = (eurRate: number) => {
    return convertCurrency(eurRate, preferredCurrency);
  };

  const cropData = [
    {
      key: 'leguminousArea',
      label: 'Rośliny strączkowe na nasiona',
      rate: SUBSIDIES_DATA_2025.cropPayments.leguminousCrops,
      value: farmData.leguminousArea,
      result: results.leguminousCrops,
      color: 'from-green-500 to-emerald-600',
      icon: '🫘'
    },
    {
      key: 'fodderArea',
      label: 'Rośliny pastewne',
      rate: SUBSIDIES_DATA_2025.cropPayments.fodderCrops,
      value: farmData.fodderArea,
      result: results.fodderCrops,
      color: 'from-lime-500 to-green-600',
      icon: '🌱'
    },
    {
      key: 'starchPotatoesArea',
      label: 'Ziemniaki skrobiowe',
      rate: SUBSIDIES_DATA_2025.cropPayments.starchPotatoes,
      value: farmData.starchPotatoesArea,
      result: results.starchPotatoes,
      color: 'from-amber-500 to-orange-600',
      icon: '🥔'
    },
    {
      key: 'sugarBeetsArea',
      label: 'Buraki cukrowe',
      rate: SUBSIDIES_DATA_2025.cropPayments.sugarBeets,
      value: farmData.sugarBeetsArea,
      result: results.sugarBeets,
      color: 'from-pink-500 to-red-600',
      icon: '🫐'
    },
    {
      key: 'tomatoesArea',
      label: 'Pomidory',
      rate: SUBSIDIES_DATA_2025.cropPayments.tomatoes,
      value: farmData.tomatoesArea,
      result: results.tomatoes,
      color: 'from-red-500 to-red-700',
      icon: '🍅',
      highlight: true // Highest rate
    },
    {
      key: 'hopsArea',
      label: 'Chmiel',
      rate: SUBSIDIES_DATA_2025.cropPayments.hops,
      value: farmData.hopsArea,
      result: results.hops,
      color: 'from-emerald-500 to-teal-600',
      icon: '🌿'
    },
    {
      key: 'strawberriesArea',
      label: 'Truskawki',
      rate: SUBSIDIES_DATA_2025.cropPayments.strawberries,
      value: farmData.strawberriesArea,
      result: results.strawberries,
      color: 'from-pink-500 to-rose-600',
      icon: '🍓'
    },
    {
      key: 'flaxArea',
      label: 'Len',
      rate: SUBSIDIES_DATA_2025.cropPayments.flax,
      value: farmData.flaxArea,
      result: results.flax,
      color: 'from-blue-500 to-indigo-600',
      icon: '🌾'
    },
    {
      key: 'fiberHempArea',
      label: 'Konopie włókniste',
      rate: SUBSIDIES_DATA_2025.cropPayments.fiberHemp,
      value: farmData.fiberHempArea,
      result: results.fiberHemp,
      color: 'from-green-600 to-green-800',
      icon: '🌿'
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
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg"
        >
          <Wheat className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">Dopłaty do upraw</h2>
          <p className="text-muted-foreground">Dodatkowe wsparcie dla wybranych upraw - 2025</p>
        </div>
      </div>

      {/* Information Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Dopłaty do upraw przysługują za powierzchnie określonych gatunków roślin. 
          Kwoty wyświetlane w <strong>{preferredCurrency}</strong>.
        </AlertDescription>
      </Alert>

      {/* Crop Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cropData.map((crop, index) => (
          <motion.div
            key={crop.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Card className={`hover:shadow-lg transition-shadow ${crop.highlight ? 'ring-2 ring-red-200' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="text-lg">{crop.icon}</span>
                  {crop.label}
                  {crop.highlight && (
                    <Badge variant="destructive" className="text-xs">
                      TOP
                    </Badge>
                  )}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  Stawka: {formatCurrency(getConvertedRate(crop.rate), preferredCurrency)}/ha
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <FormField
                  label="Powierzchnia"
                >
                  <NumericInput
                    value={crop.value}
                    onChange={(value) => updateFarmData({ [crop.key]: value })}
                    placeholder="0.00"
                    unit="ha"
                    min={0}
                    max={1000}
                    step={0.01}
                  />
                </FormField>
                
                <AnimatePresence>
                  {crop.value > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-3 rounded-lg bg-gradient-to-r ${crop.color} text-white text-sm`}
                    >
                      <div className="font-medium">
                        {formatCurrency(getDisplayAmount(crop.result), preferredCurrency)}
                      </div>
                      <div className="text-xs opacity-90">
                        {crop.value} ha × {formatCurrency(getConvertedRate(crop.rate), preferredCurrency)}/ha
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
            <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white overflow-hidden shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <TrendingUp className="h-5 w-5" />
                  Suma dopłat do upraw
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
                      <div className="text-lg font-semibold opacity-90">Łączne dopłaty do upraw</div>
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
              <Sprout className="h-4 w-4" />
              <span>Najlepsze stawki</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <span className="font-medium">Pomidory:</span> {formatCurrency(getConvertedRate(550), preferredCurrency)}/ha</li>
              <li>• <span className="font-medium">Chmiel:</span> {formatCurrency(getConvertedRate(436.67), preferredCurrency)}/ha</li>
              <li>• <span className="font-medium">Ziemniaki skrobiowe:</span> {formatCurrency(getConvertedRate(383.94), preferredCurrency)}/ha</li>
              <li>• <span className="font-medium">Buraki cukrowe:</span> {formatCurrency(getConvertedRate(300.75), preferredCurrency)}/ha</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              📋 <span>Wymagania</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Uprawy muszą być zgłoszone we wniosku</li>
              <li>• Minimum 0,1 ha powierzchni</li>
              <li>• Zgodność z wymaganiami warunkowości</li>
              <li>• Kontrola jakości nasion (niektóre uprawy)</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}