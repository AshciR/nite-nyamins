import React from 'react';
import {fireEvent, render, screen, userEvent, waitFor} from '@testing-library/react-native';
import VendorsMapDrawer from './VendorsMapDrawer';
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {getTestVendor} from "@/components/features/vendors/testUtils";
import {NavigationContainer} from "@react-navigation/native";
import {RoutesNames} from "@/components/screens/routes";


const TestNavigationProvider = ({children}) => {
  return (
    <GluestackUIProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </GluestackUIProvider>
  )
};

describe('<VendorsMapDrawer />', () => {

  const mockOnClose = jest.fn();
  const mockNavigation = {navigate: jest.fn()};

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const vendor = getTestVendor()

  test('renders vendor details when vendor is provided', () => {
    // Given: a vendor object and a mock onClose callback

    // When: The VendorsMapDrawer is rendered with the vendor prop
    render(
      <VendorsMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
        navigation={mockNavigation}
      />,
      {wrapper: TestNavigationProvider}
    );

    // Then: The vendor details are displayed correctly
    expect(screen.getByText(vendor.name)).toBeOnTheScreen();
    expect(screen.getByText(`Opening Hours:`)).toBeOnTheScreen();
    expect(screen.getByText(`8:00PM - 12:00AM`)).toBeOnTheScreen();
  });

  test('renders fallback message when no vendor is provided', () => {
    // Given: no vendor (null) and a mock onClose callback

    // When: The VendorsMapDrawer is rendered without a vendor
    render(
      <VendorsMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={undefined}
        navigation={mockNavigation}
      />,
      {wrapper: TestNavigationProvider}
    );

    // Then: The fallback header is displayed
    expect(screen.getByText('Whoops, no Vendor was Selected')).toBeOnTheScreen();
  });

  test('calls onClose callback when the close button is clicked', async () => {
    // Given: a vendor object and a mock onClose callback
    const mockOnClose = jest.fn();

    render(
      <VendorsMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
        navigation={mockNavigation}
      />,
      {wrapper: TestNavigationProvider}
    );

    // When: The VendorsMapDrawer is rendered and the close button is clicked
    const closeButton = await screen.findByTestId('drawer-close-button');
    fireEvent.press(closeButton);

    // Then: The onClose callback should be called with false
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledWith(false);
    });
  });

  test('details button navigates to the details page', async () => {

    // Given: a vendor object and a mock onClose callback
    const mockOnClose = jest.fn();
    const mockNavigation = {navigate: jest.fn()};

    render(
      <VendorsMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
        navigation={mockNavigation}
      />,
      {wrapper: TestNavigationProvider}
    );

    // When: The details button is clicked
    const detailsButton = await screen.findByTestId('vendor-map-drawer-details-button');
    fireEvent.press(detailsButton);

    // Then: The onClose callback should be called with false
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledWith(false);
    });

    // And: The navigation should navigate to the VENDORS route
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith(RoutesNames.VENDOR);
    });
  });

});
