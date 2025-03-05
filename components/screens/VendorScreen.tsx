import React from 'react';
import {StyleSheet} from 'react-native';
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {useStore} from "zustand/react";
import {useVendorStore} from "@/components/features/vendors/vendorStore";
import {VendorDetails} from "@/components/features/vendors/details/VendorDetails";

const VendorScreen: React.FC = () => {

  const currentVendor = useStore(useVendorStore, (state) => state.currentVendor)

  return (
    <VendorDetails currentVendor={currentVendor}/>
  );
};

export default VendorScreen;
