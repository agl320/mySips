import { Drink } from "@/classes/Drink";
import { IMenu } from "../../interfaces/IMenu";
import { Button } from "../ui/button";
import DrinkDisplay, { DisplayMode } from "./DrinkDisplay/DrinkDisplay";
import UserDrinkAddForm from "./UserDrinkAddForm";
import { Group, IGroupParams } from "@/classes/Group";
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
        newDrinkData: Pick<Drink, "uid"> & Partial<Drink>
    ) => {
        if (!newDrinkData.uid)
            throw new Error("Trying to edit drink with no uid!");
        setDrinksState({
            ...drinksState,
            [newDrinkData.uid]: {
                ...drinksState[newDrinkData.uid],
                ...newDrinkData,
            },
        });

        const newGroupsState = structuredClone(groupsState);

        // Adding if new group added
        newDrinkData.groups?.forEach((groupUid) => {
            // assume groupsState has group uid as group uid should be removed else where otherwise
            if (!groupsState[groupUid].groupDrinks.includes(newDrinkData.uid)) {
                newGroupsState[groupUid] = {
                    ...groupsState[groupUid],
                    groupDrinks: [
                        ...groupsState[groupUid].groupDrinks,
                        newDrinkData.uid,
                    ],
                };
            }
        });

        // Removing if group removed
        Object.values(groupsState).forEach((groupData: IGroupParams) => {
            if (
                groupData.groupDrinks.includes(newDrinkData.uid) &&
                !newDrinkData.groups?.includes(groupData.uid)
            ) {
                groupData.groupDrinks.filter(
                    (groupUid) => groupUid === newDrinkData.uid
                );
            }
        });

        setGroupsState(newGroupsState);
    };

    const deleteDrink = (uidToDelete: string) => {
        setDrinksState(
            Object.fromEntries(
                Object.entries(drinksState).filter(
                    ([, drinkData]) => drinkData.uid !== uidToDelete
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
