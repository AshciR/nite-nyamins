import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import Mapbox, {Camera, Images, LocationPuck, MapView, ShapeSource, SymbolLayer} from "@rnmapbox/maps";
import {Box} from "@/components/ui/box";
import Constants from "expo-constants"
import {featureCollection, point} from "@turf/turf";
import pin from "assets/food_location_pin_48x48.png"

Mapbox.setAccessToken(Constants.expoConfig?.extra?.mapBoxAccessToken || "");

const MapboxMap = () => {
  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const vendorLocations = featureCollection([
    point([-76.812076, 18.035770]),
    point([-76.812215, 18.036226]),
  ]);

  return (
    <Box style={styles.container}>
      <MapView
        style={{flex: 1}}
        styleURL={"mapbox://styles/mapbox/streets-v12"}
        compassEnabled={false}
      >
        <Camera
          defaultSettings={{
            zoomLevel: 16,
            centerCoordinate: [-76.810140, 18.033315]
          }}
          followUserLocation={true}
          followZoomLevel={16}
        />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{isEnabled: true}}/>
        <ShapeSource
          id="vendors"
          shape={vendorLocations}
        >
          <SymbolLayer
            id="vendor-icons"
            style={{
              iconImage: "pin",
              iconSize: 0.75,
              iconAllowOverlap: true,
              iconAnchor: "bottom"
            }}
          />
          <Images images={{pin}}/>
        </ShapeSource>
      </MapView>

    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapboxMap