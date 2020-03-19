import {initialUserState, UserState} from '../state/user.state';
import {EUserActions, UserActions} from '../actions/user.actions';

export const userReducer = (
  state = initialUserState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case EUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload
      };
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }

    default:
      return state;
  }
};
