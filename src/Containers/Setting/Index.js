import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal
} from 'react-native'
import { useTheme } from '@/Hooks'
import LottieView from 'lottie-react-native'
import { logoutUser } from '@/Features/users'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from '@/Theme/Variables'
import Icon from 'react-native-dynamic-vector-icons'


const IndexSettingContainer = ({navigation}) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const user = useSelector(user => user.user.profile)
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const signOutApp = () => {
    navigateAndSimpleReset("MainNav");
    dispatch(logoutUser())
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
          <Modal
            transparent
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: '#00000099',
              }}
            >
              <View
                style={{
                  width: 300,
                  height: 300,
                  backgroundColor: '#fff',
                  borderColor: '#184461',
                  borderWidth: 1,
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    height: 50,
                    marginBottom: 10,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderColor: '#184461',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    Are you sure you want to logout?
                  </Text>
                </View>

                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                      onPress={signOutApp}
                      style={{
                        borderWidth: 1,
                        borderColor: '#184461',
                        padding: 10,
                        borderRadius: 15,
                        width: 125,
                        backgroundColor: '#F0F0F0',
                      }}
                    >
                      <Text style={{ color: '#000000', textAlign: 'center' }}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                      onPress={()=> setShowModal(false)}
                      style={{
                        borderWidth: 1,
                        borderColor: '#184461',
                        padding: 10,
                        borderRadius: 15,
                        width: 125,
                        backgroundColor: '#F0F0F0',
                      }}
                    >
                      <Text style={{ color: '#000000', textAlign: 'center' }}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                onPress={()=> setShowModal(false)}>
                  <View
                    style={{
                      width: 299,
                      height: 50,
                      borderColor: '#184461',
                      backgroundColor: 'lightblue',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, color: '#000', fontWeight: '900' }}
                    >
                      Close
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              </View>
            </View>
      </Modal>
      <View
        style={{
          height: 55,
          backgroundColor: '#184461',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.white,
            fontWeight: '700',
            marginLeft: 18,
            fontSize: 16,
            flex: 2,
          }}
        >
          Settings
        </Text>

        <Icon
            name="x"
            type="Feather"
            size={35}
            color="#fff"
            onPress={() => {
              navigation.goBack()
            }}
          />
      </View>

      <View style={{}}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View
            style={{
              width: 60,
              height: 40,
              alignSelf: 'flex-end',
              marginEnd: 10,
              marginTop: 10,
            }}
          >
            <LottieView source={require('../../Assets/Lottie/switch.json')} />
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginEnd: 12,
              fontSize: 14,
              color: '#184461',
              fontWeight: '600',
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderColor: '#184461',
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 8,
        }}
      ></View>

      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, color: '#184461', fontWeight: '700' }}>
          Technical Support
        </Text>
        <Text style={{ fontSize: 14, color: '#184461', marginTop: 20 }}>
          Contact our support at{' '}
          <Text style={{ textDecorationLine: 'underline', fontWeight: '500', color:'#184461',  }}>
            Ezxcess@support.com
          </Text>
        </Text>
      </View>

      <View
        style={{
          borderColor: '#184461',
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 20,
        }}
      ></View>
      <View style={{ marginTop: 10, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, color: '#184461', fontWeight: '700' }}>
          About this App
        </Text>
        <View style={{flexDirection:'row', marginTop:20, justifyContent:'space-between' }}>
          <Text
            style={{
              fontSize: 14,
              color: '#184461',
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}
          >
            Privacy Policy
           
          </Text>

          <Text
          style={{
            textDecorationLine: 'underline',
            fontWeight: '500',
            color: '#184461',
          }}
        >
          Terms & Conditions
        </Text>
        </View>
      </View>

      <View
        style={{
          borderColor: '#184461',
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 20,
        }}
      />

      <View style={{marginTop:30}}>
      <Image 
      source={Images.newLogoImage}   
      />

      </View>
    </ScrollView>
  )
}

export default IndexSettingContainer
