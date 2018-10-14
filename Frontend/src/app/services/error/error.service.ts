import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NotificationService } from '../../services/notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notificationService: NotificationService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Show the error to the user
  private log(message: string) {
    this.notificationService.log( message );
  }

}
