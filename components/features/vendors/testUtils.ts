import {Vendor} from "@/components/features/vendors/models";

const getTestVendor = (): Vendor => {
  return {
    id: '1',
    name: 'Test Vendor',
    openingTime: "20:00:00",
    closingTime: "00:00:00",
    rating: 4,
  };
}

export {getTestVendor}