import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Platform
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import DropShadow from 'react-native-drop-shadow'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage } from 'react-native-flash-message'
import { useOrientation } from '../useOrientation'
import { getVirtualKeys, registerUser, requestProfile } from '@/api-utils'
import { loginUser } from '@/Features/users'
import { addCard, setDefaultCard } from '@/Features/virtualCards'
import { useDispatch, useSelector } from 'react-redux'
import { regexStr } from '@/Assets/Constants'


const IndexRegisterCompanyUserContainer = ({navigation, route}) => {
  const { Layout, Images, Colors, MetricsSizes } = useTheme()
  const [photo, setPhoto] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [loading, setLoading] = useState(false)
  const orientation = useOrientation()
  const dispatch = useDispatch()
  const accessId = useSelector(state => state.user.accessId);
  const [showDisplayCamOption, setShowDisplayCamOption] = useState(false)

  useEffect(()=> {
    const {phoneNumber} = route.params;
    setPhoneNumber(phoneNumber);
  }, [])

  const [placeholder, setPlaceholder] = useState({
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    companyName: 'Company Name',
    carPlateNum: 'Vehcicle Number'
  });

 


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
    if (photo !== null) {
      setPhoto(null)
    }

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
    try{
      setLoading(true)
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !companyName ||
      !carPlateNum
    ) {
      setLoading(false)
      showMessage({
        message: 'All fields are required',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    if(!regexStr.email.test(emailAddress)){
      setLoading(false)
      showMessage({
        message: 'Please enter a valid email',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    if(!regexStr.name.test(firstName) || !regexStr.name.test(lastName) ){
      setLoading(false)
      showMessage({
        message: 'Please enter your real name',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }

    if(!regexStr.carplate.test(carPlateNum) ){
      setLoading(false)
      showMessage({
        message: 'Please enter a valid vehicle number',
        backgroundColor: 'red',
        duration: 3000,
      })
      return false
    }
   
    // register user
    const _data = {
      Email: emailAddress,
      FirstName: firstName,
      LastName: lastName,
      CompanyName: companyName,
      VehicleNo: carPlateNum,
      MobileNo: phoneNumber,
      ProfileLogo: photo,
      AccessId: accessId
    }

    const req_register = await registerUser(_data);
    const res_register = await req_register.json();

    if (res_register.StatusCode !== '200') {
      setLoading(false)
      showMessage({
        message: res_register.message,
        backgroundColor: 'red',
        duration: 2000,
      })
    } else {
      const req_prof = await requestProfile(accessId);
      const prof = await req_prof.json();
      const req_keys = await getVirtualKeys(accessId);
      const keys = await req_keys.json();
      dispatch(addCard(keys))
      dispatch(loginUser(prof))
      navigation.reset({
        index: 0,
        routes: [{ name: 'TutorialSlide' }],
      })
    }
    setLoading(false)
    }
    catch(err){
      console.log(err);
      showMessage({
        message: "Something went wrong",
        backgroundColor: 'red',
        duration: 2000,
      })
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>

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
      <ImageBackground
        source={Images.BackgroundImage}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView>
        <Image
        source={Images.newLogoImage}
        resizeMode={'contain'}
        style={{  marginTop: 20,  marginLeft: 20}}
      />
          <View style={{ marginLeft: 32 }}>
            <Text
              style={{
                fontSize: 24,
                color: Colors.textColor,
                fontWeight: '700',
              }}
            >
              Almost there!
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: Colors.textColor,
                fontWeight: '500',
              }}
            >
              Create an account to begin!
            </Text>

          
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                width: '90%',
                marginTop: 110,
                borderRadius: 20,
                backgroundColor: '#F1F1F1',
                elevation: 10,
                shadowColor: '0px 13px 15px rgba(0, 0, 0, 0.25)',
                shadowRadius: 10,
                shadowOpacity: 0.6,
                marginVertical: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
              }}
            >
              <View style={[Layout.center, { marginBottom: 30 }]}>
                <View
                  style={[
                    Layout.center,
                    {
                      width: orientation === 'PORTRAIT' ? 120 : 160,
                      height: orientation === 'PORTRAIT' ? 120 : 160,
                      position: 'absolute',
                      borderRadius: orientation === 'PORTRAIT' ? 60 : 80,
                      borderColor: '#184461',
                      borderWidth: MetricsSizes.zero + 1,
                      backgroundColor: '#C4c4c4',
                      shadowColor: ' rgba(0, 0, 0, 0.25)',
                    },
                  ]}
                >
                  <Image
                  source={photo ? { uri: `data:image/png;base64,${photo}` } : Images.profilepic}
                    style={{
                      width: orientation === 'PORTRAIT' ? 110 : 150,
                      height: orientation === 'PORTRAIT' ? 110 : 150,
                      zIndex: 1,
                      borderRadius: orientation === 'PORTRAIT' ? 60 : 75.5,
                    }}
                  />
                </View>
              </View>
              <View
                style={[
                  Layout.center,
                  { marginLeft: orientation === 'PORTRAIT' ? 70 : 90 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setShowDisplayCamOption(true)}
                  activeOpacity={0.9}
                  style={[
                    Layout.center,
                    {
                      backgroundColor: '#184461',
                      width: orientation === 'PORTRAIT' ? 35 : 40,
                      height: orientation === 'PORTRAIT' ? 35 : 40,
                      borderRadius: orientation === 'PORTRAIT' ? 15.5 : 20,
                    },
                  ]}
                >
                  <Icon name="camera" type="Feather" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <View>
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                  {/**first Name label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                    <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: '900',
                      color:'#457C9A'
                    }}
                    value={firstName}
                    placeholder={placeholder.firstName}
                    onChangeText={text => setFirstName(text)}
                    placeholderTextColor={'#A6A2A2'}
                    onFocus={() => {
                      setPlaceholder({ ...placeholder, firstName: '' })
                    }}
                    onBlur={() => {
                      setPlaceholder({
                        ...placeholder,
                        firstName: 'First Name',
                      })
                    }}
                  />
                    </View>
                  </DropShadow>
                  {/**first Name label ends here */}

                  {/**last Name label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                    <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: '900',
                      color:'#457C9A'
                    }}
                    value={lastName}
                    placeholder={placeholder.lastName}
                    onChangeText={text => setLastName(text)}
                    placeholderTextColor={'#A6A2A2'}
                    onFocus={() => {
                      setPlaceholder({ ...placeholder, lastName: '' })
                    }}
                    onBlur={() => {
                      setPlaceholder({
                        ...placeholder,
                        lastName: 'Last Name',
                      })
                    }}
                  />
                    </View>
                  </DropShadow>
                  {/**last Name label ends here */}

                  {/**email address label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                    <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: '900',
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
                  </DropShadow>
                  {/**email address label starts here */}

                  {/** company name label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                    <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: '900',
                      color:'#457C9A'
                    }}
                    value={companyName}
                    placeholder={placeholder.companyName}
                    onChangeText={text => setCompanyName(text)}
                    placeholderTextColor={'#A6A2A2'}
                    onFocus={() => {
                      setPlaceholder({ ...placeholder, companyName: '' })
                    }}
                    onBlur={() => {
                      setPlaceholder({
                        ...placeholder,
                        companyName: 'Company Name',
                      })
                    }}
                  />
                    </View>
                  </DropShadow>
                  {/**company label starts here */}

                  {/** car number label starts here */}
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 3,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <View
                      style={[
                        {
                          borderRadius: 16,
                          marginVertical: MetricsSizes.small - 4,
                          borderWidth: MetricsSizes.tiny - 4,
                          borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                          borderWidth: 2,
                          shadowColor: 'rgba(0, 0, 0, 0.25)',
                          shadowOffset: { width: 5, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 5,
                          elevation: 5,
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          height: 55,
                          padding: 5,
                        },
                      ]}
                    >
                    <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: '900',
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
                        carPlateNum: 'Vehicle Number',
                      })
                    }}
                  />
                    </View>
                  </DropShadow>
                  {/**car number starts here */}
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <PrimaryButttonComponent
                  loading={loading}
                  label="Submit"
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
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ScrollView>
  )
}

export default IndexRegisterCompanyUserContainer
