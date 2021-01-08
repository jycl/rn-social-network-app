# Simple Social Networking App

This repository provides the code to install and run a mobile application developed in React Native that retrieves and displays data from [`https://jsonplaceholder.typicode.com/`](https://jsonplaceholder.typicode.com/) and displays a mock of a social networking app.

## Description

The mock mobile app displays a list of users with the option to select each user to look up for more details. The user's post history, photo albums, and todo list can also be displayed (though the backend does not provide any proper readable strings).

This application was intended to run on **iOS** and **Android** devices but may not be bug-free when running on specific devices with different sizes.  It has been tested on both XCode Simulators (up to v13.6) and Android emulators (up to API 28).

The React Native application was initially published on version v0.56.0, but has since been upgraded to v0.62.2.  You may look at the commit history (with upgrade version noted in the message) for information on files changed for each upgrade and some troubleshooting messages in the commit description.

# Libraries

The following libraries were used in the development of this project.  Please feel free to take a look at the implementation in the codebase as it serves as a reference for myself too!

* MobX (v3.6.2)
* React Navigation (v3.13.0)
* Enzyme shallow rendering for tests
* [**TODO**] Detox Testing
* [**TODO**] CI/CD implementation
* [**TODO**] Migrate to TypeScript

## Installation (iOS)

1. Clone repository into local environment
2. Navigate to the project folder via CLI
3. Run `npm install` in order to download dependencies for application.
4. Go to the `ios` directory and run `bundle exec pod install` (click [here](https://guides.cocoapods.org/using/a-gemfile.html) for more details or [here](https://bundler.io/) for how to install Bundler).
5. Return to the root directory and run `react-native run-ios` in order to build and and start the application.
