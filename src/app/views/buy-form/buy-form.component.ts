import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';
import {SteamService} from '../../services/steam.service';
import {IUser} from '../../store/models/user';
import {IGame} from '../../store/models/game';
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

      this.steamService.addPurchasedGame(this.game);

      this.steamService.goBack();
    }
  }

  resetForm(): void {
    this.buyForm.reset();
  }

}





