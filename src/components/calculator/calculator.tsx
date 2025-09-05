'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DirectPayments } from './direct-payments';
import { CropPayments } from './crop-payments';
import { AnimalPayments } from './animal-payments';
import { Ecoschemes } from './ecoschemes';
import { Summary } from './summary';
import { useCalculator } from '@/hooks/use-calculator';
import { formatCurrency } from '@/lib/utils';
import { exportToPDF } from '@/lib/pdf-export';
import { SUBSIDIES_DATA_2025 } from '@/lib/subsidies-data';
import { 
  Calculator as CalculatorIcon, 
  Wheat, 
  PawPrint, 
  Leaf, 
  PieChart,
  TrendingUp,
  AlertTriangle,
  Banknote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Calculator() {
  const t = useTranslations();
  const { 
    farmData, 
    updateFarmData, 
    results, 
    validationErrors,
    resetCalculator, 
    preferredCurrency, 
    toggleCurrency,
    exportToCSV,
    isCalculating
  } = useCalculator();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Currency Toggle & Quick Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleCurrency}
            className="gap-2"
          >
            <Banknote className="h-4 w-4" />
            {t('common.currency')}: {preferredCurrency}
          </Button>
          <Badge variant="outline" className="text-xs">
            {preferredCurrency === 'EUR' ? 'Base currency' : 
             preferredCurrency === 'PLN' ? `1 EUR = ${SUBSIDIES_DATA_2025.currencyRates.PLN} PLN` :
             `1 EUR = ${SUBSIDIES_DATA_2025.currencyRates.UAH} UAH`}
          </Badge>

          {isCalculating && (
            <Badge variant="secondary" className="text-xs animate-pulse">
              Obliczanie...
            </Badge>
          )}
        </div>

        <AnimatePresence>
          {results.grandTotalConverted > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3"
            >
              <div className="text-right">
                <div className="text-sm text-muted-foreground">{t('summary.grandTotal')}</div>
                <div className="text-2xl font-bold currency-display">
                  {formatCurrency(results.grandTotalConverted, preferredCurrency)}
                </div>
              </div>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Validation Errors */}
      <AnimatePresence>
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Calculator Tabs */}
      <Tabs defaultValue="direct-payments" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="direct-payments" className="gap-2">
            <CalculatorIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.directPayments')}</span>
            <span className="sm:hidden">Bezp.</span>
          </TabsTrigger>
          <TabsTrigger value="crop-payments" className="gap-2">
            <Wheat className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.cropPayments')}</span>
            <span className="sm:hidden">Uprawy</span>
          </TabsTrigger>
          <TabsTrigger value="animal-payments" className="gap-2">
            <PawPrint className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.animalPayments')}</span>
            <span className="sm:hidden">Zw.</span>
          </TabsTrigger>
          <TabsTrigger value="ecoschemes" className="gap-2">
            <Leaf className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.ecoschemes')}</span>
            <span className="sm:hidden">Eko</span>
          </TabsTrigger>
          <TabsTrigger value="summary" className="gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.summary')}</span>
            <span className="sm:hidden">Suma</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="direct-payments" className="mt-6">
          <DirectPayments 
            farmData={farmData} 
            updateFarmData={updateFarmData}
            results={results.directPayments}
            preferredCurrency={preferredCurrency}
          />
        </TabsContent>

        <TabsContent value="crop-payments" className="mt-6">
          <CropPayments 
            farmData={farmData} 
            updateFarmData={updateFarmData}
            results={results.cropPayments}
            preferredCurrency={preferredCurrency}
          />
        </TabsContent>

        <TabsContent value="animal-payments" className="mt-6">
          <AnimalPayments 
            farmData={farmData} 
            updateFarmData={updateFarmData}
            results={results.animalPayments}
            preferredCurrency={preferredCurrency}
          />
        </TabsContent>

        <TabsContent value="ecoschemes" className="mt-6">
          <Ecoschemes 
            farmData={farmData} 
            updateFarmData={updateFarmData}
            results={results.ecoschemes}
            preferredCurrency={preferredCurrency}
          />
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <Summary 
            results={results}
            preferredCurrency={preferredCurrency}
            onExportPDF={() => exportToPDF(results, preferredCurrency, farmData)}
            onExportCSV={exportToCSV}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}