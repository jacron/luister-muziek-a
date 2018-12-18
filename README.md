# LuisterMuziekA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3. ... angular 5.2.9

## Api server

api-server needed:
http://localhost:5000/api, project music-api,
of http://music-api/api

vhost:
music-client, pad luister-muziek-a/dist;

vergeet niet htaccess aan te passen(?) 
https://github.com/mgechev/angular-seed/wiki/Deploying-prod-build-to-Apache-2;
deze moet wel in build komen te staan, dus plaatsen in src en opnemen in .angular-cli.json/assets

ng build zonder --prod

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Run


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Sass

Build roblem: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (64)

Solution: upgrade node-sass to 4.9.3 (after adding a line to package.json) 

## Back-end

 apiServer: 'http://localhost:5000/api',

nb 

music-api:5005
music:8080



