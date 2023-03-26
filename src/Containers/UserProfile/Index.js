import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-dynamic-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultCard } from '@/Features/virtualCards'
import DropShadow from 'react-native-drop-shadow'

const IndexUserProfileContainer = ({ navigation }) => {
  const { Layout, Colors, Images, MetricsSizes } = useTheme()
  const user = useSelector(user => user.user.profile)
  const VirtualCard = useSelector(state => state.virtualCard.cards || [])
  const defaultCardID = useSelector(state => state.virtualCard.defaultCard)

  const dispatch = useDispatch()
  const handCardSelected = item => {
    dispatch(setDefaultCard(item))
  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      {/* header start */}
      <View style={{ backgroundColor: '#184461', height: 144 }}>
        <Icon
          name="x"
          type="Feather"
          size={35}
          color="#fff"
          style={{ margin: 20, alignSelf: 'flex-end' }}
          onPress={() => {
            navigation.goBack()
          }}
        />
      </View>
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

            <Icon
              name="edit"
              type="Feather"
              size={23}
              color="#184461"
              style={{ alignSelf: 'flex-end', marginTop: -10, marginEnd: 10 }}
              onPress={() => {
                navigation.navigate('EditUserProfile')
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: '900',
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

              <View
                style={{
                  marginTop: 5,
                  marginHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 5,
                      marginTop: 2,
                      marginBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        width: 30,
                        marginStart: 48,
                        marginEnd: 5,
                      }}
                    >
                      <Icon
                        name="phone"
                        type="FontAwesome"
                        size={18}
                        color="#184461"
                        style={{ marginEnd: 5, flex: 1 }}
                      />
                    </View>

                    <View
                      style={{
                        width: 170,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: '#184461',
                        }}
                      >
                        {user.MobileNo}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 5,
                      marginTop: 2,
                      marginBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        width: 30,
                        marginStart: 48,
                        marginEnd: 5,
                      }}
                    >
                      <Icon
                        name="envelope"
                        type="FontAwesome"
                        size={18}
                        color="#184461"
                        style={{ marginEnd: 5, flex: 1 }}
                      />
                    </View>

                    <View
                      style={{
                        width: 170,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: '#184461',
                        }}
                      >
                        {user.Email}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 5,
                      marginTop: 2,
                      marginBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        width: 30,
                        marginStart: 48,
                        marginEnd: 5,
                      }}
                    >
                      <Icon
                        name="car"
                        type="FontAwesome"
                        size={18}
                        color="#184461"
                        style={{ marginEnd: 5, flex: 1 }}
                      />
                    </View>

                    <View
                      style={{
                        width: 170,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          color: '#184461',
                        }}
                      >
                        {user.VehicleNo}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
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

      <View style={[{ marginTop: 20 }]}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#184461',
            marginTop: 8,
            marginLeft: 16,
            marginBottom: 10,
          }}
        >
          Virtual Access Card
        </Text>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          {
          typeof VirtualCard === 'undefined' 
         //VirtualCard?.length === 0  
           ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#184461',
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                >
                  No Virtual card has been assigned to you,{' '}
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    color: '#184461',
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                >
                  Please contact Management.{' '}
                </Text>
              </View>
            ) : (
              VirtualCard?.map((item, index) => (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                  key={index}
                  activeOpacity={1.0}
                  onPress={() => handCardSelected(item)}
                >
                  <View style={[{ marginTop: 5, marginBottom: 10 }]}>
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
                      }}
                    >
                      <View style={{ backgroundColor: '#184461', height: 31 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#fff',
                            marginTop: 5,
                            marginLeft: 8,
                          }}
                        >
                          {item.BuildingName}
                        </Text>
                      </View>

                      {item.VirtualKey === defaultCardID.VirtualKey ? (
                        <Image
                          source={Images.goodMark}
                          style={{
                            width: 26,
                            height: 26,
                            margin: 3,
                            alignSelf: 'flex-end',
                            marginTop: -14,
                          }}
                          resizeMode={'contain'}
                        />
                      ) : null}
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 3 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '500',
                              color: '#184461',
                              marginLeft: 2,
                              marginTop: 5,
                              marginBottom: 3,
                              marginStart: 10,
                            }}
                          >
                            Access Card No :
                          </Text>
                          <Text
                            style={{
                              marginStart: 30,
                              fontSize: 24,
                              fontWeight: '900',
                              color: '#184461',
                            }}
                          >
                            {item.VirtualKey}
                          </Text>
                          <View style={{ backgroundColor: '#E7EBEA' }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: '#184461',
                                marginLeft: 2,
                                marginTop: 5,
                              }}
                            >
                              Expires on:
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: '500',
                                  color: '#184461',
                                  marginLeft: 2,
                                  marginTop: 5,
                                  marginBottom: 3,
                                }}
                              >
                                {new Date(
                                  Number(
                                    item.AccessEndAt.replace(/\/date\(/gi, '')
                                      .replace(/\//gi, '')
                                      .replace(/\)/gi, ''),
                                  ),
                                ).toLocaleString()}
                              </Text>
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            justifyContent: 'center',
                            flex: 2,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            source={{
                              uri: `data:image/png;base64,${item.BuildingLogo}`,
                            }}
                            style={{
                              width: 100,
                              height: 55,
                              marginEnd: 3,
                              marginStart: 5,
                            }}
                            resizeMode={'stretch'}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default IndexUserProfileContainer
