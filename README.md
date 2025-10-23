# AnyRoad ROI Calculator

## IMPACT Framework Implementation

A web-based ROI calculator designed for AnyRoad sales representatives to quantify solution value during discovery calls. Features preset benchmarks with prospect-specific customization capabilities.

## Core Features

- **Cost Displacement Calculation**: Quantifies savings from replaced tools and systems
- **Efficiency Gains Analysis**: Measures FTE hours saved and their monetary value
- **Revenue Impact Modeling**: Conservative attribution-based revenue projections
- **Financial Metrics**: ROI percentage, payback period, and NPV calculations
- **Sensitivity Analysis**: Interactive "what-if" scenario modeling

## Project Structure

```
src/
├── calculator/
│   ├── types.ts       # TypeScript type definitions
│   ├── engine.ts      # Core calculation logic
│   └── index.ts       # Main export
├── components/        # React components (coming next)
└── App.tsx           # Main application (coming next)
```

## Calculation Engine

The core calculation engine (`src/calculator/engine.ts`) implements the complete IMPACT framework:

### Inputs (I)
- Initial costs (software, hardware, implementation, training)
- Ongoing operational costs (maintenance, personnel, infrastructure)
- Quantifiable benefits (cost savings, efficiency gains, revenue impact)
- Financial parameters (time horizon, discount rate)

### Modeling (M)
- Total Initial Investment (TII)
- Total Annual Operational Costs (TAOC)
- Total Annual Benefits (TAB)
- Net Annual Benefit (NAB)

### Performance (P)
- ROI Percentage: `(Net Benefits / Initial Investment) × 100`
- Payback Period: `Initial Investment / Net Annual Benefit`
- Net Present Value: Discounted cash flow analysis

### Analysis (A)
- Automated interpretation of results
- Risk assessment based on metrics
- Strategic recommendations

### Clarity (C)
- Clean TypeScript interfaces
- Modular function design
- Comprehensive inline documentation

### Transparency (T)
- All formulas explicitly documented
- Default benchmark values provided
- Assumptions clearly stated

## Default Benchmarks

The calculator includes preset benchmarks based on AnyRoad case studies:

- **Benchmark Improvement**: 15% increase in repeat visits
- **Attribution Factor**: 35% (conservative estimate)
- **Blended Hourly Rate**: $45 (marketing salary + 40% loaded cost)
- **Time Horizon**: 3 years
- **Discount Rate**: 10%

## Usage Example

```typescript
import { calculateROI, getDefaultInputs } from './calculator';

// Start with default benchmarks
const inputs = getDefaultInputs();

// Customize for specific prospect
inputs.benefits.clientCurrentRevenue = 15000000;
inputs.benefits.currentToolCosts = [20000, 12000, 8000];

// Calculate ROI
const result = calculateROI(inputs);

console.log(`ROI: ${result.metrics.roiPercentage.toFixed(1)}%`);
console.log(`Payback: ${result.metrics.paybackPeriodYears.toFixed(1)} years`);
console.log(`NPV: $${result.metrics.netPresentValue.toLocaleString()}`);
```

## Next Steps

1. **React UI Components** (Phase 2)
   - Input forms with validation
   - Results dashboard
   - Export functionality

2. **Sensitivity Analysis** (Phase 3)
   - Interactive sliders
   - Scenario comparison
   - Visual charts

3. **Deployment** (Phase 4)
   - Production build
   - Hosting setup
   - Sales team onboarding

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build TypeScript
npm run build

# Start development server (coming soon)
npm run dev
```

## License

MIT

## Author

Bay McLaughlin - AnyRoad Executive Team