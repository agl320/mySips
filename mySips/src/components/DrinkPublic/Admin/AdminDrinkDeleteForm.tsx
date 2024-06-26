import { useEffect, useState } from "react";
import { IStore } from "../../../interfaces/IStore";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

function AdminDrinkDeleteForm({
    storesState,
    setStoresState,
    selectedStoreUUID,
    setSelectedStoreUUID,
}: {
    storesState: Record<string, IStore>;
    setStoresState: React.Dispatch<
        React.SetStateAction<Record<string, IStore>>
    >;
    selectedStoreUUID: string;
    setSelectedStoreUUID: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [selectedDrinkUUID, setSelectedDrinkUUID] = useState<string>("");

    // Init dropdown
    useEffect(() => {
        // Reset to first item if object has the current drink id
        //  and menu is not empty
        if (
            Object.keys(storesState[selectedStoreUUID].storeMenu).length !==
                0 &&
            selectedDrinkUUID === ""
        ) {
            setSelectedDrinkUUID(
                Object.keys(storesState[selectedStoreUUID].storeMenu)[0]
            );
        }
    }, [selectedDrinkUUID, selectedStoreUUID, storesState]);

    // useEffect(() => {
    //     setSelectedDrinkUUID(
    //         Object.keys(storesState[selectedStoreUUID].storeMenu)[0]
    //     );
    // }, [selectedStoreUUID]);

    const deleteDrinkFromStore = () => {
        if (Object.hasOwn(storesState, selectedStoreUUID)) {
            setStoresState({
                ...storesState,
                [selectedStoreUUID]: {
                    ...storesState[selectedStoreUUID],
                    storeMenu: Object.fromEntries(
                        Object.entries(
                            storesState[selectedStoreUUID].storeMenu
                        ).filter(
                            ([drinkId, drinkData]) =>
                                drinkId !== selectedDrinkUUID
                        )
                    ),
                },
            });
            setSelectedDrinkUUID("");
        }
    };

    const [open, setOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState({
        value: "",
        label: "",
    });

    useEffect(() => {
        const firstDrink = Object.entries(
            storesState[selectedStoreUUID].storeMenu
        )[0];
        if (Object.hasOwn(storesState, selectedStoreUUID)) {
            setDropdownValue({
                label: firstDrink[1].name,
                value: firstDrink[0],
            });
        }
    }, [selectedStoreUUID, storesState]);

    const frameworks = Object.entries(
        storesState[selectedStoreUUID].storeMenu
    ).map(([drinkId, drinkContent]) => {
        return { value: drinkId, label: drinkContent.name };
    });

    useEffect(() => {
        console.log(dropdownValue);
    }, [dropdownValue]);

    return (
        <div className="flex">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {dropdownValue
                            ? frameworks.find(
                                  (framework) =>
                                      framework.label === dropdownValue.label
                              )?.label
                            : "Select drink..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search drinks..." />
                            <CommandEmpty>No store found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        className="cursor-pointer"
                                        key={framework.value}
                                        value={framework.label}
                                        onSelect={(currentValue) => {
                                            setSelectedDrinkUUID(currentValue);
                                            console.log(frameworks);
                                            console.log(currentValue);
                                            setDropdownValue({
                                                label: currentValue,
                                                value:
                                                    frameworks.find(
                                                        (framework) =>
                                                            framework.label ===
                                                            currentValue
                                                    )?.value ?? "",
                                            });
                                            setSelectedDrinkUUID(
                                                frameworks.find(
                                                    (framework) =>
                                                        framework.label ===
                                                        currentValue
                                                )?.value ?? ""
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                dropdownValue.label ===
                                                    framework.label
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button
                onClick={() => deleteDrinkFromStore()}
                className="bg-[#dc2626]"
            >
                Delete Drink from Store
            </Button>
        </div>
    );
}

export default AdminDrinkDeleteForm;
