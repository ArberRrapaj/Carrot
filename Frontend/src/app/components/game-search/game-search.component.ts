import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Game } from '../../classes/game';
import { GameService } from '../../services/game/game.service';
@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.sass']
})
export class GameSearchComponent implements OnInit {
  filteredGames: Game[] = [];
  gamesForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private gameService: GameService) { }

  ngOnInit() {

    this.gamesForm = this.formBuilder.group({
      userInput: null
    });

    this.gamesForm.get('userInput').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => this.isLoading = true),
        switchMap(title => this.gameService.searchGames(title)
        .pipe(
          finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe( games => this.filteredGames = games);


  }

  displayFn(game: Game) {
    if (game) { return game.Title; }
  }

}
