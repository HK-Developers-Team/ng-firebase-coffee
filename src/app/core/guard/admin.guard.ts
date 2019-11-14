import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {  map, take, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.isAdmin ? true : false),
      tap(isAdmin => {
        if(!isAdmin) {
          console.error('Access Denied - Admin Only');
          alert('Access Denied - Admin Only');
          this.router.navigate(['/']);
        }
      })
    )
  }
}