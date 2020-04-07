import {Component, OnInit} from '@angular/core';
import {SteamService} from './services/steam.service';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from './store/state/app.state';
import {GetUsers} from './store/actions/user.actions';
import {GetGames, GetNewPriceWithDiscount} from './store/actions/game.actions';
import {selectSelectedUser} from './store/selectors/user.selector';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  user$ = this.store.pipe(select(selectSelectedUser));
  userIsAuthenticated$: Observable<boolean>;

  constructor(private steamService: SteamService,
              private router: Router,
              private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetGames());
    this.store.dispatch(new GetUsers());
    setTimeout(() => {
      this.store.dispatch(new GetNewPriceWithDiscount());
    }, 500);

    this.userIsAuthenticated$ = this.store.pipe(select(selectSelectedUser), map(value => !!value));
  }
}
