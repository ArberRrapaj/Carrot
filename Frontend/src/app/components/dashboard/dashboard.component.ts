import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';

import { Game } from '../../classes/game';
import { GameService } from '../../services/game/game.service';
import { Genre } from '../../classes/genre';
import { GenreService } from '../../services/genre/genre.service';
import { Library } from '../../classes/library';
import { LibraryService } from '../../services/library/library.service';

import { NotificationService } from '../../services/notification/notification.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  currentUser: User;

  games: Game[];
  cols: Observable<number>;
  genres: {};
  loaded: boolean;
  loadCount = 0;
  error: boolean;

  constructor(private notificationService: NotificationService,
    private gameService: GameService,
    private genreService: GenreService,
    private libraryService: LibraryService,
    private spinner: NgxSpinnerService) {
      // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.spinner.show();

    this.getGenres();
    this.getLibrary();

  }


  getGenres(): void {
    this.genreService.getGenres()
    .subscribe(genres => {
      console.log(genres);
      if (genres !== null && genres.length !== 0) {
        this.genres = genres.reduce(function(genreMap, obj) {
          genreMap[obj.GenreID] = obj.GenreName;
          return genreMap;
        }, {});
      } else { this.error = true; }
      this.upTheLoader();
      // this.genres = genres;
    });
  }

  getLibrary(): void {
    const username = localStorage.getItem('currentUser');
    console.log('username: ', username);

    console.log(username);
    this.libraryService.getLibrary(username)
    .subscribe(games => {
      if (games !== null) {
        this.games = games;
      } else { this.error = true; }
      console.log(games);
      this.upTheLoader();
    });
  }


  upTheLoader(): void {
    this.loadCount++;
    if (this.loadCount === 2) {
      this.loaded = true;
      this.spinner.hide();
    }
  }

  removeFromLibrary(game: Game): void {
    const username = localStorage.getItem('currentUser');
    this.libraryService.removeGameOffLibrary(username, game.GameID)
      .subscribe(message => {
        if (message != null) { this.games = this.games.filter(h => h !== game); }
      });
  }

}
