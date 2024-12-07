import { ExpoConfig} from 'expo/config';

export default (): ExpoConfig => {

  return {
    "name": "nite-nyamins",
    "slug": "nite-nyamins",
    "version": "1.0.0",
    "orientation": "default",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "io.ashcir-nite-nyamins",
      "config": {
        "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "io.ashcir.nite_nyamins"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }

}