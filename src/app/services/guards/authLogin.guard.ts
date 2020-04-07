import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SteamService} from '../steam.service';
import {select, Store} from '@ngrx/store';
import {selectSelectedUser} from '../../store/selectors/user.selector';
import {map} from 'rxjs/operators';
import {AppState} from '../../store/state/app.state';

@Injectable({providedIn: 'root'})
export class AuthLoginGuard implements CanActivate {

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
    if (!this.userIsAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }

}
