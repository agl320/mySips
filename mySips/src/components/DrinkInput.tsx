import { IDrink } from "../interfaces/IDrink";

function DrinkInput({
    drinkInputState,
    setDrinkInputState,
}: {
    drinkInputState: Omit<IDrink, "uuid">;
    setDrinkInputState: React.Dispatch<
        React.SetStateAction<Omit<IDrink, "uuid">>
    >;
}) {
    return (
        <div>
            <div>
                <label>Drink name</label>
                <input
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
                ></input>
            </div>
            <div>
                <label>Street description</label>
                <input
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
                ></input>
            </div>
            <div>
                <label>Street address</label>
                <input
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
                ></input>
            </div>
        </div>
    );
}

export default DrinkInput;
