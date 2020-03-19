import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { UserService } from './services/user.service';
import { UsersComponent as UsersContainerComponent } from './containers/users/users.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './containers/user/user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './views/shop/shop.component';
import { LibraryComponent } from './views/library/library.component';
import { LoginComponent } from './views/login/login.component';
import { GameComponent } from './views/game/game.component';
import { DownloadingComponent } from './views/downloading/downloading.component';
import { BuyFormComponent } from './views/buy-form/buy-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { HomeComponent } from './views/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {GameCardComponent} from './views/shop/components/game-card/game-card.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import {appReducer} from './store/reducers/app.reducer';
import {UserEffects} from './store/effects/user.effects';
import {ConfigEffects} from './store/effects/config.effects';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    LibraryComponent,
    LoginComponent,
    GameComponent,
    DownloadingComponent,
    BuyFormComponent,
    ErrorPageComponent,
    HomeComponent,
    GameCardComponent,


    UsersContainerComponent,
    UsersComponent,
    UserComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([UserEffects, ConfigEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreModule.forRoot(appReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
