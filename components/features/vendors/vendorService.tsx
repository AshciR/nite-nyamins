import {useQuery} from "@tanstack/react-query";
import {featureCollection, point} from "@turf/turf";
import {Feature, Point} from "geojson";
import {Vendor} from "@/components/features/vendors/models";

const useVendorsQuery = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendorLocations
  });
};

const fetchVendorLocations = async () => {
  const response = await fetchVendorsEndpoint();

  if (response.status !== 200) {
    throw new Error('Failed to fetch vendor locations');
  }

  const vendorList = await response.json();
  const points = vendorList.vendors.map(v => convertVendorJsonToPointFeature(v));
  return featureCollection(points);
};

const vendorResponse: VendorsListJson = {
  "vendors": [
    {
      "id": "1",
      "name": "Irie Pots",
      "longitude": -76.812076,
      "latitude": 18.03577,
      "openingTime": "10:00:00",
      "closingTime": "22:00:00",
      "rating": 3
    },
    {
      "id": "2",
      "name": "Jerk Pork Primer",
      "longitude": -76.812215,
      "latitude": 18.036226,
      "openingTime": "09:00:00",
      "closingTime": "21:00:00",
      "rating": 4
    },
    {
      "id": "3",
      "name": "Spice Haven",
      "longitude": -76.81195,
      "latitude": 18.03605,
      "openingTime": "11:00:00",
      "closingTime": "23:00:00",
      "rating": 5
    },
    {
      "id": "4",
      "name": "Reggae Bites",
      "longitude": -76.8125,
      "latitude": 18.0359,
      "openingTime": "08:00:00",
      "closingTime": "20:00:00",
      "rating": 1
    },
    {
      "id": "5",
      "name": "Yaad Vibes",
      "longitude": -76.8128,
      "latitude": 18.0361,
      "openingTime": "12:00:00",
      "closingTime": "00:00:00",
      "rating": 3
    },
    {
      "id": "6",
      "name": "Tropical Twist",
      "longitude": -76.8117,
      "latitude": 18.0363,
      "openingTime": "10:00:00",
      "closingTime": "22:00:00",
      "rating": 4
    }
  ]
}



const fetchVendorsEndpoint = (): Promise<JsonResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        json: () => Promise.resolve(vendorResponse)
      })
    }, 500)
  })
}

type JsonResponse = {
  status: number;
  json: () => Promise<VendorsListJson>;
}

type VendorsListJson = {
  vendors: VendorJson[];
};

type VendorJson = {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  openingTime: string;
  closingTime: string;
  rating: number;
};

const convertVendorJsonToPointFeature = (vendor: VendorJson): Feature<Point, Vendor> => {
  return point([vendor.longitude, vendor.latitude], {
    id: vendor.id,
    name: vendor.name,
    openingTime: vendor.openingTime,
    closingTime: vendor.closingTime,
    rating: vendor.rating,
  });
};


export type {VendorJson}
export {useVendorsQuery, convertVendorJsonToPointFeature};
