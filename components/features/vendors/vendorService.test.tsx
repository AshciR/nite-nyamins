import {
  convertVendorJsonToPointFeature,
  useVendorMenuQuery,
  useVendorsQuery,
} from "@/components/features/vendors/vendorService";
import {Feature, Point} from "@types/geojson";
import {Vendor, VendorWithMenu} from "@/components/features/vendors/models";
import {renderHook, waitFor} from "@testing-library/react-native";
import {getQueryWrapper} from "@/jest-setup";
import {VendorJson} from "@/components/features/vendors/mockApis";

describe("convertVendorJsonToPointFeature", () => {
  it("should convert a VendorJson object into a GeoJSON Point Feature", () => {

    // Given: A sample vendor JSON object
    const vendor: VendorJson = {
      id: "1",
      name: "Irie Pots",
      longitude: -76.812076,
      latitude: 18.035770,
      openingTime: "10:00:00",
      closingTime: "22:00:00",
      rating: 3,
    };

    // When: The function is called
    const result: Feature<Point, Vendor> = convertVendorJsonToPointFeature(vendor);

    // Then: The result should be a valid GeoJSON Feature with correct properties
    expect(result).toEqual({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-76.812076, 18.035770],
      },
      properties: {
        id: "1",
        name: "Irie Pots",
        openingTime: "10:00:00",
        closingTime: "22:00:00",
        rating: 3,
      },
    });
  });
})

describe("useVendorsQuery", () => {
  it("gets the vendors", async () => {

    // Given: Vendors endpoint is working
    const expected = getExpectedVendorFeatures()

    // When: We call the vendors hook
    const {result} = renderHook(
      () => useVendorsQuery(),
      {wrapper: getQueryWrapper()}
    )

    // Then: it should be successful
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // And: The vendor data is returned as a Feature collection
    expect(result.current.data).toEqual(expected)

  })
})

describe("useVendorMenuQuery", () => {
  it("get the vendor with menu", async () => {

    // Given: Vendors with menu endpoint is working
    const expectedVendorWithMenu: VendorWithMenu = {
      vendor: {
        "id": "2",
        "name": "Jerk Pork Primer",
        "openingTime": "09:00:00",
        "closingTime": "21:00:00",
        "rating": 4,
      },
      menu: [
        {
          "id": "201",
          "name": "Spicy Pork Ribs",
          "price": 1500,
          "currency": "JMD",
          "mealType": "pork"
        },
        {
          "id": "202",
          "name": "Island Soup",
          "price": 800,
          "currency": "JMD",
          "mealType": "soup"
        }
      ]
    }

    // When: We use the query
    const vendorId = "2"
    const {result} = renderHook(
      () => useVendorMenuQuery(vendorId),
      {wrapper: getQueryWrapper()}
    )

    // Then: it should be successful
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // And: It should return the data as a VendorWithMeal model
    expect(result.current.data).toEqual(expectedVendorWithMenu)

  })

  it("fails to get the vendor if id doesn't exist", async () => {

    // Given: Vendors with menu endpoint is working

    // When: We use the query with an non-exists id
    const vendorId = "99"
    const {result} = renderHook(
      () => useVendorMenuQuery(vendorId),
      {wrapper: getQueryWrapper()}
    )

    // Then: it should be successful
    await waitFor(() => expect(result.current.isError).toBe(true))

    // And: It should return the data as a VendorWithMeal model
    expect(result.current.data).not.toBeDefined()
  })

})

const getExpectedVendorFeatures = () => {
  return {
    "features": [
      {
        "geometry": {
          "coordinates": [
            -76.812076,
            18.03577
          ],
          "type": "Point"
        },
        "properties": {
          "closingTime": "22:00:00",
          "id": "1",
          "name": "Irie Pots",
          "openingTime": "10:00:00",
          "rating": 3
        },
        "type": "Feature"
      },
      {
        "geometry": {
          "coordinates": [
            -76.812215,
            18.036226
          ],
          "type": "Point"
        },
        "properties": {
          "closingTime": "21:00:00",
          "id": "2",
          "name": "Jerk Pork Primer",
          "openingTime": "09:00:00",
          "rating": 4
        },
        "type": "Feature"
      },
      {
        "geometry": {
          "coordinates": [
            -76.81195,
            18.03605
          ],
          "type": "Point"
        },
        "properties": {
          "closingTime": "23:00:00",
          "id": "3",
          "name": "Spice Haven",
          "openingTime": "11:00:00",
          "rating": 5
        },
        "type": "Feature"
      },
      {
        "geometry": {
          "coordinates": [
            -76.8125,
            18.0359
          ],
          "type": "Point"
        },
        "properties": {
          "closingTime": "20:00:00",
          "id": "4",
          "name": "Reggae Bites",
          "openingTime": "08:00:00",
          "rating": 1
        },
        "type": "Feature"
      },
      {
        "geometry": {
          "coordinates": [
            -76.8128,
            18.0361
          ],
          "type": "Point"
        },
        "properties": {
          "closingTime": "00:00:00",
          "id": "5",
          "name": "Yaad Vibes",
          "openingTime": "12:00:00",
          "rating": 3
        },
        "type": "Feature"
      },
      {
        "geometry": {
          "coordinates": [
            -76.8117,
            18.0363
          ],
          "type": "Point"
        },
        "properties": {
          "closingTime": "22:00:00",
          "id": "6",
          "name": "Tropical Twist",
          "openingTime": "10:00:00",
          "rating": 4
        },
        "type": "Feature"
      }
    ],
    "type": "FeatureCollection"
  };
}
