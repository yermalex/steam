import {Injectable} from '@angular/core';
import {IGame} from '../store/models/game';
import {IUser} from '../store/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {UserHttp} from '../store/models/http-models/user-http.interface';
import {GameHttp} from '../store/models/http-models/game-http.interface';
import {DelSelectedUser, GetUser, InstallGame} from '../store/actions/user.actions';
import {selectSelectedUser, selectSelectedUserGameList, selectUserList} from '../store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class SteamService {

  loading = false;

  titleForShopSearch = '';
  titleForLibSearch = '';

  usersUrl = `http://localhost:4200/assets/data/users.json`;
  gamesUrl = `http://localhost:4200/assets/data/games.json`;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient,
              private router: Router,
              private store: Store<AppState>) {
  }

  goBack(): void {
    this.location.back();
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

  gameAvailability(gameID: string): boolean {
    let val = false;
    this.store.pipe(select(selectSelectedUser)).subscribe(value => {
      if (value) {
        this.store.pipe(select(selectSelectedUserGameList)).subscribe((games) => {
          games.forEach((selUserGame) => {
            if (selUserGame.id === gameID) {
              val = true;
            }
          });
        });
      } else { val = false; }
    });
    return val;
  }

  toggleInstallButton(game: IGame) {
    this.loading = true;
    setTimeout(() => {
      this.store.dispatch(new InstallGame(game));
      this.loading = false;
    }, 1234);
  }

  login(singInUser: IUser): void {
    this.store.pipe(select(selectUserList)).subscribe((users) => {
      users.forEach((user) => {
        if (user.email === singInUser.email && user.password === singInUser.password) {
          this.store.dispatch(new GetUser(user.id));
        }
      });
    });
  }

  logout(): void {
    this.store.dispatch(new DelSelectedUser());
  }

  getUsers(): Observable<UserHttp> {
    return this.http.get<UserHttp>(this.usersUrl);
  }

  getGames(): Observable<GameHttp> {
    return this.http.get<GameHttp>(this.gamesUrl);
  }


}
