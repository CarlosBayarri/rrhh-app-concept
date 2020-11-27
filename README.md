# ![Cover](https://github.com/CarlosBayarri/rrhh-app-concept/blob/master/cover_rrhh.jpg)
# RrhhAppConcept

This project is based on the concept of interaction of a company, its departments and employees. In your company, a department can contain multiple employees, but an employee can only belong to one department.

The application reflects a CRUD under a very minimalist design with the sole purpose of reflecting said interaction. Material has been implemented for the design. The application should mainly show a list of departments and another of employees. For this purpose, from the main module, they have been divided into two modules, one for each one, which bring together three components: child, form and list.

The state of the application is managed with Redux. The user reduder allow us to manage the user information from Firebase. Also we have the departments and staf reducers.

The prototype of this application is in this [PDF](https://github.com/CarlosBayarri/rrhh-app-concept/blob/master/BasicConcept.pdf).

## App startup
This application is in [GitHubPages](https://carlosbayarri.github.io/rrhh-app-concept/), [Firebase](https://rrhh-app-9601b.firebaseapp.com/) and docker. In the package.json there is some scripts to create and run the docker image: 
- docker_build
- run_docker_container

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Contributions

Want to contribute? Great!

### Development

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 

### Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/CarlosBayarri/rrhh-app-concept/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/CarlosBayarri/rrhh-app-concept/issues/new). Please include sample queries and their corresponding results.


## Built with 

- [Angular 11.0.2](https://github.com/angular/angular-cli/blob/master/README.md)
- [Ngrx 10.0.1](https://github.com/ngrx/platform)
- [Firebase 8.0.0](https://github.com/firebase/)

## Team

[![Carlos Bayarri Cebrecos](https://avatars2.githubusercontent.com/u/31616221?s=400&u=f32637806040e934196bf7850b798a36867f5220&v=4)](https://github.com/CarlosBayarri)|.
---|---
[Carlos Bayarri Cebrecos ](https://github.com/CarlosBayarri)|.

## [License](https://github.com/CarlosBayarri/rrhh-app-concept/LICENSE.md)

MIT © [Carlos Bayarri Cebrecos ](https://github.com/CarlosBayarri/rrhh-app-concept/blob/master/LICENSE)
