'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { FarmData, EcoschemeResult, Currency } from '@/types';
import { FormField } from '@/components/forms/form-field';
import { NumericInput } from '@/components/forms/numeric-input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import { SUBSIDIES_DATA_2025 } from '@/lib/subsidies-data';
import { Leaf, TrendingUp, Info, Sparkles, Bug, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EcoschemesProps {
  farmData: FarmData;
  updateFarmData: (updates: Partial<FarmData>) => void;
  results: EcoschemeResult;
  preferredCurrency: Currency;
}

export function Ecoschemes({ 
  farmData, 
  updateFarmData, 
  results, 
  preferredCurrency 
}: EcoschemesProps) {
  const t = useTranslations('ecoschemes');

  const getDisplayAmount = (eurAmount: number) => {
    return convertCurrency(eurAmount, preferredCurrency);
  };

  const getConvertedRate = (eurRate: number) => {
    return convertCurrency(eurRate, preferredCurrency);
  };

  // Group ecoschemes by category
  const basicEcoschemes = [
    {
      key: 'honeyPlantsArea',
      label: 'Powierzchnie z roślinami miododajnymi',
      rate: SUBSIDIES_DATA_2025.ecoschemes.honeyPlants,
      value: farmData.honeyPlantsArea,
      result: results.honeyPlants,
      color: 'from-yellow-400 to-amber-500',
      icon: '🍯',
      highlight: true
    },
    {
      key: 'extensiveGrasslandArea',
      label: 'Ekstensywne użytkowanie łąk i pastwisk',
      rate: SUBSIDIES_DATA_2025.ecoschemes.extensiveGrassland,
      value: farmData.extensiveGrasslandArea,
      result: results.extensiveGrassland,
      color: 'from-green-400 to-green-600',
      icon: '🌾'
    },
    {
      key: 'winterCoverArea',
      label: 'Rośliny okrywowe zimą',
      rate: SUBSIDIES_DATA_2025.ecoschemes.winterCover,
      value: farmData.winterCoverArea,
      result: results.winterCover,
      color: 'from-blue-400 to-blue-600',
      icon: '❄️'
    },
    {
      key: 'cropDiversificationArea',
      label: 'Struktura upraw urozmaicona',
      rate: SUBSIDIES_DATA_2025.ecoschemes.cropDiversification,
      value: farmData.cropDiversificationArea,
      result: results.cropDiversification,
      color: 'from-purple-400 to-purple-600',
      icon: '🌱'
    },
    {
      key: 'waterRetentionArea',
      label: 'Retencja wody na łąkach i pastwiskach',
      rate: SUBSIDIES_DATA_2025.ecoschemes.waterRetention,
      value: farmData.waterRetentionArea,
      result: results.waterRetention,
      color: 'from-cyan-400 to-cyan-600',
      icon: '💧'
    },
    {
      key: 'fallowLandArea',
      label: 'Odłogowanie gruntów ornych',
      rate: SUBSIDIES_DATA_2025.ecoschemes.fallowLand,
      value: farmData.fallowLandArea,
      result: results.fallowLand,
      color: 'from-gray-400 to-gray-600',
      icon: '🌿'
    },
    {
      key: 'biologicalProtectionArea',
      label: 'Biologiczna ochrona roślin',
      rate: SUBSIDIES_DATA_2025.ecoschemes.biologicalProtection,
      value: farmData.biologicalProtectionArea,
      result: results.biologicalProtection,
      color: 'from-emerald-400 to-emerald-600',
      icon: '🐛'
    },
    {
      key: 'microFertilizersArea',
      label: 'Nawożenie mikrobiologiczne',
      rate: SUBSIDIES_DATA_2025.ecoschemes.microFertilizers,
      value: farmData.microFertilizersArea,
      result: results.microFertilizers,
      color: 'from-lime-400 to-lime-600',
      icon: '🦠'
    }
  ];

  const iprEcoschemes = [
    {
      key: 'iprOrchardArea',
      label: 'IPR - Uprawy sadownicze',
      rate: SUBSIDIES_DATA_2025.ecoschemes.iprOrchard,
      value: farmData.iprOrchardArea,
      result: results.iprOrchard,
      color: 'from-pink-500 to-rose-600',
      icon: '🍎',
      highlight: true
    },
    {
      key: 'iprBerryArea',
      label: 'IPR - Uprawy jagodowe',
      rate: SUBSIDIES_DATA_2025.ecoschemes.iprBerry,
      value: farmData.iprBerryArea,
      result: results.iprBerry,
      color: 'from-indigo-500 to-purple-600',
      icon: '🫐'
    },
    {
      key: 'iprAgriculturalArea',
      label: 'IPR - Uprawy rolnicze',
      rate: SUBSIDIES_DATA_2025.ecoschemes.iprAgricultural,
      value: farmData.iprAgriculturalArea,
      result: results.iprAgricultural,
      color: 'from-amber-500 to-orange-600',
      icon: '🌾'
    },
    {
      key: 'iprVegetableArea',
      label: 'IPR - Uprawy warzywne',
      rate: SUBSIDIES_DATA_2025.ecoschemes.iprVegetable,
      value: farmData.iprVegetableArea,
      result: results.iprVegetable,
      color: 'from-green-500 to-emerald-600',
      icon: '🥬'
    }
  ];

  const eliteSeedEcoschemes = [
    {
      key: 'eliteSeedCerealsArea',
      label: 'Nasiona elitarne - zboża',
      rate: SUBSIDIES_DATA_2025.ecoschemes.eliteSeedCereals,
      value: farmData.eliteSeedCerealsArea,
      result: results.eliteSeedCereals,
      color: 'from-yellow-500 to-amber-600',
      icon: '🌾'
    },
    {
      key: 'eliteSeedLegumesArea',
      label: 'Nasiona elitarne - strączkowe',
      rate: SUBSIDIES_DATA_2025.ecoschemes.eliteSeedLegumes,
      value: farmData.eliteSeedLegumesArea,
      result: results.eliteSeedLegumes,
      color: 'from-green-500 to-green-700',
      icon: '🫘'
    },
    {
      key: 'eliteSeedPotatoesArea',
      label: 'Nasiona elitarne - ziemniaki',
      rate: SUBSIDIES_DATA_2025.ecoschemes.eliteSeedPotatoes,
      value: farmData.eliteSeedPotatoesArea,
      result: results.eliteSeedPotatoes,
      color: 'from-orange-500 to-red-600',
      icon: '🥔'
    }
  ];

  const renderEcoschemeCards = (ecoschemes: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ecoschemes.map((eco, index) => (
        <motion.div
          key={eco.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.4 }}
        >
          <Card className={`hover:shadow-lg transition-shadow ${eco.highlight ? 'ring-2 ring-yellow-200' : ''}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{eco.icon}</span>
                  <span className="line-clamp-2">{eco.label}</span>
                  {eco.highlight && (
                    <Badge variant="secondary" className="text-xs">
                      TOP
                    </Badge>
                  )}
                </div>
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                Stawka: {formatCurrency(getConvertedRate(eco.rate), preferredCurrency)}/ha
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                label="Powierzchnia"
              >
                <NumericInput
                  value={eco.value}
                  onChange={(value) => updateFarmData({ [eco.key]: value })}
                  placeholder="0.00"
                  unit="ha"
                  min={0}
                  max={1000}
                  step={0.01}
                />
              </FormField>
              
              <AnimatePresence>
                {eco.value > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-lg bg-gradient-to-r ${eco.color} text-white text-sm`}
                  >
                    <div className="font-medium">
                      {formatCurrency(getDisplayAmount(eco.result), preferredCurrency)}
                    </div>
                    <div className="text-xs opacity-90">
                      {eco.value} ha × {formatCurrency(getConvertedRate(eco.rate), preferredCurrency)}/ha
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const totalEcoArea = Object.values(farmData)
    .filter((_, index) => index >= 15) // ecoscheme fields start from index 15
    .reduce((sum: number, area) => sum + (typeof area === 'number' ? area : 0), 0);

  const isOverLimit = totalEcoArea > SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa;

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
          <Leaf className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">Ekoschematy</h2>
          <p className="text-muted-foreground">Wsparcie dla praktyk przyjaznych środowisku - 2025</p>
        </div>
      </div>

      {/* Information Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Ekoschematy to dodatkowe płatności za działania prośrodowiskowe. 
          Maksymalny limit: <strong>{SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa} ha</strong>. 
          Obecnie użyte: <strong>{totalEcoArea.toFixed(2)} ha</strong>.
          {isOverLimit && <span className="text-red-600 font-bold"> ⚠️ PRZEKROCZONO LIMIT!</span>}
        </AlertDescription>
      </Alert>

      {/* Ecoschemes Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Podstawowe</span>
            <span className="sm:hidden">Podst.</span>
          </TabsTrigger>
          <TabsTrigger value="ipr" className="gap-2">
            <Bug className="h-4 w-4" />
            <span className="hidden sm:inline">IPR</span>
            <span className="sm:hidden">IPR</span>
          </TabsTrigger>
          <TabsTrigger value="elite" className="gap-2">
            <Droplets className="h-4 w-4" />
            <span className="hidden sm:inline">Nasiona Elitarne</span>
            <span className="sm:hidden">Nasiona</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {renderEcoschemeCards(basicEcoschemes)}
          </motion.div>
        </TabsContent>

        <TabsContent value="ipr" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="space-y-4"
          >
            <Alert>
              <Bug className="h-4 w-4" />
              <AlertDescription>
                <strong>Integrowana Produkcja Roślin (IPR)</strong> - system produkcji stosujący wszystkie dostępne metody i środki ograniczania stosowania pestycydów.
              </AlertDescription>
            </Alert>
            {renderEcoschemeCards(iprEcoschemes)}
          </motion.div>
        </TabsContent>

        <TabsContent value="elite" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="space-y-4"
          >
            <Alert>
              <Droplets className="h-4 w-4" />
              <AlertDescription>
                <strong>Nasiona elitarne</strong> - wsparcie dla produkcji wysokiej jakości materiału siewnego pierwszej reprodukcji.
              </AlertDescription>
            </Alert>
            {renderEcoschemeCards(eliteSeedEcoschemes)}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
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
                  Suma ecoschematów
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
                      <div className="text-lg font-semibold opacity-90">Łączne dopłaty ecoschematów</div>
                      <div className="text-sm opacity-75">
                        Powierzchnia: {totalEcoArea.toFixed(2)} ha
                        {preferredCurrency !== 'EUR' && (
                          <span className="ml-2">({formatCurrency(results.total, 'EUR')} w EUR)</span>
                        )}
                      </div>
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
              🏆 <span>Najlepsze stawki</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <span className="font-medium">IPR Sadownicze:</span> {formatCurrency(getConvertedRate(342.70), preferredCurrency)}/ha</li>
              <li>• <span className="font-medium">IPR Warzywne/Jagodowe:</span> {formatCurrency(getConvertedRate(309.21), preferredCurrency)}/ha</li>
              <li>• <span className="font-medium">Rośliny miododajne:</span> {formatCurrency(getConvertedRate(269.21), preferredCurrency)}/ha</li>
              <li>• <span className="font-medium">IPR Rolnicze:</span> {formatCurrency(getConvertedRate(146.07), preferredCurrency)}/ha</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              📋 <span>Warunki</span>
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Przestrzeganie specyficznych wymagań każdego ecoschematu</li>
              <li>• Certyfikaty IPR (dla upraw IPR)</li>
              <li>• Dokumentacja prowadzonych działań</li>
              <li>• Maksymalny limit: {SUBSIDIES_DATA_2025.limits.ecoschemesMaxHa} ha</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}