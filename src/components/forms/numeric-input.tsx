import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NumericInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
  disabled?: boolean;
}

export function NumericInput({ 
  value, 
  onChange, 
  placeholder = "0", 
  min = 0, 
  max, 
  step = 0.01,
  unit,
  className,
  disabled = false
}: NumericInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val === '' || val === '.') {
      onChange(0);
      return;
    }

    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      // Apply min/max constraints
      let constrainedValue = numVal;
      if (min !== undefined && constrainedValue < min) constrainedValue = min;
      if (max !== undefined && constrainedValue > max) constrainedValue = max;

      onChange(constrainedValue);
    }
  };

  const handleBlur = () => {
    // Ensure the value respects constraints on blur
    let constrainedValue = value;
    if (min !== undefined && constrainedValue < min) constrainedValue = min;
    if (max !== undefined && constrainedValue > max) constrainedValue = max;

    if (constrainedValue !== value) {
      onChange(constrainedValue);
    }
  };

  return (
    <div className="relative">
      <Input
        type="number"
        value={value === 0 ? '' : value.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          "text-right font-mono tabular-nums pr-12",
          unit && "pr-16",
          className
        )}
      />
      {unit && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none font-medium">
          {unit}
        </div>
      )}
    </div>
  );
}