# Nite Nyamins Mobile App

## Getting Started

### Pre-requisites
- Node LTS
- Yarn
- MacOS (iOS)
- XCode (iOS)
- Android Studio

### Install dependencies
`yarn install`

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

### Troubleshooting
If the styling for elements are missing, try clearing the cache by 
`expo start --clear`