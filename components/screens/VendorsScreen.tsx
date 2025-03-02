import React from 'react';
import {StyleSheet} from 'react-native';
import {Box} from "@/components/ui/box";
import {Heading} from "@/components/ui/heading";

const VendorsScreen: React.FC = () => {
  return (
    <Box style={styles.container}>
      <Heading style={styles.text}>Vendors Screen</Heading>
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

export default VendorsScreen;
