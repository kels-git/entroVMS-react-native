import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import DropShadow from 'react-native-drop-shadow'
import { getQRAccess } from '@/api-utils'
import { useSelector } from 'react-redux'
import Icon from 'react-native-dynamic-vector-icons'

const IndexVirtualAccessContainer = ({ navigation }) => {
  const { Layout } = useTheme()

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [minutes, setMinutes] = useState('01')
  const [seconds, setSeconds] = useState('59')
  const accessId = useSelector(state => state.user.accessId)
  const defaultCard = useSelector(state => state.virtualCard.defaultCard)
  const height = Dimensions.get('screen').height

  const getImage = async () => {
    setLoading(true)
    const req_img = await getQRAccess(accessId, defaultCard.BuildingName)
    const res_img = await req_img.json()
    setImage(res_img)
    startCounter()
    setLoading(false)
  }

  const paddNum = num => (String(num).length > 1 ? num : `0${num}`)

  const startCounter = () => {
    const countDownDate = new Date().getTime() + 2 * (60 * 1000)

    const x = setInterval(function () {
      const now = new Date().getTime()
      const distance = countDownDate - now
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setMinutes(paddNum(minutes))
      setSeconds(paddNum(seconds))
      if (distance < 0) {
        clearInterval(x)
        getImage()
        setMinutes('01')
        setSeconds('59')
      }
    }, 1000)
  }

  useEffect(() => {
    getImage()
  }, [])

  return (
    <ScrollView style={{ backgroundColor: '#F1F1F1' }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon type="Ionicons" color="#000" size={30} name="arrow-back" />
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Go back
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            minHeight: height * 0.6,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={50} color="#184461" />
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Getting QR Access
          </Text>
        </View>
      ) : typeof defaultCard.BuildingLogo === 'undefined' ? (
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
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: 350,
              alignSelf: 'center',
            }}
          >
            <View style={[Layout.center, {}]}>
            <DropShadow
            style={{
              shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 1,
              shadowRadius: 1,
            }}
          >
              <View style={{ marginBottom: 30, marginTop: 20,   elevation: 8,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },}}>
              
                <Image
                  style={{
                    width: 180,
                    height: 70,
                    resizeMode: 'stretch',
                    borderRadius:3
                    
                  }}
                  source={{
                    uri: `data:image/png;base64,${defaultCard.BuildingLogo}`,
                  }}
                />
              </View>
              </DropShadow>

              <DropShadow
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 5,
                }}
              >
              <View
              style={[
                Layout.center,
                {
                  width: 300,
                  height: 300,
                  borderRadius: 150,
                  backgroundColor: '#ffffff',
                  shadowColor: ' rgba(0, 0, 0, 0.25)',
                  elevation: 10,
                },
              ]}
            >
                  <Image
                    source={{ uri: `data:image/png;base64,${image.Image}` }}
                    style={{  resizeMode: 'contain' }}
                    width={280}
                    height={210}
                  />
                </View>
              </DropShadow>
            </View>

            <View
              style={{
                marginTop: 35,
              }}
            >
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  color: '#184461',
                  textAlign: 'center',
                }}
              >
                {minutes}:{seconds}
              </Text>
            </View>

            <Text
              style={{
                marginTop: 30,
                fontSize: 14,
                fontWeight: '700',
                color: '#184461',
                marginBottom: 20,
                alignSelf: 'center',
              }}
            >
              QR codes refreshes every 2 minutes
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default IndexVirtualAccessContainer
