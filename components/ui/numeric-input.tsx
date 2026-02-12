"use client";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface NumericInputProps extends Omit<NumericFormatProps, "customInput" | "getInputRef"> {
  label?: string;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        customInput={Input}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";

