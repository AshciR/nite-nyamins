import {Box} from "@/components/ui/box";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {StyleSheet} from "react-native";

const Map = () => {
  return (
    <Box style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </Box>
  )
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

export default Map;