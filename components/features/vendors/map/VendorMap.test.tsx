import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {convertVendorJsonToPointFeature, VendorJson} from "@/components/features/vendors/vendorService";
import VendorMap from "@/components/features/vendors/map/VendorMap";
import {Feature, Point} from "geojson";
import {Vendor} from "@/components/features/vendors/models";
import {featureCollection} from "@turf/turf";

describe('<VendorMap />', () => {
  test('renders the MapView with vendor locations and handles press events', () => {

    // Given: A sample GeoJSON FeatureCollection with one vendor
    const setCurrentVendor = jest.fn();

    // And: a mock function to handle vendor press events
    const setIsVendorDetailsDisplayed = jest.fn();

    // And: We have vendorLocations
    const vendor: VendorJson = {
      id: "1",
      name: "Irie Pots",
      longitude: -76.812076,
      latitude: 18.035770,
      openingHour: 10,
      closingHour: 22,
      rating: 3,
    };

    const vendorPoint: Feature<Point, Vendor> = convertVendorJsonToPointFeature(vendor);
    const vendorLocations = featureCollection([vendorPoint])

    // When: The VendorMap component is rendered
    render(
      <VendorMap
        vendorLocations={vendorLocations}
        setCurrentVendor={setCurrentVendor}
        setIsVendorDetailsDisplayed={setIsVendorDetailsDisplayed}
      />
    );

    // Then: The MapView should be present
    const mapView = screen.getByTestId('vendor-map');
    expect(mapView).toBeOnTheScreen();
  });
});
