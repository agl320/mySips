import { Label } from "@radix-ui/react-label";
import { Drink } from "../../classes/Drink";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import NumberField from "./NumberField";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateCalendar, DatePicker, TimePicker } from "@mui/x-date-pickers";

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
    if (formType && formType === "activity") {
        return (
            <div className="">
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

                <div className="flex w-full">
                    <DateCalendar />
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
                ></Input>
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
                ></Textarea>
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
                    ></Input>
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
                    ></Input>
                </div>
            </div>
        </div>
    );
}

export default DrinkInput;
