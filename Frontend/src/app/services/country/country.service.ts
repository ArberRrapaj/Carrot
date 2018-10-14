import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Country } from '../../classes/country';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * Countries
 * Country
 * countries
 * Country
 * country
 */
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countriesUrl = 'localhost:3000/api/countries';  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }



  getCountries (): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl)
      .pipe(
        // tap(countries => this.notificationService.log('Successfully loaded countries')),
        catchError(this.errorService.handleError('Fetching Countries', []))
      );
  }

  getCountry(id: number): Observable<Country> {
    const url = `${this.countriesUrl}/${id}`;

    return this.http.get<Country>(url).pipe(
      // tap(country => this.notificationService.log('Successfully loaded Country')),
      catchError(this.errorService.handleError<Country>('Fetching Country'))
    );
  }

  searchCountries(term: string): Observable<Country[]> {
    if (!term.trim()) { return of([]); } // if not search term, return empty Country array.

    return this.http.get<Country[]>(`${this.countriesUrl}/${term}`).pipe(
      // tap(countries => this.notificationService.log('Succesfully loaded matching countries')),
      catchError(this.errorService.handleError<Country[]>('Fetching matching countries', []))
    );
  }



  addCountry (country: Country): Observable<String> {
    return this.http.post<String>(this.countriesUrl, country, httpOptions).pipe(
      // tap((country: string) => this.notificationService.log(country)),
      catchError(this.errorService.handleError<String>('Adding Country'))
    );
  }


  deleteCountry (country: Country | number): Observable<String> {
    const id = typeof country === 'number' ? country : country.CountryID;
    const url = `${this.countriesUrl}/${id}`;

    return this.http.delete<String>(url, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully deleted Country')),
      catchError(this.errorService.handleError<String>('Deleting Country'))
    );
  }

  updateCountry (country: Country): Observable<String> {
    return this.http.put(this.countriesUrl, country, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully updated country')),
      catchError(this.errorService.handleError<any>('Updating Country'))
    );
  }
}
