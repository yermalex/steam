import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';
import {SteamService} from '../../services/steam.service';
import {IGame} from '../../store/models/game';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {BuyGame} from '../../store/actions/user.actions';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.less']
})
export class BuyFormComponent implements OnInit {

  buyForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private steamService: SteamService,
              private store: Store<AppState>
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
        this.store.dispatch(new BuyGame(params.id));
      });

      this.steamService.goBack();
    }
  }

  resetForm(): void {
    this.buyForm.reset();
  }

}





