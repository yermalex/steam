import {IUser} from '../store/models/user';
import {gamesMockData} from './gamesMockData';

export const usersMockData: IUser[] = [
  {
    id: '1',
    nickname: 'alex',
    email: 'yermakov@ya.ru',
    password: '000000',
    purchasedGames: [gamesMockData[0], gamesMockData[1]]
  },
  {
    id: '2',
    nickname: 'ivan',
    email: 'ivan@mail.ru',
    password: '0000000',
    purchasedGames: []
  }
];
