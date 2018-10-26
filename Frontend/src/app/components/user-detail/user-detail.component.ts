import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { User } from 'src/app/classes/user';
import { UserService } from '../../services/user/user.service';
import { Game } from 'src/app/classes/game';
import { GameService } from '../../services/game/game.service';
import { Country } from '../../classes/country';
import { CountryService } from '../../services/country/country.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  games: Game[];
  game: Game;
  countries: Country[];
  country: string;
  loaded: boolean;
  loadCount = 0;
  error: boolean;
  editMode: boolean;

  userForm: FormGroup;
  username: string;
  CountryID: number;
  FavouriteGameID: number;
  FirstName = '';
  About = '';
  Start: number = null;
  Image = '';
  @ViewChild('image') imageInput: ElementRef;
  navigationSubscription;
  own: boolean;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private gameService: GameService,
    private countryService: CountryService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.clearNavigation();
        this.initializeNavigation();
      }
    });
    // To initialize FormGroup
    this.userForm = formBuilder.group({
      'FirstName': [null, Validators.compose([ Validators.pattern(/([A-Z\sa-z]+$)/), Validators.minLength(1), Validators.maxLength(30)])],
      'Start': [null, Validators.compose([Validators.pattern(/([0-9]+$)/), Validators.min(1900), Validators.max(2018)])],
      'CountryID': [null, null],
      'FavouriteGameID': [null, null],
      'About': [null, Validators.compose([Validators.pattern(/[\w,:$;.\-&%()!?#+*|\\]+$/),
                                          Validators.minLength(1), Validators.maxLength(200)])]
    });

  }

  ngOnInit() {

  }

  getUser( username: string): void {
    this.userService.getUser( username )
    .subscribe( user => {
      console.log(user);
      console.log(this.loadCount);
      if (user != null) {
        if (user.UserID === -1) {
          this.goToDashboard();
        } else {
          this.user = user;

          if (this.editMode) {
            this.userForm.get('CountryID').setValue( user.CountryID );
            this.userForm.get('FavouriteGameID').setValue( user.FavouriteGameID );
            this.userForm.get('FirstName').setValue( user.FirstName );
            this.userForm.get('About').setValue( user.About );
            this.userForm.get('Start').setValue( user.Start );
            this.Image = user.Image;
          } else {
            if ( user.CountryID != null ) {
              this.getCountry( user.CountryID );
            } else { this.upTheLoader(); }

            if ( user.FavouriteGameID != null ) {
              this.getGame( user.FavouriteGameID );
            } else { this.upTheLoader(); }
          }
        }
      } else {
        this.error = true;
        this.upTheLoader();
        this.upTheLoader();
      }
      console.log(user);
      this.upTheLoader();
    });
  }

  getGame(gameID: number): void {
    this.gameService.getGame(gameID)
    .subscribe( game => {
      if (game !== null) {
        this.game = game;
      } else { this.error = true; }
      this.upTheLoader();
    });
  }

  getGames(): void {
    this.gameService.getGames()
    .subscribe( games => {
      console.log(games);
      if (games !== null) {
        this.games = games;
      } else { this.error = true; }
      this.upTheLoader();
    });
  }

  getCountry(countryID: number): void {
    this.countryService.getCountry(countryID)
    .subscribe( country => {
      console.log('country fetched: ', country);
      if (country !== null) {
        this.country = country.CountryName;
      } else { this.error = true; }
      this.upTheLoader();
    });
  }

  getCountries(): void {
    this.countryService.getCountries()
    .subscribe( countries => {
      console.log(countries);
      if (countries !== null) {
        this.countries = countries;
      } else { this.error = true; }
      this.upTheLoader();
    });
  }

  upTheLoader(): void {
    this.loadCount++;
    if (this.loadCount === 3) {
      this.loaded = true;
      this.spinner.hide();
    }
  }

  // OnChange Image Upload, validates size and sets attributes for further usage
  onChangeImage(event) {
    const input = event.target;
    console.log('onChangeImage called', input);
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      if (input.files[0].size / 1024 <= 500) {
          reader.onload = function (e) {
              // console.log(e.target.result);
              this.Image = e.target.result;
          }.bind(this);
          reader.readAsDataURL(input.files[0]);
      } else { this.notificationService.log('Chosen image is too big, please upload a file < 500kb'); }
    }
  }

  // Executed When Form Is Submitted
  onFormSubmit(user) {
    user.Image = this.Image;
    console.log('Received this user from form: ', user);
    if ( user.Image == null || user.Image === '') { delete user.Image; }

    if ( user.FirstName == null || user.FirstName === '') { delete user.FirstName; }
    if ( user.CountryID == null || user.CountryID === '') { delete user.CountryID; }
    if ( user.Start == null || user.Start === '') { delete user.Start; }
    if ( user.FavouriteGameID == null || user.FavouriteGameID === '') { delete user.FavouriteGameID; }
    if ( user.About == null || user.About === '') { delete user.About; }

    console.log('Submitting this user: ', user);
    this.userService.updateUser(this.username, user)
    .subscribe( result => {
      if (result != null && result.startsWith('Successfully updated user') ) { this.cancelEditMode(); }
      console.log(result);
    });
  }

  enterEditMode() {
    const url = this.router.url + '/edit';
    this.router.navigate([url]);
  }

  enterNewPassword() {
    const url = this.router.url + '/password';
    this.router.navigate([url]);
  }

  cancelEditMode() {
    const url = this.router.url.replace('/edit', '');
    this.router.navigate([url]);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  deleteImage() {
    this.Image = null;
    this.imageInput.nativeElement.value = '';
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  initializeNavigation() {
    this.spinner.show();
    // console.log('Current route: ', this.router.url);
    this.editMode = this.router.url.includes('/edit');
    console.log('Edit-Mode: ', this.editMode );
    this.username = this.route.snapshot.params['username'];
    if ( localStorage.getItem('currentUser').localeCompare(this.username) === 0) {
      this.own = true;
    } else { this.own = false; }
    console.log('about to fetch user');
    this.getUser(this.username);
    if ( this.editMode ) {
      this.getCountries();
      this.getGames();
    }
  }

  clearNavigation() {
    console.log('Clear Navigation start');
    this.user = null;
    this.games = null;
    this.game = null;
    this.countries = null;
    this.country = null;
    this.loaded = false;
    this.loadCount = 0;
    this.error = false;
    this.editMode = false;

    this.username = null;
    this.own = false;
    console.log('Clear Navigation stop');
  }

}
