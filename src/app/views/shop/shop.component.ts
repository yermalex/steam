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
    this.steamService.titleForLibSearch = '';

    this.route.queryParams.subscribe((params: Params) => {
      if (params.filtrationBy) {
        this.steamService.genreForShopFilter = params.filtrationBy;
        this.steamService.filterByShopGenre();
      }
      if (params.searchBy) {
        this.steamService.titleForShopSearch = params.searchBy;
      }
    });
  }


}
