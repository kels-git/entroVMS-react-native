import React, { useState, useEffect } from 'react'
import {
  View,
  Image,
  Animated,
  SafeAreaView,
  Dimensions,
  PixelRatio,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import { useTheme } from '@/Hooks'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'

const width = Dimensions.get("screen").width


function IndexTutorialSlideContainer({navigation}) {
  const { Fonts, Images, Colors, Layout, Gutters } = useTheme()
  const [loading, setLoading] = useState(false)
  const SCREEN_WIDTH = useWindowDimensions().width
  const SCREEN_HEIGHT = useWindowDimensions().height

  const { width, height } = Dimensions.get('window')
  const SIZES = {
    base: 8,
    width,
    height: height * 0.9 < 374 ? height * 0.9 : 544,
  }
  const [completed, setCompleted] = useState(false)

  const scrollX = new Animated.Value(0)

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true)
      } else {
        setCompleted(false)
      }
    })
  }, [scrollX]);

  
  const onBoardings = [
    {
      title_slide_01: 'Welcome to EzXcess',
      description_slide_1_1:
        'A platform effective and efficient for visitor management',
      description_slide_1_2:
        'Secured place to manage all visit activities and network.',

      slide_Image_01: Images.tutorialfirstimage,
    },

    {
      title_slide_02: 'Easy And convenient ',
      description_slide_2_1:
        'Visitors can be invited easily and granted persmission ',
      description_slide_2_2:
        'convenient business card sharing and emergency mangt contact',

      slide_Image_02: Images.tutorialsecondimage,

      btnButton: (
        <PrimaryButttonComponent
          label="Let's go!"
          loading={loading}
          onPress={() => {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainNav' }],
              })
            }, 1000)
          }}
        />
      ),
    },
  ]

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ backgroundColor: '#184461', width }}
      >
        {onBoardings.map((item, index) => (
          <ScrollView
            paddingVertical={10}
            paddingHorizontal={10}
            key={`slide-${index}`}
            style={{
              width: SIZES.width,
              height: SIZES.height,
              backgroundColor: '#184461',
             
            }}
          >
            <View
              borderRadius={16}
              flex={1}
              style={{
                backgroundColor: Colors.white,

              }}
            >
              <View flex={1}>
                {item.title_slide_01 ? (
                  <View
                    style={{
                      minHeight: 32,
                      marginTop: 22,
                      paddingLeft: 10,
                      paddingRight: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={[
                        Fonts.textCenter,
                        Fonts.h3Bold,
                        {
                          color: Colors.bodyText,
                          lineHeight: 20 / PixelRatio.getFontScale(),
                        },
                      ]}
                    >
                      {item.title_slide_01}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      minHeight: 32,
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginTop: 22,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={[
                        Fonts.h3Bold,
                        Fonts.textCenter,
                        {
                          color: Colors.bodyText,
                          lineHeight: 20 / PixelRatio.getFontScale(),
                        },
                      ]}
                    >
                      {item.title_slide_02}
                    </Text>
                  </View>
                )}

                {item.slide_Image_01 ? (
                  <View
                    marginTop={4}
                    marginBottom={25}
                    style={Layout.justifyContentEnd}
                  >
                    <Image
                      source={item.slide_Image_01}
                      style={[
                        Layout.selfCenter,
                        {
                          width: 280,
                          height: 211,
                          resizeMode: 'contain',
                        },
                      ]}
                    />
                  </View>
                ) : (
                  <View
                    marginTop={4}
                    marginBottom={20}
                    style={Layout.justifyContentEnd}
                  >
                    <Image
                      source={item.slide_Image_02}
                      style={[
                        Layout.selfCenter,
                        {
                          width: 230,
                          height: 244,
                          resizeMode: 'contain',
                        },
                      ]}
                    />
                  </View>
                )}

                {item.description_slide_1_1 ? (
                  <View paddingHorizontal={41}>
                    <Text
                      style={[
                        Fonts.body,
                        Fonts.textCenter,
                        {
                          color: Colors.bodyText,
                          marginBottom: item.description_slide_1_1 ? 15 : 0,
                        },
                      ]}
                    >
                      {item.description_slide_1_1}
                    </Text>
                    <Text
                      style={[
                        Fonts.body,
                        Fonts.textCenter,
                        {
                          color: Colors.bodyText,
                          marginBottom: item.description_slide_1_2 ? 125 : 10,
                        },
                      ]}
                    >
                      {item.description_slide_1_2}
                    </Text>
                  </View>
                ) : (
                  <View style={{ marginLeft: 42, paddingRight: 40 }}>
                    <Text
                      style={[
                        Fonts.body,
                        Fonts.textCenter,
                        {
                          color: Colors.bodyText,
                          marginBottom: item.description_slide_2_1 ? 15 : 0,
                        },
                      ]}
                    >
                      {item.description_slide_2_1}
                    </Text>
                    <Text
                      style={[
                        Fonts.body,
                        Fonts.textCenter,
                        {
                          color: Colors.bodyText,
                          marginBottom: item.description_slide_2_2 ? 15 : 0,
                        },
                      ]}
                    >
                      {item.description_slide_2_2}
                    </Text>
                  </View>
                )}

                {item.btnButton ? (
                  <View
                    style={[{ marginTop: 20, marginLeft: 50, marginRight: 50, marginBottom: 20 }]}
                  >
                    {item.btnButton}
                  </View>
                ) : item.description_0 ? (
                  <View
                    style={[
                      Layout.selfCenter,
                      {
                        bottom: 20,
                        position: 'absolute',
                       
                      },
                    ]}
                  >
                    {renderDot()}
                  </View>
                ) : (
                  <View
                    style={[
                      Layout.selfCenter,
                      {
                        bottom: 13,
                        position: 'absolute',
                      },
                    ]}
                  >
                    {renderDot()}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        ))}
      </Animated.ScrollView>
    )
  }

  function renderDot() {
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View height={24} style={[Layout.selfCenter, Layout.rowCenter]}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          })

          const color = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              Colors.mediumGray,
              Colors.lightGreen,
              Colors.mediumGray,
            ],
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              opacity={opacity}
              key={`dot-${index}`}
              style={{
                borderRadius: 12,
                backgroundColor: color,
                marginHorizontal: 6,
                width: 11,
                height: 11,
              }}
            />
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView
      style={[
        Layout.center,
        Layout.fill,
        {
          backgroundColor: Colors.background,
        },
      ]}
    >
      <View>
      {renderContent()}
      </View>

      {/* {!completed ? (
        <View
          style={[
            Layout.positionAbsolute,
            Layout.selfCenter,
            {
              bottom: '13%',
            },
          ]}
        >
          {renderDot()}
        </View>
      ) : null} */}
    </SafeAreaView>
  )
}

export default IndexTutorialSlideContainer
