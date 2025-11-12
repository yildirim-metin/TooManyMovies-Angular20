import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserRole } from '@core/enums';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  UserRole = UserRole;
  private readonly _authService = inject(AuthService);

  isConnected = this._authService.isConnected;
  role = this._authService.role;

  onClickLogout() {
    this._authService.logout();
  }
}
