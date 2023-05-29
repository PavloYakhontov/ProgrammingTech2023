import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{

  constructor (public accountService: AccountService, private router: Router,
  ) { }

  ngOnInit(
  ): void
  {

  }

  LogOut()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
