import React from 'react';
import {fireEvent, render, screen, userEvent, waitFor} from '@testing-library/react-native';
import VendorMapDrawer from './VendorMapDrawer';
import {Vendor} from "@/components/features/vendors/models";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";


describe('<VendorMapDrawer />', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const vendor: Vendor = {
    id: '1',
    name: 'Test Vendor',
    openingHour: 20,
    closingHour: 24,
    rating: 4,
  };

  test('renders vendor details when vendor is provided', () => {
    // Given: a vendor object and a mock onClose callback
    const mockOnClose = jest.fn();

    // When: The VendorMapDrawer is rendered with the vendor prop
    render(
      <VendorMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
      />,
      {wrapper: GluestackUIProvider}
    );

    // Then: The vendor details are displayed correctly
    expect(screen.getByText(vendor.name)).toBeOnTheScreen();
    expect(screen.getByText(`Opening Hours: ${vendor.openingHour} - ${vendor.closingHour}`)).toBeOnTheScreen();
    expect(screen.getByText(`Ratings: 🤤️🤤️🤤️🤤️`)).toBeOnTheScreen();
  });

  test('renders fallback message when no vendor is provided', () => {
    // Given: no vendor (null) and a mock onClose callback
    const mockOnClose = jest.fn();

    // When: The VendorMapDrawer is rendered without a vendor
    render(
      <VendorMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={undefined}
      />,
      {wrapper: GluestackUIProvider}
    );

    // Then: The fallback header is displayed
    expect(screen.getByText('Whoops, no Vendor was Selected')).toBeOnTheScreen();
  });

  test('calls onClose callback when the close button is clicked', async () => {
    // Given: a vendor object and a mock onClose callback
    const mockOnClose = jest.fn();
    const user = userEvent.setup({delay: 1});

    render(
      <VendorMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
      />,
      {wrapper: GluestackUIProvider}
    );

    // When: The VendorMapDrawer is rendered and the close button is clicked
    const closeButton = await screen.findByTestId('drawer-close-button');
    fireEvent.press(closeButton);

    // Then: The onClose callback should be called with false
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledWith(false);
    });
  });
});
