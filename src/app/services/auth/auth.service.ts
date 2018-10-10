import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor(
    public _afAuth: AngularFireAuth
  ) { }
  // currentUser():any {
  //   return new Promise(resolve => {
  //     this._afAuth.authState.subscribe((auth) => {
  //       console.log(auth)
  //       resolve(auth);
  //     });
  //   })
  // }
  stateSession(): any {
    return new Promise((resolve, reject) => {
      this._afAuth.authState
      .subscribe((auth) => {
        if (!auth) reject(auth);
        resolve(auth);
      });
    })
  }

  redirectUrl: string;

  signupUser(email: string, pass: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, pass)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });
  }

  loginUser(email: string, pass: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(user => resolve(user))
        .catch(error => reject(error));
    });
  }

  logoutUser() {
    return this._afAuth.auth.signOut();
  }

  facebookAccount() {
    return this._afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  googleAccount() {
    return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
