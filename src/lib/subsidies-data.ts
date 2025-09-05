import type { SubsidiesData } from '@/types';

/**
 * Official agricultural subsidies data for 2025
 * Source: Ministry of Agriculture and Rural Development, ARiMR
 * Rates in EUR - converted to other currencies as needed
 */
export const SUBSIDIES_DATA_2025: SubsidiesData = {
  directPayments: {
    basicIncomeSupport: 114.42,      // Basic income support
    redistributivePayment: 39.80,    // Redistributive payment (max 30 ha)
    youngFarmersPayment: 58.12,      // Young farmers payment
    smallFarmsPayment: 225.00,       // Small farms payment (max 5 ha)
    supplementaryBasicPayment: 13.00, // Supplementary basic payment
  },

  cropPayments: {
    leguminousCrops: 206.09,         // Leguminous crops for seeds
    fodderCrops: 103.70,             // Fodder crops
    starchPotatoes: 383.94,          // Starch potatoes
    sugarBeets: 300.75,              // Sugar beets
    tomatoes: 550.00,                // Tomatoes (highest rate!)
    hops: 436.67,                    // Hops
    strawberries: 272.14,            // Strawberries
    flax: 101.85,                    // Flax
    fiberHemp: 29.55                 // Fiber hemp
  },

  animalPayments: {
    cattle: { rate: 75.73, limit: 20 },    // Cattle (up to 24 months)
    cows: { rate: 96.64, limit: 20 },      // Cows
    sheep: { rate: 25.80 },                // Sheep (no limit)
    goats: { rate: 11.27 }                 // Goats (no limit)
  },

  ecoschemes: {
    honeyPlants: 269.21,             // Areas with honey plants
    extensiveGrassland: 112.35,      // Extensive grassland use
    winterCover: 112.35,             // Winter cover crops
    cropDiversification: 67.41,      // Diversified crop structure
    waterRetention: 63.15,           // Water retention on grassland
    fallowLand: 126.52,              // Fallow land
    biologicalProtection: 89.89,     // Biological crop protection
    microFertilizers: 22.47,         // Microbiological fertilizers
    iprOrchard: 342.70,              // IPR - Orchard crops
    iprBerry: 309.21,                // IPR - Berry crops
    iprAgricultural: 146.07,         // IPR - Agricultural crops
    iprVegetable: 309.21,            // IPR - Vegetable crops
    eliteSeedCereals: 26.74,         // Elite seed - cereals
    eliteSeedLegumes: 43.37,         // Elite seed - legumes
    eliteSeedPotatoes: 112.13        // Elite seed - potatoes
  },

  limits: {
    redistributiveMaxHa: 30,         // Max area for redistributive payment
    smallFarmsMaxHa: 5,              // Max area for small farms
    cattleLimit: 20,                 // Max cattle count
    cowsLimit: 20,                   // Max cows count
    ecoschemesMaxHa: 300             // Max ecoschemes area
  },

  currencyRates: {
    EUR: 1,
    PLN: 4.45,  // EUR/PLN rate
    UAH: 45.20  // EUR/UAH rate
  }
};

// Deadlines for 2025
export const DEADLINES_2025 = {
  applicationStart: '2025-03-15',
  applicationEnd: '2025-06-16', 
  lateSubmissionEnd: '2025-07-11',
  changesDeadline: '2025-07-01',
  paymentPeriod: '2025-12-01 to 2026-06-30'
} as const;