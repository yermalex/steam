import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {UserState} from '../state/user.state';


const selectUsers = (state: AppState) => state.users;

export const selectUserList = createSelector(
  selectUsers,
  (state: UserState) => state.allUsers
);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: UserState) => state.selectedUser
);

export const selectSelectedUserGameList = createSelector(
  selectUsers,
  (state: UserState) => state.selectedUser.purchasedGames
);

export const selectSelectedUserGameListByGenre = createSelector(
  selectUsers,
  (state: UserState, props) => state.selectedUser.purchasedGames.filter(game => {
    let val;
    game.genre.forEach(genre => {
      if (genre === props.gameGenre) { val = true; }
    });
    return val;
  })
);

export const selectUserGame = createSelector(
  selectUsers,
  (state: UserState, props) => state && state.selectedUser.purchasedGames.find(game => game.id === props.gameID)
);
