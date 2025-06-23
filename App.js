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
            headerShown: true,
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

//   <Tab.Navigator initialRouteName="Calculator">
//     <Tab.Screen name="Calculator" component={CalcMain} />
//     <Tab.Screen name="Database" component={DisplayDB} />
//   </Tab.Navigator>
// </NavigationContainer>
//
// function CalcMainScreen({ navigation }) {
//   console.log("CalcMainScreen opened");
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text style={{ fontSize: 24 }}>Calculator Screen</Text>
//       <Button title="Go to Calculator" onPress={() => navigation.navigate("Calculator")} />
//     </View>
//   );
// }

// function DisplayDBScreen({ navigation }) {
//   console.log("displayDBScreen opened");
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text style={{ fontSize: 24 }}>Database Screen</Text>
//       <Button title="Go to Settings Tab" onPress={() => navigation.navigate("Database")} />
//     </View>
//   );
// }

//const Stack = createNativeStackNavigator();

// function HomeTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="HomeTab" component={HomeScreen} />
//       <Tab.Screen name="DatabaseTab" component={DetailsScreen} />
//     </Tab.Navigator>
//   );
// }

// function RootStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#fff",
//         },
//         headerTintColor: "#f4511e",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={HomeTabs}
//         options={{
//           headerRight: () => (
//             <Button onPress={() => alert("This is a button!")}>Info</Button>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         initialParams={{ itemId: 42 }} // Initial params for DetailsScreen
//         options={{ title: "My Details" }} // Custom title for the Details screen
//       />
//     </Stack.Navigator>
//   );
// }

//function name is where it navigates to
// function HomeScreen() {
//   const navigation = useNavigation();
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Calc Screen</Text>
//       <Button
//         onPress={() => {
//           /* 1. Navigate to the Details route with params */
//           navigation.navigate("Details", {
//             itemId: "86",
//             result: "6 + 8 = 345",
//           });
//         }}
//       >
//         Go to Details
//       </Button>
//     </View>
//   );
// }

// HomeScreen navigates to Settings tab and passes a parameter
// function HomeScreen() {
//   const { setUser } = React.useContext(CalcContext);
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home!</Text>
//       <Button
//         title="Go to Settings with Param"
//         onPress={() => setUser("Alice")}
//       />
//     </View>
//   );
// }

// SettingsScreen receives and displays the parameter
// function DetailsScreen({ route }) {
//   const { user } = React.useContext(UserContext);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Settings!</Text>
//       <Text>User: {user ?? "No user sent"}</Text>
//     </View>
//   );
// }

//pass in route parameters to the details screen
// function DetailsScreen({ route }) {
//   const navigation = useNavigation();
//   /* 2. Get the param */
//   // const { itemId, otherParam } = route.params;
//   const itemId = route?.params?.itemId;
//   const result = route?.params?.result;

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Text>itemId: {JSON.stringify(itemId)}</Text>
//       <Text>Result: {JSON.stringify(result)}result</Text>
//       {/* <Button
//         onPress={() =>
//           navigation.push("Details", {
//             itemId: Math.floor(Math.random() * 100),
//           })
//         }
//       >
//         sending data back
//       </Button> */}

//       <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>
//       {/* <Button onPress={() => navigation.goBack()}>Go back</Button>
//       <Button onPress={() => navigation.popTo("Home")}>Go to Home</Button>
//       <Button onPress={() => navigation.popToTop()}>
//         Go to the first screen in the stack
//       </Button> */}
//     </View>
//   );
// }
