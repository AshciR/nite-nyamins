import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {StyleSheet} from "react-native";
import Mapbox, {Camera, CircleLayer, Images, LocationPuck, MapView, ShapeSource, SymbolLayer} from "@rnmapbox/maps";
import Constants from "expo-constants"
import pin from "@/assets/food_location_pin_v2_48x48.png"
import selectedPin from "@/assets/selected_food_location_pin_v2_48x48.png"
import {Feature, FeatureCollection, GeoJsonObject, GeoJsonProperties} from "geojson";
import {Vendor} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {primary} from "@/color.constants";
import {RoutesNames} from "@/components/screens/routes";

Mapbox.setAccessToken(Constants.expoConfig?.extra?.mapBoxAccessToken || "");

type VendorMapProps = {
  vendorLocations: FeatureCollection<GeoJsonObject, Vendor> | undefined
  vendor?: Vendor
  setCurrentVendor: Dispatch<SetStateAction<Vendor | undefined>>
  setIsVendorDetailsDisplayed: Dispatch<SetStateAction<boolean>>
}

const VendorsMap: React.FC<VendorMapProps> = (
  {
    vendorLocations,
    vendor,
    setCurrentVendor,
    setIsVendorDetailsDisplayed
  }
) => {

  const DEFAULT_CAMERA_ZOOM = 7
  const MAX_CAMERA_ZOOM = 18
  const [cameraZoom, setCameraZoom] = useState<number>(DEFAULT_CAMERA_ZOOM)
  const [isClusterZooming, setIsClusterZooming] = useState(false)
  const cameraRef = useRef<Camera>(null);

  const handleCameraChange = (change: { properties: { center: number[]; zoom: number } }) => {
    if (!isClusterZooming && change.properties.zoom) {
      console.log("handleCameraChange", change.properties.zoom)
      setCameraZoom(change.properties.zoom);
    }
  };

  const handleVendorPress = (event: any) => {
    console.log(JSON.stringify(event, null, 2))
    
    const feature = event.features[0];
    if (feature?.properties?.cluster) {
      // Only zoom in if it's a cluster
      console.log("handleVendorPress", cameraZoom)
      handleClusterZoom(cameraZoom);
      return;
    }

    // If it's not a cluster, handle vendor selection
    const selectedVendor = findVendorByEvent(event, vendorLocations)
    setCurrentVendor(selectedVendor)
    setIsVendorDetailsDisplayed(!!selectedVendor)
  };

  const handleClusterZoom = (currentZoom: number) => {
    const newZoom = Math.min(currentZoom + 1, MAX_CAMERA_ZOOM);
    setIsClusterZooming(true);
    setCameraZoom(newZoom);
    console.log("handleClusterZoom", newZoom)
    // Reset the cluster zooming flag after animation completes
    setTimeout(() => {
      setIsClusterZooming(false);
    }, 1000); // Match the animation duration
  };

  useEffect(() => {
    if (!cameraRef.current || !isClusterZooming) return;

    cameraRef.current.setCamera({
      zoomLevel: cameraZoom,
      animationMode: 'easeTo',
      animationDuration: 1000, // ms
    });
  }, [cameraZoom, isClusterZooming]);

  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  }, []);

  return (
    <VStack
      className={"flex-1 items-center bg-background-50"}
    >
      <Heading
        size="2xl"
        testID={"vendor-map-title"}
        className={"self-start mb-[4%] pl-[2%]"}
      >
        {RoutesNames.MAP}
      </Heading>
      <MapView
        style={styles.map}
        compassFadeWhenNorth={true}
        styleURL={"mapbox://styles/mapbox/streets-v12"}
        compassEnabled={false}
        scaleBarEnabled={false}
        testID="vendor-map"
        onCameraChanged={handleCameraChange}
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            zoomLevel: DEFAULT_CAMERA_ZOOM,
          }}
          followUserLocation={false}
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
            filter={filterHasCluster()}
            style={{
              textField: ["get", "point_count_abbreviated"],
              textColor: "black",
              textPitchAlignment: "viewport",
              textSize: 20
            }}
          />

          <CircleLayer
            id="vendor-clusters"
            filter={filterHasCluster()}
            style={{
              circleColor: primary,
              circleRadius: 15,
              circleOpacity: 0.5,
              circleStrokeWidth: 2,
              circleStrokeColor: primary
            }}
          />

          <Images images={{pin}}/>
          <SymbolLayer
            id="vendor-icons"
            filter={filterUnselectedVendorLayer(vendor)}
            style={{
              iconImage: "pin",
              iconSize: 0.75,
              iconAllowOverlap: true,
              iconAnchor: "bottom"
            }}
          />

          <Images images={{selectedPin}}/>
          <SymbolLayer
            id="selected-vendor-icon"
            filter={filterSelectedVendorLayer(vendor)}
            style={{
              iconImage: "selectedPin",
              iconSize: 0.75,
              iconAllowOverlap: true,
              iconAnchor: "bottom"
            }}
          />
        </ShapeSource>
      </MapView>

    </VStack>
  );
};

export function filterSelectedVendorLayer(vendor: Vendor) {
  return ["all",
    ["!", filterHasCluster()],
    ["==", ["get", "id"], `${vendor?.id}`]
  ];
}

export function filterUnselectedVendorLayer(vendor: Vendor) {
  return ["all",
    ["!", filterHasCluster()],
    ["!=", ["get", "id"], `${vendor?.id}`]
  ];
}

export function filterHasCluster() {
  return ["has", "cluster"];
}

/**
 * Finds the vendor from vendorLocations that matches the id provided in the event.
 *
 * @param event - The event object containing vendor feature details.
 * @param vendorLocations - A FeatureCollection of vendors.
 * @returns The Vendor object if found, otherwise undefined.
 */
export function findVendorByEvent(
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
  // Have to keep this style b/c MapView doesn't work with NativeWind
  map: {
    flex: 1,
    width: '100%',
    borderWidth: 0.5,
    borderColor: "#b3b3b3"
  },
});

export default VendorsMap