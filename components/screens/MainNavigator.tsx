import {Routes} from "@/components/screens/routes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "@/components/screens/HomeScreen";
import VendorScreen from "@/components/screens/VendorScreen";

const Tab = createBottomTabNavigator<Routes>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          const iconName: string = route.name === 'Home' ? 'map' : 'fast-food';
          return <Ionicons
            name={iconName}
            size={size}
            color={color}
            testID={`${route.name.toLowerCase()}-tab-button`}
          />;
        },
        tabBarActiveTintColor: '#FF5733',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Vendors" component={VendorScreen}/>
    </Tab.Navigator>
  );
};

export default MainNavigator;