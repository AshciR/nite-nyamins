import React from 'react';
import {fireEvent, render, screen, userEvent, waitFor} from '@testing-library/react-native';
import VendorsMapDrawer from './VendorsMapDrawer';
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {getTestVendor} from "@/components/features/vendors/testUtils";


describe('<VendorsMapDrawer />', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const vendor = getTestVendor()

  test('renders vendor details when vendor is provided', () => {
    // Given: a vendor object and a mock onClose callback
    const mockOnClose = jest.fn();

    // When: The VendorsMapDrawer is rendered with the vendor prop
    render(
      <VendorsMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
      />,
      {wrapper: GluestackUIProvider}
    );

    // Then: The vendor details are displayed correctly
    expect(screen.getByText(vendor.name)).toBeOnTheScreen();
    expect(screen.getByText(`Opening Hours: 8:00PM - 12:00AM`)).toBeOnTheScreen();
    expect(screen.getByText(`Ratings: 🤤️🤤️🤤️🤤️`)).toBeOnTheScreen();
  });

  test('renders fallback message when no vendor is provided', () => {
    // Given: no vendor (null) and a mock onClose callback
    const mockOnClose = jest.fn();

    // When: The VendorsMapDrawer is rendered without a vendor
    render(
      <VendorsMapDrawer
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
      <VendorsMapDrawer
        isOpen={true}
        onClose={mockOnClose}
        vendor={vendor}
      />,
      {wrapper: GluestackUIProvider}
    );

    // When: The VendorsMapDrawer is rendered and the close button is clicked
    const closeButton = await screen.findByTestId('drawer-close-button');
    fireEvent.press(closeButton);

    // Then: The onClose callback should be called with false
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledWith(false);
    });
  });
});
