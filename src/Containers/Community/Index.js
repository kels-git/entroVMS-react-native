import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Pressable,
  TextInput,
  Modal,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '@/api-utils'
import Share from 'react-native-share'
import LoadingLottie from '@/Components/Common/LoadingLottie'

const IndexCommunityContainer = ({ navigation }) => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displaycontact, setDisplayContact] = useState(true)
  const [openSearch, setOpenSearch] = useState(false)

  const user = useSelector(user => user.user.profile)
  const accessId = useSelector(state => state.user.accessId)
  const defaultCard = useSelector(state => state.virtualCard.defaultCard)

  const [searchEmergency, setSearchEmergency] = useState('')
  const [allEmergency, setAllEmergency] = useState([])
  const [userEmergencyFilter, setUserEmergencyFilter] = useState([])
  const [allCommunity, setAllCommunity] = useState([])
  const [userCommunityFilter, setUserCommunityFilter] = useState([])
  const [searchCommunity, setSearchCommunity] = useState('')
  const [showDisplayNotShareService, setshowDisplayNotShareService] =
    useState(false);
  const [showDisplayNotShareComm, setshowDisplayNotShareComm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedIndex === 0) {
      setDisplayContact(true)
    } else {
      setDisplayContact(false)
    }
  }, [selectedIndex])

  useEffect(() => {
    handleGetContacts()
  }, [])

  const handleGetContacts = async () => {
    if (defaultCard) {
      const get_con = await getContacts(accessId, defaultCard.BuildingName)
      const data = await get_con.json()
      setAllEmergency(data.Emergency)
      setUserEmergencyFilter(data.Emergency)
      setAllCommunity(data.Community)
      setUserCommunityFilter(data.Community);
      setLoading(false);
    }
  }

  const handleSearchEmergency = () => {
    if (searchEmergency.length > 0) {
      const _filtered_emergerncy = allEmergency.filter(c => {
        if (
          c.Name.toLocaleLowerCase().includes(
            searchEmergency.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setUserEmergencyFilter(_filtered_emergerncy)
    } else {
      setUserEmergencyFilter(allEmergency)
    }
  }

  const handleSearchCommunity = () => {
    if (searchCommunity.length > 0) {
      const _filtered_community = allCommunity.filter(c => {
        if (
          c.Name.toLocaleLowerCase().includes(
            searchCommunity.toLocaleLowerCase(),
          )
        ) {
          return true
        }
        return false
      })
      setUserCommunityFilter(_filtered_community)
    } else {
      setUserCommunityFilter(allCommunity)
    }
  }

  const resetEmerg = () => {
    setUserEmergencyFilter(allEmergency)
  }

  const resetComm = () => {
    setUserCommunityFilter(allCommunity)
  }

  useEffect(() => {
    if (searchEmergency.length < 1) {
      resetEmerg()
    }
    if (searchEmergency.length > 0) {
      handleSearchEmergency()
    }
  }, [searchEmergency])

  useEffect(() => {
    if (searchCommunity.length < 1) {
      resetComm()
    }
    if (searchCommunity.length > 0) {
      handleSearchCommunity()
    }
  }, [searchCommunity])

  const onShareService = async serv => {
    try {
      await Share.open({
        title: 'Emergency Service',
        message: `
        Emergency: ${serv.Name}
        Contact No: ${serv.PhoneNo}
        `,
      })
    } catch (error) {
      setshowDisplayNotShareService(true)
    }
  }

  const onShareComm = async com => {
    try {
      await Share.open({
        title: 'Community Service',
        message: `
        Community: ${com.Name}
        Contact No: ${com.PhoneNo}
        `,
      })
    } catch (error) {
      //alert(error.message)
      setshowDisplayNotShareComm(true)
    }
  }

  return (
    loading
    ?<LoadingLottie/>
    :<View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
      <Modal
        transparent
        visible={showDisplayNotShareService}
        onRequestClose={() => setshowDisplayNotShareService(false)}
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
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>
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
              <TouchableOpacity
                onPress={() => setshowDisplayNotShareService(false)}
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

      <Modal
        transparent
        visible={showDisplayNotShareComm}
        onRequestClose={() => setshowDisplayNotShareComm(false)}
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
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>
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
              <TouchableOpacity
                onPress={() => setshowDisplayNotShareComm(false)}
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
        <>
          <View
            style={{
              height: 144,
              backgroundColor: '#184461',
            }}
          >
            <View
              style={{
                marginStart: 22,
                marginTop: 27,
                marginBottom: 10,
                marginEnd: 8,
              }}
            >
              <View style={{ flexDirection: 'row', }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 23,
                    color: '#fff',
                    flexWrap: 'wrap',
                    textTransform: 'capitalize',
                    flex:2
                  }}
                  numberOfLines={1}
                >
                  Hi, {user.FirstName} {user.LastName}
                </Text>
                <Icon
                  name="x"
                  type="Feather"
                  size={35}
                  color="#fff"
                  style={{marginEnd:5}}
                  onPress={() => {
                    navigation.goBack()
                  }}
                />
              </View>

              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#fff',
                  flexWrap: 'wrap',
                }}
              >
                Dont worry your emergency line is here.
              </Text>
            </View>

            {/**search bar area starts here */}

            {!openSearch ? (
              <>
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
                        marginBottom: 10,
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
                          shadowColor: '#282828',
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
              </>
            ) : selectedIndex === 0 ? (
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
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    height: 40,
                    marginHorizontal: 20,
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
                    placeholder={'Search emergency contact'}
                    returnKeyType={'search'}
                    keyboardType={'web-search'}
                    placeholderTextColor={'#666666'}
                    value={searchEmergency}
                    onChangeText={text => setSearchEmergency(text)}
                    // onBlur={()=> setOpenSearch(false)}
                    // blurOnSubmit={()=> setOpenSearch(false)}
                    // onSubmitEditing={()=> setOpenSearch(false)}
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
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    height: 40,
                    marginHorizontal: 20,
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
                    placeholder={'Search community contact'}
                    returnKeyType={'search'}
                    keyboardType={'web-search'}
                    placeholderTextColor={'#666666'}
                    value={searchCommunity}
                    onChangeText={text => setSearchCommunity(text)}
                    // onBlur={()=> setOpenSearch(false)}
                    // blurOnSubmit={()=> setOpenSearch(false)}
                    // onSubmitEditing={()=> setOpenSearch(false)}
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

          <View style={{ marginTop: 10 }}>
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
                  buttons={['Emergency', 'Community']}
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

          {displaycontact ? (
            <ScrollView style={{ marginTop: 10 }}>
              {userEmergencyFilter.length == 0 ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000c',
                    textAlign: 'center',
                    marginTop: 20,
                  }}
                >
                  No data available
                </Text>
              ) : (
                userEmergencyFilter.map((serv, key) => (
                  <View
                    key={key}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: '93%',
                        backgroundColor: 'white',
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
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center' }}>
                          <Icon
                            type="MaterialIcons"
                            name="account-circle"
                            color="#184461"
                            size={40}
                            style={{
                              marginHorizontal: 17,
                              marginVertical: 14,
                            }}
                          />
                        </View>

                        <View
                          style={{
                            justifyContent: 'center',
                            marginStart: 8,
                            width: 125,
                          }}
                        >
                          <Text
                            style={{
                              color: '#184461',
                              fontWeight: '700',
                              marginBottom: 5,
                              flexWrap: 'wrap',
                              fontSize: 16,
                            }}
                            numberOfLines={1}
                          >
                            {serv.Name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}
                          >
                            <Text
                              style={{
                                color: '#184461',
                                fontWeight: '500',
                                fontSize: 12,
                              }}
                            >
                              {serv.PhoneNo}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginStart: 2,
                            marginEnd: 20,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-evenly',
                              flex: 1,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                onShareService(serv)
                              }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Icon
                                type="Feathers"
                                name="share"
                                color="#184461"
                                size={25}
                                style={{ padding: 5 }}
                              />
                            </TouchableOpacity>
                            <Pressable
                              key={key}
                              onPress={() => {
                                Linking.openURL(`tel:${serv.PhoneNo}`)
                              }}
                            >
                              <Icon
                                type="FontAwesome"
                                name="phone"
                                color="#184461"
                                size={25}
                                style={{ padding: 5 }}
                              />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          ) : (
            <ScrollView style={{ marginTop: 10 }}>
              {userCommunityFilter.length === 0 ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: '#000c',
                    textAlign: 'center',
                    marginTop: 20,
                  }}
                >
                  No data available
                </Text>
              ) : (
                userCommunityFilter.map((com, key) => (
                  <View
                    key={key}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: '93%',
                        backgroundColor: 'white',
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
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center' }}>
                          <Icon
                            type="MaterialIcons"
                            name="account-circle"
                            color="#184461"
                            size={40}
                            style={{
                              marginHorizontal: 17,
                              marginVertical: 14,
                            }}
                          />
                        </View>

                        <View
                          style={{
                            justifyContent: 'center',
                            marginStart: 8,
                            width: 125,
                          }}
                        >
                          <Text
                            style={{
                              color: '#184461',
                              fontWeight: '700',
                              marginBottom: 5,
                              flexWrap: 'wrap',
                              fontSize: 16,
                            }}
                            numberOfLines={1}
                          >
                            {com.Name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}
                          >
                            <Text
                              style={{
                                color: '#184461',
                                fontWeight: '500',
                                fontSize: 12,
                              }}
                            >
                              {com.PhoneNo}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            marginStart: 2,
                            marginEnd: 20,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-evenly',
                              flex: 1,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                onShareComm(com)
                              }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Icon
                                type="Feathers"
                                name="share"
                                color="#184461"
                                size={25}
                                style={{ padding: 5 }}
                              />
                            </TouchableOpacity>
                            <Pressable
                              key={key}
                              onPress={() => {
                                Linking.openURL(`tel:${com.PhoneNo}`)
                              }}
                            >
                              <Icon
                                type="FontAwesome"
                                name="phone"
                                color="#184461"
                                size={25}
                                style={{ padding: 5 }}
                              />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </>
      )}
    </View>
  )
}

export default IndexCommunityContainer
