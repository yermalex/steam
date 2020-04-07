import { Component, OnInit } from '@angular/core';
import {SteamService} from '../../services/steam.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {genreEnum} from '../../store/models/game';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {selectGameList, selectGameListByGenre} from '../../store/selectors/game.selector';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent implements OnInit {

  games$ = this.store.pipe(select(selectGameList));

  genreForShopFilter = 'Жанр';

  readonly genre: typeof genreEnum = genreEnum;

  constructor(private steamService: SteamService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.steamService.titleForLibSearch = '';

    this.route.queryParams.subscribe((params: Params) => {
      if (params.filtrationBy) {
        this.genreForShopFilter = params.filtrationBy;
        this.filterByShopGenre();
      }
      if (params.searchBy) {
        this.steamService.titleForShopSearch = params.searchBy;
      }
    });
  }


  filterByShopGenre(): void {
    if (this.genreForShopFilter === 'Жанр') {
      this.games$ = this.store.pipe(select(selectGameList));
    } else {
      this.games$ = this.store.pipe(select(selectGameListByGenre, {gameGenre: this.genreForShopFilter}));
    }
  }

}
