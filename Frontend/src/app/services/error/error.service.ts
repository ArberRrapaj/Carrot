import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationService: NotificationService,
    private router: Router) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console

      if (error.status === 0) { // Backend down
        this.log( 'Server Error: Please try again later!' );
      } else {
        if ( error.error.startsWith('<!DOCTYPE html>') ) {
          // swaggerize error, shouldn't happen in production anymore
          this.log( 'Server Error: Please try again later!' );
        } else {
          if (error.status === 401 || error.error === 'Failed to authenticate token.') {
            this.router.navigate(['/logout']);
          } else { this.log(`${operation} failed: ${error.error}`); }
        }
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Show the error to the user
  private log(message: string) {
    this.notificationService.log( message );
  }

}
