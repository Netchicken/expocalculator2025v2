import CalcMain from "./calcMain"; //import the main calculator component
import DisplayDB from "./displayDB"; // import the database display component
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ContextProvider } from "./Operations/Context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Calculator" // Set the initial route to Calculator
          backBehavior="history" // This will keep the history of the navigation stack
          screenOptions={{
            headerShown: false, // Hide the header for all screens
            tabBarActiveBackgroundColor: "#e3f2fd", // Set the active tab background color
            tabBarInactiveBackgroundColor: "#e3f2fd", // Set the background color for inactive tabs
            tabBarActiveTintColor: "#1976d2", // Set the active tab text color
            tabBarInactiveTintColor: "#888", // Set the inactive tab text color
            tabBarStyle: { backgroundColor: "#e3f2fd" }, // Set the tab bar style
          }}
        >
          <Tab.Screen
            name="Calculator"
            component={CalcMain}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ focused, size }) => (
                <Icon name="calculator" color={focused ? "#1976d2" : "#888"} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Database"
            component={DisplayDB}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ focused, size }) => (
                <Icon name="database" color={focused ? "#1976d2" : "#888"} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
