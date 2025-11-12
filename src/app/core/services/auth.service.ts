import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { UserRole } from '@core/enums';
import { UserRegisterForm } from '@core/models/user-register-form.model';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  private _isConnected: WritableSignal<boolean> = signal<boolean>(false);
  isConnected: Signal<boolean> = this._isConnected.asReadonly();

  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  login(email: string, password: string) {
    console.log('LOGIN AVEC ', email, password);

    this._isConnected.set(true);
    this._role.set(UserRole.User);
    // TODO call API avec credential
    // récupération du JWT
  }

  register(form: UserRegisterForm): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'auth/register', form));
  }

  logout() {
    this._isConnected.set(false);
  }
}
