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

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})
export class GamesComponent implements OnInit {
  games: Game[];
  cols: Observable<number>;
  genres: {};
  loaded: boolean;
  loadCount = 0;
  error: boolean;

  constructor(
    private notificationService: NotificationService,
    private gameService: GameService,
    private genreService: GenreService,
    private libraryService: LibraryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    this.getGenres();
    this.getGames();

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

  getGames(): void {
    this.gameService.getGames()
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

  addToLibrary(gameID: number): void {
    console.log('Add to Library-Called');
    const username = localStorage.getItem('currentUser');
    console.log('username: ', username);

    const library = new Library(gameID);
    this.libraryService.addGameToLibrary(username, library)
    .subscribe(message => {
      console.log(message);
    });
  }

  deleteGame(game: Game): void {
    console.log('Delete-Game-Called');

    this.gameService.deleteGame(game.GameID)
      .subscribe(message => {
        console.log(message);
        if (message != null) { this.games = this.games.filter(h => h !== game); }
      });
  }

}
