import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { confirmValidator } from '../../directives/confirm-validator/confirm-validator.directive';
import { User } from 'src/app/classes/user';
import { UserService } from '../../services/user/user.service';
import { Country } from '../../classes/country';
import { CountryService } from '../../services/country/country.service';
import { Login } from 'src/app/classes/login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  countries: Country[];
  loaded: boolean;
  error: boolean;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private countryService: CountryService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      'Username': ['', Validators.compose([Validators.required, Validators.pattern(/^\w+$/),
                                          Validators.minLength(3), Validators.maxLength(20)])],
      'Password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'PasswordConfirm': ['',  [Validators.required, confirmValidator('Password')]],

      'FirstName': [null, Validators.compose([ Validators.pattern(/([A-Z\sa-z]+$)/), Validators.minLength(1), Validators.maxLength(30)])],
      'Start': [null, Validators.compose([Validators.pattern(/([0-9]+$)/), Validators.min(1900), Validators.max(2018)])],
      'CountryID': [null, null],
      // 'FavouriteGameID': [null, null],
      'About': [null, Validators.compose([Validators.pattern(/[\w,:$;.\-&%()!?#+*|\\]+$/),
                                          Validators.minLength(1), Validators.maxLength(200)])]
    });
    this.loginForm = this.formBuilder.group({
      'Username': ['', [Validators.required]],
      'Password': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getCountries();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getCountries(): void {
    this.countryService.getCountries()
    .subscribe( countries => {
      console.log(countries);
      if (countries != null) {
        this.countries = countries;
      } else { this.error = true; }
      this.loaded = true;
      this.spinner.hide();
    });
  }

  onRegisterSubmit(user) {
    console.log('Received this user from form: ', user);

    delete user.PasswordConfirm;
    if ( user.FirstName == null || user.FirstName === '') { delete user.FirstName; }
    if ( user.CountryID == null || user.CountryID === '') { delete user.CountryID; }
    if ( user.Start == null || user.Start === '') { delete user.Start; }
    if ( user.About == null || user.About === '') { delete user.About; }

    console.log('Submitting this user: ', user);
    this.userService.addUser( user )
    .subscribe( result => {
      if ( result != null ) {
        if ( result.startsWith('Successfully logged in') ) {
          this.router.navigate([this.returnUrl]);
        } else { this.router.navigate(['/dashboard']); }
      }
      console.log(result);
    });
  }

  onLoginSubmit(login: Login) {
    console.log('Received this login from form: ', login);

    this.userService.loginUser( login )
    .subscribe( result => {
      if ( result != null ) {
        if ( result.startsWith('Successfully logged in') ) {
          this.router.navigate([this.returnUrl]);
        } else { this.router.navigate(['/dashboard']); }
      }
      console.log(result);
    });
  }

  get pwConfirm() {
    return this.registerForm.get('PasswordConfirm');
  }

}
