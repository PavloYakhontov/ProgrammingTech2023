import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'client';
  constructor (private accountService: AccountService) { }

  ngOnInit()
  {
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    let user: User | null;
    const localUser = localStorage.getItem('user');
    if (localUser !== null) {
      user = JSON.parse(localUser);
    } else {
      user = null;
    }
    this.accountService.setCurrentUser(user);
  }
}
