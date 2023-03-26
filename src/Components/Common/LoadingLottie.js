import { Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const LoadingLottie = () => {
  return (
    <View style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <LottieView
            source={require('../../Assets/Lottie/loading.json')}
            loop
            autoPlay={true}
            speed={1.5}
            style={{
                width: 200,
                height: 250
            }}
        />
        <Text style={{
            fontSize: 16,
            fontWeight: "600",
            textAlign: "center",
            color: "#000",
            marginTop: -70

        }}>Please wait</Text>
    </View>
  )
}

export default LoadingLottie