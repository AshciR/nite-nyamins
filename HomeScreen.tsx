import {FlatList, ListRenderItem, Pressable, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {Card} from "@/components/ui/card";
import {Text} from "@/components/ui/text";
import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Vendor} from "@/components/features/vendors/models";

const HomeScreen = () => {

  const [titleToggle, setTitleToggle] = useState(true)

  const handleTitleToggle = () => {
    setTitleToggle(!titleToggle)
  }

  const vendors: Vendor[] = [
    {id: '1', name: 'Vendor 1'},
    {id: '2', name: 'Vendor 2'},
    {id: '3', name: 'Vendor 3'},
    {id: '4', name: 'Vendor 4'},
    {id: '5', name: 'Vendor 5'},
  ];

  return (
    <Box
      className="bg-background-info"
      style={{flex: 1, display: "flex", justifyContent: "flex-start"}}
    >
      <VStack style={{flex:1}}>

        <Box>
          <Heading>{titleToggle ? "Street Vendor Tracker" : "Nite Nyammins"}</Heading>
        </Box>

        <Box style={{flex: 1}}>
          <Card style={{flex: 1}} className="rounded-lg max-w-[300px]" size="lg" variant="outline">
            <Text>Map will go here</Text>
          </Card>
        </Box>

        <Box className={"mb-10"} style={{flex: 2}}>
          <Heading>Nearby Vendors</Heading>
          <FlatList<Vendor>
            data={vendors}
            renderItem={renderVendorItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No vendors found nearby</Text>
            )}
          />
        </Box>

        <Box style={{flex: 1, alignItems: "center", justifyContent: "center"}} className="bg-background-error">
          <Button size="md" variant="solid" action="primary">
            <ButtonText>Hello World</ButtonText>
          </Button>
        </Box>

        <Box style={{flex: 2, alignItems: "center", justifyContent: "center"}}>
          <Heading>Change Home Screen Title</Heading>
          <Pressable
            onPress={handleTitleToggle}
            aria-label="change-home-screen-title-toggle"
          >
            <Switch
              size="md"
              value={titleToggle}
              onValueChange={handleTitleToggle}
              testID="change-home-screen-title-switch"
            />
          </Pressable>
        </Box>

      </VStack>
    </Box>
  )

}

type VendorListItemProps = {
  vendor: Vendor;
};

const VendorListItem: React.FC<VendorListItemProps> = ({vendor}) => {
  return (
    <Card>
      <Text>{vendor.name} placeholder</Text>
    </Card>
  );
};

const renderVendorItem: ListRenderItem<Vendor> = ({item}) => <VendorListItem vendor={item}/>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    width: '90%',
  },
  header: {
    padding: 16,
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    flex: 1,
    minHeight: 200,
    backgroundColor: '#e5e7eb',
    margin: 8,
    borderRadius: 8,
  },
  placeholderText: {
    padding: 16,
    color: '#4b5563',
  },
  listContainer: {
    flex: 1,
    minHeight: 200,
    backgroundColor: '#ffffff',
    margin: 8,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  separator: {
    height: 8,
  },
  emptyText: {
    padding: 16,
    textAlign: 'center',
    color: '#6b7280',
  },
});

export default HomeScreen;