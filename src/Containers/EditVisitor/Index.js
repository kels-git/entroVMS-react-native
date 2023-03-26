import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform
} from 'react-native'
import moment from 'moment'
import { useTheme } from '@/Hooks'
import DatePicker from 'react-native-date-picker'
import DropShadow from 'react-native-drop-shadow'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage } from 'react-native-flash-message'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import { editVisitor } from '@/api-utils'
import Icon from 'react-native-dynamic-vector-icons'
import { Dropdown } from 'react-native-element-dropdown'
import { useSelector } from 'react-redux'

const IndexEditVisitorContainer = ({ navigation, route }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [fullName, setFullName] = useState('')
  const [ICNumber, setICNumber] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [carPlateNum, setCarPlateNum] = useState('')
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState(null)
  //for start visit
  const [visitStartDate, setVisitStartDate] = useState('00-00-0000')
  const [startVisitDate_Picked, setStartVisitDate__Picked] = useState(
    new Date(),
  )
  const [openStartVisit, setOpenStartVisit] = useState(false)

  //for departure visit
  const [visitEndDate, setVisitEndDate] = useState('00-00-0000')
  const [endVisitDate_Picked, setEndVisitDate__Picked] = useState(new Date())
  const [openEndVisit, setOpenEndVisit] = useState(false)
  const [visitorId, setVisitorId] = useState('')

  const accessId = useSelector(state => state.user.accessId)
  const defaultCard = useSelector(state => state.virtualCard.defaultCard)
  const [showDisplayCamOption, setShowDisplayCamOption] = useState(false)

  useEffect(() => {
    const { visitor } = route.params
    setFullName(visitor.VisitorName)
    setICNumber(visitor.DocumentNumber)
    setCarPlateNum(visitor.VehicleNumber)
    setMobileNumber(visitor.MobileNumber)
    setVisitorId(visitor.VisitorInvitationId)
  }, [])

  const [placeholder, setPlaceholder] = useState({
    fullName: 'Full Name',
    ICNumber: '0000000000',
    carPlateNum: 'ABC 12345',
    mobileNumber: '000 00000000',
  })

  const data = [
    { label: 'Contractor', value: 'Contractor' },
    { label: 'Visitor', value: 'Visitor' },
    { label: 'Delivery', value: 'Delivery' },
    { label: 'Meeting', value: 'Meeting' },
  ]

  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)

  const onchange = (selectedDate, type) => {
    if (type === 'startDate') {
      const currentDate = selectedDate || startVisitDate
      setStartVisitDate__Picked(currentDate)
      const formattedDate = `${moment(currentDate).format(
        'YYYY-MM-DD',
      )} ${moment(currentDate).format('HH:mm:ss A')}`
      setVisitStartDate(formattedDate)
    } else if (type === 'endDate') {
      const currentDate = selectedDate || setVisitEndDate
      setEndVisitDate__Picked(currentDate)
      const formattedDate = `${moment(currentDate).format(
        'YYYY-MM-DD',
      )} ${moment(currentDate).format('HH:mm:ss A')}`
      setVisitEndDate(formattedDate)
    }
  }

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
    try {
      setLoading(true)
      if (!fullName || !ICNumber || !mobileNumber || !carPlateNum) {
        setLoading(false)
        showMessage({
          message: 'All fields are required',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }

      if (ICNumber.length < 5 || ICNumber.length > 30) {
        showMessage({
          message: 'Please Indicate a valid IC-Number',
          backgroundColor: 'red',
          duration: 3000,
        })
        setLoading(false)
        return false
      }

      if (
        fullName !== '' ||
        ICNumber !== '' ||
        mobileNumber !== '' ||
        carPlateNum !== ''
      ) {
        const _data = {
          accessId,
          VisitorInvitationId: visitorId,
          BuildingName: defaultCard.BuildingName.trim(),
          Visitortype: value,
          VisitorName: fullName,
          DocumentNumber: ICNumber,
          MobileNumber: mobileNumber,
          VehicleNumber: carPlateNum,
          StartDateTime: visitStartDate,
          EndDateTime: visitEndDate,
        }
        console.log(_data)
        const req_invite = await editVisitor(_data)
        const resp = await req_invite.json()
        if (resp.StatusCode == '200') {
          setLoading(false)
          showMessage({
            message: 'Details updated saved!',
            backgroundColor: 'green',
            duration: 3000,
          })
          setFullName('')
          setICNumber('')
          setCarPlateNum('')
          setVisitStartDate('')
          setVisitEndDate('')
          setMobileNumber('')
          navigation.goBack()
        } else {
          setLoading(false)
          showMessage({
            message: resp.Message,
            backgroundColor: 'red',
            duration: 3000,
          })
        }
      }
    } catch (err) {
      console.log(err)
      navigation.goBack()
      setLoading(false)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
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

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
              <TouchableOpacity onPress={() => setShowDisplayCamOption(false)}>
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
            Edit Visitor
          </Text>
          <Icon
            onPress={() => navigation.goBack()}
            name="x"
            type="Feather"
            size={35}
            color="#fff"
          />
        </View>
      </View>

      {typeof defaultCard.BuildingName === 'undefined' ? (
        <View
          style={{
            height: 500,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}
          >
            Oops
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
              textAlign: 'center',
            }}
          >
            You haven't set up your default access card yet. Go to your profile
            and set it.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={{
              padding: 15,
              backgroundColor: '#184461',
              marginVertical: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Set it now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ marginTop: 50, marginHorizontal: 42, marginBottom: 40 }}>
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
              Name
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color: '#457C9A',
              }}
              value={fullName}
              placeholder={placeholder.fullName}
              onChangeText={text => setFullName(text)}
              placeholderTextColor={'#A6A2A2'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, fullName: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  fullName: 'Full Name',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Identification Number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color: '#457C9A',
              }}
              value={ICNumber}
              placeholder={placeholder.ICNumber}
              keyboardType={'number-pad'}
              onChangeText={text => setICNumber(text)}
              placeholderTextColor={'#A6A2A2'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, ICNumber: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  ICNumber: '0000000000',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 30 }}>
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
                color: '#457C9A',
              }}
              value={carPlateNum}
              placeholder={placeholder.carPlateNum}
              onChangeText={text => setCarPlateNum(text)}
              placeholderTextColor={'#A6A2A2'}
              ICNumber
              onFocus={() => {
                setPlaceholder({ ...placeholder, carPlateNum: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  carPlateNum: 'ABC 12345',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Phone Number
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: '#45969A',
                fontSize: 20,
                fontWeight: '900',
                paddingBottom: 0,
                color: '#457C9A',
              }}
              value={mobileNumber}
              placeholder={placeholder.mobileNumber}
              keyboardType={'number-pad'}
              onChangeText={text => setMobileNumber(text)}
              placeholderTextColor={'#A6A2A2'}
              onFocus={() => {
                setPlaceholder({ ...placeholder, mobileNumber: '' })
              }}
              onBlur={() => {
                setPlaceholder({
                  ...placeholder,
                  mobileNumber: '000 00000000',
                })
              }}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Visitor Type
            </Text>
            <View
              style={{
                padding: 5,
                borderBottomWidth: 1,
                borderColor: '#45969A',
              }}
            >
              <Dropdown
                placeholderStyle={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#989898',
                }}
                selectedTextStyle={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: '#457C9A',
                }}
                inputSearchStyle={{
                  height: 40,
                  fontSize: 16,
                  color: '#000',
                  fontWeight: 'bold',
                }}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Visitor Type' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value)
                  setIsFocus(false)
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Select visit date and time
            </Text>
            <View
              style={{
                padding: 5,
                borderBottomWidth: 1,
                borderColor: '#45969A',
              }}
            >
              <Text
                onPress={() => {
                  setOpenStartVisit(true)
                }}
                style={[
                  {
                    flexWrap: 'wrap',
                    flexShrink: 1,
                    fontSize: 20,
                    padding: 5,
                    color:
                      visitStartDate === '00-00-0000' ? '#A6A2A2' : '#457C9A',
                    fontWeight: '900',
                  },
                ]}
              >
                {visitStartDate}
              </Text>
            </View>
          </View>

          <DatePicker
            modal
            open={openStartVisit}
            date={startVisitDate_Picked}
            mode={'datetime'}
            androidVariant={'iosClone'}
            title={'Select Visit Start Date'}
            confirmText={'Confirm Date'}
            cancelText={'Cancel'}
            onConfirm={date => {
              setOpenStartVisit(false)
              setStartVisitDate__Picked(date)
              onchange(date, 'startDate')
            }}
            onCancel={() => {
              setOpenStartVisit(false)
            }}
          />

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Select departure date and time
            </Text>
            <View
              style={{
                padding: 5,
                borderBottomWidth: 1,
                borderColor: '#45969A',
              }}
            >
              <Text
                onPress={() => {
                  setOpenEndVisit(true)
                }}
                style={[
                  {
                    flexWrap: 'wrap',
                    flexShrink: 1,
                    fontSize: 20,
                    padding: 5,
                    color:
                      visitEndDate === '00-00-0000' ? '#A6A2A2' : '#457C9A',
                    fontWeight: '900',
                  },
                ]}
              >
                {visitEndDate}
              </Text>
            </View>
          </View>

          <DatePicker
            modal
            open={openEndVisit}
            date={endVisitDate_Picked}
            mode={'datetime'}
            androidVariant={'iosClone'}
            title={'Select Visit End Date'}
            confirmText={'Confirm Date'}
            cancelText={'Cancel'}
            onConfirm={date => {
              setOpenEndVisit(false)
              setEndVisitDate__Picked(date)
              onchange(date, 'endDate')
            }}
            onCancel={() => {
              setOpenEndVisit(false)
            }}
          />

          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 15,
                color: '#184461',
                fontWeight: '500',
                marginStart: 4,
                marginBottom: 10,
              }}
            >
              Attach Image
            </Text>
            <View
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <DropShadow
                  style={{
                    shadowColor: '#282828',
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setShowDisplayCamOption(true)}
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
                      Add Image
                    </Text>
                  </TouchableOpacity>
                </DropShadow>
              </View>

              {photo === null ? (
                <View style={{}}>
                  <DropShadow
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 2,
                        height: 1,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                    }}
                  >
                    <Icon
                      type="Feather"
                      name="camera"
                      size={45}
                      color="green"
                    />
                  </DropShadow>
                </View>
              ) : (
                <View>
                  <Image
                    source={{
                      uri: photo ? `data:image/png;base64,${photo}` : '',
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      zIndex: 1,
                      borderRadius: 40,
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <View
            style={[
              Layout.center,
              { marginHorizontal: 20, marginVertical: 25 },
            ]}
          >
            <PrimaryButttonComponent
              loading={loading}
              label="Save"
              style={{
                height: 40,
                marginTop: 20,
                marginBottom: 10,
                width: 280,
              }}
              onPress={() => SubmitForm()}
            />
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default IndexEditVisitorContainer
