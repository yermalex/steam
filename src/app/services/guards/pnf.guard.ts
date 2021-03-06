import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SteamService} from '../steam.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectGameList} from '../../store/selectors/game.selector';


@Injectable({providedIn: 'root'})
export class PageNotFound implements CanActivate, CanActivateChild {
  private val: boolean;

  constructor(private steamService: SteamService,
              private router: Router,
              private store: Store<AppState>
              ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let val = false;
    this.store.pipe(select(selectGameList)).subscribe((games) => {
      games.forEach((game) => {
        if (game.id === route.params.id) {
          val = true;
        }
      });
    });
    if (val) {
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

