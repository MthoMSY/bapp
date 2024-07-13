import { Budget } from "../types/budget";
import { Item } from "../types/item";
import { User } from "../types/user";

export interface ReducerState {
    budgets: Budget[],
    items: Item[],
    user: User | undefined,
}