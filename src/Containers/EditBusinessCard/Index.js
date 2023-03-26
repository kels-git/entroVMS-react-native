import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native'
import PrimaryButttonComponent from '@/Components/Common/PrimaryButtonComponent'
import ImagePicker from 'react-native-image-crop-picker'
import { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-dynamic-vector-icons'
import { useTheme } from '@/Hooks'
import DropShadow from 'react-native-drop-shadow'
const CardUpload = ({
  cardFront,
  cardBack,
  handleAttachCard,
  setShowUploadScreen,
}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 50,
        }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Front
          </Text>
          <TouchableOpacity
            onPress={() => handleAttachCard('front')}
            style={{
              overflow: 'hidden',
              borderWidth: 2,
              borderRadius: 20,
              borderColor: '#45969A',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}
          >
            {cardFront ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${cardFront}` }}
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <Icon type="Feather" name="camera" size={45} color="#45969A" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Back
          </Text>
          <TouchableOpacity
            onPress={() => handleAttachCard('back')}
            style={{
              overflow: 'hidden',
              borderWidth: 2,
              borderRadius: 20,
              borderColor: '#45969A',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}
          >
            {cardBack ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${cardBack}` }}
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <Icon type="Feather" name="camera" size={45} color="#45969A" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 150,
            alignSelf: 'center',
          }}
        >
          <PrimaryButttonComponent
            label={'Update'}
            onPress={() => setShowUploadScreen(false)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const IndexEditBusinessCardContainer = ({ navigation, route }) => {
  const { Fonts, Gutters, Layout, Images, Colors, MetricsSizes } = useTheme()
  const [logo, setLogo] = useState(null)
  const [cardFront, setCardFront] = useState(null)
  const [cardBack, setCardBack] = useState(null)
  const [fname, setFname] = useState('')
  const [bname, setBname] = useState('')
  const [bwebsite, setBwebsite] = useState('')
  const [c_id, set_id] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showUploadScreen, setShowUploadScreen] = useState(false)

  const [showDisplayCamOption, setShowDisplayCamOption] = useState(false);
  const [showDisplayCamOptionLogo, setShowDisplayCamOptionLogo] = useState(false);
  const [location, setLocation] = useState("front");

  const [placeholder, setPlaceholder] = useState({
    fname: 'FullName',
    bname: 'Business Name',
    bwebsite: 'Company Website',
    phone: 'Phone Number',
  })

  useEffect(() => {
    const { card } = route.params
    setLogo(card.logoChunks.join(''))
    setCardFront(card.cardFrontChunks.join(''))
    setCardBack(card.cardBackChunks.join(''))
    setFname(card.fullname)
    setBname(card.businessName)
    setBwebsite(card.businessWebsite)
    setPhone(card.phone)
    set_id(card.id)
  }, [])

  const goGalleryLogo = () => {
    //setShowDisplayCamOptionLogo(false);
    ImagePicker.openPicker({
      width: 1200, 
      height: 1500, 
      compressImageQuality:1,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
    }).then(response => {
      setLogo(response.data)
      setShowDisplayCamOptionLogo(false)
    }).catch(err => {
      console.log(err);
    });
  }


  const goCameraLogo = () => {
    //setShowDisplayCamOptionLogo(false);
    ImagePicker.openCamera({
      path: Platform.OS === 'android',
      mediaType: 'photo',
      width: 1200, 
      height: 1500, 
      compressImageQuality:1,
      cropping: true,
      freeStyleCropEnabled: true,
      useFrontCamera: true,
      includeBase64: true,
    }).then(image => {
      setLogo(image.data)
      setShowDisplayCamOptionLogo(false)
    }).catch(err => {
      console.log(err);
    });
  }

 

  const goGallery = () => {
    setShowDisplayCamOption(false);
    ImagePicker.openPicker({
      width: 1200, 
      height: 1500, 
      compressImageQuality:1,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
    }).then(image => {
      if (location === 'front') {
        setCardFront(image.data)
        setShowDisplayCamOption(false);
      } else {
        setCardBack(image.data)
        setShowDisplayCamOption(false);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const goCamera = () => {
   // setShowDisplayCamOption(false);
    ImagePicker.openCamera({
      path: Platform.OS === 'android',
      mediaType: 'photo',
      width: 1200, 
      height: 1500, 
      compressImageQuality:1,
      cropping: true,
      freeStyleCropEnabled: true,
      useFrontCamera: true,
      includeBase64: true,
    }).then(image => {
      if (location === 'front') {
        setCardFront(image.data)
        setShowDisplayCamOption(false);
      } else {
        setCardBack(image.data)
        setShowDisplayCamOption(false);
      }
    }).catch(err => {
      console.log(err);
    });
  }


  const handleAttachCard = (location = '') => {
    setLocation(location);
    setShowDisplayCamOption(true);
  }
  
  const handleSaveCard = async () => {
    // await AsyncStorage.removeItem("businesscards");
    // return
    try {
      // dummy form validation
      setLoading(true)
      if (!fname || !bname || !bwebsite || !phone) {
        setLoading(false)
        showMessage({
          message: 'All fields are required',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }
      if (!logo) {
        setLoading(false)
        showMessage({
          message: 'Please upload company logo',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }
      if (!cardFront || !cardBack) {
        setLoading(false)
        showMessage({
          message: 'Please upload images of your business card',
          backgroundColor: 'red',
          duration: 3000,
        })
        return false
      }
      // save card to device
      const newCard = {
        id: c_id,
        fullname: fname,
        businessWebsite: bwebsite,
        businessName: bname,
        phone,
        logoChunks: logo.match(/.{1,800}/g),
        cardFrontChunks: cardFront.match(/.{1,800}/g),
        cardBackChunks: cardBack.match(/.{1,800}/g),
      }

      const ser_cards = await AsyncStorage.getItem('businesscards')
      const des_cards = JSON.parse(ser_cards)
      const businessCards = {
        ...des_cards,
        [c_id]: newCard,
      }
      const _ser_cards = JSON.stringify(businessCards)
      await AsyncStorage.setItem('businesscards', _ser_cards)
      setLoading(false)
      showMessage({
        message: 'Card updated successfully',
        backgroundColor: 'green',
        duration: 3000,
      })
      navigation.goBack()
    } catch (err) {
      console.log(err)
      showMessage({
        message: 'Something went wrong',
        backgroundColor: 'red',
        duration: 3000,
      })
    }
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F1F1F1' }}>
      {/* header start */}
      <Modal
      transparent
      visible={showDisplayCamOptionLogo}
      onRequestClose={() => setShowDisplayCamOptionLogo(false)}
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
                onPress={goGalleryLogo}
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
                onPress={goCameraLogo}
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
            <TouchableOpacity onPress={() => setShowDisplayCamOptionLogo(false)}>
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
                Please select any option
              </Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  onPress={goGallery}
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
                  onPress={goCamera}
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
            Edit Business Card
          </Text>
          <Icon
            name="x"
            type="Feather"
            size={35}
            color="#fff"
            onPress={() =>
              showUploadScreen
                ? setShowUploadScreen(false)
                : navigation.goBack()
            }
          />
        </View>
      </View>

      {/* header end */}

      {showUploadScreen ? (
        <CardUpload
          cardFront={cardFront}
          cardBack={cardBack}
          handleAttachCard={handleAttachCard}
          setShowUploadScreen={setShowUploadScreen}
        />
      ) : (
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: '#184461',
              fontWeight: 'bold',
              marginVertical: 15,
            }}
          >
            Please fill up your business card information
          </Text>
          {/* form start */}
          <View
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            {/** business person starts here */}

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
                  color:'#457C9A'
                }}
                value={fname}
                placeholder={placeholder.fname}
                onChangeText={text => setFname(text)}
                placeholderTextColor={'#A6A2A2'}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, fname: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    fname: 'FullName',
                  })
                }}
              />
            </View>

            {/**business person name  starts here */}

            {/** business name starts here */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#184461',
                  fontWeight: '500',
                  marginStart: 4,
                  marginBottom: 10,
                }}
              >
                Business Name
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
                value={bname}
                placeholder={placeholder.bname}
                onChangeText={text => setBname(text)}
                placeholderTextColor={'#A6A2A2'}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, bname: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    bname: 'Business Name',
                  })
                }}
              />
            </View>
            {/**business name name  starts here */}

            {/** business website starts here */}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#184461',
                  fontWeight: '500',
                  marginStart: 4,
                  marginBottom: 10,
                }}
              >
                Business Website
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
                value={bwebsite}
                placeholder={placeholder.bwebsite}
                onChangeText={text => setBwebsite(text)}
                placeholderTextColor={'#A6A2A2'}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, bwebsite: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    bwebsite: 'Company Website',
                  })
                }}
              />
            </View>
            {/**business name name  starts here */}

            {/** business website starts here */}
            <View style={{ marginTop: 20 }}>
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
                  color:'#457C9A'
                }}
                value={phone}
                placeholder={placeholder.phone}
                keyboardType={'number-pad'}
                onChangeText={text => setPhone(text)}
                placeholderTextColor={'#A6A2A2'}
                onFocus={() => {
                  setPlaceholder({ ...placeholder, phone: '' })
                }}
                onBlur={() => {
                  setPlaceholder({
                    ...placeholder,
                    phone: 'Phone Number',
                  })
                }}
              />
            </View>
            {/**bphone number ends  here */}

            <View
              style={{
                justifyContent: 'space-between',

                paddingRight: 20,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
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
                  onPress={()=> setShowDisplayCamOptionLogo(true)}
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
                    Attach Logo
                  </Text>
                </TouchableOpacity>
              </DropShadow>
             

              <View style={{ marginTop: 6, alignItems: 'flex-end' }}>
                {logo ? (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${logo}` }}
                    style={{
                      resizeMode: 'cover',
                      width: 100,
                      height: 80,
                      marginTop: 5,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#184461',
                    }}
                  />
                ) : (
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
                )}
              </View>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
                paddingRight: 20,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
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
                <TouchableOpacity
                  onPress={() => setShowUploadScreen(true)}
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
                    Business Card
                  </Text>
                </TouchableOpacity>
              </DropShadow>
              
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'flex-end',
                  marginBottom: 20,
                }}
              >
                {cardFront ? (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${cardFront}`,
                      }}
                      style={{
                        resizeMode: 'cover',
                        width: 80,
                        height: 50,
                        marginEnd: 8,
                      }}
                    />
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${cardBack}` }}
                      style={{
                        resizeMode: 'cover',
                        width: 80,
                        height: 50,
                      }}
                    />
                  </View>
                ) : (
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
                )}
              </View>
            </View>

            <PrimaryButttonComponent
              label="Update Card"
              loading={loading}
              onPress={handleSaveCard}
            />
          </View>
          {/* form send */}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#184461',
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
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  cardWrap: {
    width: '100%',
    overflow: 'hidden',
    marginTop: -60,
    width: 300,
    borderRadius: 10,
    alignSelf: 'center',
  },
  cardContent: {
    padding: 15,
    backgroundColor: '#D0F2EC',
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})

export default IndexEditBusinessCardContainer
