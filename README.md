# 🌾 Kalkulator Dopłat Rolnych 2025

Nowoczesna aplikacja Next.js do obliczania dopłat rolnych na 2025 rok na podstawie oficjalnych stawek ARiMR.

## ✨ Funkcjonalności

- 🧮 **Kompletne obliczenia dopłat**:
  - Dopłaty bezpośrednie (podstawowe wsparcie, redystrybucyjna, płatność dla młodych rolników)
  - Dopłaty do upraw specjalnych (9 rodzajów upraw)
  - Dopłaty do zwierząt (4 kategorie z limitami)
  - Ekoschematy (15 programów w 4 kategoriach)

- 🌐 **Pełna lokalizacja**:
  - Polski (domyślny)
  - Angielski  
  - Ukraiński

- 💱 **Obsługa walut**:
  - PLN (domyślna)
  - EUR
  - UAH

- 📱 **Nowoczesny UI/UX**:
  - Responsive design
  - Framer Motion animations
  - shadcn/ui komponenty
  - Accessibility (WCAG)
  - Dark mode ready

## 🚀 Technologie

- **Next.js 15** z Turbopack
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (alpha)
- **shadcn/ui** komponenty
- **next-intl** dla i18n
- **Framer Motion** dla animacji
- **Vitest** + **React Testing Library**

## 📦 Instalacja

```bash
# Klonuj repozytorium
git clone <repo-url>
cd kalkulator-doplat-rolnych

# Zainstaluj zależności
npm install

# Uruchom w trybie development
npm run dev

# Otwórz http://localhost:3000
```

## 🧪 Testowanie

```bash
# Uruchom testy
npm test

# Testy z interfejsem
npm run test:ui

# Coverage report
npm run test:coverage

# Type checking
npm run type-check
```

## 🏗️ Build i Deploy

```bash
# Build produkcyjny
npm run build

# Uruchom produkcyjną wersję
npm start

# Deploy na Vercel
vercel --prod
```

## 📊 Dane źródłowe

Wszystkie stawki dopłat pochodzą z oficjalnych źródeł:
- **Ministerstwo Rolnictwa i Rozwoju Wsi**
- **Agencja Restrukturyzacji i Modernizacji Rolnictwa (ARiMR)**
- **Portal Gov.pl**

### Kursy walut (szacunkowe):
- EUR/PLN: 4,45
- EUR/UAH: 45,20

### Terminy 2025:
- **Składanie wniosków**: 15 marca - 16 czerwca 2025
- **Późne składanie**: do 11 lipca 2025 (-1%/dzień)
- **Zmiany**: do 1 lipca 2025
- **Płatności**: 1 grudnia 2025 - 30 czerwca 2026

## 🗂️ Struktura projektu

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   └── globals.css        # Tailwind v4 styles
│   ├── components/            # React komponenty
│   │   ├── ui/                # shadcn/ui komponenty
│   │   ├── calculator/        # Komponenty kalkulatora
│   │   ├── forms/             # Komponenty formularzy
│   │   └── layout/            # Layout komponenty
│   ├── lib/                   # Utility funkcje
│   │   ├── calculations.ts    # Engine obliczeń
│   │   ├── subsidies-data.ts  # Dane ARiMR 2025
│   │   └── utils.ts           # Pomocnicze funkcje
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript definicje
│   ├── i18n/                  # next-intl konfiguracja
│   ├── messages/              # Tłumaczenia (pl/en/uk)
│   └── __tests__/             # Testy
├── components.json            # shadcn/ui config
├── tailwind.config.mjs        # Tailwind v4 config
├── vitest.config.mjs          # Vitest config
└── next.config.mjs            # Next.js + i18n config
```

## 🧮 Przykład użycia

```typescript
import { calculateSubsidies } from '@/lib/calculations';

const farmData = {
  totalArea: 25,
  isYoungFarmer: true,
  isSmallFarm: false,
  // ... inne dane
};

const results = calculateSubsidies(farmData, 'PLN');
console.log(`Suma dopłat: ${results.grandTotalConverted} PLN`);
```

## 🤝 Contributing

1. Fork projektu
2. Stwórz feature branch (`git checkout -b feature/amazing-feature`)
3. Commit zmiany (`git commit -m 'Add amazing feature'`)
4. Push do branch (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

## ⚠️ Disclaimer

Ta aplikacja ma charakter **informacyjny** i **pomocniczy**. Prezentowane kwoty są **szacunkowe** na podstawie dostępnych danych MRiRW. 

**Ostateczne stawki dopłat** za 2025 rok będą ogłoszone przez Komisję Europejską w październiku 2025.

Przed składaniem wniosków należy zweryfikować aktualne stawki na oficjalnych stronach:
- [ARiMR.gov.pl](https://www.arimr.gov.pl)
- [Gov.pl/ARiMR](https://www.gov.pl/web/arimr)

## 📄 Licencja

MIT License - szczegóły w pliku `LICENSE`.

## 🔗 Linki

- [ARiMR - Strona główna](https://www.arimr.gov.pl)
- [eWniosekPlus - Składanie wniosków](https://epue.arimr.gov.pl)
- [Gov.pl - Informacje o dopłatach](https://www.gov.pl/web/arimr)
- [MRiRW](https://www.gov.pl/web/rolnictwo)

---

**🌾 Stworzone z ❤️ dla polskich rolników**

*Wersja: 2.0.0 | Styczeń 2025 | Next.js 15 + TypeScript + Tailwind v4*
