import React from "react";
import {FlatList, StyleSheet} from "react-native";
import {VendorWithMenu} from "@/components/features/vendors/models";
import {VStack} from "@/components/ui/vstack";
import {isVendorOpen} from "@/components/features/vendors/utils";
import {VendorNameAndOpeningHours} from "@/components/features/vendors/details/VendorNameAndOpeningHours";
import {Separator} from "@/components/features/vendors/details/Separator";
import {MealCard} from "@/components/features/vendors/details/MealCard";
import {Box} from "@/components/ui/box";

type VendorDetailsProps = {
  vendorWithMenu?: VendorWithMenu
  currentDate: Date
}

const VendorDetails: React.FC<VendorDetailsProps> = (
  {
    vendorWithMenu,
    currentDate
  }
) => {

  const currentHour = currentDate.getHours()

  const vendor = vendorWithMenu?.vendor
  const menu = vendorWithMenu?.menu ?? []
  const isOpen = isVendorOpen(currentHour, vendor, currentDate)

  return (
    <VStack style={styles.container} space="lg">

      <VendorNameAndOpeningHours
        currentVendor={vendor}
        isOpen={isOpen}
      />

      <VStack style={styles.separatorContainer}>
        <Separator/>
      </VStack>

      <VStack style={styles.menuContainer} space={"sm"}>
        <FlatList
          data={menu}
          renderItem={({item}) => <MealCard meal={item}/>}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          ItemSeparatorComponent={() => <Box style={{height: "0.5%"}}/>}
          contentContainerStyle={{paddingBottom: "15%"}}
          ListFooterComponent={() => <Box style={{height: 30}}/>}
        />
      </VStack>

    </VStack>
  );
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
  separatorContainer: {
    width: "90%"
  },
  menuContainer: {
    flex: 1,
    width: "90%",
    backgroundColor: '#f2f2f2',
    borderColor: '#000000',
    borderStyle: 'dotted',
    borderWidth: 1,
  },
});

export {VendorDetails};