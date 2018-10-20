import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'Username': ['', Validators.required, Validators.pattern(/^\w+$/), Validators.min(1), Validators.max(30)],
      'Password': ['', [Validators.required, Validators.minLength(6)]],

      'FirstName': [null, Validators.compose([ Validators.pattern(/([A-Z\sa-z]+$)/), Validators.minLength(1), Validators.maxLength(30)])],
      'Start': [null, Validators.compose([Validators.pattern(/([0-9]+$)/), Validators.min(1900), Validators.max(2018)])],
      'CountryID': [null, null],
      'FavouriteGameID': [null, null],
      'About': [null, Validators.compose([Validators.pattern(/[\w,:$;.\-&%()!?#+*|\\]+$/),
                                          Validators.minLength(1), Validators.maxLength(200)])]
  });
  }

  // Executed When Form Is Submitted
  onFormSubmit(form: NgForm) {
    console.log(form);
  }


}
