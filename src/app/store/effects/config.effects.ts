import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EConfigActions, GetConfig, GetConfigSuccess} from '../actions/config.actions';
import {switchMap} from 'rxjs/operators';
import {Config} from '../models/config.interface';
import {of} from 'rxjs';

import {ConfigService} from '../../services/config.service';


@Injectable()
export class ConfigEffects {
  @Effect()
  getConfig$ = this._actions$.pipe(
    ofType<GetConfig>(EConfigActions.GetConfig),
    switchMap(() => this._configService.getConfig()),
    switchMap((config: Config) => {
      return of(new GetConfigSuccess(config));
    })
  );

  constructor(
    private _configService: ConfigService,
    private _actions$: Actions) {}
}
