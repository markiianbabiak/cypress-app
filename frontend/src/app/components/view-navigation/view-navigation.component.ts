import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthUser, Role } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ToolbarMenuComponent } from '../toolbar-menu/toolbar-menu.component';

@Component({
  selector: 'app-view-navigation',
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ToolbarMenuComponent,
  ],
  templateUrl: './view-navigation.component.html',
  styleUrl: './view-navigation.component.css',
})
export class ViewNavigationComponent {
  @Input() user: AuthUser | undefined;
  loggedIn!: boolean;
  Role: typeof Role = Role;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.user!;
    this.loggedIn = this.userService.loggedIn;
  }
}
