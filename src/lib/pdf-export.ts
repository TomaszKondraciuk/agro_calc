import jsPDF from 'jspdf';
import type { CalculationResult, Currency, FarmData } from '@/types';
import { formatCurrency, convertCurrency } from './utils';

export async function exportToPDF(
  results: CalculationResult,
  currency: Currency,
  farmData: FarmData
) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Configuration
  const margin = 20;
  const lineHeight = 7;
  let currentY = margin;

  // Helper function to add text
  const addText = (text: string, x: number, y: number, fontSize = 12, style: 'normal' | 'bold' = 'normal') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', style);
    pdf.text(text, x, y);
  };

  // Helper function to add line
  const addLine = () => {
    currentY += lineHeight;
    if (currentY > pageHeight - 30) {
      pdf.addPage();
      currentY = margin;
    }
  };

  // Helper function to format amount
  const formatAmount = (eurAmount: number) => {
    return formatCurrency(convertCurrency(eurAmount, currency), currency);
  };

  // Header
  addText('KALKULATOR DOPŁAT ROLNYCH 2025', margin, currentY, 18, 'bold');
  addLine();
  addText('Zestawienie obliczeń na podstawie stawek ARiMR/MRiRW', margin, currentY, 12);
  addLine();
  addLine();

  // Generation info
  addText(`Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}`, margin, currentY, 10);
  addLine();
  addText(`Waluta: ${currency}`, margin, currentY, 10);
  addLine();
  addLine();

  // Farm basic data
  addText('DANE PODSTAWOWE GOSPODARSTWA', margin, currentY, 14, 'bold');
  addLine();
  addText(`Całkowita powierzchnia: ${farmData.totalArea} ha`, margin + 10, currentY);
  addLine();
  
  if (farmData.isYoungFarmer) {
    addText('✓ Młody rolnik', margin + 10, currentY);
    addLine();
  }
  
  if (farmData.isSmallFarm) {
    addText('✓ Małe gospodarstwo', margin + 10, currentY);
    addLine();
  }
  addLine();

  // Direct Payments
  if (results.directPayments.total > 0) {
    addText('DOPŁATY BEZPOŚREDNIE', margin, currentY, 14, 'bold');
    addLine();
    
    if (results.directPayments.basicIncomeSupport > 0) {
      addText(`Podstawowe wsparcie dochodów: ${formatAmount(results.directPayments.basicIncomeSupport)}`, margin + 10, currentY);
      addLine();
    }
    
    if (results.directPayments.redistributivePayment > 0) {
      addText(`Płatność redystrybucyjna: ${formatAmount(results.directPayments.redistributivePayment)}`, margin + 10, currentY);
      addLine();
    }
    
    if (results.directPayments.youngFarmersPayment > 0) {
      addText(`Płatność dla młodych rolników: ${formatAmount(results.directPayments.youngFarmersPayment)}`, margin + 10, currentY);
      addLine();
    }
    
    if (results.directPayments.smallFarmsPayment > 0) {
      addText(`Płatność dla małych gospodarstw: ${formatAmount(results.directPayments.smallFarmsPayment)}`, margin + 10, currentY);
      addLine();
    }
    
    if (results.directPayments.supplementaryBasicPayment > 0) {
      addText(`Uzupełniające płatności podstawowe: ${formatAmount(results.directPayments.supplementaryBasicPayment)}`, margin + 10, currentY);
      addLine();
    }
    
    addText(`SUMA DOPŁAT BEZPOŚREDNICH: ${formatAmount(results.directPayments.total)}`, margin + 10, currentY, 12, 'bold');
    addLine();
    addLine();
  }

  // Crop Payments
  if (results.cropPayments.total > 0) {
    addText('DOPŁATY DO UPRAW', margin, currentY, 14, 'bold');
    addLine();
    
    const cropPayments = [
      { label: 'Rośliny strączkowe na nasiona', amount: results.cropPayments.leguminousCrops, area: farmData.leguminousArea },
      { label: 'Rośliny pastewne', amount: results.cropPayments.fodderCrops, area: farmData.fodderArea },
      { label: 'Ziemniaki skrobiowe', amount: results.cropPayments.starchPotatoes, area: farmData.starchPotatoesArea },
      { label: 'Buraki cukrowe', amount: results.cropPayments.sugarBeets, area: farmData.sugarBeetsArea },
      { label: 'Pomidory', amount: results.cropPayments.tomatoes, area: farmData.tomatoesArea },
      { label: 'Chmiel', amount: results.cropPayments.hops, area: farmData.hopsArea },
      { label: 'Truskawki', amount: results.cropPayments.strawberries, area: farmData.strawberriesArea },
      { label: 'Len', amount: results.cropPayments.flax, area: farmData.flaxArea },
      { label: 'Konopie włókniste', amount: results.cropPayments.fiberHemp, area: farmData.fiberHempArea }
    ];
    
    cropPayments.forEach(crop => {
      if (crop.amount > 0) {
        addText(`${crop.label}: ${formatAmount(crop.amount)} (${crop.area} ha)`, margin + 10, currentY);
        addLine();
      }
    });
    
    addText(`SUMA DOPŁAT DO UPRAW: ${formatAmount(results.cropPayments.total)}`, margin + 10, currentY, 12, 'bold');
    addLine();
    addLine();
  }

  // Animal Payments
  if (results.animalPayments.total > 0) {
    addText('DOPŁATY DO ZWIERZĄT', margin, currentY, 14, 'bold');
    addLine();
    
    const animalPayments = [
      { label: 'Bydło (do 24 miesięcy)', amount: results.animalPayments.cattle, count: farmData.cattleCount },
      { label: 'Krowy', amount: results.animalPayments.cows, count: farmData.cowsCount },
      { label: 'Owce', amount: results.animalPayments.sheep, count: farmData.sheepCount },
      { label: 'Kozy', amount: results.animalPayments.goats, count: farmData.goatsCount }
    ];
    
    animalPayments.forEach(animal => {
      if (animal.amount > 0) {
        addText(`${animal.label}: ${formatAmount(animal.amount)} (${animal.count} szt.)`, margin + 10, currentY);
        addLine();
      }
    });
    
    addText(`SUMA DOPŁAT DO ZWIERZĄT: ${formatAmount(results.animalPayments.total)}`, margin + 10, currentY, 12, 'bold');
    addLine();
    addLine();
  }

  // Ecoschemes
  if (results.ecoschemes.total > 0) {
    addText('EKOSCHEMATY', margin, currentY, 14, 'bold');
    addLine();
    
    const ecoschemesList = [
      { label: 'Powierzchnie z roślinami miododajnymi', amount: results.ecoschemes.honeyPlants, area: farmData.honeyPlantsArea },
      { label: 'Ekstensywne użytkowanie łąk', amount: results.ecoschemes.extensiveGrassland, area: farmData.extensiveGrasslandArea },
      { label: 'Rośliny okrywowe zimą', amount: results.ecoschemes.winterCover, area: farmData.winterCoverArea },
      { label: 'Struktura upraw urozmaicona', amount: results.ecoschemes.cropDiversification, area: farmData.cropDiversificationArea },
      { label: 'Retencja wody na łąkach', amount: results.ecoschemes.waterRetention, area: farmData.waterRetentionArea },
      { label: 'Odłogowanie gruntów ornych', amount: results.ecoschemes.fallowLand, area: farmData.fallowLandArea },
      { label: 'Biologiczna ochrona roślin', amount: results.ecoschemes.biologicalProtection, area: farmData.biologicalProtectionArea },
      { label: 'Nawożenie mikrobiologiczne', amount: results.ecoschemes.microFertilizers, area: farmData.microFertilizersArea },
      { label: 'IPR - Uprawy sadownicze', amount: results.ecoschemes.iprOrchard, area: farmData.iprOrchardArea },
      { label: 'IPR - Uprawy jagodowe', amount: results.ecoschemes.iprBerry, area: farmData.iprBerryArea },
      { label: 'IPR - Uprawy rolnicze', amount: results.ecoschemes.iprAgricultural, area: farmData.iprAgriculturalArea },
      { label: 'IPR - Uprawy warzywne', amount: results.ecoschemes.iprVegetable, area: farmData.iprVegetableArea },
      { label: 'Nasiona elitarne - zboża', amount: results.ecoschemes.eliteSeedCereals, area: farmData.eliteSeedCerealsArea },
      { label: 'Nasiona elitarne - strączkowe', amount: results.ecoschemes.eliteSeedLegumes, area: farmData.eliteSeedLegumesArea },
      { label: 'Nasiona elitarne - ziemniaki', amount: results.ecoschemes.eliteSeedPotatoes, area: farmData.eliteSeedPotatoesArea }
    ];
    
    ecoschemesList.forEach(eco => {
      if (eco.amount > 0) {
        addText(`${eco.label}: ${formatAmount(eco.amount)} (${eco.area} ha)`, margin + 10, currentY);
        addLine();
      }
    });
    
    addText(`SUMA EKOSCHEMAT: ${formatAmount(results.ecoschemes.total)}`, margin + 10, currentY, 12, 'bold');
    addLine();
    addLine();
  }

  // Grand Total
  addText('ŁĄCZNA KWOTA DOPŁAT', margin, currentY, 16, 'bold');
  addLine();
  addText(`${formatAmount(results.grandTotal)}`, margin, currentY, 20, 'bold');
  addLine();
  addLine();

  // Currency info
  if (currency !== 'EUR') {
    addText(`W EUR: ${formatCurrency(results.grandTotal, 'EUR')}`, margin, currentY, 12);
    addLine();
  }
  addLine();

  // Disclaimers
  addText('WAŻNE INFORMACJE:', margin, currentY, 12, 'bold');
  addLine();
  addText('• Kwoty są szacunkowe i nie stanowią podstawy do roszczeń', margin + 10, currentY, 10);
  addLine();
  addText('• Kurs EUR zostanie ustalony 30 września 2025', margin + 10, currentY, 10);
  addLine();
  addText('• Wymagane spełnienie wszystkich warunków warunkowości', margin + 10, currentY, 10);
  addLine();
  addText('• Dane na podstawie oficjalnych stawek ARiMR/MRiRW na 2025 rok', margin + 10, currentY, 10);
  addLine();

  // Save the PDF
  pdf.save(`kalkulator-doplat-rolnych-${new Date().toISOString().split('T')[0]}.pdf`);
}