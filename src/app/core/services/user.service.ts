import { AngularFireAuth } from '@angular/fire/auth';
import { AppUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) { }

  get(uid: string): AngularFirestoreDocument<AppUser> {
    return this.db.doc(`users/${uid}`)
  }

  getUser(): firebase.User {
    const user = this.afAuth.auth.currentUser;
    if (user) {
      return user;
    }
    return null;
  }

  checkLogin(): boolean {
    const user = this.afAuth.auth.currentUser;
    if (user) {
      return true;
    }
    return false;
  }
}
