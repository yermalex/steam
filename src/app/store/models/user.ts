import {IGame} from './game';

export interface IUser {
  id?: string;
  nickname?: string;
  email: string;
  password: string;
  purchasedGames?: Array<IGame>;
}

