import {useQuery} from "@tanstack/react-query";
import {featureCollection, point} from "@turf/turf";
import {Feature, FeatureCollection, Point} from "geojson";
import {Vendor, VendorWithMenu} from "@/components/features/vendors/models";
import {fetchVendorsEndpoint, fetchVendorsWithMealEndpoint, VendorJson} from "@/components/features/vendors/mockApis";

const useVendorsQuery = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendorLocations
  });
};

const fetchVendorLocations: () => Promise<FeatureCollection<Point, Vendor>> = async () => {
  const response = await fetchVendorsEndpoint();

  if (response.status !== 200) {
    throw new Error('Failed to fetch vendor locations');
  }

  const vendorList = await response.json();
  const points = vendorList.vendors.map(v => convertVendorJsonToPointFeature(v));
  return featureCollection(points);
};

const useVendorMenuQuery = (vendorId: string) => {
  return useQuery({
    queryKey: ['vendors', vendorId, 'menu'],
    queryFn: () => fetchVendorWithMenu(vendorId),
    enabled: Boolean(vendorId)
  });
};

const fetchVendorWithMenu = async (vendorId: string): Promise<VendorWithMenu> => {
  const response = await fetchVendorsWithMealEndpoint(vendorId);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch vendor ${vendorId} menu`);
  }

  const vendorMenuJson = await response.json()

  const {vendor, meals} = vendorMenuJson

  const { id, name, openingTime, closingTime, rating } = vendor;
  return {
    vendor: {
      id,
      name,
      openingTime,
      closingTime,
      rating
    },
    menu: meals
  }
}

const convertVendorJsonToPointFeature = (vendor: VendorJson): Feature<Point, Vendor> => {
  return point([vendor.longitude, vendor.latitude], {
    id: vendor.id,
    name: vendor.name,
    openingTime: vendor.openingTime,
    closingTime: vendor.closingTime,
    rating: vendor.rating,
  });
};

export {useVendorsQuery, useVendorMenuQuery, convertVendorJsonToPointFeature};
