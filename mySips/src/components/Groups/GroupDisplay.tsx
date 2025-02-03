import DrinkDisplay from "../DrinkApp/DrinkDisplay/DrinkDisplay";
import { Button } from "../ui/button";
import GroupAddDrinkDialog from "./GroupAddDrinkDialog";

function GroupDisplay({ group, drinksState, editDrinksState }) {
    return (
        <div>
            <GroupAddDrinkDialog editDrinksState={editDrinksState} />
            <Button>Delete Group</Button>
            <DrinkDisplay drinksState={drinksState} group={group} />
        </div>
    );
}

export default GroupDisplay;
