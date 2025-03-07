import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import React from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import {Vendor} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {isVendorOpen} from "@/components/features/vendors/utils";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";

type VendorDetailsProps = {
  currentVendor?: Vendor
}

const VendorDetails: React.FC<VendorDetailsProps> = ({currentVendor}) => {

  const currentHour = new Date().getHours()
  const isOpen = isVendorOpen(currentHour, currentVendor)

  return (
    <VStack style={styles.container} space="lg">

      <VendorNameAndOpeningHours
        currentVendor={currentVendor}
        isOpen={isOpen}
      />

      <VStack style={styles.separatorContainer}>
        {/*Extract into component*/}
        <View style={{
          height: 1,
          backgroundColor: 'grey', // or any color you prefer
          width: '100%',
        }}/>
      </VStack>

      {/*Meal Data*/}
      <VStack style={styles.innerContainer}>
        <Heading style={styles.text}>Vendors Screen</Heading>
        <Text>{`Vendor Name: ${currentVendor?.name}`}</Text>
        <Text>{`Rating: ${currentVendor?.rating}`}</Text>
      </VStack>

      {/*See More Button*/}
      <VStack style={styles.seeMoreButtonContainer}>
        <Heading style={styles.text}>Vendors Screen</Heading>
        <Text>{`Vendor Name: ${currentVendor?.name}`}</Text>
        <Text>{`Rating: ${currentVendor?.rating}`}</Text>
      </VStack>

    </VStack>
  );
}

const commonContainerStyles: ViewStyle = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: "90%",
  borderColor: '#000000',
  borderStyle: 'dotted',
  borderWidth: 1,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderColor: '#000000',
    borderWidth: 1,
    paddingTop: "5%",
    paddingBottom: "5%",
    margin: "2%"
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "90%",
    backgroundColor: '#f2f2f2',
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  visible: {
    flex: 1,
    borderColor: 'blue',
    borderStyle: 'dotted',
    borderWidth: 1
  },
  separatorContainer: {...commonContainerStyles},
  seeMoreButtonContainer: {...commonContainerStyles},
});

export {VendorDetails};