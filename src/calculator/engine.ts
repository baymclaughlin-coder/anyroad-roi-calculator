/**
 * ROI Calculator Engine
 * Core calculation logic implementing IMPACT framework
 */

import {
  CalculatorInputs,
  CalculatedMetrics,
  ROICalculatorResult,
  InitialCosts,
  OngoingCosts,
  QuantifiableBenefits,
  FinancialParameters
} from './types';

/**
 * Calculate Total Initial Investment (TII)
 */
export function calculateTotalInitialInvestment(costs: InitialCosts): number {
  return (
    costs.softwareLicenseSetupFee +
    costs.hardwareCosts +
    (costs.implementationHours * costs.implementationHourlyRate) +
    (costs.trainingUsers * costs.trainingCostPerUser) +
    costs.otherOneTimeCosts
  );
}

/**
 * Calculate Total Annual Operational Costs (TAOC)
 */
export function calculateTotalAnnualOperationalCosts(costs: OngoingCosts, initialCosts: InitialCosts): number {
  return (
    initialCosts.softwareLicenseAnnualFee +
    costs.annualMaintenanceSupport +
    (costs.personnelFTEs * costs.personnelBlendedSalary) +
    costs.utilitiesInfrastructure +
    costs.marketingAdoption +
    costs.otherAnnualOpEx
  );
}

/**
 * Calculate Total Costs Over Time Horizon (TCOT)
 */
export function calculateTotalCostsOverTimeHorizon(
  tii: number,
  taoc: number,
  timeHorizon: number
): number {
  return tii + (taoc * timeHorizon);
}

/**
 * Calculate Annual Cost Displacement (Savings)
 */
export function calculateAnnualCostSavings(benefits: QuantifiableBenefits): number {
  return benefits.currentToolCosts.reduce((sum, cost) => sum + cost, 0);
}

/**
 * Calculate Annual Efficiency Gains Value
 */
export function calculateAnnualEfficiencyValue(benefits: QuantifiableBenefits): number {
  const annualHoursSaved = benefits.fteHoursSavedPerWeek * 52;
  return annualHoursSaved * benefits.blendedHourlyRate;
}

/**
 * Calculate Annual Revenue Impact
 */
export function calculateAnnualRevenueImpact(benefits: QuantifiableBenefits): number {
  return (
    benefits.clientCurrentRevenue *
    (benefits.benchmarkImprovementPercent / 100) *
    (benefits.attributionFactor / 100)
  );
}

/**
 * Calculate Total Annual Benefits (TAB)
 */
export function calculateTotalAnnualBenefits(
  costSavings: number,
  efficiencyValue: number,
  revenueImpact: number
): number {
  return costSavings + efficiencyValue + revenueImpact;
}

/**
 * Calculate Total Benefits Over Time Horizon (TBOT)
 */
export function calculateTotalBenefitsOverTimeHorizon(
  tab: number,
  timeHorizon: number
): number {
  return tab * timeHorizon;
}

/**
 * Calculate Net Annual Benefit (NAB)
 */
export function calculateNetAnnualBenefit(tab: number, taoc: number): number {
  return tab - taoc;
}

/**
 * Calculate Net Benefits Over Time Horizon (NBOT)
 */
export function calculateNetBenefitsOverTimeHorizon(tbot: number, tcot: number): number {
  return tbot - tcot;
}

/**
 * Calculate ROI Percentage
 */
export function calculateROIPercentage(nbot: number, tii: number): number {
  if (tii === 0) return 0;
  return (nbot / tii) * 100;
}

/**
 * Calculate Payback Period in Years
 */
export function calculatePaybackPeriod(tii: number, nab: number): number {
  if (nab <= 0) return Infinity; // Indefinite payback if no positive annual benefit
  return tii / nab;
}

/**
 * Calculate Net Present Value (NPV)
 */
export function calculateNPV(
  tii: number,
  nab: number,
  timeHorizon: number,
  discountRate: number
): number {
  let npv = -tii; // Initial investment is negative cash flow
  
  for (let year = 1; year <= timeHorizon; year++) {
    const discountedCashFlow = nab / Math.pow(1 + discountRate / 100, year);
    npv += discountedCashFlow;
  }
  
  return npv;
}

/**
 * Main calculation function - orchestrates all calculations
 */
export function calculateROI(inputs: CalculatorInputs): ROICalculatorResult {
  // Step 1: Calculate costs
  const tii = calculateTotalInitialInvestment(inputs.initialCosts);
  const taoc = calculateTotalAnnualOperationalCosts(inputs.ongoingCosts, inputs.initialCosts);
  const tcot = calculateTotalCostsOverTimeHorizon(tii, taoc, inputs.financialParams.timeHorizonYears);

  // Step 2: Calculate benefits
  const annualCostSavings = calculateAnnualCostSavings(inputs.benefits);
  const annualEfficiencyValue = calculateAnnualEfficiencyValue(inputs.benefits);
  const annualRevenueImpact = calculateAnnualRevenueImpact(inputs.benefits);
  const tab = calculateTotalAnnualBenefits(annualCostSavings, annualEfficiencyValue, annualRevenueImpact);
  const tbot = calculateTotalBenefitsOverTimeHorizon(tab, inputs.financialParams.timeHorizonYears);

  // Step 3: Calculate net benefits
  const nab = calculateNetAnnualBenefit(tab, taoc);
  const nbot = calculateNetBenefitsOverTimeHorizon(tbot, tcot);

  // Step 4: Calculate performance metrics
  const roiPercentage = calculateROIPercentage(nbot, tii);
  const paybackPeriodYears = calculatePaybackPeriod(tii, nab);
  const npv = calculateNPV(tii, nab, inputs.financialParams.timeHorizonYears, inputs.financialParams.discountRate);

  // Step 5: Build metrics object
  const metrics: CalculatedMetrics = {
    totalInitialInvestment: tii,
    totalAnnualOperationalCosts: taoc,
    totalCostsOverTimeHorizon: tcot,
    annualCostSavings,
    annualEfficiencyValue,
    annualRevenueImpact,
    totalAnnualBenefits: tab,
    totalBenefitsOverTimeHorizon: tbot,
    netAnnualBenefit: nab,
    netBenefitsOverTimeHorizon: nbot,
    roiPercentage,
    paybackPeriodYears,
    netPresentValue: npv
  };

  // Step 6: Generate interpretation
  const interpretation = generateInterpretation(metrics, inputs.financialParams);

  return {
    inputs,
    metrics,
    interpretation
  };
}

/**
 * Generate human-readable interpretation of results
 */
function generateInterpretation(metrics: CalculatedMetrics, params: FinancialParameters): string {
  const roiFormatted = metrics.roiPercentage.toFixed(1);
  const paybackFormatted = metrics.paybackPeriodYears === Infinity 
    ? 'indefinite (negative annual benefit)' 
    : metrics.paybackPeriodYears.toFixed(1);
  const npvFormatted = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(metrics.netPresentValue);

  let interpretation = `**ROI Analysis Summary:**\n\n`;
  
  interpretation += `**Return on Investment:** ${roiFormatted}% over ${params.timeHorizonYears} years indicates that for every dollar invested, you can expect to receive $${(metrics.roiPercentage / 100).toFixed(2)} in return. `;
  
  if (metrics.roiPercentage > 100) {
    interpretation += `This represents a strong financial return.\n\n`;
  } else if (metrics.roiPercentage > 0) {
    interpretation += `This represents a positive but modest return.\n\n`;
  } else {
    interpretation += `This indicates the investment may not recover its costs under current assumptions.\n\n`;
  }

  interpretation += `**Payback Period:** ${paybackFormatted} years. `;
  
  if (metrics.paybackPeriodYears !== Infinity) {
    if (metrics.paybackPeriodYears < 2) {
      interpretation += `This rapid payback period suggests quick recovery of initial investment.\n\n`;
    } else if (metrics.paybackPeriodYears < 4) {
      interpretation += `This reasonable payback period indicates moderate risk.\n\n`;
    } else {
      interpretation += `This extended payback period suggests higher risk and requires careful consideration.\n\n`;
    }
  } else {
    interpretation += `\n\n`;
  }

  interpretation += `**Net Present Value:** ${npvFormatted}. `;
  
  if (metrics.netPresentValue > 0) {
    interpretation += `A positive NPV indicates the project generates value above the required ${params.discountRate}% rate of return, making it economically attractive.`;
  } else {
    interpretation += `A negative NPV suggests the project does not meet the required ${params.discountRate}% rate of return under current assumptions.`;
  }

  return interpretation;
}

/**
 * Get default benchmark values for calculator
 */
export function getDefaultInputs(): CalculatorInputs {
  return {
    initialCosts: {
      softwareLicenseAnnualFee: 50000,
      softwareLicenseSetupFee: 10000,
      hardwareCosts: 0,
      implementationHours: 40,
      implementationHourlyRate: 150,
      trainingUsers: 10,
      trainingCostPerUser: 250,
      otherOneTimeCosts: 0
    },
    ongoingCosts: {
      annualMaintenanceSupport: 10000,
      personnelFTEs: 0.1,
      personnelBlendedSalary: 70000,
      utilitiesInfrastructure: 0,
      marketingAdoption: 0,
      otherAnnualOpEx: 0
    },
    benefits: {
      currentToolCosts: [15000, 8000, 5000], // Example: 3 tools being replaced
      fteHoursSavedPerWeek: 5,
      blendedHourlyRate: 45,
      clientCurrentRevenue: 10000000,
      benchmarkImprovementPercent: 15,
      attributionFactor: 35
    },
    financialParams: {
      timeHorizonYears: 3,
      discountRate: 10
    }
  };
}