import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

function NumericCurrencyInput({ value, onChange }) {
    const handleChange = (e) => {
        const inputValue = e.target.value;

        // Allow only numbers and a single decimal point
        const numericValue = inputValue.replace(/[^0-9.]/g, "");

        // Ensure no more than two decimal digits
        const formattedValue = numericValue.replace(
            /^(\d+\.?\d{0,2}).*$/,
            "$1"
        );

        // Prevent values greater than 999
        if (parseFloat(formattedValue) > 999.99) {
            onChange("999.99");
        } else {
            onChange(formattedValue);
        }
    };

    const handleBlur = () => {
        // Ensure the value is formatted to two decimal places on blur
        if (value) {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                onChange(numericValue.toFixed(2));
            }
        }
    };

    const handleKeyDown = (e) => {
        // Disallow keys that aren't numbers, backspace, delete, or the decimal point
        if (
            !/^[0-9.]$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight" &&
            e.key !== "Tab"
        ) {
            e.preventDefault();
        }
    };

    return (
        <div className="relative">
            {/* Currency symbol */}
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
            </span>

            {/* Numeric input */}
            <Input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur} // Format to two decimals on blur
                onKeyDown={handleKeyDown} // Prevent invalid keys
                placeholder="Enter amount"
                className="pl-6" // Add padding to avoid overlap with the $ symbol
                maxLength={12} // Optional length restriction
            />
        </div>
    );
}

export default function DrinkPriceInput({
    drinkInputState,
    setDrinkInputState,
}) {
    return (
        <NumericCurrencyInput
            value={drinkInputState.drinkPrice}
            onChange={(newPrice) => {
                setDrinkInputState({
                    ...drinkInputState,
                    drinkPrice: newPrice,
                });
            }}
        />
    );
}
