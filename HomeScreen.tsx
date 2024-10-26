import {FlatList, ListRenderItem, StyleSheet, Text, View} from "react-native";
import React from "react";

const HomeScreen = () => {

  const vendors: Vendor[] = [
    {id: '1', name: 'Vendor 1'},
    {id: '2', name: 'Vendor 2'},
    {id: '3', name: 'Vendor 3'},
    {id: '4', name: 'Vendor 4'},
    {id: '5', name: 'Vendor 5'},
  ];

  return (
    <View style={styles.container}>

      {/*Header Container*/}
      <View style={styles.header}>
        <Text style={styles.headerText}>Street Vendor Tracker</Text>
      </View>

      {/*Map and List container*/}
      <View style={styles.mainContent}>

        <View style={styles.mapContainer}>
          <Text style={styles.placeholderText}>Map will go here</Text>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Nearby Vendors</Text>
          <FlatList<Vendor>
            data={vendors}
            renderItem={renderVendorItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No vendors found nearby</Text>
            )}
          />
        </View>

      </View>
    </View>
  )

}

interface Vendor {
  id: string;
  name: string;
}

type VendorListItemProps = {
  vendor: Vendor;
};

const VendorListItem: React.FC<VendorListItemProps> = ({vendor}) => {
  return (
    <View>
      <Text>{vendor.name} placeholder</Text>
    </View>
  );
};

const renderVendorItem: ListRenderItem<Vendor> = ({item}) => <VendorListItem vendor={item}/>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    width: '90%'
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