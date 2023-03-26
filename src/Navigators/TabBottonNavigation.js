import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { useTheme } from '@/Hooks'
import {
  IndexBusinessCardContainer,
  IndexHomeContainer,
  IndexSettingContainer,
  IndexVisitorContainer,
} from '@/Containers'
import Icon from 'react-native-dynamic-vector-icons'
import * as Animatable from 'react-native-animatable'

const Tab = createBottomTabNavigator()

const TabButton = props => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = useRef(null)
  const circleRef = useRef(null)
  const textRef = useRef(null)

  const animate1 = {
    0: { scale: 0.5, translateY: 8 }, .92:{translateY:-34},
    1: { scale: 1.2, translateY: -24 },
  }
  const animate2 = {
    0: { scale: 1.2, translateY: -24 },
    1: { scale: 1, translateY: 8 },
  }

  const circle1 = {
    0: { scale: 0 },
    0.2: { scale: .2 },
    0.4: { scale: .5 },
    0.6: { scale: .3 },
    0.8: { scale: .8 },
    1: { scale: 1 },
  }
  const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1)
      circleRef.current.animate(circle1)
      textRef.current.transitionTo({scale:1})
    } else {
      viewRef.current.animate(animate2)
      circleRef.current.animate(circle2)
      textRef.current.transitionTo({scale:0})
    }
  }, [focused])

  return (
  /**different animation for bottom tap starts here */
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //   <TouchableOpacity onPress={onPress} activeOpacity={1}>
  //     <Animatable.View
  //       ref={viewRef}
  //       duration={1000}
  //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //     >
  //       <View
  //         style={{
  //           width: 40,
  //           height: 40,
  //           borderRadius: 20,
  //           borderWidth: 4,
  //           borderColor: '#fff',
  //           backgroundColor: '#fff',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Animatable.View
  //           ref={circleRef}
  //           style={{
  //             ...StyleSheet.absoluteFillObject,
  //             backgroundColor: '#184461',
  //             borderRadius: 25,
  //           }}
  //         />
  //         {focused ? (
  //             <Image
  //             source={item.activeIconImg}
  //             style={{width:23, height:23, padding:5, margin: 5}}
  //             resizeMode={'contain'}/>
  //         ):( <Icon
  //             type={item.type}
  //             name={item.typeName}
  //             color={'#184461'}
  //             size={23}
  //           />)}
         
  //       </View>

  //       <Animatable.Text style={{ fontSize: 10, color: focused ? '#184461':'#C1C1C1', fontWeight:'700' , textAlign:'center'}}>
  //         {item.label}
  //       </Animatable.Text>
  //     </Animatable.View>
  //   </TouchableOpacity>
  // </View>
 /**different animation for bottom tap ends here */

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animatable.View
          ref={viewRef}
          duration={1000}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 4,
              borderColor: '#fff',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Animatable.View
              ref={circleRef}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: '#184461',
                borderRadius: 25,
              }}
            />
            {focused ? (
                <Image
                source={item.activeIconImg}
                style={{width:23, height:23, padding:5, margin: 5}}
                resizeMode={'contain'}/>
            ):( <Icon
                type={item.type}
                name={item.typeName}
                color={'#C1C1C1'}
                size={23}
              />)}
           
          </View>

          <Animatable.Text 
          ref={textRef}
          style={{ fontSize: 10, color: focused ? '#184461':'#C1C1C1', fontWeight:'700' , textAlign:'center'}}>
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  )
}

const TabBottomNavigation = () => {
  const { Fonts, Gutters, Layout, Images } = useTheme()

  const TabArr = [
    {
      route: 'Home',
      label: 'Home',
      type: 'FontAwesome',
      typeName: 'home',
      activeIconImg: Images.homeToggle,
      inactiveIconImg: Images.homeImgBlue,
      activeIcon: 'grid',
      component: IndexHomeContainer,
    },
    {
      route: 'Visitor',
      label: 'Visitor',
      type: 'MaterialCommunityIcons',
      typeName: 'account-group',
      activeIconImg: Images.visitorImg,
      inactiveIconImg: Images.visitorImgBlue,
      activeIcon: 'grid',
      component: IndexVisitorContainer,
    },
    {
      route: 'Business',
      label: 'Business Card',
      type: 'FontAwesome',
      typeName: 'vcard-o',
      activeIconImg: Images.businessCardImg,
      inactiveIconImg: Images.businessCardImgBlue,
      activeIcon: 'grid',
      component: IndexBusinessCardContainer,
    },
    {
      route: 'Settings',
      label: 'Settings',
      type: 'FontAwesome',
      typeName: 'cog',
      activeIconImg: Images.settingToggle,
      inactiveIconImg: Images.settingsImgBlue,
      activeIcon: 'grid',
      component: IndexSettingContainer,
    },
  ]
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#ffffff',
          height: 60,
          position: 'absolute',
          bottom: 10,
          right: 10,
          left: 10,
          borderRadius: 16,
          borderColor:'#fff'
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <Icon
                    type={item.type}
                    name={item.typeName}
                    color="#184461"
                    size={27}
                  />
                ) : (
                  <Icon
                    type={item.type}
                    name={item.typeName}
                    color="#184461"
                    size={27}
                  />
                ),

              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default TabBottomNavigation
const styles = StyleSheet.create({})
