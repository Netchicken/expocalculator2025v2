import CalcMain from "./calcMain";
import DisplayDB from "./displayDB"; // Use default import
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalcContextProvider } from "./Operations/calcContext";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <CalcContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Calculator"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#1976d2",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: { backgroundColor: "#e3f2fd" },
          }}
        >
          <Tab.Screen name="Calculator" component={CalcMain} options={{ tabBarLabel: "Home" }} />
          <Tab.Screen name="Database" component={DisplayDB} options={{ tabBarLabel: "Database" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </CalcContextProvider>
  );
};

export default App;
