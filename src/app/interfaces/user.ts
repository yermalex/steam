import {IGame} from './game';

export interface IUser {
  id?: string;
  nickname?: string;
  email: string;
  password: string;
  returnSecureToken?: boolean;
  purchasedGames?: Array<IGame>;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface FbCreateResponse {
  name: string;
}
