import {NavigationContainer} from "@react-navigation/native";
import {render, screen, userEvent} from "@testing-library/react-native";
import MainNavigator from "@/components/screens/MainNavigator";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Create a wrapper that provides navigation context
const TestNavigationProvider = ({children}) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  )
};

describe('MainNavigator', () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('renders HomeScreenDemo screen by default', async () => {

    // When: The navigator renders
    render(<MainNavigator/>, {wrapper: TestNavigationProvider});

    // Then: Expect the HomeScreenDemo screen to be visible (make sure HomeScreenDemo renders identifiable text)
    const homeScreenText = await screen.findByTestId('vendor-map-title');
    expect(homeScreenText).toHaveTextContent("Map");

  });

  test('navigate to vendor screen', async () => {

    const user = userEvent.setup({delay: 1});

    // Given: The navigator renders
    render(<MainNavigator/>, {wrapper: TestNavigationProvider});

    // When: The Vendor tab is clicked
    const vendorTabButtons = await screen.findAllByTestId("vendor-tab-button")
    await user.press(vendorTabButtons[0]) // Ionicons

    // Then: Expect the HomeScreenDemo screen to be visible (make sure HomeScreenDemo renders identifiable text)
    const vendorsScreenText = await screen.findByTestId('vendor-details-vendor-name')
    expect(vendorsScreenText).toBeOnTheScreen()

  });

})