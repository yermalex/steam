import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SteamService} from '../../services/steam.service';
import {IGame} from '../../store/models/game';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectGame, selectGameIdWithDiscount, selectNewPriceWithDiscount} from '../../store/selectors/game.selector';
import {selectUserGame} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})

export class GameComponent implements OnInit {

  game: IGame;
  game$ = this.store.pipe(select(selectGame, { gameID: this.route.snapshot.params.id }));
  NewPriceWithDiscount$ = this.store.pipe(select(selectNewPriceWithDiscount));
  GameIdWithDiscount$ = this.store.pipe(select(selectGameIdWithDiscount));

  constructor(private route: ActivatedRoute,
              private steamService: SteamService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.game$.subscribe(value => this.game = value );
    if (this.steamService.gameAvailability(this.game.id)) {
      this.game$ = this.store.pipe(select(selectUserGame, { gameID: this.route.snapshot.params.id }));
    }
  }
}
