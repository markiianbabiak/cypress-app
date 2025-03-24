import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.loggedIn) {
    return true;
  }

  userService.redirectUrl = state.url;

  router.navigate(['/login'], {
    state: { code: 403, message: 'Forbidden! Please sign in' },
  });

  return false;
};
