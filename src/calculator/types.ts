/**
 * Type definitions for ROI Calculator
 * IMPACT Framework Implementation
 */

export interface InitialCosts {
  softwareLicenseAnnualFee: number;
  softwareLicenseSetupFee: number;
  hardwareCosts: number;
  implementationHours: number;
  implementationHourlyRate: number;
  trainingUsers: number;
  trainingCostPerUser: number;
  otherOneTimeCosts: number;
}

export interface OngoingCosts {
  annualMaintenanceSupport: number;
  personnelFTEs: number;
  personnelBlendedSalary: number;
  utilitiesInfrastructure: number;
  marketingAdoption: number;
  otherAnnualOpEx: number;
}

export interface QuantifiableBenefits {
  currentToolCosts: number[]; // Array of tool costs being replaced
  fteHoursSavedPerWeek: number;
  blendedHourlyRate: number;
  clientCurrentRevenue: number;
  benchmarkImprovementPercent: number;
  attributionFactor: number;
}

export interface FinancialParameters {
  timeHorizonYears: number;
  discountRate: number;
}

export interface CalculatorInputs {
  initialCosts: InitialCosts;
  ongoingCosts: OngoingCosts;
  benefits: QuantifiableBenefits;
  financialParams: FinancialParameters;
}

export interface CalculatedMetrics {
  totalInitialInvestment: number;
  totalAnnualOperationalCosts: number;
  totalCostsOverTimeHorizon: number;
  annualCostSavings: number;
  annualEfficiencyValue: number;
  annualRevenueImpact: number;
  totalAnnualBenefits: number;
  totalBenefitsOverTimeHorizon: number;
  netAnnualBenefit: number;
  netBenefitsOverTimeHorizon: number;
  roiPercentage: number;
  paybackPeriodYears: number;
  netPresentValue: number;
}

export interface ROICalculatorResult {
  inputs: CalculatorInputs;
  metrics: CalculatedMetrics;
  interpretation: string;
}