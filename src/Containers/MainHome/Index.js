import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/Hooks';
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent';
import Icon from 'react-native-dynamic-vector-icons';
import DropShadow from 'react-native-drop-shadow';
import { useOrientation } from '../useOrientation';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements, getVirtualKeys } from '@/api-utils';
import { addAnnouncement } from '@/Features/announcements';
import LottieView from 'lottie-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { addCard } from '@/Features/virtualCards';
import LoadingLottie from '@/Components/Common/LoadingLottie'


const IndexHomeContainer = ({ navigation }) => {
  const { Images, MetricsSizes, Layout } = useTheme();
  const orientation = useOrientation();
  const user = useSelector(user => user.user.profile);
  const [announcementsLoading, setAnnouncementLoading] = useState(true);
  const announcements = useSelector(state => state.announcement.announcements);
  const [isloading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  const accessId = useSelector(state => state.user.accessId);
  const isFocused = useIsFocused();

  const handleGetAnnouncements = async () => {
    setAnnouncementLoading(true);
    const req_ann = await getAnnouncements(accessId, 'Plaza33');
    const ann = await req_ann.json();
    dispatch(addAnnouncement(ann.Announcement));
    setAnnouncementLoading(false);
  }

  const getAccess = async () => {
    const req_keys = await getVirtualKeys(accessId);
    const keys = await req_keys.json();
    addCard(keys.VirtualKey);
  }

  useEffect(() => {
    handleGetAnnouncements()
    getAccess()
  }, [isFocused])




  
  return  (

    
    <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F1' }}>

    <View style={{ backgroundColor: '#184461', height: 144 }}></View>
          {/* header end */}
          {/* card start */}
          <DropShadow
            style={{
              shadowColor: '#D3D3D3',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 1,
              shadowRadius: 3,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: '85%',
                  marginTop: -50,
                  backgroundColor: '#D0F2EC',
                  shadowColor: '0px 13px 15px rgba(0, 0, 0, 0.25)',
                  shadowRadius: 10,
                  shadowOpacity: 0.6,
                  marginVertical: 0,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <View style={[Layout.center, { marginBottom: 30 }]}>
                  <View
                    style={[
                      Layout.center,
                      {
                        width: 100,
                        height: 100,
                        position: 'absolute',
                        borderRadius: 50,
                        borderColor: '#184461',
                        borderWidth: MetricsSizes.zero + 1,
                        backgroundColor: '#C4c4c4',
                        shadowColor: ' rgba(0, 0, 0, 0.25)',
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: `data:image/png;base64,${user.ProfileLogo}` }}
                      style={{
                        width: 110,
                        height: 110,
                        zIndex: 1,
                        borderRadius: 75.5,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      width: '70%',
                      height: 35,
                      marginTop: 10,
    
                      flexDirection: 'row',
    
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 28, marginRight: -10 }}>🤩</Text>
                    
                      <LottieView source={require('../../Assets/Lottie/welcomehome.json')}
                      loop
                      autoPlay
                      style={{ width: 120,height: 22}}
                       />
                  </View>
    
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: 'bold',
                      marginVertical: 8,
                      color: '#184461',
                      textAlign: 'center',
                      textTransform: 'capitalize',
                    }}
                  >
                    {user.FirstName} {user.LastName}
                  </Text>
                  {/* divider start */}
                  <View
                    style={{
                      width: '80%',
                      height: 1,
                      backgroundColor: '#000',
                      alignSelf: 'center',
                      marginVertical: 8,
                    }}
                  />
                  {/* divider end */}
    
                  <Text style={{ color: '#184461', fontSize: 12, marginBottom: 5 }}>
                    {' '}
                    Click the button below to register
                  </Text>
                  <Text
                    style={{ color: '#184461', fontSize: 12, marginBottom: 10 }}
                  >
                    {' '}
                    your visitor
                  </Text>
    
                  <PrimaryButttonComponent
                    label="Register Visitor"
                    iconRight={'user-plus'}
                    iconType={'FontAwesome'}
                    onPress={() => navigation.navigate('AddVistorInfo')}
                    style={{ marginBottom: 10 }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: 0,
                  height: 5,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 155,
                  borderRightWidth: 155,
                  borderBottomWidth: 50,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#D0F2EC',
                  alignSelf: 'center',
                  transform: [{ rotate: '180deg' }],
                  marginBottom: 10,
                  marginTop: -3,
                }}
              ></View>
            </View>
          </DropShadow>
    
          {/* card end */}
          {/* menu start */}
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
              style={{
                width: '33%',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DropShadow
                style={{
                  shadowColor: '#4A4E69',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    padding: 5,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                >
                  <Image source={Images.userProfileImg} width={28} height={28} />
                </View>
              </DropShadow>
    
              <Text
                style={{
                  color: '#184461',
                  marginTop: 10,
                  fontWeight: '400',
                }}
              >
                Profile
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => navigation.navigate('VistorsRecord')}
              style={{
                width: '33%',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DropShadow
                style={{
                  shadowColor: '#4A4E69',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    padding: 5,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                >
                  <Image source={Images.visitorImg} width={28} height={28} />
                </View>
              </DropShadow>
    
              <Text
                style={{
                  color: '#184461',
                  fontWeight: '400',
                  marginTop: 10,
                }}
              >
                Visitors
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => navigation.navigate('CommunityContact')}
              style={{
                width: '33%',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DropShadow
                style={{
                  shadowColor: '#4A4E69',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    padding: 5,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                >
                  <Image source={Images.alarmWhiteImg} width={28} height={28} />
                </View>
              </DropShadow>
    
              <Text
                style={{
                  color: '#184461',
                  fontWeight: '400',
                  marginTop: 10,
                }}
              >
                Emergency
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => navigation.navigate('VirtualAccessCard')}
              style={{
                width: '33%',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DropShadow
                style={{
                  shadowColor: '#4A4E69',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    padding: 5,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                >
                  <Image source={Images.accessKeyImg} width={28} height={28} />
                </View>
              </DropShadow>
    
              <View style={{ width: 60, alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#184461',
                    fontWeight: '400',
                    marginTop: 10,
                    flexWrap: 'wrap',
                    textAlign: 'center',
                  }}
                >
                  Access Card
                </Text>
              </View>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={() => navigation.navigate('BusinessCard')}
              style={{
                width: '33%',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DropShadow
                style={{
                  shadowColor: '#4A4E69',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    padding: 5,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                >
                  <Image source={Images.businessCardImg} width={28} height={28} />
                </View>
              </DropShadow>
    
              <View style={{ width: 60, alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#184461',
                    fontWeight: '400',
                    marginTop: 10,
                    flexWrap: 'wrap',
                    textAlign: 'center',
                  }}
                >
                  Business Card
                </Text>
              </View>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={{
                width: '33%',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('FaqAnswer')}
            >
              <DropShadow
                style={{
                  shadowColor: '#4A4E69',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#184461',
                    padding: 5,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                  }}
                >
                  <Image source={Images.faqWhiteImg} width={28} height={28} />
                </View>
              </DropShadow>
    
              <Text
                style={{
                  color: '#184461',
                  fontWeight: '400',
                  marginTop: 10,
                }}
              >
                FAQ
              </Text>
            </TouchableOpacity>
          </View>
          {/* menu end */}
    
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: '90%',
                borderWidth: 1,
                borderColor: '#184461',
              }}
            />
          </View>
    
          {/* announcement start */}
    
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginVertical: 10,
             
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: orientation === 'PORTRAIT' ? 20 : 24,
                color: '#184461',
                flex: 2,
              }}
            >
              Announcement
            </Text>
    
            {/**<Text style={{ color: '#4CA3A3' }}>view all</Text>**/}
          </View>
    
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View>
              <View>
                {announcementsLoading ? (
                  <ActivityIndicator
                    size={50}
                    color="#184461"
                    style={{
                      alignSelf: 'center',
                    }}
                  />
                ) : announcements?.length > 0 ? (
                  announcements.map((ann, key) => (
                    <TouchableOpacity
                      key={key}
                      activeOpacity={1.0}
                      onPress={() =>
                        navigation.navigate('Announcementdetails', {
                          itemTitle: ann.Title,
                          itemIcon: ann.EventBannerLogo,
                          itemDesc: ann.Description,
                          itemDate: ann.EventStartAt,
                          itemDateEnd: ann.EventEndAt,
                          itemPlace: ann.Location,
                          itemDistance: '3.5miles',
                        })
                      }
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          elevation: 10,
                          shadowColor: '#000',
                          shadowRadius: 10,
                          shadowOpacity: 0.6,
                          elevation: 8,
                          shadowOffset: {
                            width: 0,
                            height: 4,
                          },
                          marginBottom: 15,
                        }}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              width: 10,
                              backgroundColor: '#184461',
                            }}
                          />
                          <Image
                            source={{
                              uri: `data:image/png;base64,${ann.EventBannerLogo}`,
                            }}
                            style={{
                              width: '40%',
                              resizeMode: 'stretch',
                            }}
                          />
    
                          <View style={{ flex: 1 }}>
                            <View
                              style={{
                                paddingVertical: 5,
                                marginStart: 5,
                                backgroundColor: '#fff',
                              }}
                            >
                              <Text
                                style={{
                                  color: '#184461',
                                  marginBottom: 2,
                                  flexWrap: 'wrap',
                                  fontWeight: 'bold',
                                  fontSize: orientation === 'PORTRAIT' ? 14 : 18,
                                }}
                              >
                                {ann.Title}
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
                                    fontSize: orientation === 'PORTRAIT' ? 12 : 14,
                                  }}
                                >
                                  {new Date(
                                    Number(
                                      ann.EventStartAt.replace(/\/date\(/gi, '')
                                        .replace(/\//gi, '')
                                        .replace(/\)/gi, ''),
                                    ),
                                  ).toLocaleString()}
                                </Text>
                              </View>
    
                              <View>
                                <Text
                                  style={{
                                    color: '#184461',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Event:
                                </Text>
                                <Text
                                  style={{
                                    color: '#184461',
                                    flexWrap: 'wrap',
                                    width:
                                      orientation === 'PORTRAIT' ? 170 : '100%',
                                    fontSize: orientation === 'PORTRAIT' ? 12 : 16,
                                  }}
                                  numberOfLines={1}
                                >
                                  {ann.Description}
                                </Text>
                              </View>
    
                              <View style={{}}></View>
                            </View>
    
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#E7EBEA',
                                marginTop: 6,
                                padding: 2,
                              }}
                            >
                              
    
                              <Icon
                                type="Ionicons"
                                name="location"
                                color="#184461"
                                size={12}
                                marginHorizontal={5}
                              />
                              <Text
                                style={{
                                  color: '#184461',
                                  flexWrap: 'wrap',
                                  width: orientation === 'PORTRAIT' ? 170 : '100%',
                                  fontSize: orientation === 'PORTRAIT' ? 10 : 12,
                                }}
                                numberOfLines={1}
                              >
                                {ann.Location}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={{
                    marginBottom: 40
                  }}>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      No Announcements available now
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
    
    
          </ScrollView>
     
  )}
     
   
    
                    
   

   
    
   
  


const styles = StyleSheet.create({
  header: {
    backgroundColor: '#184461',
    height: 144,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFEFE',
  },
  cardWrap: {
    width: '100%',
    overflow: 'hidden',
    marginTop: -30,
    width: 280,
    alignSelf: 'center',
    elevation: 8,
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#D0F2EC',
    width: 280,
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  cardBottom: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 120,
    borderRightWidth: 120,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D0F2EC',
    alignSelf: 'center',
    transform: [{ rotate: '180deg' }],
  },
})

export default IndexHomeContainer
