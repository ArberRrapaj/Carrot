# Carrot
## Web-Application for Tracking of your Game-Library

Carrot is the go-to App for Gamers, who want an overview about every Game they own. You have a huge Game library, but don't know what to play? Carrot gives you a daily suggestion on which game you could play. Connect to other players, by visiting their profiles. Don't hesitate and jump right in!

*optimized for Chrome*

### Database Setup

Log into mysql:
```mysql -u yourusername -p yourpassword```

Create database:
```mysql>CREATE DATABASE Carrot```

Generate layout and content:
```mysql -u yourusername -p yourpassword Carrot < db.sql```

### Application Build

Run `npm install`

Run `gulp`
* Installs Frontend and Backend Dependencies
* Lints Backend
* Lints Frontend

### Application Startup

Run `npm start`  in root directory for usage in single shell

or

run `cd fe && ng serve`

and `cd be && npm start`.

in seperate shells.

The Frontend will be accessible through `http://localhost:4200/`.

### Troubleshooting

If you have problems connecting to database, check the information in Backend/.env