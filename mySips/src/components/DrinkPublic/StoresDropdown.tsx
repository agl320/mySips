"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

function StoreDropdown({
    storesState,
    selectedStoreUUID,
    setSelectedStoreUUID,
}) {
    const [open, setOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState({
        value: "",
        label: "",
    });

    useEffect(() => {
        if (Object.hasOwn(storesState, selectedStoreUUID)) {
            setDropdownValue({
                label: storesState[selectedStoreUUID].storeName,
                value: selectedStoreUUID,
            });
        }
    }, [selectedStoreUUID, storesState]);

    const frameworks = Object.entries(storesState).map(
        ([storeId, storeData]) => {
            return { value: storeId, label: storeData.storeName };
        }
    );

    return (
        <>
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
                            : "Select store..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search stores..." />
                            <CommandEmpty>No store found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        className="cursor-pointer"
                                        key={framework.value}
                                        value={framework.label}
                                        onSelect={(currentValue) => {
                                            setDropdownValue({
                                                label: currentValue,
                                                value:
                                                    frameworks.find(
                                                        (framework) =>
                                                            framework.label ===
                                                            currentValue
                                                    )?.value ?? "",
                                            });
                                            setSelectedStoreUUID(
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
        </>
    );
}

export default StoreDropdown;
