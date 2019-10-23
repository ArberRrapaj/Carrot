import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


import { Country } from '../../classes/country';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countriesUrl = environment.countriesUrl;  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }


  /**
   * Get a list of all countries
   */
  getCountries (): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl).pipe(
        // tap(countries => this.notificationService.log('Successfully loaded countries')),
        catchError(this.errorService.handleError<Country[]>('Fetching Countries'))
      );
  }

  /**
   * Get a country by its countryID
   *
   * @param countryID The Country's ID
   */
  getCountry(id: number): Observable<Country> {
    const url = `${this.countriesUrl}/${id}`;

    return this.http.get<Country>(url).pipe(
      // tap(country => this.notificationService.log('Successfully loaded Country')),
      catchError(this.errorService.handleError<Country>('Fetching Country'))
    );
  }

}
