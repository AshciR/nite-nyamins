const vendorResponse: VendorsListJson = {
  "vendors": [
    {
      "id": "1",
      "name": "Irie Pots",
      "longitude": -76.812076,
      "latitude": 18.035770,
      "openingHour": 10,
      "closingHour": 22,
      "rating": 3
    },
    {
      "id": "2",
      "name": "Jerk Pork Primer",
      "longitude": -76.812215,
      "latitude": 18.036226,
      "openingHour": 9,
      "closingHour": 21,
      "rating": 4
    },
    {
      "id": "3",
      "name": "Spice Haven",
      "longitude": -76.811950,
      "latitude": 18.036050,
      "openingHour": 11,
      "closingHour": 23,
      "rating": 5
    },
    {
      "id": "4",
      "name": "Reggae Bites",
      "longitude": -76.812500,
      "latitude": 18.035900,
      "openingHour": 8,
      "closingHour": 20,
      "rating": 1
    },
    {
      "id": "5",
      "name": "Yaad Vibes",
      "longitude": -76.812800,
      "latitude": 18.036100,
      "openingHour": 12,
      "closingHour": 24,
      "rating": 3
    },
    {
      "id": "6",
      "name": "Tropical Twist",
      "longitude": -76.811700,
      "latitude": 18.036300,
      "openingHour": 10,
      "closingHour": 22,
      "rating": 4
    }
  ]
}

const fetchVendors = (): Promise<JsonResponse> => {
  return new Promise((resolve) => {
    resolve({
      status: 200,
      json: () => Promise.resolve(vendorResponse)
    })
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
  openingHour: number;
  closingHour: number;
  rating: number;
};


export {
  fetchVendors,
};

export type {VendorJson}