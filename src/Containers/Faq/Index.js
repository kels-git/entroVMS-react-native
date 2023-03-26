import React, { useState } from 'react'

import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-dynamic-vector-icons'

function IndexUsersFaqContainer({navigation}) {
  const { Gutters, Colors, Images, Fonts, Layout } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(false)
  const user = useSelector(user => user.user.profile)

  const usersGuideMenu = [
    {
      id: 1,
      name: 'Ezxcess App first user guide',
      guide_Image: Images.userProfileImg,
      faq: [
        {
          id: 1,
          desc: '•	How to download and install Ezxcess app?',
          subCatergory: [
            {
              id: 1,
              subtext:
                'Download through Apps Store and Play Store.',
             
             
            },
          ],
        },
        {
          id: 2,
          desc: '•	How to register Ezxcess app?',
          subCatergory: [
            {
              id: 2,
              subtext:
                ' Tap register on the login page.',
              subtext_01:
                ' Register using phone number.',
            },
          ],
        },

        {
          id: 3,
          desc: '•	How do I reset my Password?',
          subCatergory: [
            {
              subtext:
                'Simply login with the OTP verification which is sent to your mobile phone. You can get access to your account anytime.',
              
              
            },
          ],
        },

        {
          id: 4,
          desc: '•	Why I need set up my profile during registration?',
          subCatergory: [
            {
              id: 4,
              subtext:
                'To collect user data and setup the details in Ezxcess.',
            },
          ],
        },
      ],
    },

    {
      id: 2,
      name: 'Access Card & Business Card',
      guide_Image: Images.businessCardImg,
      faq: [
        {
          id: 5,
          desc: '•	How to use the Access Card?',
          subCatergory: [
            {
              id: 5,
              subtext:
                'An access card is required to access the building or community registered Ezxcess system.',
            },
          ],
        },

        {
          id: 6,
          desc: '•	How do l use the business card?',
          subCatergory: [
            {
              id: 6,
              subtext:
                '-	Add a business card.',
              subImage: Images.pexelsmeetupIcon,
              subtext_01:
                '- Share business cards with a person through other apps',
            },
          ],
        },
      ],
    },

    {
      name: 'Visitors',
      guide_Image: Images.visitorImg,
      faq: [
        {
          id: 7,
          desc: '•	How to invite visitors?',
          subCatergory: [
            {
              id: 7,
              subtext:
                '- Tap on register here button at home section to register your visitor.',
            },
          ],
        },

        {
          id: 8,
          desc: '•	How to share visitors link after registration?',
          subCatergory: [
            {
              id: 8,
              subtext:
                '- Tap on registered visitor name at visitor tab and share link through other apps.',
            },
          ],
        },
      ],
    },

    {
      name: 'Emegency and community',
      guide_Image: Images.alarmWhiteImg,
      faq: [
        {
          id: 9,
          desc: '•	What are contacts in emergency used for?',
          subCatergory: [
            {
              id: 9,
              subtext:
                '- To be contacted in the event of a medical emergency.',
            },
          ],
        },

        {
          id: 10,
          desc: '•	Who do I contact in community section?',
          subCatergory: [
            {
              id: 10,
              subtext:
                '- Please contact Helpdesk.',
            },
          ],
        },
      ],
    },
  ]

  return (
    <ScrollView
      bounces={false}
      style={{
        backgroundColor: '#F1F1F1',
      }}
    >
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
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 18,
            flex: 2,
          }}
        >
          FAQ
        </Text>
        <View style={{flex:1,  marginEnd: 10,  }}>
        <Icon
        name="x"
        type="Feather"
        size={35}
        color="#fff"
        style={{  alignSelf:'flex-end' }}
        onPress={() => {navigation.goBack();}}
      />
        </View>
      
      </View>
      <View
        style={[
          Gutters.mediumTPadding,
          Gutters.smallBPadding,
          Gutters.regularHPadding,
          { flex: 1 },
        ]}
      >
        {usersGuideMenu.map((userguideHeader, index) => {
          return (
            <View key={index}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#184461',
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      justifyContent: 'center',
                    }}
                    activeOpacity={1.0}
                  >
                    <Image
                      source={userguideHeader.guide_Image}
                      style={[
                        Layout.selfCenter,
                        { width: 25, height: 25, resizeMode: 'cover' },
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                  <Text
                    style={[
                      {
                        color: '#184461',
                        fontSize: 18,
                        fontWeight: '700',
                        flexWrap: 'wrap',
                      },
                    ]}
                  >
                    {userguideHeader.name}
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10, marginBottom: 40 }}>
                {userguideHeader.faq.map(faqquestions => {
                  return (
                    <View key={faqquestions.id}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          setCurrentIndex(
                            faqquestions.id === currentIndex
                              ? null
                              : faqquestions.id,
                          )
                        }}
                      >
                        <View style={{ flexGrow: 1 }}>
                          <Text style={{ color: '#184461', fontWeight:'500' }}>
                            {faqquestions.desc}
                          </Text>

                          {faqquestions.id === currentIndex ? (
                            <View style={{ marginBottom: 5, flexGrow: 1 }}>
                              {(faqquestions.subCatergory || []).map(
                                listofObject => {
                                  return (
                                    <View
                                      key={listofObject.id}
                                      style={{
                                        marginBottom: 20,
                                        marginTop: 10,
                                      }}
                                    >
                                      <Text style={{ color: '#184461', }}>
                                        {listofObject.subtext}
                                      </Text>
                                    
                                      <Text style={{ color: '#184461' }}>
                                        {listofObject.subtext_01}
                                      </Text>

                                    
                                    </View>
                                  )
                                },
                              )}
                            </View>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default IndexUsersFaqContainer
