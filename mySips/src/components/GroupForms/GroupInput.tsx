import { Label } from "@radix-ui/react-label";
import { Drink } from "../../classes/Drink";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import NumberField from "./NumberField";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Group, IGroupParams } from "@/classes/Group";

export type IGroupInputProps = {
    groupInputState: Group;
    setGroupInputState: React.Dispatch<React.SetStateAction<IGroupParams>>;
};

function GroupInput({ groupInputState, setGroupInputState }: IGroupInputProps) {
    return (
        <div>
            <div className="space-y-2 mb-4">
                <Label className="opacity-80">Group name</Label>
                <Input
                    type="text"
                    placeholder={`New group`}
                    required
                    value={groupInputState.groupName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setGroupInputState({
                            ...groupInputState,
                            groupName: e.target.value,
                        });
                    }}
                    maxLength={32}
                ></Input>
            </div>
        </div>
    );
}

export default GroupInput;
