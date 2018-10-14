import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap';

import { OrderbyPipe } from './pipes/orderby/orderby.pipe';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderbyPipe,
    LoginComponent,
    DashboardComponent,
    GamesComponent,
    GameDetailComponent,
    GameSearchComponent,
    UserSearchComponent,
    UserDetailComponent,
    UserPasswordComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
