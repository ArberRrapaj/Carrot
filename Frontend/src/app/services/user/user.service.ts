import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { User } from '../../classes/User';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * Users
 * User
 * users
 * User
 * user
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'localhost:3000/api/users';  // URL to web api

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }



  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        // tap(users => this.notificationService.log('Successfully loaded users')),
        catchError(this.errorService.handleError('Fetching Users', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<User>(url).pipe(
      // tap(user => this.notificationService.log('Successfully loaded User')),
      catchError(this.errorService.handleError<User>('Fetching User'))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) { return of([]); } // if not search term, return empty User array.

    return this.http.get<User[]>(`${this.usersUrl}/${term}`).pipe(
      // tap(users => this.notificationService.log('Succesfully loaded matching users')),
      catchError(this.errorService.handleError<User[]>('Fetching matching users', []))
    );
  }



  addUser (user: User): Observable<String> {
    return this.http.post<String>(this.usersUrl, user, httpOptions).pipe(
      // tap((user: string) => this.notificationService.log(user)),
      catchError(this.errorService.handleError<String>('Adding User'))
    );
  }


  deleteUser (user: User | number): Observable<String> {
    const id = typeof user === 'number' ? user : user.UserID;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<String>(url, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully deleted User')),
      catchError(this.errorService.handleError<String>('Deleting User'))
    );
  }

  updateUser (user: User): Observable<String> {
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      // tap(_ => this.notificationService.log('Successfully updated user')),
      catchError(this.errorService.handleError<any>('Updating User'))
    );
  }
}
