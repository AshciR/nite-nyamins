import React from 'react';
import {StyleSheet} from 'react-native';
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {useStore} from "zustand/react";
import {useVendorStore} from "@/components/features/vendors/vendorStore";

const VendorScreen: React.FC = () => {

  const currentVendor = useStore(useVendorStore, (state) => state.currentVendor)

  return (
    <Box style={styles.container}>
      <Heading style={styles.text}>Vendors Screen</Heading>
      <Text>{`Vendor Name: ${currentVendor?.name}`}</Text>
      <Text>{`Rating: ${currentVendor?.rating}`}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default VendorScreen;
