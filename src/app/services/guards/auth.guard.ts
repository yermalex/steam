import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {SteamService} from '../steam.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectSelectedUser} from '../../store/selectors/user.selector';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  userIsAuthenticated: boolean;

  constructor(private steamService: SteamService,
              private router: Router,
              private store: Store<AppState>
  ) {
    this.store.pipe(select(selectSelectedUser), map(value => !!value)).subscribe((val: boolean) => this.userIsAuthenticated = val);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userIsAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}

