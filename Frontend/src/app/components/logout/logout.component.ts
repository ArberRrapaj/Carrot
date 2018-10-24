import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();

    this.userService.logoutUser(function (error: boolean, response) {
      if ( !error ) { this.router.navigate(['/login']); }
    }.bind(this));
  }

}
