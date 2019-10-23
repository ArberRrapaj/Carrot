import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { Game } from 'src/app/classes/game';
import { GameService } from '../../services/game/game.service';
import { Genre } from '../../classes/genre';
import { GenreService } from '../../services/genre/genre.service';
import { Library } from '../../classes/library';
import { LibraryService } from '../../services/library/library.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.sass']
})
export class GameDetailComponent implements OnInit {
  game: Game;
  genre: Genre;
  genres: Object;
  loaded: boolean;
  loadCount = 0;
  error: boolean;
  editMode: boolean;

  gameForm: FormGroup;
  gameID: number;
  GenreID: number;
  Title = '';
  Publisher = '';
  Released: number = null;
  Image = '';
  @ViewChild('image', {static: false}) imageInput: ElementRef;


  constructor(private formBuilder: FormBuilder,
    private gameService: GameService,
    private genreService: GenreService,
    private libraryService: LibraryService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) {

    // To initialize FormGroup
    this.gameForm = formBuilder.group({
      'GenreID': [null, Validators.required],
      'Title': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      'Publisher': [null, Validators.compose([Validators.minLength(1), Validators.maxLength(100)])],
      'Released': [null, Validators.compose([Validators.pattern(/([0-9]+$)/), Validators.min(1900), Validators.max(2018)])]
    });

  }

  ngOnInit() {
    this.spinner.show();
    // console.log('Current route: ', this.router.url);
    this.editMode = this.router.url.includes('/edit');
    console.log('Edit-Mode: ', this.editMode );
    this.gameID = this.route.snapshot.params['gameID'];

    this.getGame(this.gameID);
    if ( this.editMode ) { this.getGenres(); }
  }

  getGame(gameID: number): void {
    this.gameService.getGame(gameID)
    .subscribe( game => {
      if (game !== null) {
        if (game.GameID === -1) {
          this.goToGames();
        } else {
          this.game = game;

          if (this.editMode) {
            this.gameForm.get('GenreID').setValue(game.GenreID);
            this.gameForm.get('Title').setValue(game.Title);
            this.gameForm.get('Publisher').setValue(game.Publisher);
            this.gameForm.get('Released').setValue(game.Released);
            this.Image = game.Image;
          } else { this.getGenre(game.GenreID); }
        }
      } else {
        this.error = true;
        this.upTheLoader();
      }
      console.log(game);
      this.upTheLoader();
    });
  }

  getGenre(genreID: number): void {
    this.genreService.getGenre(genreID)
    .subscribe( genre => {
      console.log(genre);
      if (genre !== null) {
        this.genre = genre;
      } else { this.error = true; }
      this.upTheLoader();
    });
  }

  getGenres(): void {
    this.genreService.getGenres()
    .subscribe(genres => {
      console.log(genres);
      if (genres !== null) {
        this.genres = genres;
      } else { this.error = true; }
      this.upTheLoader();
    });
  }

  upTheLoader(): void {
    this.loadCount++;
    if (this.loadCount === 2) {
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
  onFormSubmit(game) {
    game.Image = this.Image;
    console.log('Received this game from form: ', game);
    if ( game.Image == null || game.Image === '') { delete game.Image; }
    if ( game.Publisher == null || game.Publisher === '') { delete game.Publisher; }
    if ( game.Released == null || game.Released === '') { delete game.Released; }

    console.log('Submitting this game: ', game);
    this.gameService.updateGame(this.game.GameID, game)
    .subscribe( result => {
      if (result != null && result.startsWith('Successfully updated game') ) { this.cancelEditMode(); }
      // console.log(result);
    });
  }

  addToLibrary(gameID: number): void {
    const username = localStorage.getItem('currentUser');

    const library = new Library(gameID);
    this.libraryService.addGameToLibrary(username, library)
    .subscribe(message => {
      console.log(message);
    });
  }

  enterEditMode() {
    const url = this.router.url + '/edit';
    this.router.navigate([url]);
  }

  cancelEditMode() {
    const url = this.router.url.replace('/edit', '');
    this.router.navigate([url]);
  }

  goToGames() {
    this.router.navigate(['/games']);
  }

  deleteImage() {
    this.Image = null;
    this.imageInput.nativeElement.value = '';
  }

}
