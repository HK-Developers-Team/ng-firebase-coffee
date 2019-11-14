import { CartService } from './cart.service';
import { AppUser } from './../models/user.model';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from "firebase/app";
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<AppUser>;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.db.doc<AppUser>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null)
      }
    }))
  }

  private save(user: firebase.User) {
    return this.db.doc(`users/${user.uid}`).set({
      name: user.displayName,
      email: user.email,
      id: user.uid
    }, { merge: true })
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    const data = await this.afAuth.auth.signInWithPopup(provider);
    this.save(data.user);
    this.cartService.create(data.user.uid);
    return this.router.navigateByUrl(returnUrl);
  }

  logOut() {
    localStorage.removeItem('cartId');
    return this.afAuth.auth.signOut();
  }
}
