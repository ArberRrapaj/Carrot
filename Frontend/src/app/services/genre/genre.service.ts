import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Genre } from '../../classes/genre';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * Genres
 * Genre
 * genres
 * Genre
 * genre
 */
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genresUrl = 'localhost:3000/api/genres';  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }



  getGenres (): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl)
      .pipe(
        // tap(genres => this.notificationService.log('Successfully loaded genres')),
        catchError(this.errorService.handleError('Fetching Genres', []))
      );
  }

  getGenre(id: number): Observable<Genre> {
    const url = `${this.genresUrl}/${id}`;

    return this.http.get<Genre>(url).pipe(
      // tap(genre => this.notificationService.log('Successfully loaded Genre')),
      catchError(this.errorService.handleError<Genre>('Fetching Genre'))
    );
  }

  searchGenres(term: string): Observable<Genre[]> {
    if (!term.trim()) { return of([]); } // if not search term, return empty Genre array.

    return this.http.get<Genre[]>(`${this.genresUrl}/${term}`).pipe(
      // tap(genres => this.notificationService.log('Succesfully loaded matching genres')),
      catchError(this.errorService.handleError<Genre[]>('Fetching matching genres', []))
    );
  }



  addGenre (genre: Genre): Observable<String> {
    return this.http.post<String>(this.genresUrl, genre, httpOptions).pipe(
      // tap((genre: string) => this.notificationService.log(genre)),
      catchError(this.errorService.handleError<String>('Adding Genre'))
    );
  }


  deleteGenre (genre: Genre | number): Observable<String> {
    const id = typeof genre === 'number' ? genre : genre.GenreID;
    const url = `${this.genresUrl}/${id}`;

    return this.http.delete<String>(url, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully deleted Genre')),
      catchError(this.errorService.handleError<String>('Deleting Genre'))
    );
  }

  updateGenre (genre: Genre): Observable<String> {
    return this.http.put(this.genresUrl, genre, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully updated genre')),
      catchError(this.errorService.handleError<any>('Updating Genre'))
    );
  }
}
