import {point} from "@turf/turf";
import {Feature, Point} from "@types/geojson";
import {VendorJson} from "./vendorApi"

export interface Vendor {
  id: string;
  name: string;
  openingHour: number;
  closingHour: number;
  rating: number;
}

const convertVendorJsonToPointFeature = (vendor: VendorJson): Feature<Point, Vendor> => {
  return point([vendor.longitude, vendor.latitude], {
    id: vendor.id,
    name: vendor.name,
    openingHour: vendor.openingHour,
    closingHour: vendor.closingHour,
    rating: vendor.rating,
  });
};

export {convertVendorJsonToPointFeature}
