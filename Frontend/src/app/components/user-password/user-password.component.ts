import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';


import { UserService } from '../../services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { confirmValidator } from 'src/app/directives/confirm-validator/confirm-validator.directive';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.sass']
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  loaded: boolean;
  error: boolean;
  username: string;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private location: Location,
    private route: ActivatedRoute,
    private notificationService: NotificationService) {
    this.passwordForm = this.formBuilder.group({
      'OldPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'NewPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'PasswordConfirm': ['', [Validators.required, confirmValidator('Password')]]
    });
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
  }
  // Executed When Form Is Submitted
  onFormSubmit(passwords) {
    console.log('Received this password stuff from form: ', passwords);

    if (passwords.OldPassword === passwords.NewPassword) {
      this.notificationService.log('You enetered the same password thrice');
      return;
    }
    delete passwords.PasswordConfirm;
    console.log('Submitting this Password-Object: ', passwords);
    this.userService.updatePassword(this.username, passwords)
      .subscribe(result => {
        if (result != null && result.startsWith('Successfully updated users password')) { this.cancelChangePassword(); }
        console.log(result);
      });
  }

  cancelChangePassword() {
    this.location.back();
  }
}
