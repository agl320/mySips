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

function DrinkTable({ user, className }: IDrinkTableProps) {
    const firestore = useFirestore();

    // Fetch user's drink data
    const userDrinkData = useUserDrinkData(firestore, user?.uid);

    return (
        <div className={className}>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                                    {drinkData.rating ?? 5}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DrinkTable;
