export enum genreEnum {
  Action = 'Экшен',
  Shooter = 'Шутер',
  Puzzle = 'Головоломка',
  RPG = 'РПГ',
  Strategy = 'Стратегия',
  Indi = 'Инди',
  singlePlayer = 'Одиночная игра',
  multiPlayer = 'Мультиплеер',
  MMO = 'ММО'
}

export interface IGame {
  id: string;
  title: string;
  description: string;
  genre: Array<genreEnum>;
  rating: number;
  price: number;
  isInstall: boolean;
}


