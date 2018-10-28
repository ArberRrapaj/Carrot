# Carrot
## Web-Application for Tracking of your Game-Library


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
* Starts up Frontend and Backend servers in one one shell


### Application Startup

Run `npm start` in root directory for usage in single shell

or

Run `cd fe && ng serve`

and `cd be && npm start`

in seperate shells.


### Troubleshooting

If you have problems connecting to database, check the information in Backend/.env