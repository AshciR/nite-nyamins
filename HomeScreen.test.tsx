import { render, screen } from '@testing-library/react-native';

import HomeScreen from "./HomeScreen";

describe('<HomeScreen />', () => {
  test('Title renders correctly on HomeScreen', () => {
    // When: The home screen renders
    render(<HomeScreen />);

    // Then: Header should be present
    const header = screen.getByText('Street Vendor Tracker');
    expect(header).toBeOnTheScreen()
  });

  test('Vendors are on the HomeScreen', () => {
    // When: The home screen renders
    render(<HomeScreen />);

    // Then: Header should be present
    const vendors = screen.getAllByText(/Vendor \d+/);
    expect(vendors.length).toBe(5)
  });

});
