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
        allUsers: action.payload
      };
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
    case EUserActions.AddUser: {
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload]
      };
    }
    case EUserActions.DelSelectedUser: {
      return {
        ...state,
        selectedUser: null
      };
    }
    case EUserActions.BuyGameSuccess: {
      return {
        ...state,
        selectedUser: {...state.selectedUser, purchasedGames: [...state.selectedUser.purchasedGames, action.payload] }
      };
    }
    case EUserActions.InstallGame: {
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          purchasedGames: [
            ...state.selectedUser.purchasedGames
              .map((game) => {
                if (game.id === action.payload.id) {
                  return {...game, isInstall: !game.isInstall};
                }
                return game;
              })
          ]
        }
      };
    }

    default:
      return state;
  }
};
