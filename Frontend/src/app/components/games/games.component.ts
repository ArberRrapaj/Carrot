import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';

import { ObservableMedia } from '@angular/flex-layout';
import { NgxSpinnerService } from 'ngx-spinner';

import { Game } from '../../classes/game';
import { GameService } from '../../services/game/game.service';
import { Genre } from '../../classes/genre';
import { GenreService } from '../../services/genre/genre.service';
import { NotificationService } from '../../services/notification/notification.service';

/* Grid column map */
const cols_map = new Map([
  ['xs', 1],
  ['sm', 2],
  ['md', 3],
  ['lg', 4],
  ['xl', 8]
]);

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
    private spinner: NgxSpinnerService,
    private observableMedia: ObservableMedia
  ) { }

  ngOnInit() {
    this.spinner.show();

    this.getGenres();
    this.getGames();

    let start_cols: number;
    cols_map.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start_cols = cols;
      }
    });

    this.cols = this.observableMedia.asObservable()
    .pipe(
      map(change => {
        return cols_map.get(change.mqAlias);
      }),
      startWith(start_cols)
    );

  }

  getGenres(): void {
    this.genreService.getGenres()
    .subscribe(genres => {
      console.log(genres);
      if (genres !== null && genres.length !== 0) {
        this.genres = genres.reduce(function(genreMap, obj) {
          genreMap[obj.GenreID] = obj.GenreID;
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

  addToLibrary(): void {
    console.log('Add to Library-Called');
  }

  deleteGame(): void {
    console.log('Delete-Game-Called');
  }


}
