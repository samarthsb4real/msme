'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

interface LoanCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoanCalculator({ isOpen, onClose }: LoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(tenure) * 12;

    if (principal > 0 && rate > 0 && time > 0) {
      const emiAmount = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const totalAmountPayable = emiAmount * time;
      const totalInterestPayable = totalAmountPayable - principal;

      setEmi(Math.round(emiAmount));
      setTotalAmount(Math.round(totalAmountPayable));
      setTotalInterest(Math.round(totalInterestPayable));
    }
  };

  const resetCalculator = () => {
    setLoanAmount('');
    setInterestRate('');
    setTenure('');
    setEmi(0);
    setTotalInterest(0);
    setTotalAmount(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6" />
              <span>Loan EMI Calculator</span>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
            <Input
              id="loanAmount"
              type="number"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              placeholder="Enter interest rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="tenure">Tenure (Years)</Label>
            <Input
              id="tenure"
              type="number"
              placeholder="Enter tenure"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={calculateEMI} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
          
          {emi > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Calculation Results</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly EMI:</span>
                  <span className="font-semibold">₹{emi.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-semibold">₹{totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function GSTCalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [includeGst, setIncludeGst] = useState(false);
  const [result, setResult] = useState<{
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
  } | null>(null);

  const calculateGST = () => {
    const baseValue = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    if (baseValue > 0 && rate >= 0) {
      if (includeGst) {
        // Amount includes GST
        const baseAmount = baseValue / (1 + rate);
        const gstAmount = baseValue - baseAmount;
        setResult({
          baseAmount: Math.round(baseAmount * 100) / 100,
          gstAmount: Math.round(gstAmount * 100) / 100,
          totalAmount: baseValue
        });
      } else {
        // Amount excludes GST
        const gstAmount = baseValue * rate;
        const totalAmount = baseValue + gstAmount;
        setResult({
          baseAmount: baseValue,
          gstAmount: Math.round(gstAmount * 100) / 100,
          totalAmount: Math.round(totalAmount * 100) / 100
        });
      }
    }
  };

  const resetCalculator = () => {
    setAmount('');
    setGstRate('18');
    setIncludeGst(false);
    setResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6" />
              <span>GST Calculator</span>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="gstRate">GST Rate (%)</Label>
            <select
              id="gstRate"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">0% - Exempt</option>
              <option value="5">5% - Essential items</option>
              <option value="12">12% - Standard rate</option>
              <option value="18">18% - Standard rate</option>
              <option value="28">28% - Luxury items</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeGst"
              checked={includeGst}
              onChange={(e) => setIncludeGst(e.target.checked)}
            />
            <Label htmlFor="includeGst" className="text-sm">
              Amount includes GST
            </Label>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={calculateGST} className="flex-1">
              Calculate
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
          
          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Calculation Results</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Amount:</span>
                  <span className="font-semibold">₹{result.baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Amount ({gstRate}%):</span>
                  <span className="font-semibold">₹{result.gstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="font-semibold">₹{result.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function WorkingCapitalCalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentAssets, setCurrentAssets] = useState('');
  const [inventory, setInventory] = useState('');
  const [accountsReceivable, setAccountsReceivable] = useState('');
  const [cash, setCash] = useState('');
  const [currentLiabilities, setCurrentLiabilities] = useState('');
  const [accountsPayable, setAccountsPayable] = useState('');
  const [shortTermDebt, setShortTermDebt] = useState('');
  const [result, setResult] = useState<{
    workingCapital: number;
    workingCapitalRatio: number;
    recommendation: string;
  } | null>(null);

  const calculateWorkingCapital = () => {
    const assets = parseFloat(currentAssets) || 0;
    const liabilities = parseFloat(currentLiabilities) || 0;
    const inv = parseFloat(inventory) || 0;
    const ar = parseFloat(accountsReceivable) || 0;
    const cashAmount = parseFloat(cash) || 0;
    const ap = parseFloat(accountsPayable) || 0;
    const std = parseFloat(shortTermDebt) || 0;

    // Calculate total current assets if individual components are provided
    const totalCurrentAssets = assets > 0 ? assets : (inv + ar + cashAmount);
    const totalCurrentLiabilities = liabilities > 0 ? liabilities : (ap + std);

    if (totalCurrentAssets > 0 && totalCurrentLiabilities > 0) {
      const workingCapital = totalCurrentAssets - totalCurrentLiabilities;
      const workingCapitalRatio = totalCurrentAssets / totalCurrentLiabilities;
      
      let recommendation = '';
      if (workingCapitalRatio >= 2) {
        recommendation = 'Excellent liquidity position. Consider investing excess cash for better returns.';
      } else if (workingCapitalRatio >= 1.5) {
        recommendation = 'Good liquidity position. Adequate working capital for operations.';
      } else if (workingCapitalRatio >= 1) {
        recommendation = 'Adequate liquidity. Monitor cash flow closely and consider optimizing inventory.';
      } else {
        recommendation = 'Low liquidity. Consider improving collection, extending payment terms, or securing additional funding.';
      }

      setResult({
        workingCapital: Math.round(workingCapital),
        workingCapitalRatio: Math.round(workingCapitalRatio * 100) / 100,
        recommendation
      });
    }
  };

  const resetCalculator = () => {
    setCurrentAssets('');
    setInventory('');
    setAccountsReceivable('');
    setCash('');
    setCurrentLiabilities('');
    setAccountsPayable('');
    setShortTermDebt('');
    setResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl mx-4 my-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6" />
              <span>Working Capital Calculator</span>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4 text-green-600">Current Assets</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentAssets">Total Current Assets (₹)</Label>
                  <Input
                    id="currentAssets"
                    type="number"
                    placeholder="Enter total current assets"
                    value={currentAssets}
                    onChange={(e) => setCurrentAssets(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">Or enter individual components:</div>
                <div>
                  <Label htmlFor="inventory">Inventory (₹)</Label>
                  <Input
                    id="inventory"
                    type="number"
                    placeholder="Stock/inventory value"
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="accountsReceivable">Accounts Receivable (₹)</Label>
                  <Input
                    id="accountsReceivable"
                    type="number"
                    placeholder="Money owed by customers"
                    value={accountsReceivable}
                    onChange={(e) => setAccountsReceivable(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cash">Cash & Cash Equivalents (₹)</Label>
                  <Input
                    id="cash"
                    type="number"
                    placeholder="Cash in hand/bank"
                    value={cash}
                    onChange={(e) => setCash(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-red-600">Current Liabilities</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentLiabilities">Total Current Liabilities (₹)</Label>
                  <Input
                    id="currentLiabilities"
                    type="number"
                    placeholder="Enter total current liabilities"
                    value={currentLiabilities}
                    onChange={(e) => setCurrentLiabilities(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">Or enter individual components:</div>
                <div>
                  <Label htmlFor="accountsPayable">Accounts Payable (₹)</Label>
                  <Input
                    id="accountsPayable"
                    type="number"
                    placeholder="Money owed to suppliers"
                    value={accountsPayable}
                    onChange={(e) => setAccountsPayable(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="shortTermDebt">Short-term Debt (₹)</Label>
                  <Input
                    id="shortTermDebt"
                    type="number"
                    placeholder="Loans due within 1 year"
                    value={shortTermDebt}
                    onChange={(e) => setShortTermDebt(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={calculateWorkingCapital} className="flex-1">
              Calculate Working Capital
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
          
          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Working Capital Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Working Capital:</span>
                  <span className={`font-semibold text-lg ${result.workingCapital >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{result.workingCapital.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Current Ratio:</span>
                  <span className={`font-semibold ${result.workingCapitalRatio >= 1.5 ? 'text-green-600' : result.workingCapitalRatio >= 1 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {result.workingCapitalRatio}:1
                  </span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommendation:</h4>
                  <p className="text-sm text-blue-700">{result.recommendation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function BreakEvenCalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState('');
  const [targetProfit, setTargetProfit] = useState('');
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
    unitsForTargetProfit: number;
    marginOfSafety: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const fc = parseFloat(fixedCosts);
    const vcpu = parseFloat(variableCostPerUnit);
    const sppu = parseFloat(sellingPricePerUnit);
    const tp = parseFloat(targetProfit) || 0;

    if (fc > 0 && vcpu >= 0 && sppu > vcpu) {
      const contributionMargin = sppu - vcpu;
      const contributionMarginRatio = (contributionMargin / sppu) * 100;
      const breakEvenUnits = Math.ceil(fc / contributionMargin);
      const breakEvenRevenue = breakEvenUnits * sppu;
      const unitsForTargetProfit = tp > 0 ? Math.ceil((fc + tp) / contributionMargin) : breakEvenUnits;
      const marginOfSafety = tp > 0 ? ((unitsForTargetProfit - breakEvenUnits) / unitsForTargetProfit) * 100 : 0;

      setResult({
        breakEvenUnits,
        breakEvenRevenue: Math.round(breakEvenRevenue),
        contributionMargin: Math.round(contributionMargin * 100) / 100,
        contributionMarginRatio: Math.round(contributionMarginRatio * 100) / 100,
        unitsForTargetProfit,
        marginOfSafety: Math.round(marginOfSafety * 100) / 100
      });
    }
  };

  const resetCalculator = () => {
    setFixedCosts('');
    setVariableCostPerUnit('');
    setSellingPricePerUnit('');
    setTargetProfit('');
    setResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6" />
              <span>Break-Even Calculator</span>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fixedCosts">Fixed Costs per Month (₹)</Label>
            <Input
              id="fixedCosts"
              type="number"
              placeholder="Rent, salaries, insurance, etc."
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="variableCostPerUnit">Variable Cost per Unit (₹)</Label>
            <Input
              id="variableCostPerUnit"
              type="number"
              placeholder="Raw materials, labor per unit"
              value={variableCostPerUnit}
              onChange={(e) => setVariableCostPerUnit(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="sellingPricePerUnit">Selling Price per Unit (₹)</Label>
            <Input
              id="sellingPricePerUnit"
              type="number"
              placeholder="Price charged to customers"
              value={sellingPricePerUnit}
              onChange={(e) => setSellingPricePerUnit(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="targetProfit">Target Monthly Profit (₹) - Optional</Label>
            <Input
              id="targetProfit"
              type="number"
              placeholder="Desired profit amount"
              value={targetProfit}
              onChange={(e) => setTargetProfit(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={calculateBreakEven} className="flex-1">
              Calculate Break-Even
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
          
          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Break-Even Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Break-Even Units:</span>
                  <span className="font-semibold">{result.breakEvenUnits} units/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Break-Even Revenue:</span>
                  <span className="font-semibold">₹{result.breakEvenRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contribution Margin:</span>
                  <span className="font-semibold">₹{result.contributionMargin} per unit</span>
                </div>
                <div className="flex justify-between">
                  <span>Contribution Margin %:</span>
                  <span className="font-semibold">{result.contributionMarginRatio}%</span>
                </div>
                {parseFloat(targetProfit) > 0 && (
                  <>
                    <div className="flex justify-between border-t pt-2">
                      <span>Units for Target Profit:</span>
                      <span className="font-semibold">{result.unitsForTargetProfit} units/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margin of Safety:</span>
                      <span className="font-semibold">{result.marginOfSafety}%</span>
                    </div>
                  </>
                )}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">Key Insights:</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• You need to sell {result.breakEvenUnits} units to cover all costs</li>
                    <li>• Each unit contributes ₹{result.contributionMargin} towards fixed costs and profit</li>
                    <li>• Every unit sold above break-even adds ₹{result.contributionMargin} to profit</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}