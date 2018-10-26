import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GameNewComponent } from './components/game-new/game-new.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { OwnGuard } from './guards/own/own.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
  { path: 'games/new', component: GameNewComponent, canActivate: [AuthGuard] },
  { path: 'games/:gameID', component: GameDetailComponent, canActivate: [AuthGuard] },
  { path: 'games/:gameID/edit', component: GameDetailComponent, canActivate: [AuthGuard] },
  { path: 'users/:username', component: UserDetailComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'users/:username/edit', component: UserDetailComponent, canActivate: [AuthGuard, OwnGuard] },
  { path: 'users/:username/password', component: UserDetailComponent, canActivate: [AuthGuard, OwnGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
