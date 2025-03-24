import { Component } from '@angular/core';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import User, { Role } from '../../models/user';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utils/ErrorStateMatcher';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { generateUniqueID } from '../../utils/Utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

enum Step {
  CHOOSE_TYPE,
  ADD_CREDENTIALS,
}

@Component({
  selector: 'app-register',
  imports: [
    ViewNavigationComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password!: string;
  role = Role.USER;
  Role: typeof Role = Role;
  step = Step.CHOOSE_TYPE;

  usernameControl = new UntypedFormControl('', [
    Validators.required,
    Validators.maxLength(25),
  ]);
  emailControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(12),
    Validators.maxLength(30),
  ]);
  invalidCredentials = false;
  emailExists = false;
  matcher = new MyErrorStateMatcher();

  constructor(public userService: UserService, private router: Router) {
    if (userService.loggedIn) this.router.navigate(['/map']);
  }

  onRegister() {
    this.invalidCredentials = false;

    const user: User = {
      userID: generateUniqueID(),
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role,
    };

    this.userService
      .register(user)
      .then(() => this.router.navigate(['map']))
      .catch((error) => {
        // Check the error message from the server
        if (error && error.message === 'Email already in use.') {
          this.emailExists = true;
        } else {
          this.invalidCredentials = true;
        }
      });
  }
}
