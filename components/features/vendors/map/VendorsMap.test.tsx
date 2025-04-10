import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {convertVendorJsonToPointFeature} from "@/components/features/vendors/vendorService";
import VendorsMap, {
  filterHasCluster,
  filterSelectedVendorLayer,
  filterUnselectedVendorLayer
} from "@/components/features/vendors/map/VendorsMap";
import {Feature, Point} from "geojson";
import {Vendor} from "@/components/features/vendors/models";
import {featureCollection} from "@turf/turf";
import {VendorJson} from "@/components/features/vendors/mockApis";
import {getTestVendor} from "@/components/features/vendors/testUtils";

describe('<VendorsMap />', () => {
  test('renders the MapView with title and vendor locations', () => {

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
      openingTime: "10:00",
      closingTime: "22:00",
      rating: 3,
    };

    const vendorPoint: Feature<Point, Vendor> = convertVendorJsonToPointFeature(vendor);
    const vendorLocations = featureCollection([vendorPoint])

    // When: The VendorsMap component is rendered
    render(
      <VendorsMap
        vendorLocations={vendorLocations}
        setCurrentVendor={setCurrentVendor}
        setIsVendorDetailsDisplayed={setIsVendorDetailsDisplayed}
      />
    );

    // Then: The MapView should be present
    const mapView = screen.getByTestId('vendor-map');
    expect(mapView).toBeOnTheScreen();

    // And: The title should be there
    const title = screen.getByTestId("vendor-map-title");
    expect(title).toHaveTextContent("Map");
  });
});


describe('MapBox Filter Functions', () => {

  const vendor = getTestVendor()

  describe('filterHasCluster', () => {
    it('should return a filter array checking if cluster property exists', () => {
      const result = filterHasCluster();
      expect(result).toEqual(['has', 'cluster']);
    });
  });

  describe('filterSelectedVendorLayer', () => {
    it('should return a filter array for a vendor with a string ID', () => {
      const result = filterSelectedVendorLayer(vendor);
      expect(result).toEqual([
        'all',
        ['!', ['has', 'cluster']],
        ['==', ['get', 'id'], '1']
      ]);
    });

    it('should handle undefined vendor', () => {
      const vendor = undefined as unknown as Vendor;
      const result = filterSelectedVendorLayer(vendor);
      expect(result).toEqual([
        'all',
        ['!', ['has', 'cluster']],
        ['==', ['get', 'id'], 'undefined']
      ]);
    });
  });

  describe('filterUnselectedVendorLayer', () => {
    it('should return a filter array excluding a vendor with a string ID', () => {
      const result = filterUnselectedVendorLayer(vendor);
      expect(result).toEqual([
        'all',
        ['!', ['has', 'cluster']],
        ['!=', ['get', 'id'], '1']
      ]);
    });

    it('should handle undefined vendor', () => {
      const vendor = undefined as unknown as Vendor;
      const result = filterUnselectedVendorLayer(vendor);
      expect(result).toEqual([
        'all',
        ['!', ['has', 'cluster']],
        ['!=', ['get', 'id'], 'undefined']
      ]);
    });

  });
});