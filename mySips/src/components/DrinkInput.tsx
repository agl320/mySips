import { Label } from "@radix-ui/react-label";
import { IDrinkParams } from "../classes/Drink";
import { Input } from "./ui/input";

export type IDrinkInputProps = {
  drinkInputState: Omit<IDrinkParams, "uuid">;
  setDrinkInputState: React.Dispatch<
    React.SetStateAction<Omit<IDrinkParams, "uuid">>
  >;
};

function DrinkInput({ drinkInputState, setDrinkInputState }: IDrinkInputProps) {
  return (
    <div>
      <div>
        <Label>Drink name</Label>
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
      <div>
        <Label>Street description</Label>
        <Input
          type="text"
          placeholder={`Drink description`}
          required
          value={drinkInputState.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDrinkInputState({
              ...drinkInputState,
              description: e.target.value,
            });
          }}
          maxLength={32}
        ></Input>
      </div>
      <div>
        <Label>Street address</Label>
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
