import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { UserRole } from '@core/enums';
import { UserRegisterForm } from '@core/models/user-register-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  register(form: UserRegisterForm) {
    // TODO call API avec les données
    console.log('ENREGISTRER LE USER: ', form);
  }

  logout() {
    this._isConnected.set(false);
  }
}
