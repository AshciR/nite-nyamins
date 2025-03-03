import {Vendor} from "@/components/features/vendors/models";
import {createStore} from "zustand/vanilla";

interface VendorState {
  currentVendor?: Vendor;
  isVendorDetailsDisplayed: boolean;
  setCurrentVendor: (vendor?: Vendor) => void;
  setIsVendorDetailsDisplayed: (value: boolean) => void;
}

const useVendorStore = createStore<VendorState>((set) => ({
  currentVendor: undefined,
  isVendorDetailsDisplayed: false,
  setCurrentVendor: (vendor: Vendor) => set(() => ({currentVendor: vendor})),
  setIsVendorDetailsDisplayed: (isDisplayed: boolean) => set(() => ({isVendorDetailsDisplayed: isDisplayed}))
}))

export {useVendorStore}