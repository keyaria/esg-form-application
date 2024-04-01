# ESG Form Application

Take assessment on ESG standars and see results and all prior assessments

## Live Site

Site can be found here: https://esg-application-d0e55.web.app/

## Technical Stack

- AngularJS
- Typescript
- Firebase / FireStore
- TaigaUI and TailwindCSS

## Solution / Design Decisions

1. Angular JS
   - Compared to react it is more of a all in one solution which allows for quick developement and works great for dashboards. Combining this with typescript allows strict typing and easy ability to manipulate and show data.
2. Firebase / FireStore
   - I made assumption that users would want to see all past results so instead of saving this in localStorage, FireStore provides a more optimal solution, while being scalable and easy to use. Firebase now handles all the infrastructure and the Backend Database.
3. Deploying
   - To make it accessible for everyone, the site is hosted through Firebase Hosting. A deployment pipeline is set up so the site is built and deployed after merging a commit to the main branch.

## Assumptions

- The main Assumption is that this will be added onto a dashboard that companies can access and see prior results and also additional pages. Due to this I use Firebase.

### Running Locally

1. Check your node version and if it supports the latest Angular.
   `node -v`

2. Install node modules
   `npm install` or `sudo npm install --force` (if you have outdated Node this can cause npm install to have an error so this will alow it to bypass)

3. Run the project locally
   `npm start`

### Build Instructions

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Trade Offs

## Additional Features

- User Authentication
  This can be easily added using Firebase Auth Provider.
- Localization
  Adding the ability to switch between Japanese and English

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
