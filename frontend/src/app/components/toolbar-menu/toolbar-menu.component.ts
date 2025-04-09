import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-toolbar-menu',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './toolbar-menu.component.html',
  styleUrl: './toolbar-menu.component.css',
})
export class ToolbarMenuComponent implements OnInit {
  @Input() user!: AuthUser;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.user!;
  }

  gotoMyReports(): void {
    this.router.navigate(['/myreports']);
  }

  gotoSettings(): void {
    this.router.navigate(['/settings']);
  }

  async logout(): Promise<void> {
    await this.userService.logout();
    this.router.navigate(['/login']);
  }
}
