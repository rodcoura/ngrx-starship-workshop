# NGRX-11337 State Management Simulator

Welcome to 31st century software development! It is your job to use the NGRX library to create the central computer code for the NGRX-11337 starship. The starship is built to travel between planets, rescue satellites, and blow up asteroids with lasers.

![spaceship](/screenshot_UI.png)

## The Code Challenge

![captain speaking](/screenshot_captain.png)

The captain of the NGRX-11337 starship has a set of directives that he issues the `ComputerService` over the course of the mission. These directives must be made into `NGRX Actions` that are passed to the `NGRX Reducer` that changes the software state. This state is queried by starship UI components using `NGRX Selectors`.

It is up to the programmers to write the very important state management code to ensure the captain's commands actually fulfill the commander's expectations.

![grades](/screenshot_grade.png)

To measure this, a `SnitchService` will keep track of the number of failed expectations, the number of actions dispatched, and the size of the software state.

**The challenge is complete when there are 0 Failures** due to the state of the application.

> After achieving 0 failures, programmers can minimize the number of actions and the size of their state in an attempt to create the fastest and most elegant software in the galaxy!

### [Go read the workshop README here](./src/app/workshop/README.md)

<div style="padding:8px; background: firebrick; color: white; font-weight: bold">
Much more detail on the programming can be found in the workshop README, make sure you read it!
</div>



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:11337/`. The app will automatically reload if you change any of the source files.

### Other
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.
* Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
