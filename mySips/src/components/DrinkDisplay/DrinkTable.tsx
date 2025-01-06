import { useFirestore } from "reactfire";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import DrinkCard from "./DrinkCard";
import { useUserDrinkData } from "@/hooks/useUserDrinkData";
import { User } from "firebase/auth";

interface IDrinkTableProps {
    user: User;
    className?: string;
}

const getRatingColor = (rating: number) => {
    if (rating >= 8) {
        return "bg-gradient-to-r from-pastel-light-orange to-pastel-yellow";
    } else if (rating >= 6) {
        return "bg-pastel-light-orange";
    } else if (rating >= 4) {
        return "bg-pastel-orange";
    } else {
        return "bg-pastel-pink";
    }
};

function DrinkTable({ user, className }: IDrinkTableProps) {
    const firestore = useFirestore();

    // Fetch user's drink data
    const userDrinkData = useUserDrinkData(firestore, user?.uid);

    return (
        <div className={className}>
            <Table>
                <TableCaption className="text-white/75">
                    A list of your top 5 drinks, sorted by rating.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead className="text-right">Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.values(userDrinkData)
                        .sort((a, b) => (b.rating ?? 5) - (a.rating ?? 5))
                        .slice(0, 5)
                        .map((drinkData, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {drinkData.name}
                                </TableCell>
                                <TableCell>{drinkData.drinkPrice}</TableCell>
                                <TableCell>
                                    {drinkData.store?.storeName ?? "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div
                                        className={`inline-block py-1 px-2 rounded-md text-background-dark font-semibold ${getRatingColor(
                                            drinkData.rating ?? 5
                                        )}`}
                                    >
                                        {drinkData.rating ?? 5}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DrinkTable;
