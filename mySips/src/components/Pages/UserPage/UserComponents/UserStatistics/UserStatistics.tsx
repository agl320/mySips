import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, CupSoda } from "lucide-react";

interface IUserStatisticsProps {
    userId: string;
    name: string;
    value: string;
}

function UserStatistics(props: IUserStatisticsProps) {
    const { userId, name, value } = props;

    return (
        <div className="flex flex-col justify-center">
            <div className="flex space-x-2">
                <div className="bg-pastel-pink/15 rounded-full flex items-center justify-center w-6 h-6 border border-pastel-pink/5">
                    <CupSoda className="w-3 h-3 stroke-pastel-pink" />
                </div>

                <h1 className="pb-4 opacity-75 text-base">{name}</h1>
            </div>

            <p className="text-3xl font-semibold">{value}</p>
            <div className="mt-4 flex items-center">
                <ArrowUpRight className="stroke-pastel-green w-5 h-5 mr-2" />
                <p className="text-pastel-green text-sm">3 today</p>
            </div>
        </div>
    );
}

export default UserStatistics;
