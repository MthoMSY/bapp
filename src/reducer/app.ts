import { Action, ActionType } from "./actions";
import { ReducerState } from "./reducer";

const initialState:ReducerState = {
    budgets: [],
    items: [],
    user: undefined,
}

export const app = (state = initialState, action: Action): ReducerState => {
  switch (action.type) {
    case ActionType.LOGIN:
        return Object.assign({}, state, {
            user: action.payload
        })
    default:
      return state;
  }
};

