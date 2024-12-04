import { Label } from "@radix-ui/react-label";
import { Drink } from "../classes/Drink";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export type IDrinkInputProps = {
    drinkInputState: Pick<Drink, "uid"> & Partial<Drink>;
    setDrinkInputState: React.Dispatch<
        React.SetStateAction<Pick<Drink, "uid"> & Partial<Drink>>
    >;
};

function DrinkInput({ drinkInputState, setDrinkInputState }: IDrinkInputProps) {
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
            <div className="space-y-2">
                <Label className="opacity-80">Street address</Label>
                <Input
                    type="text"
                    placeholder={`Street address`}
                    required
                    value={drinkInputState.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDrinkInputState({
                            ...drinkInputState,
                            address: e.target.value,
                        });
                    }}
                    maxLength={32}
                ></Input>
            </div>
        </div>
    );
}

export default DrinkInput;
