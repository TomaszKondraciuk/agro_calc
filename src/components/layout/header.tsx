'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Leaf, Calendar, Banknote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { motion } from 'framer-motion';

export function Header() {
  const t = useTranslations();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-6">
          {/* Logo and Title */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4 flex-1 justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
                >
                  <Leaf className="h-6 w-6 text-white" />
                </motion.div>
                <div className="text-left">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {t('app.title')}
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base font-medium mt-1">
                    {t('app.subtitle')}
                  </p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="absolute right-4 top-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <Badge variant="success" className="gap-1">
              <Calendar className="h-3 w-3" />
              Kampania 2025
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Banknote className="h-3 w-3" />
              PLN jako główna waluta
            </Badge>
            <Badge variant="warning" className="gap-1">
              Wszystkie dopłaty uwzględnione
            </Badge>
          </motion.div>

          {/* Deadlines Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Terminy składania wniosków 2025</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="font-medium text-green-900 mb-1">Główny termin</div>
                    <div className="text-green-700">15 marca - 16 czerwca 2025</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="font-medium text-amber-900 mb-1">Późne składanie</div>
                    <div className="text-amber-700">do 11 lipca 2025 (-1%/dzień)</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="font-medium text-blue-900 mb-1">Zmiany</div>
                    <div className="text-blue-700">do 1 lipca 2025</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}