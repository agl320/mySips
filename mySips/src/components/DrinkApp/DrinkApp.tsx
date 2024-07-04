import { Drink } from "@/classes/Drink";
import { IMenu } from "../../interfaces/IMenu";
import { Button } from "../ui/button";
import DrinkDisplay, { DisplayMode } from "./DrinkDisplay/DrinkDisplay";
import UserDrinkAddForm from "./UserDrinkAddForm";
import { Group } from "@/classes/Category";
import { IGroupParams } from "@/classes/Group";
import GroupDisplay from "../Groups/GroupDisplay";

interface IDrinkAppProps {
    drinksState: IMenu;
    setDrinksState: React.Dispatch<React.SetStateAction<IMenu>>;
    setGroupsState: React.Dispatch<React.SetStateAction<Record<string, Group>>>;
    saveUserState: () => Promise<void>;
    groupsState: Record<string, Group>;
}

function DrinkApp(props: IDrinkAppProps) {
    const {
        drinksState,
        setDrinksState,
        setGroupsState,
        saveUserState,
        groupsState,
    } = props;

    /** Adding new drink to local drinksState */
    const editDrinksState = (
        newDrinkData: Pick<Drink, "uuid"> & Partial<Drink>
    ) => {
        if (!newDrinkData.uuid)
            throw new Error("Trying to edit drink with no uuid!");
        setDrinksState({
            ...drinksState,
            [newDrinkData.uuid]: {
                ...drinksState[newDrinkData.uuid],
                ...newDrinkData,
            },
        });

        const newGroupsState = structuredClone(groupsState);

        // Adding if new group added
        newDrinkData.groups?.forEach((groupUuid) => {
            // assume groupsState has group uuid as group uuid should be removed else where otherwise
            if (
                !groupsState[groupUuid].groupDrinks.includes(newDrinkData.uuid)
            ) {
                newGroupsState[groupUuid] = {
                    ...groupsState[groupUuid],
                    groupDrinks: [
                        ...groupsState[groupUuid].groupDrinks,
                        newDrinkData.uuid,
                    ],
                };
            }
        });

        // Removing if group removed
        Object.values(groupsState).forEach((groupData: IGroupParams) => {
            if (
                groupData.groupDrinks.includes(newDrinkData.uuid) &&
                !newDrinkData.groups?.includes(groupData.uuid)
            ) {
                groupData.groupDrinks.filter(
                    (groupUuid) => groupUuid === newDrinkData.uuid
                );
            }
        });

        setGroupsState(newGroupsState);
    };

    const deleteDrink = (uuidToDelete: string) => {
        setDrinksState(
            Object.fromEntries(
                Object.entries(drinksState).filter(
                    ([, drinkData]) => drinkData.uuid !== uuidToDelete
                )
            )
        );
    };

    return (
        <>
            <UserDrinkAddForm
                drinksState={drinksState}
                setDrinksState={setDrinksState}
            />
            <Button>New Group</Button>
            <Button onClick={saveUserState}>Save All</Button>
            <DrinkDisplay
                drinksState={drinksState}
                groupsState={groupsState}
                mode={DisplayMode.Editable}
                setDrinksState={setDrinksState}
                setGroupsState={setGroupsState}
                deleteCallback={deleteDrink}
                editCallback={editDrinksState}
            />
            {Object.values(groupsState).map((groupItem) => {
                return (
                    <GroupDisplay
                        key={`groupDisplay-${groupItem.groupName}`}
                        drinksState={drinksState}
                        group={groupItem}
                        groupsState={groupsState}
                        setGroupsState={setGroupsState}
                        editDrinksState={editDrinksState}
                    />
                );
            })}
        </>
    );
}

export default DrinkApp;
