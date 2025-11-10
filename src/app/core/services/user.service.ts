import { Injectable } from '@angular/core';
import { UserListing } from '@core/models/user-listing.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers(): UserListing[] {
    return [
      {
        id: 1,
        email: 'phil@test.com',
        role: 'admin',
      },
      {
        id: 2,
        email: 'user@test.com',
        role: 'user',
      },
    ];
  }
}
