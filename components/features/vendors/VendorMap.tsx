import React, {Dispatch, SetStateAction, useCallback, useEffect} from "react";
import {StyleSheet} from "react-native";
import Mapbox, {Camera, CircleLayer, Images, LocationPuck, MapView, ShapeSource, SymbolLayer} from "@rnmapbox/maps";
import {Box} from "@/components/ui/box";
import Constants from "expo-constants"
import pin from "@/assets/food_location_pin_v2_black_outline_48x48.png"
import {FeatureCollection, GeoJsonObject} from "geojson";
import {Vendor} from "@/components/features/vendors/models";

Mapbox.setAccessToken(Constants.expoConfig?.extra?.mapBoxAccessToken || "");

type VendorMapProps = {
  vendorLocations: FeatureCollection<GeoJsonObject, Vendor> | undefined
  setCurrentVendor: Dispatch<SetStateAction<Vendor |undefined>>
  setIsVendorDetailsDisplayed: Dispatch<SetStateAction<boolean>>
}

const VendorMap: React.FC<VendorMapProps> = (
  {
    vendorLocations,
    setCurrentVendor,
    setIsVendorDetailsDisplayed
  }
) => {
  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleVendorPress = useCallback((event) => {
    console.log(JSON.stringify(event, null, 2))
    const selectedVendor = findVendorByEvent(event, vendorLocations)
    setCurrentVendor(selectedVendor)
    setIsVendorDetailsDisplayed(!!selectedVendor)
  }, [vendorLocations])

  return (
    <Box style={styles.container}>
      <MapView
        style={{flex: 1}}
        styleURL={"mapbox://styles/mapbox/streets-v12"}
        compassEnabled={false}
        testID="vendor-map"
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
          cluster={true}
          onPress={handleVendorPress}
        >
          <SymbolLayer
            id="vendor-clusters-count"
            filter={["has", "cluster"]}
            style={{
              textField: ["get", "point_count_abbreviated"],
              textColor: "black",
              textPitchAlignment: "viewport",
              textSize: 20
            }}
          />

          <CircleLayer
            id="vendor-clusters"
            filter={["has", "cluster"]}
            style={{
              circleColor: "#eb5e34",
              circleRadius: 15,
              circleOpacity: 0.5,
              circleStrokeWidth: 2,
              circleStrokeColor: "black"
            }}
          />

          <Images images={{pin}}/>
          <SymbolLayer
            id="vendor-icons"
            filter={["!", ["has", "cluster"]]}
            style={{
              iconImage: "pin",
              iconSize: 0.75,
              iconAllowOverlap: true,
              iconAnchor: "bottom"
            }}
          />
        </ShapeSource>
      </MapView>

    </Box>
  );
};

/**
 * Finds the vendor from vendorLocations that matches the id provided in the event.
 *
 * @param event - The event object containing vendor feature details.
 * @param vendorLocations - A FeatureCollection of vendors.
 * @returns The Vendor object if found, otherwise undefined.
 */
function findVendorByEvent(
  event: any,
  vendorLocations: FeatureCollection<GeoJsonObject, Vendor>
): Vendor | undefined {
  // Ensure the event contains features
  if (!event || !event.features || event.features.length === 0) {
    return undefined;
  }

  // Extract the vendor id from the first feature in the event
  const eventVendorId = event.features[0].properties.id;

  // Search for the vendor that matches the extracted id
  const matchedFeature = vendorLocations.features.find(
    (feature) => feature.properties.id === eventVendorId
  );

  // Return the vendor properties if found
  return matchedFeature ? matchedFeature.properties : undefined;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default VendorMap