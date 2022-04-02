import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  public email: any;
  public password: any;
  public isValid = true;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/api/folders']);
    }
  }

  public login() {
    return this.loginService
      .login(this.email, this.password)
      .then((res) => {
        return this.router.navigate(['/api/folders']);
      })
      .catch((err) => {
        this.isValid = false;
      });
  }
}
