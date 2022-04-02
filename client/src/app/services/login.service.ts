import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public login(emailLogin: string, passwordLogin: string): Promise<any> {
    return this.http
      .post(environment.API + '/api/signin', {
        email: emailLogin,
        password: passwordLogin,
      })
      .toPromise()
      .then((resp: any) => {
        localStorage.setItem('token', resp.token);
        //storage id
        localStorage.setItem('user_id', resp.user.id);
        return resp.token;
      });
  }

  public decodeMyToken(): any {
    const token = this.getToken();
    if (!token) {
      throw new Error('empty token');
    }
    return this.jwtHelper.decodeToken(token);
  }

  public getToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return token;
  }

  public register(user: User): Promise<any> {
    return this.http
      .post(environment.API + '/register', {
        name: user.userName,
        email: user.email,
        password: user.password,
      })
      .toPromise();
  }

  public logout(): void {
    //localStorage.clear();
    localStorage.removeItem('token');
  }

  public resendCode(emailResend: string): Promise<any> {
    return this.http
      .post(environment.API + '/resendConfirmCode', {
        email: emailResend,
      })
      .toPromise()
      .then(() => {
        console.log('Code resended.');
      })
      .catch(() => {
        console.log('Error sending the code.');
      });
  }

  public verifyEmail(emailCheck: string, codeCheck: string): Promise<any> {
    return this.http
      .post(environment.API + '/check', {
        email: emailCheck,
        code: codeCheck,
      })
      .toPromise();
  }

  public forgotPassword(emailResend: string): Promise<any> {
    return this.http
      .post(environment.API + '/forgotPassword', {
        email: emailResend,
      })
      .toPromise();
  }

  public forgotPasswordConfirm(
    emailResend: string,
    codeCheck: string,
    newPassword: string
  ): Promise<any> {
    return this.http
      .post(environment.API + '/forgotPassword/confirm', {
        email: emailResend,
        code: codeCheck,
        password: newPassword,
      })
      .toPromise();
  }
}
