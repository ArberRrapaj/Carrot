import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Game } from '../../classes/game';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesUrl = environment.gamesUrl;  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }


  /**
   * Get a list of all games
   */
  getGames (): Observable<Game[]> {
    console.log('getGames called');
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        tap(games => this.notificationService.log('Successfully loaded games')),
        catchError(this.errorService.handleError('Fetching Games', []))
      );
  }

  /**
   * Find a game by its ID
   * Returns a single game
   * @param gameID The Game's ID
   */
  getGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;

    return this.http.get<Game>(url).pipe(
      map( game => {
        if (game == null) {
          game = new Game();
          game.GameID = -1;
        } else { this.notificationService.log('Successfully loaded Game'); }

        return game;
      }),
      catchError(this.errorService.handleError<Game>('Fetching Game'))
    );
  }

  /**
   * Get a list of all games in the DB containing the given title
   *
   * @param title The title-part
   */
  searchGames(title: string): Observable<Game[]> {
    if ( !title.trim() ) { return of([]); } // if not search term, return empty Game array.
    this.notificationService.log(title);
    return this.http.get<Game[]>(`${this.gamesUrl}/title/${title}`).pipe(
      // tap(games => this.notificationService.log('Succesfully loaded matching games')),
      catchError(this.errorService.handleError<Game[]>('Fetching matching games', []))
    );
  }

  /**
   * Add a new game to the Database
   *
   * @param body The Game's information
   */
  addGame (game: Game): Observable<String> {
    return this.http.post<String>(this.gamesUrl, game, httpOptions).pipe(
      tap((result: string) => this.notificationService.log(result)),
      catchError(this.errorService.handleError<String>('Adding Game'))
    );
  }

  /**
   * Deletes a game
   *
   * @param gameID The Game's ID
   */
  deleteGame (gameID: number): Observable<String> {
    const url = `${this.gamesUrl}/${gameID}`;

    return this.http.delete<String>(url, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully deleted Game')),
      catchError(this.errorService.handleError<String>('Deleting Game'))
    );
  }

  /**
   * Updates a game in the Games-DB with form data
   *
   * @param gameID The Game&#39;s ID
   * @param body The Game's new data (Game-Object)
   */
  updateGame (gameID: number, game: Game): Observable<String> {
    const url = `${this.gamesUrl}/${gameID}`;

    return this.http.put<String>(url, game, httpOptions).pipe(
      tap(_ => this.notificationService.log('Successfully updated game')),
      catchError(this.errorService.handleError<any>('Updating Game'))
    );
  }
}
