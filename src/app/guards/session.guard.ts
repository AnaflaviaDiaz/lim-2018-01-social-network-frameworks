import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ){
  } 
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> | boolean{
      return new Promise((resolve)=>{
        this.authService.stateSession()
        .then(user=>{
          this.router.navigate(['./home']);
          resolve(false);
        })
        .catch(err => resolve(true));
      })
      }
}
