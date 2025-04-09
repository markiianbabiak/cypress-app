import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import { UserService } from '../../services/user.service';
import { MyErrorStateMatcher } from '../../utils/ErrorStateMatcher';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ViewNavigationComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: string;
  password!: string;

  matcher = new MyErrorStateMatcher();

  invalidCredentials = false;

  constructor(private userService: UserService, private router: Router) {
    if (this.userService.loggedIn) {
      this.router.navigate(['/map']);
    }
  }

  onLogin() {
    this.userService
      .login(this.email, this.password)
      .then(async () => {
        this.invalidCredentials = false;
        const redirectUrl = this.userService.redirectUrl;
        this.userService.redirectUrl = null;
        if (redirectUrl) {
          // Parse query parameters (if they exist)
          const searchParams =
            redirectUrl.indexOf('?') != -1
              ? new URLSearchParams(
                  redirectUrl.substring(redirectUrl.indexOf('?'))
                )
              : [];

          this.router.navigate([`${redirectUrl.split('?')[0]}`], {
            queryParams: [...searchParams].reduce((o, [key, value]) => {
              o[key] = value;
              return o;
            }, {}),
            queryParamsHandling: 'merge',
          });
        } else {
          this.router.navigate(['map']);
        }
      })
      .catch(() => {
        this.invalidCredentials = true;
      });
  }
}
