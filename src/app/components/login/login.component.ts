import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { GetupdremService } from '../../services/getupdrem/getupdrem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public wrongForm: boolean = false;
  public messageWrong: string;
  public invalidEmail: boolean;
  public invalidPass: boolean;
  public userInDB: boolean;

  constructor(
    public _authService: AuthService,
    public _router: Router,
    public zone: NgZone,
    public _registerService: RegisterService,
    public _getUpdRem: GetupdremService
  ) { }

  ngOnInit() {
  }

  login() {
    this._authService.loginUser(this.email, this.password)
      .then(res => {
        this._router.navigate(['/home']);
      })
      .catch(error => {
        this.wrongForm = true;
        this.messageWrong = 'Contraseña no válida';
      });
  }

  facebookAccount() {
    this._authService.facebookAccount()
      .then(res => {
        // this.zone.run(() => this._router.navigate(['/home']));
        const emailUserSesion = res.user.email;
        this._getUpdRem.getUser()
          .then(user => {
            const lengthUsers = (Object["values"](user).length) - 1;
            Object["values"](user).map((x, i) => {
              if (x.email === emailUserSesion) {
                this.userInDB = true;
              }
              if (i === lengthUsers && this.userInDB) {
                this.zone.run(() => this._router.navigate(['/home']));
              }
              else if (i === lengthUsers && !this.userInDB) {
                this._registerService
                  .writeUserData(res.user, res.user.displayName)
                  .then(() => this.zone.run(() => this._router.navigate(['/home'])));
              }
            })
          });
      });
  }

  googleAccount() {
    this._authService.googleAccount()
      .then(res => {
        // this.zone.run(() => this._router.navigate(['/home']));
        const emailUserSesion = res.user.email;
        this._getUpdRem.getUser()
          .then(user => {
            const lengthUsers = (Object["values"](user).length) - 1;
            Object["values"](user).map((x, i) => {
              if (x.email === emailUserSesion) {
                this.userInDB = true;
              }
              if (i === lengthUsers && this.userInDB) {
                this.zone.run(() => this._router.navigate(['/home']));
              }
              else if (i === lengthUsers && !this.userInDB) {
                this._registerService
                  .writeUserData(res.user, res.user.displayName)
                  .then(() => this.zone.run(() => this._router.navigate(['/home'])));
              }
            })
          });
      });
  }

  validateForm() {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.password === undefined || this.password.length < 6) {
      this.invalidPass = true;
      this.wrongForm = true
      this.messageWrong = 'Contraseña no válida';
    } else this.invalidPass = false;
    if (!validEmailRegEx.test(this.email)) {
      this.invalidEmail = true;
      this.wrongForm = true
      this.messageWrong = 'Email no válido';
    } else this.invalidEmail = false;
    if (this.invalidEmail === false && this.invalidPass === false) {
      this.login();
    }
  }
}
