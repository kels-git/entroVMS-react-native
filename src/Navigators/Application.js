import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  StartupContainer,
  IndexRegisterContainer,
  IndexLoginContainer,
  IndexHomeContainer,
  IndexRegisterCompanyUserContainer,
  IndexUserProfileContainer,
  IndexEditUserContainer,
  IndexTutorialSlideContainer,
  IndexVirtualAccessContainer,
  IndexVisitorContainer,
  IndexCommunityContainer,
  IndexSettingContainer,
  IndexBusinessCardContainer,
  IndexAddBusinessCardContainer,
  IndexAnnouncmentContainer,
  IndexAddVisitorContainer,
  IndexAddVisitDateTypeContainer,
  IndexUsersFaqContainer,
  IndexExampleContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import TabNavigation from './TabNavigation'
import IndexEditBusinessCardContainer from '@/Containers/EditBusinessCard/Index'
import { useSelector } from 'react-redux'
import IndexEditVisitorContainer from '@/Containers/EditVisitor/Index'
import TabBottomNavigation from './TabBottonNavigation'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const isLogged = useSelector(user => user.user.isLoggedIn)
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer
        theme={{ colors: { background: '#000' } }}
        ref={navigationRef}
      >
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator
          initialRouteName="Startup"
          screenOptions={{
            headerShown: false,
          }}
          //headerMode={'none'}
          
        >
          <Stack.Screen
            name="Startup"
            component={StartupContainer}
            options={{ headerShown: false, animationEnabled: false }}
          />
          <Stack.Screen
            name="Login"
            component={IndexLoginContainer}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={IndexRegisterContainer}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="RegisterCompanyUser"
            component={IndexRegisterCompanyUserContainer}
            options={{
              animationEnabled: false,
            }}
          />
          {isLogged && (
            <Stack.Group>
              <Stack.Screen
                name="MainNav"
                component={TabBottomNavigation}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="MainHome"
                component={IndexHomeContainer}
                options={{
                  animationEnabled: false,
                  cardStyle: { opacity: 1 },
                }}
              />
              <Stack.Screen
                name="UserProfile"
                component={IndexUserProfileContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="EditUserProfile"
                component={IndexEditUserContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="BusinessCard"
                component={IndexBusinessCardContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="AddBusinessCard"
                component={IndexAddBusinessCardContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="EditBusinessCard"
                component={IndexEditBusinessCardContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="TutorialSlide"
                component={IndexTutorialSlideContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="VirtualAccessCard"
                component={IndexVirtualAccessContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="VistorsRecord"
                component={IndexVisitorContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="CommunityContact"
                component={IndexCommunityContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="Settings"
                component={IndexSettingContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="Announcementdetails"
                component={IndexAnnouncmentContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="AddVistorInfo"
                component={IndexAddVisitorContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="EditVistorInfo"
                component={IndexEditVisitorContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="VisitDateType"
                component={IndexAddVisitDateTypeContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="FaqAnswer"
                component={IndexUsersFaqContainer}
                options={{
                  animationEnabled: false,
                }}
              />
              <Stack.Screen
                name="ExampleTest"
                component={IndexExampleContainer}
                options={{
                  animationEnabled: false,
                }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
