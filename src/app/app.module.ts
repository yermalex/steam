import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import {environment} from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import {appReducer} from './store/reducers/app.reducer';
import {UserEffects} from './store/effects/user.effects';
import {GameEffects} from './store/effects/game.effects';


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
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UserEffects, GameEffects]),
    StoreRouterConnectingModule.forRoot(),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
