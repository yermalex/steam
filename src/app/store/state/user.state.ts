import {IUser} from '../models/user';


export interface UserState {
  allUsers: IUser[];
  selectedUser: IUser;
}
export const initialUserState: UserState = {
  allUsers: [],
  selectedUser: null
};
