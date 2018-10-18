export class Game {
    GameID:     number;
    GenreID:    number;
    Title:      string;
    Publisher:  string;
    Released:   number;
    Image:      string;

    constructor ( genreID?, title?, publisher?, released?, image? ) {
        this.GenreID = genreID;
        this.Title = title;
        this.Publisher = publisher;
        this.Released = released;
        this.Image = image;
    }
}
