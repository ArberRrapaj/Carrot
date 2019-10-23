import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


import { Genre } from '../../classes/genre';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genresUrl = environment.genresUrl;  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }


  /**
   * Get a list of all genres
   *
   */
  getGenres (): Observable<Genre[]> {
    console.log('getGenres called');
    return this.http.get<Genre[]>(this.genresUrl)
      .pipe(
        tap(genres => this.notificationService.log('Successfully loaded genres')),
        catchError(this.errorService.handleError('Fetching Genres', []))
      );
  }

  /**
   * Get genre by genreID
   *
   * @param genreID The Genre's ID
   */
  getGenre(genreID: number): Observable<Genre> {
    const url = `${this.genresUrl}/${genreID}`;

    return this.http.get<Genre>(url).pipe(
      // tap(genre => this.notificationService.log('Successfully loaded Genre')),
      catchError(this.errorService.handleError<Genre>('Fetching Genre'))
    );
  }

  /*
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

  /**
   * Delete a genre
   *
   * @param genreID The Genre's ID
   /
  deleteGenre (genreID: number): Observable<String> {
    const url = `${this.genresUrl}/${genreID}`;

    return this.http.delete<String>(url, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully deleted Genre')),
      catchError(this.errorService.handleError<String>('Deleting Genre'))
    );
  }

  /**
   * Update genre with provided body
   *
   * @param genreID The Genre's ID
   * @param body The Genre's new data
   /
  updateGenre (genre: Genre): Observable<String> {
    return this.http.put(this.genresUrl, genre, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully updated genre')),
      catchError(this.errorService.handleError<any>('Updating Genre'))
    );
  }
  */
}
