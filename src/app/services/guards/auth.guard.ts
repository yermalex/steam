import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth.service';
import {SteamService} from '../steam.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private steamService: SteamService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.steamService.isAuthenticated()) {
      return true;
    } else {
      this.authService.logout();
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

