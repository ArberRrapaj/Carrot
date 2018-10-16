import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../../classes/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {

    this.usersForm = this.formBuilder.group({
      userInput: null
    });

    this.usersForm.get('userInput').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading = true),
        switchMap(name => this.userService.searchUsers(name)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe( users => this.filteredUsers = users);

  }


  displayFn(user: User) {
    if (user) { return user.Username; }
  }

}
