import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
} from "@/components/ui/command";
import CustomCommandItem from "../CustomCommandItem";

function AddDrinkPopup({ user, userDrinkData, groupUid }) {
    return (
        <Popover>
            <PopoverTrigger className="bg-pastel-pink h-12 text-base px-4 rounded-md">
                Add drink
            </PopoverTrigger>
            <PopoverContent className="bg-white border-0 space-y-8">
                <div className="space-y-4">
                    {/* <Label className="text-base">Drink Name</Label> */}
                    <Command>
                        <CommandInput placeholder="Type a drink to search..." />
                        <CommandList>
                            <CommandEmpty>No drinks found.</CommandEmpty>
                            <CommandGroup heading="Drinks">
                                {Object.values(userDrinkData).map(
                                    (drinkData, index) => (
                                        <CustomCommandItem
                                            key={`cci-${index}`}
                                            user={user}
                                            focusedGroup={groupUid ?? ""}
                                            drinkData={drinkData}
                                        />
                                    )
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default AddDrinkPopup;
