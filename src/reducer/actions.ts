import { User } from "../types/user";

export enum ActionType {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
  CREATE_BUDGET = "CREATE_BUDGET",
  CREATE_ITEM = "CREATE_ITEM",
  GET_BUDGET = "GET_BUDGET",
  GET_ITEM = "GET_ITEM",
}

export interface LoginAction {
  type: ActionType.LOGIN;
  payload: User;
}

export type Action = LoginAction;
