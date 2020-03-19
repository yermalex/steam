import {Injectable, OnInit} from '@angular/core';
import {IGame} from '../store/models/game';
import {IUser} from '../store/models/user';
import {gamesMockData} from '../data/gamesMockData';
import {usersMockData} from '../data/usersMockData';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  loading = false;

  genreForShopFilter = 'Жанр';
  genreForLibFilter = 'Жанр';
  titleForShopSearch = '';
  titleForLibSearch = '';

  games = this.getGamesMockData();
  currUserGames = null;

  userIsAuthorized = false;
  currUser: IUser = null;

  gameIdWithDiscount = this.getRandom().toString();
  newPrice: number = Math.floor(this.getGameByID(this.gameIdWithDiscount).price * (1 - this.getRandom(1, 10) / 100));


  constructor(private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient,
              private router: Router) {
  }

  goBack(): void {
    this.location.back();
  }

  filterByLibGenre(): void {
    if (this.currUser && this.genreForLibFilter === 'Жанр') {
      this.currUserGames = this.getCurrentUsersGames();
    } else {
      this.currUserGames = this.getCurrentUsersGames().filter(game => {
        for (let i = 0; i < game.genre.length; i++) {
          if (game.genre[i].toString() === this.genreForLibFilter.toString()) {
            return true;
          }
        }
      });
    }
  }

  filterByShopGenre(): void {
    if (this.genreForShopFilter === 'Жанр') {
      this.games = this.getGamesMockData();
    } else {
      this.games = this.getGamesMockData().filter(game => {
        for (let i = 0; i < game.genre.length; i++) {
          if (game.genre[i].toString() === this.genreForShopFilter.toString()) {
            return true;
          }
        }
      });
    }
  }

  searchByShopTitle(game: IGame): boolean {
    if (!this.titleForShopSearch.trim()) {
      return false;
    }
    if (this.titleForShopSearch.length >= 3 && game.title.toLocaleLowerCase().includes(this.titleForShopSearch.toLowerCase())) {
      return true;
    }
  }

  searchByLibTitle(game: IGame): boolean {
    if (!this.titleForLibSearch.trim()) {
      return false;
    }
    if (this.titleForLibSearch.length >= 3 && game.title.toLocaleLowerCase().includes(this.titleForLibSearch.toLowerCase())) {
      return true;
    }
  }

  getGamesMockData(): IGame[] {
    return gamesMockData;
  }

  getGameByID(id: string): IGame {
    return this.games.find(g => g.id === id);
  }

  getRandom(min: number = 1, max: number = this.getGamesMockData().length): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addPurchasedGame(purchasedGame: IGame): void {
    this.currUser.purchasedGames.push(purchasedGame);
    console.log(usersMockData);
  }

  gameAvailability(game: IGame): boolean {
    if (this.currUser) {
      for (let i = 0; i < this.currUser.purchasedGames.length; i++) {
        if (this.currUser.purchasedGames[i].id === game.id) {
          return true;
        }
      }
    }

  }

  getCurrentUsersGames(): IGame[] {
      return this.currUser.purchasedGames;
  }

  registerNewUser(newUser: IUser): void {
    usersMockData.push(newUser);
    console.log(usersMockData);
  }

  getNextID(): string {
    return (+usersMockData[usersMockData.length - 1].id + 1).toString();
  }

  login(user: IUser): void {
    for (let i = 0; i < usersMockData.length; i++) {
      if (usersMockData[i].email === user.email && usersMockData[i].password === user.password) {
        this.userIsAuthorized = true;
        this.currUser = usersMockData[i];
        console.log('вошлиииииииииии');
        this.currUserGames = this.getCurrentUsersGames();
        return;
      }
    }
  }

  logout(): void {
    this.userIsAuthorized = false;
    this.currUser = null;
    console.log('вышлииии');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    console.log('запросили аутентификацию есть??');
    return this.userIsAuthorized;
}

  toggleInstallButton(game: IGame) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.getGameByID(game.id).isInstall = !this.getGameByID(game.id).isInstall;
    }, 5000);
  }
}
