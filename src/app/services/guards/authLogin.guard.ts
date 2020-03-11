import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {SteamService} from '../steam.service';

@Injectable({providedIn: 'root'})
export class AuthLoginGuard implements CanActivate {

  constructor(private authService: AuthService,
              private steamService: SteamService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.steamService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }

}
