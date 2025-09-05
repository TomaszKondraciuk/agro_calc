'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Info, ExternalLink, Leaf, Github } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="border-t bg-muted/30 mt-12"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Important Notices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Uwaga:</strong> Przedstawione kwoty mają charakter szacunkowy i opierają się na 
                oficjalnych stawkach MRiRW. Ostateczne stawki dopłat za 2025 rok będą znane w październiku 2025.
              </AlertDescription>
            </Alert>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Źródła:</strong> Ministerstwo Rolnictwa i Rozwoju Wsi, ARiMR. 
                Kursy walut: PLN (4,45), UAH (45,20) - szacunkowe.
              </AlertDescription>
            </Alert>
          </div>

          {/* Useful Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="ghost" size="sm" className="justify-start h-auto p-3" asChild>
              <a href="https://www.arimr.gov.pl" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="font-medium text-left">ARiMR</div>
                  <div className="text-xs text-muted-foreground text-left">Strona główna</div>
                </div>
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start h-auto p-3" asChild>
              <a href="https://epue.arimr.gov.pl" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="font-medium text-left">eWniosekPlus</div>
                  <div className="text-xs text-muted-foreground text-left">Składanie wniosków</div>
                </div>
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start h-auto p-3" asChild>
              <a href="https://www.gov.pl/web/arimr" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="font-medium text-left">Gov.pl</div>
                  <div className="text-xs text-muted-foreground text-left">Informacje oficjalne</div>
                </div>
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start h-auto p-3" asChild>
              <a href="https://www.gov.pl/web/rolnictwo" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="font-medium text-left">MRiRW</div>
                  <div className="text-xs text-muted-foreground text-left">Ministerstwo</div>
                </div>
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="font-medium">Kalkulator Dopłat Rolnych 2025</span>
            </div>
            <p>
              © 2025 Opracowane na podstawie oficjalnych źródeł rządowych. 
              <a href="https://www.gov.pl/web/arimr" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                gov.pl/web/arimr
              </a>
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="text-xs">Next.js 15 • TypeScript • Tailwind v4 • Vitest</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}