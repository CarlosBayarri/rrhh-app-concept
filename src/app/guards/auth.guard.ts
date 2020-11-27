import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * Guard injectable
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Constructor
   * @param AuthService 
   * @param router 
   */
  constructor(private AuthService: AuthService, private router: Router) {}
  /**
   * Can activate function
   * @param route 
   * @param state 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.isAuth().pipe(tap (state => { if (!state) { this.router.navigate(['/login'])}}));
    }
    /**
     * Can load function
     */
    canLoad() {
      return this.AuthService.isAuth().pipe(take(1));
    }

}
