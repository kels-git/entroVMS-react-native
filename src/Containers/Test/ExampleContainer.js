import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { ButtonGroup } from 'react-native-elements'
import { deleteVisitor, getVisitors, getVisitorsHistory } from '@/api-utils'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import Share from 'react-native-share'

const IndexVisitorContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [allRegisteredVisitor, setAllRegisteredVisitor] = useState([])
  const [allVisitorsHistory, setAllVisitorsHistory] = useState([])
  const [customized_visitors, setCustomized_visitors] = useState([])
  const [customized_visitors_history, setCustomized_visitors_history] =
    useState([])
  const [loading, setLoading] = useState(true)
  const isFocused = useIsFocused()
  const [selectedSortType, setSelectedSortType] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)
  const [searchRegisterVisitor, setSearchRegisterVisitor] = useState('')
  const [searchHistoryVisitor, setSearchHistoryVisitor] = useState('')
  const [displayRegisterVisitor, setDisplayRegisterVisitor] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(false)
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const accessId = useSelector(state => state.user.accessId)
  const defaultCardID = useSelector(state => state.virtualCard.defaultCard)
  const [custom_refresher, set_custom_refresher] = useState(false)

  const [showDisplayCamOption, setShowDisplayCamOption] = useState(false)
  const [showDisplayNotShare, setshowDisplayNotShare] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [deleteVisitoroObj, setDeleteVisitoroObj] = useState(null)
  const [editVisitoroObj, setEditVisitoroObj] = useState(null)

  const resetCalendar = () => {
    if (displayRegisterVisitor) {
      setCustomized_visitors(allRegisteredVisitor)
    } else {
      setCustomized_visitors_history(allVisitorsHistory)
    }
  }

  const onChange = (event, selectedDate) => {
    setShow(false)
    let data
    if (displayRegisterVisitor) {
      data = allRegisteredVisitor
    } else {
      data = allVisitorsHistory
    }
    const _filtered_visitors = data.filter(a =>
      new Date(
        Number(
          a.StartDateTime.replace(/\/date\(/gi, '')
            .replace(/\//gi, '')
            .replace(/\)/gi, ''),
        ),
      ).toLocaleDateString() == new Date(selectedDate).toLocaleDateString()
        ? true
        : false,
    )
    if (displayRegisterVisitor) {
      setCustomized_visitors(_filtered_visitors)
    } else {
      setCustomized_visitors_history(_filtered_visitors)
    }
  }

  const resetRegVisitor = () => {
    setCustomized_visitors(allRegisteredVisitor)
  }

  const resetVisitorHistory = () => {
    setCustomized_visitors_history(allVisitorsHistory)
  }

  const handleRegVisitor = () => {
    if (searchRegisterVisitor.length > 0) {
      const _filtered_visitors = allRegisteredVisitor.filter(c => {
        if (
          c.VisitorName.toLocaleLowerCase().includes(
            searchRegisterVisitor.toLocaleLowerCase(),
          ) ||
          c.VehicleNumber.toLocaleLowerCase().includes(
            searchRegisterVisitor.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setCustomized_visitors(_filtered_visitors)
    } else {
      setCustomized_visitors(allRegisteredVisitor)
    }
  }

  const handleVisitorHistory = () => {
    if (searchHistoryVisitor.length > 0) {
      const _filtered_visitors = allVisitorsHistory.filter(c => {
        if (
          c.VehicleNumber.toLocaleLowerCase().includes(
            searchHistoryVisitor.toLocaleLowerCase(),
          ) ||
          c.VisitorName.toLocaleLowerCase().includes(
            searchHistoryVisitor.toLocaleLowerCase(),
          ) ||
          c.VisitorStatus.toLocaleLowerCase().includes(
            searchHistoryVisitor.toLocaleLowerCase(),
          ) ||
          c.Visitortype.toLocaleLowerCase().includes(
            searchHistoryVisitor.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setCustomized_visitors_history(_filtered_visitors)
    } else {
      setCustomized_visitors_history(allVisitorsHistory)
    }
  }

  const handleSort = (order, data) => {
    if (order) {
      const _filtered_visitors = data.sort((a, b) => {
        if (
          new Date(
            Number(
              a.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          ) >
          new Date(
            Number(
              b.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          )
        ) {
          return 1
        }
        return -1
      })
      if (displayRegisterVisitor) {
        setCustomized_visitors(_filtered_visitors)
      } else {
        setCustomized_visitors_history(_filtered_visitors)
      }
    } else {
      const _filtered_visitors = data.sort((a, b) => {
        if (
          new Date(
            Number(
              a.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          ) <
          new Date(
            Number(
              b.StartDateTime.replace(/\/date\(/gi, '')
                .replace(/\//gi, '')
                .replace(/\)/gi, ''),
            ),
          )
        ) {
          return 1
        }
        return -1
      })
      if (displayRegisterVisitor) {
        setCustomized_visitors(_filtered_visitors)
      } else {
        setCustomized_visitors_history(_filtered_visitors)
      }
    }
  }

  // search hist
  useEffect(() => {
    if (searchHistoryVisitor.length < 1) {
      resetVisitorHistory()
    }
    if (searchHistoryVisitor.length > 0) {
      handleVisitorHistory()
    }
  }, [searchHistoryVisitor])

  // search reg
  useEffect(() => {
    if (searchRegisterVisitor.length < 1) {
      resetRegVisitor()
    }
    if (searchRegisterVisitor.length > 0) {
      handleRegVisitor()
    }
  }, [searchRegisterVisitor])

  // switch between tabs
  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayRegisterVisitor(true)
    } else {
      setDisplayRegisterVisitor(false)
    }
  }, [selectedIndex])

  // make api request to get all visitors and access
  const getData = async () => {
    await getAllVisitors()
    await getAllVisitorsHistory()
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    if (defaultCardID) {
      getData()
    }
  }, [isFocused])

  useEffect(() => {
    setLoading(true)
    if (defaultCardID) {
      getData()
    }
  }, [custom_refresher])

  const getAllVisitors = async () => {
    const req_vis = await getVisitors(accessId, defaultCardID.BuildingName)
    const visitors = await req_vis.json()
    setAllRegisteredVisitor(visitors.Visitors)
    setCustomized_visitors(visitors.Visitors)
    setLoading(false)
  }

  const getAllVisitorsHistory = async () => {
    const req_vis = await getVisitorsHistory(
      accessId,
      defaultCardID.BuildingName,
    )
    const visitors_hist = await req_vis.json()
    setAllVisitorsHistory(visitors_hist.Visitors)
    setCustomized_visitors_history(visitors_hist.Visitors)
    setLoading(false)
  }

  const handleDeleteVisitor = async () => {
    setShowDisplayCamOption(false)
    try {
      if (deleteVisitoroObj !== null) {
        const { VisitorInvitationId } = deleteVisitoroObj
        const del_req = await deleteVisitor(
          accessId,
          defaultCardID.BuildingName,
          defaultCardID.VirtualKey,
          VisitorInvitationId,
        )
        const response = await del_req.json()
        if (response.StatusCode === '200') {
          showMessage({
            message: 'Visitor successfully deleted !',
            duration: 2000,
            backgroundColor: 'green',
          })
          set_custom_refresher(!custom_refresher)
          setDeleteVisitoroObj(null)
        }
      }
    } catch (err) {
      console.log(err)
      showMessage({
        message: 'Something went wrong',
        backgroundColor: 'red',
        color: 'white',
        duration: 2000,
      })
    }
  }

  const handleShowModal = v => {
    setShowDisplayCamOption(true)
    setDeleteVisitoroObj(v)
  }

  const handleEditVisitor = () => {
    if (editVisitoroObj !== null) {
      setShowEdit(false)
      navigation.navigate('EditVistorInfo', {
        visitor: editVisitoroObj,
      })
    }
    setEditVisitoroObj(null)
  }

  const handleShowEdit = v => {
    console.log(v)
    setEditVisitoroObj(v)
    setShowEdit(true)
  }

  const onShare = async v => {
    try {
      await Share.open({
        title: 'Visitor Invite',
        message: `
        InviteLink: ${v.ShareUrl}
        `,
      })
    } catch (error) {
      //alert(error.message)
      setshowDisplayNotShare(true)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      <View>
        <Modal
          transparent
          visible={showDisplayNotShare}
          onRequestClose={() => setshowDisplayNotShare(false)}
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
                <Text
                  style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}
                >
                  Alert
                </Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderWidth: 1,
                      borderColor: '#184461',
                      padding: 10,
                      borderRadius: 15,
                      backgroundColor: '#F0F0F0',
                    }}
                  >
                    <Text style={{ color: '#000000', textAlign: 'center' }}>
                      User did not share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setshowDisplayNotShare(false)}>
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
                  Do you wish to delete registered visitor?
                </Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={handleDeleteVisitor}
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
                    onPress={() => setShowDisplayCamOption(false)}
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
                  onPress={() => setShowDisplayCamOption(false)}
                >
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

        {/* edit */}
        <Modal
          transparent
          visible={showEdit}
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
                  Do you wish to edit visitor?
                </Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={handleEditVisitor}
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
                    onPress={() => setShowEdit(false)}
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
                <TouchableOpacity onPress={() => setShowEdit(false)}>
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
            height: 144,
            backgroundColor: '#184461',
          }}
        >
          {/**search calendar area starts here */}

          {/** 
          <View style={{flexDirection: 'row',
          alignContent: 'center',
          justifyContent:'center',
          marginVertical: 10,
          flex: 1,}}> 
          <View style={{flex:3,  width: '100%'}}>   
          <TouchableOpacity activeOpacity={1.2} onPress={() => setShow(true)}>
            <DropShadow
              style={{
                shadowColor: '#282828',
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  marginTop: 27,
                  backgroundColor: '#fff',
                  height: 40,
                  marginHorizontal: 20,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: '#184461',
                  shadowColor: '#000',
                  shadowRadius: 10,
                  shadowOpacity: 0.6,
                  elevation: 8,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <DropShadow
                  style={{
                    shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                >
                  <Icon
                    type="Feathers"
                    name="search"
                    color="#184461"
                    size={27}
                  />
                </DropShadow>

                <Text
                  style={{
                    color: '#184461',
                    fontWeight: '700',
                    fontSize: 12,
                  }}
                >
                  Calendar
                </Text>
              </View>
            </DropShadow>
          </TouchableOpacity>

          </View>  
                </View> **/}

                <View style={{alignSelf:'flex-end', marginTop: 5}}>
                <Icon
                name="x"
                type="Feather"
                size={35}
                color="#fff"
                style={{marginEnd:10, }}
                onPress={() => {
                  navigation.goBack()
                }}
              />
                
                </View>

             

          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              
            }}
          >
            <View style={{ flex: 3, width: '100%' }}>
              <TouchableOpacity
                activeOpacity={1.2}
                onPress={() => setShow(true)}
              >
                <DropShadow
                  style={{
                    shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 40,
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: '#184461',
                      shadowColor: '#000',
                      shadowRadius: 10,
                      shadowOpacity: 0.6,
                      elevation: 8,
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginStart: 20,
                     
                    }}
                  >
                    <DropShadow
                      style={{
                        shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                      }}
                    >
                      <Icon
                        type="Feathers"
                        name="search"
                        color="#184461"
                        size={27}
                      />
                    </DropShadow>

                    <Text
                      style={{
                        color: '#184461',
                        fontWeight: '700',
                        fontSize: 12,
                      }}
                    >
                      Calendar
                    </Text>
                  </View>
                </DropShadow>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                activeOpacity={1.2}
                onPress={() => {
                  resetCalendar()
                }}
              >
                <DropShadow
                  style={{
                    shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    shadowOffset: {
                      width: 1,
                      height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: '#184461',
                      backgroundColor: '#fff',
                      shadowColor: '#000',
                      shadowRadius: 10,
                      shadowOpacity: 0.6,
                      elevation: 8,
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      height: 40,
                      width: '70%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginStart: 10,
                      marginEnd: 20,
                    }}
                  >
                    <DropShadow
                      style={{
                        shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                      }}
                    >
                    <Icon
                    type="Feathers"
                    name="refresh"
                    color="#184461"
                    size={27}
                  />
                    </DropShadow>
                  </View>
                </DropShadow>
              </TouchableOpacity>
            </View>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          {/**search calendar area ends here */}

          {/**search bar area starts here */}
          {!openSearch ? (
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                marginVertical: 3,
                flex: 1,
              }}
            >
              <View style={{ flex: 3, width: '100%' }}>
                <TouchableOpacity
                  activeOpacity={1.2}
                  onPress={() => setOpenSearch(true)}
                >
                  <DropShadow
                    style={{
                      shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      shadowOffset: {
                        width: 1,
                        height: 2,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 2,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: '#fff',
                        height: 40,
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: '#184461',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 8,
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginStart: 20,
                        marginTop: 8,
                      }}
                    >
                      <DropShadow
                        style={{
                          shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                        }}
                      >
                        <Icon
                          type="Feathers"
                          name="search"
                          color="#184461"
                          size={27}
                        />
                      </DropShadow>

                      <Text
                        style={{
                          color: '#184461',
                          fontWeight: '700',
                          fontSize: 12,
                        }}
                      >
                        Search
                      </Text>
                    </View>
                  </DropShadow>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  activeOpacity={1.2}
                  onPress={() => {
                    setSelectedSortType(!selectedSortType)
                    handleSort(
                      !selectedSortType,
                      displayRegisterVisitor
                        ? allRegisteredVisitor
                        : allVisitorsHistory,
                    )
                  }}
                >
                  <DropShadow
                    style={{
                      shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                      shadowOffset: {
                        width: 1,
                        height: 2,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 2,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: '#184461',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 8,
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        height: 40,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: 10,
                        marginEnd: 20,
                        marginTop: 8,
                      }}
                    >
                      <DropShadow
                        style={{
                          shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                        }}
                      >
                        <Icon
                          type="MaterialCommunityIcons"
                          name={
                            !selectedSortType
                              ? 'sort-ascending'
                              : 'sort-descending'
                          }
                          size={25}
                          color="#000"
                        />
                      </DropShadow>
                    </View>
                  </DropShadow>
                </TouchableOpacity>
              </View>
            </View>
          ) : selectedIndex === 0 ? (
            <DropShadow
              style={{
                shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  marginBottom: 17,
                  backgroundColor: '#fff',
                  height: 40,
                  marginHorizontal: 17,
                  marginTop: 11,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: '#184461',
                  elevation: 10,
                  shadowColor: '#000',
                  shadowRadius: 10,
                  shadowOpacity: 0.6,
                  elevation: 8,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <TextInput
                  placeholder={'Search registered visitor'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchRegisterVisitor}
                  onChangeText={text => setSearchRegisterVisitor(text)}
                  autoFocus={true}
                  style={{
                    width: '90%',
                    fontSize: 12,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setOpenSearch(false)
                  }}
                >
                  <Icon
                    type="Feather"
                    name="x-circle"
                    size={25}
                    color="#184461"
                  />
                </TouchableOpacity>
              </View>
            </DropShadow>
          ) : (
            <DropShadow
              style={{
                shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                shadowOffset: {
                  width: 1,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  marginBottom: 17,
                  backgroundColor: '#fff',
                  height: 40,
                  marginHorizontal: 17,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: '#184461',
                  elevation: 10,
                  shadowColor: '#000',
                  shadowRadius: 10,
                  shadowOpacity: 0.6,
                  elevation: 8,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 11
                }}
              >
                <TextInput
                  placeholder={'Search visitor history'}
                  returnKeyType={'search'}
                  keyboardType={'web-search'}
                  placeholderTextColor={'#666666'}
                  value={searchHistoryVisitor}
                  onChangeText={text => setSearchHistoryVisitor(text)}
                  autoFocus={true}
                  style={{
                    width: '90%',
                    fontSize: 12,
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setOpenSearch(false)
                  }}
                >
                  <Icon
                    type="Feather"
                    name="x-circle"
                    size={25}
                    color="#184461"
                  />
                </TouchableOpacity>
              </View>
            </DropShadow>
          )}
          {/**search bar area ends here */}
        </View>
      </View>

      <View style={{}}>
        <DropShadow
          style={{
            shadowColor: '#282828',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 1,
            shadowRadius: 2,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 7,
              margin: 7,
              justifyContent: 'center',
            }}
            activeOpacity={1.0}
          >
            <ButtonGroup
              buttons={['Register Visitor', 'History Visitor']}
              selectedIndex={selectedIndex}
              onPress={value => {
                setSelectedIndex(value)
              }}
              containerStyle={{
                borderRadius: 7,
                elevation: 10,
              }}
              selectedButtonStyle={{
                backgroundColor: '#184461',
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
                borderBottomLeftRadius: 7,
                borderTopLeftRadius: 7,
                elevation: 10,
              }}
              textStyle={{
                textAlign: 'center',
                color: '#000',
                fontWeight: 'bold',
              }}
              buttonContainerStyle={{ backgroundColor: '#fff' }}
              innerBorderStyle={{ color: 'transparent' }}
              activeOpacity={1.0}
            />
          </TouchableOpacity>
        </DropShadow>
      </View>

      <View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              height: 500,
            }}
          >
            <ActivityIndicator
              size={50}
              color={'#184461'}
              style={{
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontSize: 16,
                marginTop: 10,
              }}
            >
              Please wait...
            </Text>
          </View>
        ) : typeof defaultCardID.BuildingLogo === 'undefined' ? (
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
                color: '#184461',
                textAlign: 'center',
              }}
            >
              Oops
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: '#184461',
                textAlign: 'center',
              }}
            >
              You haven't set up your default access card yet. Go to your
              profile and set it.
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
        ) : displayRegisterVisitor ? (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {customized_visitors.length === 0 ? (
                <View>
                  <Text
                    style={{ color: '#000', textAlign: 'center', fontSize: 15 }}
                  >
                    You don't have any visitors currently.
                  </Text>
                </View>
              ) : (
                customized_visitors.map((v, key) => (
                  <View
                    key={1 + key}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        elevation: 10,
                        marginTop: 5,
                        shadowColor: '#000',
                        shadowRadius: 10,
                        shadowOpacity: 0.6,
                        elevation: 8,
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          marginStart: 20,
                          marginEnd: 20,
                          marginVertical: 14,
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}
                        >
                          <View style={{ width: '20%' }}>
                            {v.VisitorImageLogo === '' ? (
                              <Image
                                source={Images.defaultUserBgImage}
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius: 21,
                                }}
                                resizeMode={'contain'}
                              />
                            ) : (
                              <Image
                                source={{
                                  uri: `data:image/png;base64,${v.VisitorImageLogo}`,
                                }}
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius: 21,
                                }}
                                resizeMode={'contain'}
                              />
                            )}
                          </View>

                          <View style={{ marginStart: 10, width: '60%' }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '700',
                                color: '#184461',
                                flexWrap: 'wrap',
                              }}
                              numberOfLines={2}
                            >
                              {v.VisitorName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '500',
                                color: '#184461',
                                marginTop: 3,
                              }}
                            >
                              {new Date(
                                Number(
                                  v.StartDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                          </View>
                        </View>

                        <View style={{}}>
                          <TouchableOpacity
                            activeOpacity={1.0}
                            style={{ padding: 8 }}
                            onPress={() => {
                              console.log(v)
                              setCurrentIndex(key === currentIndex ? null : key)
                            }}
                          >
                            <View style={{}}>
                              <Icon
                                name={'ellipsis-v'}
                                type={'FontAwesome'}
                                size={30}
                                color={'#184461'}
                                style={{ alignSelf: 'flex-end' }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {key === currentIndex ? (
                      <DropShadow
                        style={{
                          shadowColor: '#F0F0F0',
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                        }}
                      >
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 1,
                          }}
                        >
                          <View
                            style={{
                              width: '100%',
                              padding: 10,
                              backgroundColor: '#fff',
                              elevation: 10,
                              marginBottom: 10,
                              shadowColor: '#000',
                              shadowOpacity: 0.6,
                              elevation: 8,
                              shadowOffset: {
                                width: 2,
                                height: 4,
                              },
                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                marginStart: 20,
                                marginEnd: 8,
                                marginTop: 14,
                              }}
                            >
                              <View style={{ justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <View style={{ width: 80 }}>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Location
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Purpose of visit
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Badge No
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Vehicle No
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '400',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      Status
                                    </Text>
                                  </View>

                                  <View style={{ marginHorizontal: 5 }}>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      :
                                    </Text>
                                  </View>

                                  <View style={{ marginHorizontal: 5 }}>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {defaultCardID.BuildingName}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {v.Visitortype}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {defaultCardID.VirtualKey}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {v.VehicleNumber}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11,
                                        fontWeight: '700',
                                        color: '#184461',
                                        marginVertical: 1,
                                      }}
                                    >
                                      {v.VisitorStatus}
                                    </Text>
                                  </View>
                                </View>
                              </View>

                              <View style={{ flex: 1 }}>
                                <Image
                                  source={{
                                    uri: `data:image/png;base64,${defaultCardID.BuildingLogo}`,
                                  }}
                                  style={{
                                    width: 80,
                                    height: 48,
                                    alignSelf: 'flex-end',
                                    marginTop: 20,
                                  }}
                                  resizeMode={'contain'}
                                />
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginHorizontal: 20,
                                marginVertical: 10,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: 140,
                                  justifyContent: 'space-between',
                                }}
                              >
                                {/**share business card */}
                                <TouchableOpacity
                                  onPress={() => {
                                    onShare(v)
                                  }}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Icon
                                    type="Entypo"
                                    name="share"
                                    size={23}
                                    color="#184461"
                                  />
                                </TouchableOpacity>
                                {/**share business card ends here */}

                                {/**edit business card */}
                                <TouchableOpacity
                                  onPress={() => handleShowEdit(v)}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Icon
                                    type="FontAwesome"
                                    name="edit"
                                    size={23}
                                    color="#184461"
                                  />
                                </TouchableOpacity>
                                {/**edit business card ends here */}

                                {/**delete business card */}
                                <TouchableOpacity
                                  onPress={() => handleShowModal(v)}
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Icon
                                    type="Foundation"
                                    name="trash"
                                    size={23}
                                    color="#184461"
                                  />
                                </TouchableOpacity>

                                {/**delete business card ends here */}
                              </View>
                            </View>
                          </View>
                        </View>
                      </DropShadow>
                    ) : null}
                  </View>
                ))
              )}
            </View>
          </View>
        ) : (
          <View>
            {customized_visitors_history.length == 0 ? (
              <View>
                <Text
                  style={{ color: '#000', textAlign: 'center', fontSize: 15 }}
                >
                  You don't have any visitors currently.
                </Text>
              </View>
            ) : (
              customized_visitors_history.map((v, key) => (
                <View
                  key={2 + key}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      width: '93%',
                      height: 166,
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      elevation: 10,
                      marginBottom: 10,
                      marginTop: 5,
                      shadowColor: '#000',
                      shadowRadius: 10,
                      shadowOpacity: 0.6,
                      elevation: 8,
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        marginStart: 22,
                        marginEnd: 8,
                        marginTop: 14,
                      }}
                    >
                      <View style={{ justifyContent: 'center' }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '700',
                            color: '#184461',
                          }}
                        >
                          {v.VisitorName}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: 90 }}>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              Start Date
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              End Date
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              Location
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              Purpose of visit
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              Badge No
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                               
                              }}
                            >
                              Vehicle No
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              Status
                            </Text>
                          </View>

                          <View style={{ marginStart: 10, marginEnd: 5}}>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: 'bold',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              :
                            </Text>
                          </View>

                          <View style={{ marginHorizontal: 5 }}>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              {new Date(
                                Number(
                                  v.StartDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              {new Date(
                                Number(
                                  v.EndDateTime.replace(/\/date\(/gi, '')
                                    .replace(/\//gi, '')
                                    .replace(/\)/gi, ''),
                                ),
                              ).toLocaleString()}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                            {defaultCardID.BuildingName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              {v.Visitortype}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                            {defaultCardID.VirtualKey}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              {v.VehicleNumber}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#184461',
                                marginVertical: 1,
                              }}
                            >
                              {v.VisitorStatus}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={{ flex: 1 }}>

                      {v.VisitorImageLogo === '' ? (
                        <Image
                          source={Images.defaultUserBgImage}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignSelf: 'flex-end',
                          }}
                          resizeMode={'cover'}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: `data:image/png;base64,${v.VisitorImageLogo}`,
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignSelf: 'flex-end',
                          }}
                          resizeMode={'contain'}
                        />
                      )}
                        

                        <Image
                        source={{
                          uri: `data:image/png;base64,${defaultCardID.BuildingLogo}`,
                        }}
                        style={{
                          width: 80,
                          height: 48,
                          alignSelf: 'flex-end',
                          marginTop: 40,
                        }}
                        resizeMode={'contain'}
                      />
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default IndexVisitorContainer
