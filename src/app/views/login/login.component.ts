import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../interfaces/user';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if ( params.loginAgain ) {
        this.message = 'Пожалуйста, войдите в систему!';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/library']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
