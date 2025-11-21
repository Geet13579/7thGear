import useAuthStore from "../store/authenticationStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Login from "../screens/login";
import OtpVarification from "../screens/OTPVerification";
import signup from "../screens/signup"; 
import { Text, View } from "react-native";
import Home from "../screens/home";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/Colors";

export type RootStackParamList = {
  login: boolean;
  otpVerification: { mobileNumber: string };
  signup: boolean;
  // Add other screen params here as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


const Routes = () => {
  const isLoggedIn = useAuthStore((state) => state.loginStatus);

  return (
    <>

     {/* {isLoggedIn ? (

        <Tab.Navigator
          screenOptions={() => ({
            tabBarInactiveTintColor: "#656565",
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
              paddingTop: 11,
              height: 80,
              paddingHorizontal: 5
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 5,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    borderBottomWidth: focused ? 2 : 0,
                    borderBottomColor: focused ? colors.primary : "transparent",
                    paddingBottom: 2,
                  }}
                >
                  Home
                </Text>
              ),
              tabBarIcon: ({ focused }) => (
                <Feather
                  name="home"
                  size={24}
                  color={focused ? colors.primary : "#656565"}
                />
              ),
            }}
          />
          
          
        </Tab.Navigator>
     ) */}
    
    {/* :
    ( */}
      
        <Stack.Navigator>
          
          <Stack.Screen
            component={Login}
            name="login"
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            component={OtpVarification}
            name="otpVerification"
            options={{ headerShown: false }}
          />


           <Stack.Screen
            component={signup}
            name="signup"
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

    {/* )} */}
    </>
  );
};

export default Routes;
