import {Routes} from "@/components/screens/routes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import Home from "@/components/screens/Home";
import VendorsScreen from "@/components/screens/VendorsScreen";

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
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Vendors" component={VendorsScreen}/>
    </Tab.Navigator>
  );
};

export default MainNavigator;