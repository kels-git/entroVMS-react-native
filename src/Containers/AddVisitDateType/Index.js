import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native'
import moment from 'moment'
import { useTheme } from '@/Hooks'
import DropShadow from 'react-native-drop-shadow'
import { useOrientation } from '../useOrientation'
import DatePicker from 'react-native-date-picker'
import * as Constants from '@/Assets/Constants'
import { showMessage, hideMessage } from 'react-native-flash-message'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'

const IndexAddVisitDateTypeContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()

  const [loading, setLoading] = useState(false)
  const orientation = useOrientation()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)
  const [vistor, setVisitor] = useState('Select Visitor Type')
  const [chooseVisitStartDate, setChooseVisitStartDate] =
    useState('Visit Arrival Time')
  const [choosenVisitEndDate, setChoosenVisitEndDate] = useState(
    'Visit departure Time',
  )
  const [isVisitorDialogVisible, setIsVisitorDialogVisible] = useState(false)



  const onchange = (selectedDate) => {
    const currentDate =  selectedDate || date;
    setDate(currentDate);
    const formattedDate = `${moment(date).format('YYYY-MM-DD')} ${moment(
      currentDate,
    ).format('HH:mm:ss A')}`;
    setChooseVisitStartDate(formattedDate) 


    // let tempDate = new Date(currentDate);
    // let fDate =
    //   tempDate.getFullYear() +
    //   '-' +
    //   (tempDate.getMonth() + 1) +
    //   '-' +
    //   tempDate.getDate()

    //   let fTime =
    //   tempDate.getHours() + ':' + tempDate.getMinutes() + ':'+ tempDate.getSeconds();

    //   let am_pm = 'AM';
    //  {tempDate.getHours() >= 12 ? am_pm = 'PM' : 'AM'}
 
   };

   const submitFormVisit =()=>{

   }

  const selectVisitingPerson = item => {
    setVisitor(item)
    setIsVisitorDialogVisible(false)
  }

  const optionVisitor = Constants.visitorType.map((item, index) => {
    return (
      <TouchableOpacity
        style={[Layout.alignItemsStart]}
        key={index}
        onPress={() => selectVisitingPerson(item)}
      >
        <Text
          style={{
            color: Colors.bodyText,
            fontSize: 16,
            margin: 5,
            fontWeight: '500',
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )
  })

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ height: 90, backgroundColor: '#184461' }}>
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
              fontWeight: '700',
              marginLeft: 18,
            }}
          >
            Add Contact Visitor
          </Text>

          <Image
            source={Images.userImageDisplay}
            style={{
              width: 60,
              height: 60,
              marginEnd: 20,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: '#FFFEFE',
            }}
          />
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        {/* for Vsitor type  Modal here*/}
        <View style={Layout.center}>
          <Modal
            visible={isVisitorDialogVisible}
            transparent={true}
            onDismiss={() => setIsVisitorDialogVisible(!isVisitorDialogVisible)}
            onRequestClose={() => setIsVisitorDialogVisible(false)}
            animationType="slide"
          >
            <View
              style={[
                Layout.center,
                {
                  flex: 1,
                  backgroundColor: '#00000099',
                },
              ]}
            >
              <View
                style={{
                  width: 250,
                  height: 250,
                  backgroundColor: Colors.white,
                  borderRadius: MetricsSizes.medium,
                }}
              >
                <View
                  style={[
                    Layout.center,

                    {
                      height: 48,
                      backgroundColor: '#184461',
                      borderTopRightRadius: MetricsSizes.medium,
                      borderTopLeftRadius: MetricsSizes.medium,
                    },
                  ]}
                >
                  <View style={[Layout.row, Layout.center]}>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                      <Text style={{ color: '#fff', fontWeight: '700' }}>
                        {' '}
                        Please Select Visitor
                      </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Image
                        source={Images.logolight}
                        style={{
                          width: 40,
                          height: 40,
                          zIndex: 1,
                          borderRadius: 60,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <ScrollView
                    style={{
                      backgroundColor: Colors.white,
                      borderBottomLeftRadius: MetricsSizes.medium,
                      borderBottomRightRadius: MetricsSizes.medium,
                      marginHorizontal: MetricsSizes.small,
                      marginBottom: MetricsSizes.small,
                    }}
                  >
                    {optionVisitor}
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/* for   pVsitor type modal ends  here*/}
      </View>

      <View>
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 3,
              height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 3,
            marginTop: -5,
          }}
        >
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
              <View
                style={[Layout.center, { marginTop: 10, paddingVertical: 20 }]}
              >
                {/**Visitor type starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        setIsVisitorDialogVisible(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          fontWeight: '700',
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                        },
                      ]}
                    >
                      {vistor}
                    </Text>
                  </View>
                </DropShadow>
                {/**visitor type ends here */}

                {/**Visit Date starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        setOpen(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          fontWeight: '700',
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                        },
                      ]}
                    >
                      {chooseVisitStartDate}
                    </Text>
                  </View>
                </DropShadow>
                {/**Visit visitor type ends here */}

                {/**Visit end Date starts here */}
                <DropShadow
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 3,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    marginTop: -5,
                  }}
                >
                  <View
                    style={[
                      Layout.row,
                      Layout.alignItemsCenter,
                      {
                        borderRadius: 16,
                        marginVertical: MetricsSizes.small - 2,
                        borderWidth: MetricsSizes.tiny - 4,
                        borderColor: '4px 4px rgba(0, 0, 0, 0.15)',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.25)',
                        shadowOffset: { width: 5, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        backgroundColor: Colors.white,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Text
                      onPress={() => {
                        setOpenEndDate(true)
                      }}
                      style={[
                        {
                          width: '85%',
                          height: 48,
                          fontWeight: '700',
                          flexWrap: 'wrap',
                          flexShrink: 1,
                          fontSize: 14,
                          padding: 12,
                        },
                      ]}
                    >
                      {choosenVisitEndDate}
                    </Text>
                  </View>
                </DropShadow>
                {/**Visit visitor end date ends here */}

                <DatePicker
                  modal
                  open={openEndDate}
                  date={date}
                  androidVariant={'iosClone'}
                  mode={'datetime'}
                  onConfirm={date => {
                    setOpenEndDate(false)
                    onchange(date)
                  }}
                  onCancel={() => {
                    setOpenEndDate(false)
                  }}
                />

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  androidVariant={'iosClone'}
                  mode={'datetime'}
                  onConfirm={date => {
                    setOpen(false)
                    onchange(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />

                <PrimaryButttonComponent
                  loading={loading}
                  label="Submit"
                  onPress={()=>{
                    submitFormVisit()
                  }}
                  style={{
                    width: orientation === 'PORTRAIT' ? 270 : 320,
                    height: 40,
                    marginTop: 20,
                  }}
                />
              </View>
            </View>
          </View>
        </DropShadow>
      </View>
    </ScrollView>
  )
}

export default IndexAddVisitDateTypeContainer