import { useState } from "react";
import useAuthStore from "../store/authenticationStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Login from "../screens/login";
import OtpVarification from "../screens/OTPVerification";
import signup from "../screens/signup";
import Home from "../screens/home";
import BottomSheet from "../screens/bottomSheet";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors } from "../constants/Colors";
import Community from "../screens/Community";
import AddPost from "../screens/AddPost";
import Booking from "../screens/Booking";
import Profile from "../screens/Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EventDetail from "../screens/eventDetail";
import CommunityDetails from "../screens/communityDetails";
import SelectSlots from "../screens/selectSlots";
import SlotForm from "../screens/slotForm";
import BecomeHost from "../components/Profile/becomeHost";
import AddEvent from "../screens/AddEvent";
import ReportIssue from '../screens/ReportIssue';
import ReportOtherReason from '../screens/reportOtherForm';
import ContestDetails from "../screens/contestDetails";
import AddContest from "../screens/AddContest";




export type RootStackParamList = {
  login: boolean;
  otpVerification: { mobileNumber: string };
  signup: boolean;
  selectSlots: boolean;
  slotForm: boolean;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={EventDetail}
        name="eventDetail"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SelectSlots}
        name="selectSlots"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SlotForm}
        name="slotForm"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AddEvent}
        name="AddEvent"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ContestDetails}
        name="contestDetail"
        options={{ headerShown: false }}
      />
      {/* ADD POST SCREEN */}
      <Stack.Screen
        component={AddPost}
        name="AddPost"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Community}
        name="Community"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={CommunityDetails}
        name="communityDetails"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ReportIssue}
        name="ReportIssue"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ReportOtherReason}
        name="ReportOtherReason"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Profile}
        name="profile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={BecomeHost}
        name="BecomeHost"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Empty component for the Add button
const EmptyAddScreen = () => <View />;

// Separate component to handle tab bar visibility
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [navigationRef, setNavigationRef] = useState<any>(null);

  const hideTabBarScreens = [
    "eventDetail",
    "communityDetails",
    "AddEvent",
    "slotForm",
    "selectSlots",
    "ReportIssue",
    "AddPost", // Add this to hide tab bar on AddPost screen
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={({ navigation }) => {
          const navigationState = navigation.getState();

          const getNestedRouteName = (state: any): string | null => {
            if (!state) return null;
            const route = state.routes[state.index];
            if (route.state) {
              return getNestedRouteName(route.state);
            }
            return route.name;
          };

          return {
            tabBarShowLabel: false,
            tabBarInactiveTintColor: "#656565",
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
              paddingTop: 16,
              paddingHorizontal: 5,
              elevation: 1,
              borderWidth: 0,
              height: 70 + insets.bottom,
              display: hideTabBarScreens.includes(
                getNestedRouteName(navigationState) || ""
              )
                ? "none"
                : "flex",
            },
          };
        }}
      >
        {/* Home */}
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                size={24}
                color={focused ? colors.primary : "#656565"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="CommunityStack"
          component={CommunityStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="compass"
                size={24}
                color={focused ? colors.primary : "#656565"}
              />
            ),
          }}
        />

        {/* MODIFIED: Add button now opens BottomSheet */}
        <Tab.Screen
          name="AddPostEventPopup"
          component={EmptyAddScreen}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default navigation
              e.preventDefault();
              // Store navigation reference
              setNavigationRef(navigation);
              // Open bottom sheet instead
              setIsBottomSheetVisible(true);
            },
          })}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="plus-circle"
                size={24}
               color={focused ? colors.primary : "#656565"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Booking"
          component={Booking}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="local-activity"
                size={24}
                color={focused ? colors.primary : "#656565"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={24}
                color={focused ? colors.primary : "#656565"}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* ADDED: BottomSheet Modal - Renders on top of tabs */}
      <BottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onAddContest={()=>{
            setIsBottomSheetVisible(false);
          // Navigate to AddEvent screen in HomeStack
          setTimeout(() => {
            if (navigationRef) {
              navigationRef.navigate('HomeStack', {
                screen: 'AddContest',
              });
            }
          }, 300); 
        }}
        onAddPost={() => {
          setIsBottomSheetVisible(false);
          // Navigate to AddPost screen in HomeStack
          setTimeout(() => {
            if (navigationRef) {
              navigationRef.navigate('HomeStack', {
                screen: 'AddPost',
              });
            }
          }, 300);
          
        }}
        onAddEvent={() => {
          setIsBottomSheetVisible(false);
          // Navigate to AddEvent screen in HomeStack
          setTimeout(() => {
            if (navigationRef) {
              navigationRef.navigate('HomeStack', {
                screen: 'AddEvent',
              });
            }
          }, 300);
        }}
      />
    </>
  );
};

const Routes = () => {
  const isLoggedIn = useAuthStore((state) => state.loginStatus);

  return (
    <>
      {isLoggedIn ? (
        <MainTabs />
      ) : (
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
      )}
    </>
  );
};

export default Routes;