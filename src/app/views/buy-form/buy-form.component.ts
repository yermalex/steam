import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';
import {SteamService} from '../../services/steam.service';
import {IUser} from '../../interfaces/user';
import {IGame} from '../../interfaces/game';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.less']
})
export class BuyFormComponent implements OnInit {

  buyForm: FormGroup;
  game: IGame;

  items: any[];

  constructor(private route: ActivatedRoute,
              private steamService: SteamService
  ) {}

  ngOnInit(): void {
    this.buyForm = new FormGroup({
      fullName: new FormGroup({
        surname: new FormControl('', [Validators.required, Validators.pattern('^([A-Z]{1,})$')]),
        name: new FormControl('', [Validators.required, Validators.pattern('^([A-Z]{1,})$')])
      }, [MyValidators.restrictedFullName]),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern('^(\\d){16}$')]),
      cardExpirationMonth: new FormControl('', [Validators.required]),
      cardExpirationYear: new FormControl('', [Validators.required]),
      securityCode: new FormControl('', [Validators.required,
        Validators.pattern('^(\\d){3}$')])
    });
  }

  buyGame(): void {
    if (this.buyForm.valid) {
      const formData = {...this.buyForm.value};

      this.route.params.subscribe((params: Params) => {
        this.game = this.steamService.getGameByID(params.id);
      });
      // this.db.list('items').push(this.game);
      this.steamService.create(this.game).subscribe(() => {
        this.buyForm.reset();
      });
      // TODO
      // текущему пользователю нужно в массив купленных игр запушить данную игру
      // и в текущую игру запушить ид этого пользователя (для доп функционала)
      this.steamService.goBack();
    }
  }

  resetForm(): void {
    this.buyForm.reset();
  }

}





