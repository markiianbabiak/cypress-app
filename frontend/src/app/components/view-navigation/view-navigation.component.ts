import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthUser } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-navigation',
  imports: [RouterModule, CommonModule],
  templateUrl: './view-navigation.component.html',
  styleUrl: './view-navigation.component.css',
})
export class ViewNavigationComponent {
  @Input() user: AuthUser | undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.user!;
  }

  async logout(): Promise<void> {
    await this.userService.logout();
    this.router.navigate(['/login']);
  }
}
