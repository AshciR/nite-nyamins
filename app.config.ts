import {ExpoConfig} from 'expo/config';

export default (): ExpoConfig => {

  return {
    "name": "Nyamins",
    "slug": "nite-nyamins",
    "version": "1.0.0",
    "orientation": "default",
    "icon": "./assets/app-icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsDownloadToken": process.env.MAPBOX_DOWNLOAD_TOKEN
        }
      ],
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Show current location on map."
        }
      ]
    ],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "io.ashcir-nite-nyamins",
      "config": {
      },
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
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
    },
    "extra": {
      "mapBoxAccessToken": process.env.MAPBOX_ACCESS_TOKEN,
      "eas": {
        "projectId": "db8a975a-e869-4c66-835d-d934a4a2a605"
      }

    }
  }

}