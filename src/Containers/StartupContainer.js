import React, { useEffect } from 'react'
import { ActivityIndicator, View, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

const StartupContainer = () => {
  const { Fonts, Gutters, Layout, Images, Colors } = useTheme()
  const isLoggedIn = useSelector(user => user.user.isLoggedIn)

  const { t } = useTranslation()

  const init = async () => {
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset(isLoggedIn ? 'MainNav' : 'Login')
  }

  useEffect(() => {
    init()
  })

  return (
    <LinearGradient colors={Colors.greenGradient}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={Images.corporateLogo} />
        </View>
      </View>
    </LinearGradient>
  )
}

export default StartupContainer
