import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AccountService
{
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor (private http: HttpClient, private toastr: ToastrService) { }

  login(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      map((response: User) =>
      {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.toastr.success('Hi ' + user.username);
        }
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }

  register(model: any)
  {
    return this.http.post<User>(this.baseUrl + 'register', model).pipe(
      map((user: User) =>
      {
        if (user) {
          this.setCurrentUser(user);
          this.toastr.success('Hi ' + user.username);
        }
      }), catchError((err) =>
      {
        this.toastr.error('Error: ' + err.error);
        return EMPTY;
      })
    );
  }

  setCurrentUser(user: User | null)
  {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }

  getDecodedToken(token: string)
  {
    return JSON.parse(atob(token.split(".")[1]));
  }
}