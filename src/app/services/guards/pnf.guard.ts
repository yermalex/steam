import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {SteamService} from '../steam.service';
import {IGame} from '../../interfaces/game';

@Injectable({providedIn: 'root'})
export class PageNotFound implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private steamService: SteamService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!!this.steamService.getGameByID(route.params.id)) {
      return true;
    } else {
      this.router.navigate(['/error']);
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}

