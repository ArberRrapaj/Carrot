import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const username = next.params['username'];

      if ( localStorage.getItem('currentUser').localeCompare(username) === 0) {
        // logged in so return true
        return true;
      } else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/dashboard']);
        return false;
      }

      return true;
    }

}
