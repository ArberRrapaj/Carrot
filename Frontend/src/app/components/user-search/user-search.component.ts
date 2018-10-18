import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../../classes/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.sass']
})
export class UserSearchComponent implements OnInit {
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
        switchMap( username => this.userService.searchUsers(username)
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
