import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function NumberField(props: {
    initialValue: number;
    max?: number;
    min?: number;
    onChange?: any;
    label?: string;
}) {
    const { initialValue, min = 0, max = 10, onChange, label } = props;
    const [currentValue, setCurrentValue] = useState<number>(initialValue);

    useEffect(() => {
        onChange(currentValue);
    }, [currentValue]);

    return (
        <div className="bg-gradient-to-r from-pastel-pink to-pastel-orange bg-opacity-75 rounded-md flex justify-between p-2">
            <h3 className="absolute text-6xl font-semibold text-white overflow-none -rotate-6 opacity-40">
                {label ? label : ""}
            </h3>
            <div className="flex flex-col justify-center ml-60">
                <Button
                    onClick={() =>
                        setCurrentValue((prevValue) => {
                            return prevValue - 1 < min ? min : prevValue - 1;
                        })
                    }
                >
                    <Minus
                        className="stroke-white flex flex-col flex-1"
                        strokeWidth={4}
                    />
                </Button>
            </div>

            <p className="text-5xl font-semibold text-white  w-[80px] text-center">
                {currentValue}
            </p>
            <div className="flex flex-col justify-center">
                <Button
                    onClick={() =>
                        setCurrentValue((prevValue) => {
                            return prevValue + 1 > max ? max : prevValue + 1;
                        })
                    }
                >
                    <Plus
                        className="stroke-white flex flex-col flex-1 "
                        strokeWidth={4}
                    />
                </Button>
            </div>
        </div>
    );
}

export default NumberField;
