import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public email: string;
  public password: string;
  public name: string;
  public validEmail: boolean;
  public validPass: boolean;
  public validName: boolean;
  public wrongForm: boolean;
  public messageWrong: string;

  constructor(
    public _authSrv: AuthService,
    public _router: Router,
    public zone: NgZone,
    public _registerService: RegisterService
  ) { }

  ngOnInit() {
  }

  signup() {
    this._authSrv.signupUser(this.email, this.password)
      .then((res: { user: { } }) => {
        this._registerService
          .writeUserData(res.user, this.name).then(() => this._router.navigate(['/home']));
      })
      .catch(error => {
        this.messageWrong = 'Contraseña no válida';
        this.wrongForm = true;
      });
  }

  facebookAccount() {
    this._authSrv.facebookAccount()
      .then(res => {
        this.zone.run(() => this._router.navigate(['/home']));
      });
  }

  googleAccount() {
    this._authSrv.googleAccount()
      .then(res => {
        this.zone.run(() => this._router.navigate(['/home']));
      });
  }

  validateForm() {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.name === undefined || this.name.length < 3) {
      this.validName = false;
      this.wrongForm = true;
      this.messageWrong = 'Nombre no válido';
    } else this.validName = true;
    if (this.password === undefined || this.password.length < 6) {
      this.validPass = false;
      this.wrongForm = true;
      this.messageWrong = 'Contraseña no válida';
    } else this.validPass = true;
    if (!validEmailRegEx.test(this.email)) {
      this.validEmail = false;
      this.wrongForm = true;
      this.messageWrong = 'Email no válido';
    } else this.validEmail = true;
    if (this.validEmail && this.validName && this.validPass) {
      this.signup();
    }
  }
}
