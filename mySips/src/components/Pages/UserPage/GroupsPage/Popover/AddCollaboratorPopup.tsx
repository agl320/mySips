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
import ConnectionCommandItem from "../ConnectionCommandItem";

function AddCollaboratorPopup({ user, userConnections, groupUid }) {
    return (
        <Popover>
            <PopoverTrigger className="bg-pastel-pink h-12 text-base px-4 rounded-md">
                Add collaborators
            </PopoverTrigger>
            <PopoverContent className="bg-white border-0 space-y-8">
                <div className="space-y-4">
                    {/* <Label className="text-base">Share GroupName</Label> */}
                    <Command>
                        <CommandInput placeholder="Type a friend to search..." />
                        <CommandList>
                            <CommandEmpty>No friends found.</CommandEmpty>
                            <CommandGroup heading="Friends">
                                {Object.values(userConnections).map(
                                    (userData, index) => (
                                        <ConnectionCommandItem
                                            key={index}
                                            user={user}
                                            userData={userData}
                                            focusedGroup={groupUid}
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

export default AddCollaboratorPopup;
