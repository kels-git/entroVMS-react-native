import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { regexStr } from '@/Assets/Constants'
import { navigate } from '@/Navigators/utils'
import DropShadow from 'react-native-drop-shadow'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage } from 'react-native-flash-message'

import { useOrientation } from '../useOrientation'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/Features/users'
import { registerUser } from '@/api-utils'


const IndexEditUserContainer = ({ navigation, route }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const user = useSelector(user => user.user.profile)
  const [photo, setPhoto] = useState(user.ProfileLogo)
  const [firstName, setFirstName] = useState(user.FirstName)
  const [lastName, setLastName] = useState(user.LastName)
  const [emailAddress, setEmailAddress] = useState(user.Email)
  const [companyName, setCompanyName] = useState(user.CompanyName)
  const [carPlateNum, setCarPlateNum] = useState(user.VehicleNo)
  const [contactNumber, setContactNumber] = useState(user.MobileNo)
  const [loading, setLoading] = useState(false)
  const orientation = useOrientation()
  const dispatch = useDispatch();
  const accessId = useSelector(state => state.user.accessId);

  const [showDisplayCamOption, setShowDisplayCamOption] = useState(false)

  const [placeholder, setPlaceholder] = useState({
    fullName: 'FullName',
    contactNumber: 'Contact Number',
    emailAddress: 'Email Address',
    carPlateNum: 'Car Number',
  })

 const goPhotoGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setPhoto(image.data)
      setShowDisplayCamOption(false)
    })
  }

  const goPhotoCamera = () => {
    setPhoto(null)

    ImagePicker.openCamera({
      path: Platform.OS === 'android',
      width: 1000,
      height: 750,
      cropping: true,
      freeStyleCropEnabled: true,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.5,
      useFrontCamera: true,
      includeBase64: true,
    }).then(image => {
      console.log(image)
      setPhoto(image.data)
      setShowDisplayCamOption(false)
    })
  }

  const SubmitForm = async () => {
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !contactNumber ||
      !carPlateNum
    ) {
      showMessage({
        message: 'All fields are required',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    if (
      firstName !== '' ||
      lastName !== '' ||
      emailAddress !== '' ||
      contactNumber !== '' ||
      carPlateNum !== ''
    ) {
      setLoading(true)
      
      const _data = {
        Email: emailAddress,
        FirstName: firstName,
        LastName: lastName,
        CompanyName: companyName,
        VehicleNo: carPlateNum,
        MobileNo: contactNumber,
        ProfileLogo: photo,
        AccessId: accessId
      }

      const req_register = await registerUser(_data);
      const res_register = await req_register.json();
  
      if (res_register.StatusCode !== '200') {
        setLoading(false)
        showMessage({
          message: res_register.Message,
          backgroundColor: 'red',
          duration: 2000,
        })
      } else {
        setLoading(false)
        showMessage({
          message: "Account Updated",
          backgroundColor: 'green',
          duration: 2000,
        })
        dispatch(updateUser(_data));
        setLoading(false)
        navigation.goBack();
      }
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>

    <Modal
    transparent
    visible={showDisplayCamOption}
    onRequestClose={() => setShowDisplayCamOption(false)}
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
            Please select any option
          </Text>
        </View>

        <View
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={goPhotoGallery}
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
                Open Gallery
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={goPhotoCamera}
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
                Open Camera
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity
        onPress={()=> setShowDisplayCamOption(false)}>
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
              style={{ fontSize: 18, color: '#000', fontWeight: '900' }}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  </Modal>
      <View style={{ height: 55, backgroundColor: '#184461' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
        
          <Text
            style={{
              color: Colors.white,
              fontWeight: '600',
              marginLeft: 15,
              fontSize: 16,
            }}
          >
            Update Profile
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
      </View>

      <ScrollView style={{}}>
        <View style={{ paddingTop: 100, }}>
          <View style={[Layout.center, {}]}>
            <View
              style={[
                Layout.center,
                {
                  width: 139,
                  height: 139,
                  position: 'absolute',
                  borderRadius: 69.5,
                  borderColor: '#fff',
                  borderWidth: 7,
                  backgroundColor: '#C4c4c4',
                  shadowColor: ' rgba(0, 0, 0, 0.25)',
                },
              ]}
            >
              <Image
                source={photo ? { uri: `data:image/png;base64,${photo}` } : Images.profilepic}
                style={{
                  width: 124,
                  height: 124,
                  zIndex: 1,
                  borderRadius: 62,
                }}
              />
            </View>
          </View>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 1,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
          >
            <View
              style={[
                Layout.center,
                { marginLeft: 90, marginTop: 25, elevation: 5 },
              ]}
            >
              <TouchableOpacity
                onPress={() =>  setShowDisplayCamOption(true)}
                activeOpacity={0.9}
                style={[
                  Layout.center,
                  {
                    backgroundColor: '#184461',
                    width: 46,
                    height: 46,
                    borderRadius: 23,
                  },
                ]}
              >
                <Icon name="camera" type="Feather" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </DropShadow>

          <View style={[Layout.center, { marginTop: 35 }]}>
            <Text style={{ color: '#184461', fontSize: 15, fontWeight: '900' }}>
              Last Successful Login
            </Text>
            <Text style={{ color: '#184461', fontSize: 12, fontWeight: '400', marginTop:8}}>
              20 Apr 2023 03:03 am
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 42,
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              First Name
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color:'#457C9A'
              }}
              value={firstName}
              placeholder="First Name"
              onChangeText={text => setFirstName(text)}
              placeholderTextColor={'#A6A2A2'}
            />
          </View>

          <View style={{}}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginVertical: 15,
              }}
            >
              Last Name
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color:'#457C9A'
              }}
              value={lastName}
              placeholder="Last Name"
              onChangeText={text => setLastName(text)}
              placeholderTextColor={'#A6A2A2'}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Contact Number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color:'#457C9A'
              }}
              value={contactNumber}
              placeholder={placeholder.contactNumber}
              onChangeText={text => setContactNumber(text)}
              placeholderTextColor={'#A6A2A2'}
              keyboardType={'number-pad'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, contactNumber: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  contactNumber: 'Contact Number',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Vehicle Number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color:'#457C9A'
              }}
              value={carPlateNum}
              placeholder={placeholder.carPlateNum}
              onChangeText={text => setCarPlateNum(text)}
              placeholderTextColor={'#A6A2A2'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, carPlateNum: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  carPlateNum: 'Car Number',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Email Address
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color:'#457C9A'
              }}
              value={emailAddress}
              placeholder={placeholder.emailAddress}
              onChangeText={text => setEmailAddress(text)}
              placeholderTextColor={'#A6A2A2'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, emailAddress: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  emailAddress: 'Email Address',
                })
              }}
            />
          </View>
        </View>

        

        {/**submit form starts here */}
        <View style={{ justifyContent: 'center', alignItems: 'center' , marginTop: 40}}>
          <PrimaryButttonComponent
            loading={loading}
            label="Save"
            style={{
              width: orientation === 'PORTRAIT' ? 270 : 320,
              height: 40,
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              SubmitForm()
            }}
          />
        </View>
      </ScrollView>
    </ScrollView>
  )
}

export default IndexEditUserContainer
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: 'white',
  },
  labelInput: {
    color: '#673AB7',
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
  },
  input: {
    borderWidth: 0,
  },
})
