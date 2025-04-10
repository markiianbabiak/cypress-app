import { Component, OnInit } from '@angular/core';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import { UserService } from '../../services/user.service';
import User, { AuthUser, Role } from '../../models/user';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../utils/ErrorStateMatcher';
import { MatInputModule } from '@angular/material/input';
import { ReportType } from '../../models/cityReport';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-settings',
  imports: [
    ViewNavigationComponent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  user: AuthUser | undefined;
  nameEditing: boolean = false;
  emailEditing: boolean = false;
  passwordEditing: boolean = false;
  username: string | undefined;
  email: string | undefined;
  previousPassword: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  department: ReportType | undefined | null;
  departmentEditing: boolean = false;
  updatedUser!: Partial<User>;
  invalidCredentials = false;
  Role: typeof Role = Role;
  ReportType: typeof ReportType = ReportType;

  matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService) {}

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

  async ngOnInit(): Promise<void> {
    this.user = this.userService.user!;
    this.username = this.user.username;
    this.email = this.user.email;
    if (this.user.department) {
      this.department = this.user.department;
    }
  }

  enableChangingUsername() {
    this.nameEditing = true;
  }

  disableChangingUsername() {
    this.nameEditing = false;
    this.username = this.user?.username;
  }

  enableChangingEmail() {
    this.emailEditing = true;
  }

  disableChangingEmail() {
    this.emailEditing = false;
    this.email = this.user?.email;
  }

  enableChangingPassword() {
    this.passwordEditing = true;
  }

  disableChangingPassword() {
    this.passwordEditing = false;
    this.password = '';
    this.passwordRepeat = '';
    this.previousPassword = '';
  }

  enableChangingDepartment() {
    this.departmentEditing = true;
  }

  disableChangingDepartment() {
    this.departmentEditing = false;
    if (this.user?.department) {
      this.department = this.user?.department;
    } else {
      this.department = undefined;
    }
  }

  async onChangeUsername() {
    const updatedUser: Partial<User> = {
      username: this.username,
    };
    if (this.user) {
      await this.userService.update(this.user.userID, updatedUser);
      this.user = this.userService.user!;
    }
    this.nameEditing = false;
  }

  async onChangeEmail() {
    const updatedUser: Partial<User> = {
      email: this.email,
    };
    if (this.user) {
      await this.userService.update(this.user.userID, updatedUser);
      this.user = this.userService.user!;
    }
    this.emailEditing = false;
  }
  async onChangePassword() {
    if (this.user && this.previousPassword) {
      await this.userService
        .checkPassword(this.user.userID, this.previousPassword)
        .then(async () => {
          this.invalidCredentials = false;
        })
        .catch(() => {
          this.invalidCredentials = true;
        });
      if (!this.invalidCredentials) {
        const updatedUser: Partial<User> = {
          password: this.password,
        };
        await this.userService.update(this.user.userID, updatedUser);
        this.user = this.userService.user!;
        this.passwordEditing = false;
        this.previousPassword = '';
        this.password = '';
        this.passwordRepeat = '';
      }
    }
  }

  async onChangeDepartment() {
    const updatedUser: Partial<User> = {
      department: this.department,
    };
    if (this.user) {
      await this.userService.update(this.user.userID, updatedUser);
      this.user = this.userService.user!;
    }
    this.departmentEditing = false;
  }
}
