import {VendorJson} from "@/components/features/vendors/vendorApi";
import {Feature, Point} from "@types/geojson";
import {convertVendorJsonToPointFeature, Vendor} from "@/components/features/vendors/models";

describe("convertVendorJsonToPointFeature", () => {
  it("should convert a VendorJson object into a GeoJSON Point Feature", () => {
    // GIVEN: A sample vendor JSON object
    const vendor: VendorJson = {
      id: "1",
      name: "Irie Pots",
      longitude: -76.812076,
      latitude: 18.035770,
      openingHour: 10,
      closingHour: 22,
      rating: 3,
    };

    // WHEN: The function is called
    const result: Feature<Point, Vendor> = convertVendorJsonToPointFeature(vendor);

    // THEN: The result should be a valid GeoJSON Feature with correct properties
    expect(result).toEqual({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-76.812076, 18.035770],
      },
      properties: {
        id: "1",
        name: "Irie Pots",
        openingHour: 10,
        closingHour: 22,
        rating: 3,
      },
    });
  });
})