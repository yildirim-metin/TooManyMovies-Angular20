import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserRole } from '@core/enums';
import { AuthService } from '@core/services/auth.service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.role() === UserRole.Admin) {
    return true;
  }

  // rediriger vers 404
  router.navigate(['/', 'error', '404']);

  return false;
};
