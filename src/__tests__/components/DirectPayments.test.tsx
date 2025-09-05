import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DirectPayments } from '@/components/calculator/direct-payments';
import type { FarmData, PaymentResult } from '@/types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('DirectPayments', () => {
  const mockFarmData: FarmData = {
    totalArea: 0,
    isYoungFarmer: false,
    isSmallFarm: false,
    leguminousArea: 0,
    fodderArea: 0,
    starchPotatoesArea: 0,
    sugarBeetsArea: 0,
    tomatoesArea: 0,
    hopsArea: 0,
    strawberriesArea: 0,
    flaxArea: 0,
    fiberHempArea: 0,
    cattleCount: 0,
    cowsCount: 0,
    sheepCount: 0,
    goatsCount: 0,
    honeyPlantsArea: 0,
    extensiveGrasslandArea: 0,
    winterCoverArea: 0,
    cropDiversificationArea: 0,
    waterRetentionArea: 0,
    fallowLandArea: 0,
    biologicalProtectionArea: 0,
    microFertilizersArea: 0,
    iprOrchardArea: 0,
    iprBerryArea: 0,
    iprAgriculturalArea: 0,
    iprVegetableArea: 0,
    eliteSeedCerealsArea: 0,
    eliteSeedLegumesArea: 0,
    eliteSeedPotatoesArea: 0,
  };

  const mockResults: PaymentResult = {
    basicIncomeSupport: 0,
    redistributivePayment: 0,
    youngFarmersPayment: 0,
    smallFarmsPayment: 0,
    supplementaryBasicPayment: 0,
    total: 0,
  };

  const mockUpdateFarmData = vi.fn();

  const defaultProps = {
    farmData: mockFarmData,
    updateFarmData: mockUpdateFarmData,
    results: mockResults,
    preferredCurrency: 'PLN' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render component title', () => {
    render(<DirectPayments {...defaultProps} />);
    expect(screen.getByText('directPayments.title')).toBeInTheDocument();
  });

  it('should render total area input', () => {
    render(<DirectPayments {...defaultProps} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('should call updateFarmData when total area changes', async () => {
    const user = userEvent.setup();
    render(<DirectPayments {...defaultProps} />);

    const input = screen.getByRole('spinbutton');
    await user.type(input, '25');

    expect(mockUpdateFarmData).toHaveBeenCalledWith({ totalArea: 25 });
  });

  it('should render young farmer checkbox', () => {
    render(<DirectPayments {...defaultProps} />);
    expect(screen.getByRole('checkbox', { name: /young-farmer/i })).toBeInTheDocument();
  });

  it('should call updateFarmData when young farmer checkbox is toggled', async () => {
    const user = userEvent.setup();
    render(<DirectPayments {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox', { name: /young-farmer/i });
    await user.click(checkbox);

    expect(mockUpdateFarmData).toHaveBeenCalledWith({ isYoungFarmer: true });
  });

  it('should render small farm checkbox', () => {
    render(<DirectPayments {...defaultProps} />);
    expect(screen.getByRole('checkbox', { name: /small-farm/i })).toBeInTheDocument();
  });

  it('should display results when total is greater than 0', () => {
    const propsWithResults = {
      ...defaultProps,
      results: {
        ...mockResults,
        basicIncomeSupport: 1144.2,
        total: 1144.2,
      },
    };

    render(<DirectPayments {...propsWithResults} />);
    expect(screen.getByText('Obliczone dopłaty bezpośrednie')).toBeInTheDocument();
  });

  it('should display currency correctly', () => {
    const propsWithResults = {
      ...defaultProps,
      preferredCurrency: 'EUR' as const,
      results: {
        ...mockResults,
        basicIncomeSupport: 1144.2,
        total: 1144.2,
      },
    };

    render(<DirectPayments {...propsWithResults} />);
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('should show basic rate when total area is entered', () => {
    const propsWithArea = {
      ...defaultProps,
      farmData: {
        ...mockFarmData,
        totalArea: 10,
      },
    };

    render(<DirectPayments {...propsWithArea} />);
    expect(screen.getByText(/Podstawowa stawka:/)).toBeInTheDocument();
  });
});