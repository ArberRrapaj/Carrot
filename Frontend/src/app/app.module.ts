import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatGridListModule,
  MatIconModule, MatListModule, MatSidenavModule, MatTooltipModule, MatAutocompleteModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatMenuModule, MatInputModule,
  MatSnackBarModule, MatTabsModule, MatSelectModule, MatOptionModule
} from '@angular/material';

import { BsDropdownModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MultilineEllipsisModule } from 'angular2-multiline-ellipsis';
import { EllipsisModule } from 'ngx-ellipsis';

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
import { NotificationsComponent } from './components/notifications/notifications.component';
import { GameNewComponent } from './components/game-new/game-new.component';
import { ConfirmValidatorDirective } from './directives/confirm-validator/confirm-validator.directive';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { AuthGuard } from './guards/auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';

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
    NavigationComponent,
    NotificationsComponent,
    GameNewComponent,
    ConfirmValidatorDirective,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    MultilineEllipsisModule,
    EllipsisModule,

    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule
  ],
  providers: [AuthGuard, TokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
