import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateProfileScreen from './src/screens/CreateProfileScreen';
import StudioProfileScreen from './src/screens/StudioProfileScreen';
import DatesAvailableScreen from './src/screens/DatesAvailableScreen';
import IntroScreen from './src/screens/IntroScreen';
import AdminSigninScreen from './src/AdminScreens/AdminSigninScreen';
import AdminSignupScreen from './src/AdminScreens/AdminSingupScreen';
import AdminHomeScreen from './src/AdminScreens/AdminHomeScreen';
import ManageBookingsScreen from './src/AdminScreens/ManageBookingsScreen';
import DisplayBookingScreen from './src/AdminScreens/DisplayBookingScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ProfileProvider } from './src/context/ProfileContext';
import { Provider as BookingProvider } from './src/context/BookingContext';
import { Provider as AdminProvider } from './src/context/AdminAuthContext';

import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator ({
  //Intro: IntroScreen,
  loginFlow: createStackNavigator ({
    Signin: SigninScreen,
    Signup: SignupScreen,
    CreateProfile: CreateProfileScreen,
    AdminSignin: AdminSigninScreen,
    AdminSignup: AdminSignupScreen,
    AdminMain: AdminHomeScreen,
    ManageBookings: ManageBookingsScreen,
    DisplayBooking: DisplayBookingScreen
  }),
  
  mainFlow: createBottomTabNavigator ({
    
    Home: createStackNavigator ({
      Main: HomeScreen,
      DatesAvailable: DatesAvailableScreen
    }),
    Studio: StudioProfileScreen,
    Profile: ProfileScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <BookingProvider>
      <ProfileProvider>
        <AuthProvider>
          <AdminProvider>
            <App ref={(navigator) => { setNavigator(navigator) }} /> 
          </AdminProvider>
        </AuthProvider>
      </ProfileProvider>
    </BookingProvider>
    
  );
};