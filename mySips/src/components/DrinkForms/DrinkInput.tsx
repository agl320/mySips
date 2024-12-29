import { Label } from "@radix-ui/react-label";
import { Drink } from "../../classes/Drink";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import NumberField from "./NumberField";
import { DateCalendar } from "@mui/x-date-pickers";
import moment, { Moment } from "moment"; // Import moment
import { useState } from "react";

export type IDrinkInputProps = {
    drinkInputState: Pick<Drink, "uid"> & Partial<Drink>;
    setDrinkInputState: React.Dispatch<
        React.SetStateAction<Pick<Drink, "uid"> & Partial<Drink>>
    >;
    formType?: "activity" | "information";
};

function DrinkInput({
    drinkInputState,
    setDrinkInputState,
    formType,
}: IDrinkInputProps) {
    // State to store the selected date as a Moment object
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

    if (formType && formType === "activity") {
        return (
            <div>
                <div className="mt-4 w-full mr-4">
                    <NumberField
                        initialValue={drinkInputState.rating ?? 5}
                        onChange={(
                            e:
                                | 1
                                | 2
                                | 3
                                | 4
                                | 5
                                | 6
                                | 7
                                | 8
                                | 9
                                | 10
                                | undefined
                        ) => {
                            setDrinkInputState({
                                ...drinkInputState,
                                rating: e,
                            });
                        }}
                    />
                </div>

                <div className="flex w-full mt-4">
                    <DateCalendar
                        sx={{
                            fontFamily: "General Sans, sans-serif",
                        }}
                        className="w-3/5"
                        defaultValue={moment()} // Convert Moment to native Date
                        onChange={(newDate) => {
                            setSelectedDate(newDate ? moment(newDate) : null); // Store as Moment object
                        }}
                    />
                    <div className="w-[20px] bg-pastel-pink">
                        <div className="w-full h-full bg-white rounded-xl rounded-l-none"></div>
                    </div>
                    <div className="p-4 w-2/5 bg-gradient-to-r from-pastel-pink to-pastel-orange rounded-md rounded-l-none">
                        <p className="text-xl font-medium text-white">
                            I drank {drinkInputState.name} on{" "}
                            {selectedDate
                                ? selectedDate.format("MMMM Do YYYY") // Format using Moment.js
                                : "a date"}
                            .
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-2 mb-4">
                <Label className="opacity-80">Drink name</Label>
                <Input
                    type="text"
                    placeholder={`New drink`}
                    required
                    value={drinkInputState.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDrinkInputState({
                            ...drinkInputState,
                            name: e.target.value,
                        });
                    }}
                    maxLength={32}
                />
            </div>
            <div className="space-y-2 mb-4">
                <Label className="opacity-80">Drink description</Label>
                <Textarea
                    placeholder={`Drink description`}
                    value={drinkInputState.description}
                    onChangeCapture={(e) => {
                        setDrinkInputState({
                            ...drinkInputState,
                            description: e.target.value,
                        });
                    }}
                    maxLength={300}
                />
            </div>
            <div className="flex">
                <div className="mr-4 w-full space-y-2">
                    <Label className="opacity-80">Store name</Label>
                    <Input
                        type="text"
                        placeholder={`Store name`}
                        required
                        value={drinkInputState.store?.storeName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDrinkInputState({
                                ...drinkInputState,
                                store: {
                                    ...drinkInputState.store,
                                    storeName: e.target.value,
                                },
                            });
                        }}
                        maxLength={32}
                    />
                </div>
                <div className="w-full space-y-2">
                    <Label className="opacity-80">Street address</Label>
                    <Input
                        type="text"
                        placeholder={`Street address`}
                        required
                        value={drinkInputState.store?.storeAddress}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDrinkInputState({
                                ...drinkInputState,
                                store: {
                                    ...drinkInputState.store,
                                    storeAddress: e.target.value,
                                },
                            });
                        }}
                        maxLength={32}
                    />
                </div>
            </div>
        </div>
    );
}

export default DrinkInput;
