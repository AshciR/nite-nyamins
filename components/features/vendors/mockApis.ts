type JsonResponse<T> = {
  status: number;
  json: () => Promise<T>;
}

/**
 * Simulates a backend call that gets the vendors for the map.
 */
const fetchVendorsEndpoint = (): Promise<JsonResponse<VendorsListJson>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        json: () => Promise.resolve(vendorsResponse)
      })
    }, 500)
  })
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

/**
 * This object represents a response for vendors endpoint.
 * The data is used to display the vendors on the map.
 */
const vendorsResponse: VendorsListJson = {
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

/**
 * Simulates a backend call that gets a vendor with its meal.
 */
const fetchVendorsWithMealEndpoint = (vendorId: string): Promise<JsonResponse<VendorMenuJson>> => {

  const vendorWithMeal = getVendorWithMenu(vendorId, vendorsMenuResponse)

  if (!vendorWithMeal){
    return Promise.reject({
      status: 404,
      json: () => Promise.resolve({ error: `No vendor was found with id ${vendorId}` })
    })
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        json: () => Promise.resolve(vendorWithMeal)
      })
    }, 500)
  })
}

type VendorMenuJson = {
  vendor: VendorJson;
  meals: MealJson[];
};

type MealJson = {
  id: string;
  name: string;
  price: number;
  currency: string;
  mealType: string;
};

/**
 * Finds a vendor by ID and returns the vendor with its meals
 * @param vendorId - The ID of the vendor to find
 * @param data - The complete data object containing all vendors
 * @returns The vendor object with meals or null if not found
 */
function getVendorWithMenu(vendorId: string, data: VendorsWithMealsJson): VendorMenuJson | null {
  // Check if data and vendors exist
  if (!data || !data.vendors || !Array.isArray(data.vendors)) {
    return null;
  }

  // Find the vendor with the matching ID
  const vendor = data.vendors.find(vendor => vendor.id === vendorId);

  if (!vendor) {
    return null
  }

  // Extract meals from the vendor
  const meals: MealJson[] = [...vendor.meals];
  // Create a vendor object without the meals property
  const { meals: _, ...vendorWithoutMeals }: VendorWithMealsJson = vendor;

  return {
    vendor: vendorWithoutMeals,
    meals: meals
  };
}

/**
 * Note: This object does not represent a response I expect
 * from the backend. I created it as a helper object
 * for the fetchVendorsWithMealEndpoint function
 */
const vendorsMenuResponse: VendorsWithMealsJson = {
  "vendors": [
    {
      "id": "1",
      "name": "Irie Pots",
      "longitude": -76.812076,
      "latitude": 18.03577,
      "openingTime": "10:00:00",
      "closingTime": "22:00:00",
      "rating": 3,
      "meals": [
        {
          "id": "101",
          "name": "Jerk Chicken",
          "price": 1200,
          "currency": "JMD",
          "mealType": "chicken"
        },
        {
          "id": "102",
          "name": "Pineapple Drink",
          "price": 500,
          "currency": "JMD",
          "mealType": "drink"
        },
        {
          "id": "103",
          "name": "Ackee and Saltfish",
          "price": 1100,
          "currency": "JMD",
          "mealType": "fish"
        },
        {
          "id": "104",
          "name": "Festival Bread",
          "price": 400,
          "currency": "JMD",
          "mealType": "side"
        },
        {
          "id": "105",
          "name": "Sweet Potato Pudding",
          "price": 600,
          "currency": "JMD",
          "mealType": "dessert"
        },
        {
          "id": "106",
          "name": "Jerk Pork",
          "price": 400,
          "currency": "JMD",
          "mealType": "pork"
        },
        {
          "id": "108",
          "name": "Steam Fish",
          "price": 600,
          "currency": "JMD",
          "mealType": "fish"
        },
        {
          "id": "109",
          "name": "Jerk Pork",
          "price": 400,
          "currency": "JMD",
          "mealType": "pork"
        },
        {
          "id": "110",
          "name": "Steam Fish",
          "price": 600,
          "currency": "JMD",
          "mealType": "fish"
        },
        {
          "id": "111",
          "name": "Jerk Pork",
          "price": 400,
          "currency": "JMD",
          "mealType": "pork"
        },
      ]
    },
    {
      "id": "2",
      "name": "Jerk Pork Primer",
      "longitude": -76.812215,
      "latitude": 18.036226,
      "openingTime": "09:00:00",
      "closingTime": "21:00:00",
      "rating": 4,
      "meals": [
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
          "mealType": "fish"
        },
      ]
    },
    {
      "id": "3",
      "name": "Spice Haven",
      "longitude": -76.81195,
      "latitude": 18.03605,
      "openingTime": "11:00:00",
      "closingTime": "23:00:00",
      "rating": 5,
      "meals": [
        {
          "id": "301",
          "name": "Curry Fish",
          "price": 1400,
          "currency": "JMD",
          "mealType": "fish"
        },
        {
          "id": "302",
          "name": "Vegetarian Wrap",
          "price": 900,
          "currency": "JMD",
          "mealType": "vegetarian"
        },
        {
          "id": "303",
          "name": "Callaloo Greens",
          "price": 700,
          "currency": "JMD",
          "mealType": "vegetarian"
        },
        {
          "id": "304",
          "name": "Oxtail Stew",
          "price": 1600,
          "currency": "JMD",
          "mealType": "beef"
        },
        {
          "id": "305",
          "name": "Sorrel Drink",
          "price": 450,
          "currency": "JMD",
          "mealType": "drink"
        }
      ]
    },
    {
      "id": "4",
      "name": "Reggae Bites",
      "longitude": -76.8125,
      "latitude": 18.0359,
      "openingTime": "08:00:00",
      "closingTime": "20:00:00",
      "rating": 1,
      "meals": [
        {
          "id": "401",
          "name": "Reggae Pork Bun",
          "price": 1000,
          "currency": "JMD",
          "mealType": "pork"
        },
        {
          "id": "402",
          "name": "Herbal Drink",
          "price": 300,
          "currency": "JMD",
          "mealType": "drink"
        },
        {
          "id": "403",
          "name": "Beef Patty",
          "price": 650,
          "currency": "JMD",
          "mealType": "beef"
        },
        {
          "id": "404",
          "name": "Fried Plantains",
          "price": 400,
          "currency": "JMD",
          "mealType": "side"
        },
        {
          "id": "405",
          "name": "Gizzada Pastry",
          "price": 550,
          "currency": "JMD",
          "mealType": "dessert"
        }
      ]
    },
    {
      "id": "5",
      "name": "Yaad Vibes",
      "longitude": -76.8128,
      "latitude": 18.0361,
      "openingTime": "12:00:00",
      "closingTime": "00:00:00",
      "rating": 3,
      "meals": [
        {
          "id": "501",
          "name": "Vibe Chicken Salad",
          "price": 1100,
          "currency": "JMD",
          "mealType": "chicken"
        },
        {
          "id": "502",
          "name": "Island Soup",
          "price": 700,
          "currency": "JMD",
          "mealType": "soup"
        },
        {
          "id": "503",
          "name": "Brown Stew Chicken",
          "price": 1250,
          "currency": "JMD",
          "mealType": "chicken"
        },
        {
          "id": "504",
          "name": "Rice and Peas",
          "price": 500,
          "currency": "JMD",
          "mealType": "side"
        },
        {
          "id": "505",
          "name": "Rum Cake",
          "price": 800,
          "currency": "JMD",
          "mealType": "dessert"
        }
      ]
    },
    {
      "id": "6",
      "name": "Tropical Twist",
      "longitude": -76.8117,
      "latitude": 18.0363,
      "openingTime": "10:00:00",
      "closingTime": "22:00:00",
      "rating": 4,
      "meals": [
        {
          "id": "601",
          "name": "Twist Fish Tacos",
          "price": 1300,
          "currency": "JMD",
          "mealType": "fish"
        },
        {
          "id": "602",
          "name": "Mango Drink",
          "price": 600,
          "currency": "JMD",
          "mealType": "drink"
        },
        {
          "id": "603",
          "name": "Escovitch Fish",
          "price": 1450,
          "currency": "JMD",
          "mealType": "fish"
        },
        {
          "id": "604",
          "name": "Coconut Shrimp",
          "price": 1200,
          "currency": "JMD",
          "mealType": "seafood"
        },
        {
          "id": "605",
          "name": "Pineapple Upside-down Cake",
          "price": 750,
          "currency": "JMD",
          "mealType": "dessert"
        }
      ]
    }
  ]
}

type VendorWithMealsJson = {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  openingTime: string;
  closingTime: string;
  rating: number;
  meals: MealJson[];
}

type VendorsWithMealsJson = {
  vendors: VendorWithMealsJson[];
}

export type {VendorJson}
export {fetchVendorsEndpoint, fetchVendorsWithMealEndpoint};