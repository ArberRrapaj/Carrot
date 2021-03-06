import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { User } from '../../classes/user';
import { ErrorService } from '../error/error.service';
import { NotificationService } from '../notification/notification.service';
import { Login } from 'src/app/classes/login';
import { Password } from 'src/app/classes/password';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = environment.usersUrl;
  private loginUrl = environment.loginUrl;

  constructor(private http: HttpClient,
    private notificationService: NotificationService,
    private errorService: ErrorService) { }


  /**
   * Get a list of all users
   *
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        // tap(users => this.notificationService.log('Successfully loaded users')),
        catchError(this.errorService.handleError('Fetching Users', []))
      );
  }

  /**
   * Get user by user name
   *
   * @param username The User&#39;s username
   */
  getUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/${username}`;

    return this.http.get<User>(url).pipe(
      // tap(user => this.notificationService.log('Successfully loaded User')),
      catchError(this.errorService.handleError<User>('Fetching User'))
    );
  }


  /**
   * Get a list of all users containing a given part of the username
   *
   * @param username Part of the username of users to fetch
   */
  searchUsers(username: string): Observable<User[]> {
    if (!username.trim()) { return of([]); } // if not search term, return empty User array.

    return this.http.get<User[]>(`${this.usersUrl}/search/${username}`).pipe(
      // tap(users => this.notificationService.log('Succesfully loaded matching users')),
      catchError(this.errorService.handleError<User[]>('Fetching matching users', []))
    );
  }

  /**
   * Add a new user to DB
   *
   * @param body The User's information
   */
  addUser(user: User): Observable<String> {
    httpOptions['observe'] = 'response';

    return this.http.post<String>(this.usersUrl, user, httpOptions).pipe(
      // tap((result: string) => this.notificationService.log(result)),
      map((response: string | any) => {

        if (response.status === 200) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('currentUser', response.body.currentUser);
          return 'Successfully logged in';
        } else { return 'Couldn\'t log in '; }

      }),
      catchError(this.errorService.handleError<String>('Adding User'))
    );
  }

  /**
   * Delete a user
   *
   * @param username The User&#39;s username
   */
  deleteUser(username: string): Observable<String> {
    const url = `${this.usersUrl}/${username}`;
    httpOptions['observe'] = 'response';

    return this.http.delete<string>(url, httpOptions).pipe(
      map((response: string | any) => {
        if (response.status === 200) {
          return 'Successfully deleted user';
        } else {
          return 'Error deleting your account, please try again later';
        }
      }),
      catchError(this.errorService.handleError<String>('Deleting User'))
    );
  }

  /**
   * Update user
   *
   * @param username The User's username
   * @param body The User's updated information
   */
  updateUser(username: string, user: User): Observable<String> {
    const url = `${this.usersUrl}/${username}`;

    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.notificationService.log('Successfully updated user')),
      catchError(this.errorService.handleError<any>('Updating User'))
    );
  }

  /**
   * Logs user into the system
   *
   * @param body contains the &#39;Username&#39; and &#39;Password&#39; input
   */
  loginUser(login: Login): Observable<String> {
    httpOptions['observe'] = 'response';

    return this.http.post<String>(this.loginUrl, login, httpOptions).pipe(
      // tap((user: string | any) => this.notificationService.log(user)),
      map((response: string | any) => {

        if (response.status === 200) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('currentUser', response.body.currentUser);
          return 'Successfully logged in';
        } else { return 'Couldn\'t log in '; }

      }),
      catchError(this.errorService.handleError<String>('Log In'))
    );
  }



  /**
   * Logs out current logged in user session
   * localStorage.removeItem('currentUser');
   */
  /**
 * Logs user into the system
 *
 * @param body contains the &#39;Username&#39; and &#39;Password&#39; input
 */
  logoutUser(callback) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    callback(false, 'User logged out');
  }

  /**
   * Update user's passwords
   *
   * @param username The User's username
   * @param body body containing 'OldPassword' and 'NewPassword'
   */
  updatePassword(username: string, password: Password): Observable<String> {
    const url = `${this.usersUrl}/${username}/password`;

    return this.http.put(url, password, httpOptions).pipe(
      tap(_ => this.notificationService.log('Successfully updated password')),
      catchError(this.errorService.handleError<any>('Updating Password'))
    );
  }
}
