import { Component, OnInit } from '@angular/core';
import {SteamService} from '../../services/steam.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IGame} from '../../interfaces/game';
import {genreEnum} from '../../data/gamesMockData';
import {of} from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent implements OnInit {

  readonly genre: typeof genreEnum = genreEnum;

  constructor(private steamService: SteamService,
              private  route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // TODO
    // при переходе на шоп в навбаре фильтрация и сорт сохраняется,
    // но нужно чтоб отображались кверипараметры
    // сделать чтоб квери параметры работали вместе, а не отдельно
    this.route.queryParams.subscribe((params: Params) => {
      if (params.filtrationBy) {
        this.steamService.genreForFilter = params.filtrationBy;
        this.steamService.filterByGenre();
      }
      if (params.searchBy) {
        this.steamService.titleForSearch = params.searchBy;
      }
    });
  }


}
