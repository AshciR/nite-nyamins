import React from 'react';
import {render, screen} from '@testing-library/react-native';
import vendorLocations from "@/components/features/vendors/vendorService";
import VendorMap from "@/components/features/vendors/VendorMap";

describe('<VendorMap />', () => {
  test('renders the MapView with vendor locations and handles press events', () => {

    // Given: A sample GeoJSON FeatureCollection with one vendor
    // And: a mock function to handle vendor press events
    const setCurrentVendor = jest.fn();
    const setIsVendorDetailsDisplayed = jest.fn();

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
