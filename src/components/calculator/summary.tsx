'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import type { CalculationResult, Currency } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency, convertCurrency } from '@/lib/utils';
import { DEADLINES_2025 } from '@/lib/subsidies-data';
import { 
  PieChart, 
  Download, 
  FileText, 
  TrendingUp, 
  Calendar,
  Euro,
  Info,
  Calculator,
  Wheat,
  PawPrint,
  Leaf,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SummaryProps {
  results: CalculationResult;
  preferredCurrency: Currency;
  onExportPDF: () => void;
  onExportCSV: () => void;
}

export function Summary({ 
  results, 
  preferredCurrency,
  onExportPDF,
  onExportCSV
}: SummaryProps) {
  const t = useTranslations('summary');

  const getDisplayAmount = (eurAmount: number) => {
    return convertCurrency(eurAmount, preferredCurrency);
  };

  const summaryData = [
    {
      key: 'directPayments',
      label: 'Dopłaty bezpośrednie',
      amount: results.directPayments.total,
      color: 'from-green-500 to-emerald-600',
      icon: Calculator,
      percentage: results.grandTotal > 0 ? (results.directPayments.total / results.grandTotal) * 100 : 0
    },
    {
      key: 'cropPayments',
      label: 'Dopłaty do upraw',
      amount: results.cropPayments.total,
      color: 'from-amber-500 to-orange-600',
      icon: Wheat,
      percentage: results.grandTotal > 0 ? (results.cropPayments.total / results.grandTotal) * 100 : 0
    },
    {
      key: 'animalPayments',
      label: 'Dopłaty do zwierząt',
      amount: results.animalPayments.total,
      color: 'from-amber-600 to-orange-700',
      icon: PawPrint,
      percentage: results.grandTotal > 0 ? (results.animalPayments.total / results.grandTotal) * 100 : 0
    },
    {
      key: 'ecoschemes',
      label: 'Ekoschematy',
      amount: results.ecoschemes.total,
      color: 'from-green-500 to-emerald-600',
      icon: Leaf,
      percentage: results.grandTotal > 0 ? (results.ecoschemes.total / results.grandTotal) * 100 : 0
    }
  ];

  const hasResults = results.grandTotal > 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="summary-content"
    >
      {/* Section Header */}
      <div className="section-header">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
        >
          <PieChart className="h-5 w-5 text-white" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">Podsumowanie obliczeń</h2>
          <p className="text-muted-foreground">Kompletne zestawienie wszystkich dopłat - 2025</p>
        </div>
      </div>

      {!hasResults ? (
        /* No Results State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <PieChart className="h-24 w-24 mx-auto mb-6 text-muted-foreground/30" />
          <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
            Brak danych do podsumowania
          </h3>
          <p className="text-muted-foreground mb-6">
            Wprowadź dane gospodarstwa w pozostałych zakładkach, aby zobaczyć podsumowanie
          </p>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Rozpocznij od zakładki "Dopłaty bezpośrednie" i wprowadź powierzchnię gospodarstwa
            </AlertDescription>
          </Alert>
        </motion.div>
      ) : (
        /* Results Display */
        <div className="space-y-6">
          {/* Grand Total Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <TrendingUp className="h-6 w-6" />
                  Łączna kwota dopłat
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
                      <div className="text-2xl font-bold opacity-90">SUMA DOPŁAT 2025</div>
                      <div className="text-sm opacity-75 space-y-1">
                        <div>Data obliczenia: {new Date().toLocaleDateString('pl-PL')}</div>
                        {preferredCurrency !== 'EUR' && (
                          <div>W EUR: {formatCurrency(results.grandTotal, 'EUR')}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold currency-display">
                        {formatCurrency(getDisplayAmount(results.grandTotal), preferredCurrency)}
                      </div>
                      <div className="text-sm opacity-75">
                        {preferredCurrency === 'PLN' ? 'złotych polskich' : 
                         preferredCurrency === 'EUR' ? 'euro' : 'hrywna ukraińska'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Breakdown Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {summaryData.map((item, index) => (
              item.amount > 0 && (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm leading-tight">{item.label}</h4>
                          <div className="text-xs text-muted-foreground">
                            {item.percentage.toFixed(1)}% całości
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl font-bold">
                          {formatCurrency(getDisplayAmount(item.amount), preferredCurrency)}
                        </div>
                        <div className={`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </motion.div>

          {/* Detailed Breakdown Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Szczegółowe zestawienie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Kategoria</th>
                        <th className="text-right py-2">Kwota ({preferredCurrency})</th>
                        <th className="text-right py-2">% całości</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summaryData.map((item) => (
                        item.amount > 0 && (
                          <tr key={item.key} className="border-b border-gray-100">
                            <td className="py-3 flex items-center gap-2">
                              <item.icon className="h-4 w-4 text-muted-foreground" />
                              {item.label}
                            </td>
                            <td className="text-right py-3 font-medium">
                              {formatCurrency(getDisplayAmount(item.amount), preferredCurrency)}
                            </td>
                            <td className="text-right py-3 text-muted-foreground">
                              {item.percentage.toFixed(1)}%
                            </td>
                          </tr>
                        )
                      ))}
                      <tr className="border-t-2 border-blue-200 bg-blue-50">
                        <td className="py-3 font-bold">RAZEM</td>
                        <td className="text-right py-3 font-bold text-lg">
                          {formatCurrency(getDisplayAmount(results.grandTotal), preferredCurrency)}
                        </td>
                        <td className="text-right py-3 font-bold">100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Export Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Eksport wyników
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    onClick={onExportPDF} 
                    className="gap-2"
                    size="lg"
                  >
                    <Download className="h-4 w-4" />
                    Pobierz PDF
                  </Button>
                  <Button 
                    onClick={onExportCSV} 
                    variant="outline"
                    className="gap-2"
                    size="lg"
                  >
                    <FileText className="h-4 w-4" />
                    Pobierz CSV
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Eksportuj wyniki do pliku PDF lub CSV do dalszego wykorzystania
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Terminy 2025</span>
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <span className="font-medium">Składanie wniosków:</span> 15.03 - 16.06.2025</li>
                  <li>• <span className="font-medium">Korekty:</span> do 01.07.2025</li>
                  <li>• <span className="font-medium">Płatności:</span> 01.12.2025 - 30.06.2026</li>
                  <li>• <span className="font-medium">Późne składanie:</span> do 11.07.2025</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  <span>Ważne informacje</span>
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Kwoty są <strong>szacunkowe</strong> - nie stanowią podstawy do roszczeń</li>
                  <li>• Kurs EUR zostanie ustalony 30.09.2025</li>
                  <li>• Wymagane spełnienie warunkowości</li>
                  <li>• Dane na podstawie stawek ARiMR/MRiRW</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}