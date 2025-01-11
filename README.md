# Nite Nyamins Mobile App

## Getting Started

### Pre-requisites
- Node LTS
- Yarn
- MacOS (iOS)
- XCode (iOS)
- Android Studio
- MapBox Access Tokens

### Install dependencies
`yarn install`

### Getting MapBox Access tokens
We use `@rnmapbox/maps` library to display maps. You'll need to get the proper credentials. 

If you haven't created one yet, make sure to sign up for an account [here](https://www.mapbox.com/signup/). 
You can create and manage your access tokens on your [Mapbox Account page](https://www.mapbox.com/account/).
You'll need two tokens:
- Secret access token with (Downloads:Read) scope to download iOS and Android SDK from mapbox. The secret token starts with sk.ey
- Public token to use as accessToken when running the app. The public token starts with pk.ey

### Setting Env Variables
We use a `.env.local` file for local development. Set the needed variables there.
Look at `.env-template` for the required variables.

### Running on iOS Simulator
Requires you have Xcode installed, and an iOS simulator
1. Generate the iOS native artifacts
`yarn ios:prebuild`

2. Start the application
`yarn run ios`

### Running on Android Simulator
Requires you have Android Studio installed and an Android simulator.
Follow the instructions [here](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local)
1. Generate the iOS native artifacts
   `yarn android:prebuild`

2. Start the application
   `yarn run android`

### Checking the app configs
Running `npx expo config` will display the final configuration that will be used in Expo CLI after resolution has occurred.

### Troubleshooting
1. If the styling for elements are missing, try clearing the cache by 
`expo start --clear`

2. If you run into `global.css Jest Process was killed`. Run the following
```
yarn ios:prebuild
yarn run ios
```
