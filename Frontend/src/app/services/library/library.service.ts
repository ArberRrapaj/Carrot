import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Library } from '../../classes/library';
import { Game } from '../../classes/game';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private librariesUrl = 'http://localhost:3000/api/libraries';  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }

  /**
   * Get Library of a user with all of his games
   *
   * @param username The User's username
   */
  getLibrary (username: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.librariesUrl)
      .pipe(
        // tap(games => this.notificationService.log('Successfully loaded games')),
        catchError(this.errorService.handleError('Fetching your Game-Library', []))
      );
  }

  /**
   * Add a game to a users library
   *
   * @param username The User's username
   * @param body body containing 'GameID' - The Game's ID
   */
  addGameToLibrary (username: string, library: Library): Observable<String> {
    return this.http.post<String>(this.librariesUrl, library, httpOptions).pipe(
      // tap((game: string) => this.notificationService.log(game)),
      catchError(this.errorService.handleError<String>('Adding Game To Library'))
    );
  }

  /**
   * Remove a game out of a user's library
   *
   * @param username The User's username
   * @param gameID The Game's ID
   */
  removeGameOffLibrary (username: string, gameID: number): Observable<String> {
    const url = `${this.librariesUrl}/${gameID}`;

    return this.http.delete<String>(url, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully deleted Game')),
      catchError(this.errorService.handleError<String>('Removing Game from Library'))
    );
  }

}
