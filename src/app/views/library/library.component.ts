import { Component, OnInit } from '@angular/core';
import {SteamService} from '../../services/steam.service';
import {ActivatedRoute, Params} from '@angular/router';
import {genreEnum} from '../../store/models/game';
import {select, Store} from '@ngrx/store';
import {selectSelectedUserGameList, selectSelectedUserGameListByGenre} from '../../store/selectors/user.selector';
import {AppState} from '../../store/state/app.state';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less']
})
export class LibraryComponent implements OnInit {

  games$ = this.store.pipe(select(selectSelectedUserGameList));

  genreForLibFilter = 'Жанр';

  readonly genre: typeof genreEnum = genreEnum;

  constructor(private steamService: SteamService,
              private  route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.steamService.titleForShopSearch = '';

    this.route.queryParams.subscribe((params: Params) => {
      if (params.filtrationBy) {
        this.genreForLibFilter = params.filtrationBy;
        this.filterByLibGenre();
      }
      if (params.searchBy) {
        this.steamService.titleForLibSearch = params.searchBy;
      }
    });
  }

  filterByLibGenre(): void {
    if (this.genreForLibFilter === 'Жанр') {
      this.games$ = this.store.pipe(select(selectSelectedUserGameList));
    } else {
      this.games$ = this.store.pipe(select(selectSelectedUserGameListByGenre, {gameGenre: this.genreForLibFilter}));
    }
  }

}
