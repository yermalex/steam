import {Component, Input, OnInit} from '@angular/core';
import {IGame} from '../../../../store/models/game';
import {SteamService} from '../../../../services/steam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {selectGameIdWithDiscount, selectNewPriceWithDiscount} from '../../../../store/selectors/game.selector';
import {AppState} from '../../../../store/state/app.state';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.less']
})
export class GameCardComponent {

  @Input() game: IGame;

  GameIdWithDiscount$ = this.store.pipe(select(selectGameIdWithDiscount));
  NewPriceWithDiscount$ = this.store.pipe(select(selectNewPriceWithDiscount));

  constructor(private steamService: SteamService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
  }

  func(e: Event) {
    e.stopPropagation();
  }
}
