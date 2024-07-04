import {  Group } from "../classes/Group";
import { IMenu } from "./IMenu";

interface IUser {
    userDrinkData: IMenu;
    userGroups?: Record<string, Group>;
    userData: {userName : string, userRegion: string}
}

export default IUser;