import { Injectable } from '@angular/core';
import {IGame} from '../interfaces/game';
import {FbCreateResponse} from '../interfaces/user';
import {gamesMockData} from '../data/gamesMockData';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  genreForFilter = 'Жанр';
  titleForSearch = '';

  gameIdWithDiscount = this.getRandom();
  newPrice: number;
  discountFlag = true;

  games = this.getGamesMockData();

  constructor(private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient) {
  }

  goBack(): void {
    this.location.back();
  }

  filterByGenre(): void {
    if (this.genreForFilter === 'Жанр') {
      this.games = this.getGamesMockData();
    } else {
      this.games = this.getGamesMockData().filter(game => {
        // наверное, тут можно переписать получше, без цикла
        for (let i = 0; i < game.genre.length; i++) {
          if (game.genre[i].toString() === this.genreForFilter.toString()) {
            return true;
          }
        }
      });
    }
  }

  searchByTitle(game: IGame): boolean {
    if (!this.titleForSearch.trim()) {
      return false;
    }
    if (game.title.toLocaleLowerCase().includes(this.titleForSearch.toLowerCase())) {
      return true;
    }
  }

  getGamesMockData(): IGame[] {
    return gamesMockData;
  }

  getGameByID(id: string): IGame {
    return this.games.find(g => g.id === id);
  }

  getRandom(min: number = 1, max: number = gamesMockData.length): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  create(game: IGame): Observable<IGame> {
    return this.http.post(`${environment.fbDbUrl}/admin/games.json`, game)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...game,
            id: response.name
          };
        })
      );
  }

}
