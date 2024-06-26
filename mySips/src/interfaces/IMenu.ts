import { Drink } from "../classes/Drink";

interface IMenu {
  [key: string]: Drink;
}

export type { IMenu };
