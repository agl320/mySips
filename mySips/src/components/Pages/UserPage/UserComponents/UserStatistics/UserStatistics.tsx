import { Separator } from "@/components/ui/separator";
import {
    ArrowUpRight,
    ArrowDownRight,
    CupSoda,
    ArrowRight,
} from "lucide-react";

interface IUserStatisticsProps {
    userId: string;
    name: string;
    value: string;
    delta?: number; // Positive, negative, or zero delta
    valueUnit?: string; // Unit for the value (e.g., $, %, etc.)
    deltaPrefix?: string; // Unit for the delta (e.g., $, %, etc.)
    deltaPostfix?: string;
    customIcon?: React.ReactNode; // Custom icon
    className?: string;
}

function UserStatistics(props: IUserStatisticsProps) {
    const {
        userId,
        name,
        value,
        delta,
        valueUnit = "", // Default to empty string if no unit provided
        deltaPrefix = "",
        deltaPostfix = "",
        customIcon,
        className,
    } = props;

    return (
        <div className={className}>
            <div className="flex items-center space-x-2">
                <div className="bg-pastel-pink/15 rounded-full flex items-center justify-center w-6 h-6 border border-pastel-pink/5">
                    {customIcon ? (
                        customIcon
                    ) : (
                        <CupSoda className="w-3 h-3 stroke-pastel-pink" />
                    )}
                </div>

                <h1 className="opacity-75 text-base whitespace-nowrap flex-grow flex items-center">
                    {name}
                </h1>
            </div>

            <p className="text-3xl font-semibold mt-4">
                {valueUnit}
                {value}
            </p>

            {delta !== undefined && (
                <div className="mt-4 flex items-center">
                    {delta > 0 ? (
                        <ArrowUpRight className="stroke-pastel-green w-5 h-5 mr-2" />
                    ) : delta < 0 ? (
                        <ArrowDownRight className="stroke-pastel-pink w-5 h-5 mr-2" />
                    ) : (
                        <ArrowRight className="stroke-white/50 w-5 h-5 mr-2" />
                    )}
                    <p
                        className={`text-sm ${
                            delta > 0
                                ? "text-pastel-green"
                                : delta < 0
                                ? "text-pastel-pink"
                                : "text-white/50"
                        }`}
                    >
                        {deltaPrefix}
                        {Math.abs(delta)}
                        {deltaPostfix} this month
                    </p>
                </div>
            )}
        </div>
    );
}

export default UserStatistics;
