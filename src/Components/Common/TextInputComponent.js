import React from 'react'
import { useTheme } from '@/Hooks'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-dynamic-vector-icons'
import DropShadow from 'react-native-drop-shadow'

function TextInputComponent(props) {
  const { Colors, Layout, MetricsSizes } = useTheme()
  return (
    <DropShadow
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 3,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginTop:-5
      }}
    >
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          {
            width: 280,
            height: 47,
            borderRadius: 16,
            marginVertical: MetricsSizes.small - 2,
            borderWidth: MetricsSizes.tiny - 4,
            borderColor:  props.borderColor,
            borderWidth: 2,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: { width: 5, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 5,
            backgroundColor: Colors.white,
            elevation: 5,
          },
        ]}
      >
        <TextInput
          style={{
            fontWeight: '700',
            fontSize: 14,
            padding: 10,
          }}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          value={props.value}
          editable={props.editable}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          placeholderTextColor={'#666666'}
          onEndEditing={props.onEndEditing}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize={props.autoCapitalize}
        />
      </View>
    </DropShadow>
  )
}

export default TextInputComponent
