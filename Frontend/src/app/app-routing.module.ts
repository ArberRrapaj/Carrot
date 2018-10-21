import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GameNewComponent } from './components/game-new/game-new.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'games', component: GamesComponent },
  { path: 'games/new', component: GameNewComponent, canActivate: [AuthGuard] },
  { path: 'games/:gameID', component: GameDetailComponent, canActivate: [AuthGuard] },
  { path: 'games/:gameID/edit', component: GameDetailComponent, canActivate: [AuthGuard] },
  { path: 'users/:username', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'users/:username/edit', component: UserDetailComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
